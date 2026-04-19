// Shopify orders/paid webhook -> Meta CAPI Purchase event
// Verifies HMAC signature with SHOPIFY_WEBHOOK_SECRET

const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
const META_CAPI_ACCESS_TOKEN = Deno.env.get('META_CAPI_ACCESS_TOKEN');
const META_CAPI_TEST_EVENT_CODE = Deno.env.get('META_CAPI_TEST_EVENT_CODE');
const SHOPIFY_WEBHOOK_SECRET = Deno.env.get('SHOPIFY_WEBHOOK_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

async function logPurchaseToTracking(payload: Record<string, unknown>) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/tracking_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'resolution=ignore-duplicates',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('tracking_events log failed:', err);
  }
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyShopifyHmac(rawBody: string, hmacHeader: string | null): Promise<boolean> {
  if (!SHOPIFY_WEBHOOK_SECRET || !hmacHeader) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SHOPIFY_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  const computed = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return computed === hmacHeader;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!META_PIXEL_ID || !META_CAPI_ACCESS_TOKEN) {
    return new Response('Meta CAPI not configured', { status: 500 });
  }

  const rawBody = await req.text();
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256');

  if (SHOPIFY_WEBHOOK_SECRET) {
    const valid = await verifyShopifyHmac(rawBody, hmacHeader);
    if (!valid) {
      console.error('Invalid Shopify HMAC');
      return new Response('Unauthorized', { status: 401 });
    }
  } else {
    console.warn('SHOPIFY_WEBHOOK_SECRET not set - skipping HMAC verification');
  }

  try {
    const order = JSON.parse(rawBody);
    const orderId = String(order.id || order.order_id || '');
    const email = order.email || order.contact_email || order.customer?.email;
    const total = parseFloat(order.total_price || order.current_total_price || '0');
    const currency = order.currency || 'EUR';

    const user_data: Record<string, unknown> = {};
    if (email) user_data.em = [await sha256Hex(email)];
    if (order.customer?.phone) user_data.ph = [await sha256Hex(order.customer.phone)];
    if (order.client_details?.browser_ip) user_data.client_ip_address = order.client_details.browser_ip;
    if (order.client_details?.user_agent) user_data.client_user_agent = order.client_details.user_agent;

    const event = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      // Same event_id pattern used on ThankYou page so Meta deduplicates
      event_id: `purchase_${orderId}`,
      action_source: 'website',
      event_source_url: order.order_status_url,
      user_data,
      custom_data: {
        value: total,
        currency,
        content_name: order.line_items?.[0]?.title || 'Il Protocollo del Piacere',
        content_ids: order.line_items?.map((l: { product_id?: number | string }) => String(l.product_id)).filter(Boolean) || [],
        order_id: orderId,
      },
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
      // Still return 200 so Shopify doesn't retry forever on Meta-side issues
      return new Response(JSON.stringify({ ok: false, meta: metaJson }), { status: 200 });
    }

    // Log to tracking_events (webhook source = source of truth for Purchase)
    void logPurchaseToTracking({
      event_type: 'purchase',
      event_id: `purchase_${orderId}`,
      source: 'webhook',
      customer_email: email || null,
      order_id: orderId,
      product_name: order.line_items?.[0]?.title || 'Il Protocollo del Piacere',
      value: total,
      currency,
      page_path: order.order_status_url || null,
      user_agent: order.client_details?.user_agent || null,
      ip_address: order.client_details?.browser_ip || null,
      metadata: {
        line_items: order.line_items?.map((l: { title?: string; quantity?: number; price?: string }) => ({
          title: l.title, quantity: l.quantity, price: l.price,
        })),
        financial_status: order.financial_status,
        customer_name: [order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(' ') || null,
      },
    });

    console.log('Purchase tracked:', orderId, total, currency);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('shopify-purchase-webhook error:', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
