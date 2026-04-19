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

    const fetchAdsTimezone = async () => {
      const url = `${SUPABASE_URL}/rest/v1/meta_ads_stats?select=account_timezone_name,account_timezone_offset_hours_utc&account_timezone_offset_hours_utc=not.is.null&order=date.desc&limit=1`;
      const res = await fetch(url, {
        headers: { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` },
      });
      if (!res.ok) return { timezone_name: null, timezone_offset_hours_utc: 0 };
      const rows = await res.json() as Array<Record<string, number | string | null>>;
      return {
        timezone_name: rows[0]?.account_timezone_name ? String(rows[0].account_timezone_name) : null,
        timezone_offset_hours_utc: Number(rows[0]?.account_timezone_offset_hours_utc) || 0,
      };
    };
    const { timezone_name, timezone_offset_hours_utc } = await fetchAdsTimezone();

    // Resolve range:
    //  - explicit { from, to } ISO strings (custom range)
    //  - or { days } shortcut (1, 7, 30, ...)
    //  - or { preset: 'today' | 'yesterday' } using Meta account timezone
    let fromDate: Date;
    let toDate: Date;
    let days: number;

    const startOfDayInOffset = (base: Date, offsetHours: number) => {
      const shifted = new Date(base.getTime() + offsetHours * 60 * 60 * 1000);
      return new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()) - offsetHours * 60 * 60 * 1000);
    };

    if (body.preset === 'today') {
      const startToday = startOfDayInOffset(new Date(), timezone_offset_hours_utc);
      fromDate = startToday;
      toDate = new Date();
      days = 1;
    } else if (body.preset === 'yesterday') {
      const startToday = startOfDayInOffset(new Date(), timezone_offset_hours_utc);
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
      const counts = { view_content: 0, add_to_cart: 0, initiate_checkout: 0, purchase: 0, session_start: 0, page_view: 0 };
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
      const sessions = counts.session_start;
      const clamp = (n: number) => Math.min(Math.max(n, 0), 100);
      const addToCartRate = clamp(counts.view_content ? (counts.add_to_cart / counts.view_content) * 100 : 0);
      // Checkout Rate uses view_content as denominator (more stable than add_to_cart, which can be skipped or under-tracked)
      const checkoutRate = clamp(counts.view_content ? (counts.initiate_checkout / counts.view_content) * 100 : 0);
      const conversionRate = clamp(counts.initiate_checkout ? (orders / counts.initiate_checkout) * 100 : 0);
      const checkoutToOrder = clamp(counts.initiate_checkout ? (orders / counts.initiate_checkout) * 100 : 0);
      const cartAbandon = clamp(counts.add_to_cart ? ((counts.add_to_cart - orders) / counts.add_to_cart) * 100 : 0);
      const sessionConversion = clamp(sessions ? (orders / sessions) * 100 : 0);
      return {
        counts, orders, revenue, aov, sessions,
        addToCartRate, checkoutRate, conversionRate, checkoutToOrder, cartAbandon, sessionConversion,
      };
    };

    const cur = summarize(current);
    const prev = summarize(previous);

    // ===== Meta Ads stats (current + previous range) =====
    const fetchAdsBetween = async (fromDay: string, toDay: string) => {
      const url = `${SUPABASE_URL}/rest/v1/meta_ads_stats?date=gte.${fromDay}&date=lte.${toDay}&order=date.asc`;
      const res = await fetch(url, {
        headers: { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` },
      });
      if (!res.ok) return [] as Array<Record<string, number | string | null>>;
      return (await res.json()) as Array<Record<string, number | string | null>>;
    };
    const ymdInOffset = (d: Date, offsetHours: number) => {
      const shifted = new Date(d.getTime() + offsetHours * 60 * 60 * 1000);
      return shifted.toISOString().slice(0, 10);
    };
    const adsCurrent = await fetchAdsBetween(
      ymdInOffset(fromDate, timezone_offset_hours_utc),
      ymdInOffset(new Date(toDate.getTime() - 1), timezone_offset_hours_utc),
    );
    const adsPrevious = await fetchAdsBetween(
      ymdInOffset(prevFrom, timezone_offset_hours_utc),
      ymdInOffset(new Date(fromDate.getTime() - 1), timezone_offset_hours_utc),
    );
    const sumAds = (rows: typeof adsCurrent) => {
      const t = {
        spend: 0,
        impressions: 0,
        clicks: 0,
        link_clicks: 0,
        purchases: 0,
        purchase_value: 0,
        timezone_name: null as string | null,
        timezone_offset_hours_utc: null as number | null,
      };
      for (const r of rows) {
        t.spend += Number(r.spend) || 0;
        t.impressions += Number(r.impressions) || 0;
        t.clicks += Number(r.clicks) || 0;
        t.link_clicks += Number(r.link_clicks) || 0;
        t.purchases += Number(r.purchases) || 0;
        t.purchase_value += Number(r.purchase_value) || 0;
        t.timezone_name ||= r.account_timezone_name ? String(r.account_timezone_name) : null;
        t.timezone_offset_hours_utc ??= r.account_timezone_offset_hours_utc !== null && r.account_timezone_offset_hours_utc !== undefined
          ? Number(r.account_timezone_offset_hours_utc)
          : null;
      }
      const cpm = t.impressions ? (t.spend / t.impressions) * 1000 : 0;
      const cpc = t.link_clicks ? t.spend / t.link_clicks : 0;
      const ctr = t.impressions ? (t.link_clicks / t.impressions) * 100 : 0;
      return { ...t, cpm, cpc, ctr };
    };
    const adsCur = sumAds(adsCurrent);
    const adsPrev = sumAds(adsPrevious);
    const roasCur = adsCur.spend > 0 ? cur.revenue / adsCur.spend : 0;
    const roasPrev = adsPrev.spend > 0 ? prev.revenue / adsPrev.spend : 0;
    const cpaCur = adsCur.spend > 0 && cur.orders > 0 ? adsCur.spend / cur.orders : 0;
    const cpaPrev = adsPrev.spend > 0 && prev.orders > 0 ? adsPrev.spend / prev.orders : 0;
    const adsTimeseries = adsCurrent.map((r) => ({
      date: String(r.date),
      spend: Number(r.spend) || 0,
      impressions: Number(r.impressions) || 0,
      clicks: Number(r.link_clicks) || 0,
    }));

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
      ads: {
        current: { ...adsCur, roas: roasCur, cpa: cpaCur, timezone_name, timezone_offset_hours_utc },
        previous: { ...adsPrev, roas: roasPrev, cpa: cpaPrev, timezone_name, timezone_offset_hours_utc },
        timeseries: adsTimeseries,
      },
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
