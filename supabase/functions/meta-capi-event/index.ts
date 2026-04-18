// Meta Conversions API edge function
// Forwards browser events to Meta CAPI server-side for improved tracking
// Deduplication via event_id matching the Pixel's eventID

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const META_CAPI_ACCESS_TOKEN = Deno.env.get('META_CAPI_ACCESS_TOKEN');
const META_CAPI_TEST_EVENT_CODE = Deno.env.get('META_CAPI_TEST_EVENT_CODE');

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

interface IncomingEvent {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  user_data?: {
    email?: string;
    phone?: string;
    fbp?: string;
    fbc?: string;
  };
  custom_data?: {
    value?: number | string;
    currency?: string;
    content_name?: string;
    content_ids?: string[];
    [k: string]: unknown;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!META_PIXEL_ID || !META_CAPI_ACCESS_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'Meta CAPI not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  try {
    const body = (await req.json()) as IncomingEvent;
    if (!body?.event_name || !body?.event_id) {
      return new Response(
        JSON.stringify({ error: 'event_name and event_id required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Extract client IP and UA for matching
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('cf-connecting-ip') ||
      undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

    // Hash PII
    const user_data: Record<string, unknown> = {};
    if (body.user_data?.email) user_data.em = [await sha256(body.user_data.email)];
    if (body.user_data?.phone) user_data.ph = [await sha256(body.user_data.phone)];
    if (body.user_data?.fbp) user_data.fbp = body.user_data.fbp;
    if (body.user_data?.fbc) user_data.fbc = body.user_data.fbc;
    if (clientIp) user_data.client_ip_address = clientIp;
    if (userAgent) user_data.client_user_agent = userAgent;

    const event = {
      event_name: body.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      event_source_url: body.event_source_url,
      action_source: 'website',
      user_data,
      custom_data: body.custom_data || {},
    };

    const payload: Record<string, unknown> = { data: [event] };
    if (META_CAPI_TEST_EVENT_CODE) payload.test_event_code = META_CAPI_TEST_EVENT_CODE;

    const url = `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_ACCESS_TOKEN}`;
    const metaRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const metaJson = await metaRes.json();

    if (!metaRes.ok) {
      console.error('Meta CAPI error:', metaJson);
      return new Response(JSON.stringify({ error: 'Meta CAPI rejected', details: metaJson }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, meta: metaJson }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('meta-capi-event error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
