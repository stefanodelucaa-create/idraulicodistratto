// Public endpoint for internal-only tracking events (session_start, page_view, scroll_depth).
// Not forwarded to Meta — written directly to tracking_events.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const ALLOWED = new Set(['session_start', 'page_view', 'scroll_depth']);

interface Body {
  event_type: string;
  session_id?: string;
  page_path?: string;
  event_source_url?: string;
  metadata?: Record<string, unknown>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const body = (await req.json()) as Body;
    if (!ALLOWED.has(body?.event_type)) {
      return new Response(JSON.stringify({ error: 'invalid event_type' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
      || req.headers.get('cf-connecting-ip') || null;
    const ua = req.headers.get('user-agent') || null;

    const payload = {
      event_type: body.event_type,
      source: 'browser',
      session_id: body.session_id || null,
      page_path: body.page_path || null,
      ip_address: ip,
      user_agent: ua,
      metadata: body.metadata || {},
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/tracking_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.warn('insert failed:', txt);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('track-internal-event error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
