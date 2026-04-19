// Analytics dashboard data endpoint
// Returns aggregated tracking_events data. Auth-gated by email whitelist.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

// Hardcoded admin whitelist
const ADMIN_EMAILS = new Set([
  'idraulicodistratto@gmail.com',
]);

async function getUserFromAuth(authHeader: string | null): Promise<{ email: string } | null> {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.email ? { email: data.email } : null;
}

async function fetchEventsBetween(fromIso: string, toIso: string) {
  // Paginate to bypass the default 1000-row Supabase limit
  const all: Array<Record<string, unknown>> = [];
  const pageSize = 1000;
  let offset = 0;
  while (true) {
    const url = `${SUPABASE_URL}/rest/v1/tracking_events?created_at=gte.${encodeURIComponent(fromIso)}&created_at=lt.${encodeURIComponent(toIso)}&order=created_at.desc&limit=${pageSize}&offset=${offset}`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });
    if (!res.ok) throw new Error(`fetch events failed: ${res.status}`);
    const batch = await res.json() as Array<Record<string, unknown>>;
    all.push(...batch);
    if (batch.length < pageSize) break;
    offset += pageSize;
    if (offset > 50000) break; // hard safety cap
  }
  return all;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const user = await getUserFromAuth(req.headers.get('Authorization'));
    if (!user || !ADMIN_EMAILS.has(user.email.toLowerCase())) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));

    // Resolve range:
    //  - explicit { from, to } ISO strings (custom range)
    //  - or { days } shortcut (1, 7, 30, ...)
    //  - or { preset: 'yesterday' }
    let fromDate: Date;
    let toDate: Date;
    let days: number;

    if (body.preset === 'yesterday') {
      const now = new Date();
      const startToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      toDate = startToday;
      fromDate = new Date(startToday.getTime() - 24 * 60 * 60 * 1000);
      days = 1;
    } else if (body.from && body.to) {
      fromDate = new Date(String(body.from));
      toDate = new Date(String(body.to));
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime()) || toDate <= fromDate) {
        return new Response(JSON.stringify({ error: 'Invalid date range' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      days = Math.max(1, Math.round((toDate.getTime() - fromDate.getTime()) / (24 * 60 * 60 * 1000)));
    } else {
      days = Math.min(Math.max(Number(body.days) || 7, 1), 365);
      toDate = new Date();
      fromDate = new Date(toDate.getTime() - days * 24 * 60 * 60 * 1000);
    }

    const spanMs = toDate.getTime() - fromDate.getTime();
    const prevFrom = new Date(fromDate.getTime() - spanMs);

    const since = fromDate.toISOString();
    const until = toDate.toISOString();
    const prevSince = prevFrom.toISOString();

    const [current, previous] = await Promise.all([
      fetchEventsBetween(since, until),
      fetchEventsBetween(prevSince, since),
    ]);

    const summarize = (events: typeof current) => {
      const counts = { view_content: 0, add_to_cart: 0, initiate_checkout: 0, purchase: 0 };
      let revenue = 0;
      const purchases: typeof events = [];
      for (const e of events) {
        const t = e.event_type as keyof typeof counts;
        if (t in counts) counts[t]++;
        if (t === 'purchase' && e.source === 'webhook') {
          revenue += Number(e.value) || 0;
          purchases.push(e);
        }
      }
      const orders = purchases.length;
      const aov = orders ? revenue / orders : 0;
      const addToCartRate = counts.view_content ? (counts.add_to_cart / counts.view_content) * 100 : 0;
      const checkoutRate = counts.add_to_cart ? (counts.initiate_checkout / counts.add_to_cart) * 100 : 0;
      const conversionRate = counts.initiate_checkout ? (orders / counts.initiate_checkout) * 100 : 0;
      const checkoutToOrder = counts.initiate_checkout ? (orders / counts.initiate_checkout) * 100 : 0;
      const cartAbandon = counts.add_to_cart ? ((counts.add_to_cart - orders) / counts.add_to_cart) * 100 : 0;
      return {
        counts, orders, revenue, aov,
        addToCartRate, checkoutRate, conversionRate, checkoutToOrder, cartAbandon,
      };
    };

    const cur = summarize(current);
    const prev = summarize(previous);

    // Time series buckets (hourly if span<=2 days, else daily)
    const hourly = days <= 2;
    const buckets = new Map<string, { date: string; revenue: number; view_content: number; add_to_cart: number; initiate_checkout: number; purchase: number }>();
    for (const e of current) {
      const d = new Date(e.created_at as string);
      const key = hourly
        ? `${d.toISOString().slice(0, 13)}:00`
        : d.toISOString().slice(0, 10);
      let b = buckets.get(key);
      if (!b) { b = { date: key, revenue: 0, view_content: 0, add_to_cart: 0, initiate_checkout: 0, purchase: 0 }; buckets.set(key, b); }
      const t = e.event_type as 'view_content' | 'add_to_cart' | 'initiate_checkout' | 'purchase';
      if (t in b) (b as Record<string, number | string>)[t] = (b[t] as number) + 1;
      if (t === 'purchase' && e.source === 'webhook') b.revenue += Number(e.value) || 0;
    }
    const timeseries = Array.from(buckets.values()).sort((a, b) => a.date.localeCompare(b.date));

    // Top products
    const productCounts = new Map<string, { added: number; bought: number; revenue: number }>();
    for (const e of current) {
      const name = (e.product_name as string) || 'Unknown';
      let p = productCounts.get(name);
      if (!p) { p = { added: 0, bought: 0, revenue: 0 }; productCounts.set(name, p); }
      if (e.event_type === 'add_to_cart') p.added++;
      if (e.event_type === 'purchase' && e.source === 'webhook') {
        p.bought++;
        p.revenue += Number(e.value) || 0;
      }
    }
    const topProducts = Array.from(productCounts.entries())
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.bought - a.bought || b.added - a.added)
      .slice(0, 10);

    // Recent feed (last 50)
    const feed = current.slice(0, 50).map((e) => ({
      id: e.id, event_type: e.event_type, source: e.source,
      customer_email: e.customer_email, order_id: e.order_id,
      product_name: e.product_name, value: e.value, currency: e.currency,
      created_at: e.created_at,
    }));

    // Orders table (purchases from webhook only)
    const orders = current
      .filter((e) => e.event_type === 'purchase' && e.source === 'webhook')
      .map((e) => ({
        id: e.id, order_id: e.order_id, customer_email: e.customer_email,
        product_name: e.product_name, value: e.value, currency: e.currency,
        created_at: e.created_at, metadata: e.metadata,
      }));

    const lastEvent = current[0]?.created_at || null;

    return new Response(JSON.stringify({
      ok: true,
      range: { days, since, until, now: new Date().toISOString() },
      kpis: { current: cur, previous: prev },
      timeseries,
      topProducts,
      feed,
      orders,
      lastEvent,
      totalEvents: current.length,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('analytics-data error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
