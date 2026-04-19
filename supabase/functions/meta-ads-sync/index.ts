// Sync giornaliero delle statistiche da Meta Marketing API verso meta_ads_stats.
// Invocabile via cron (POST con body { days?: number }) o manualmente.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const META_TOKEN = Deno.env.get('META_ADS_ACCESS_TOKEN')!;
const META_ACCOUNT_RAW = (Deno.env.get('META_ADS_ACCOUNT_ID') || '').trim();
const ACCOUNT_ID = META_ACCOUNT_RAW.startsWith('act_') ? META_ACCOUNT_RAW : `act_${META_ACCOUNT_RAW}`;

const API_VERSION = 'v21.0';

interface InsightRow {
  date_start: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  cpm?: string;
  cpc?: string;
  ctr?: string;
  actions?: Array<{ action_type: string; value: string }>;
  action_values?: Array<{ action_type: string; value: string }>;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function fetchInsights(since: string, until: string): Promise<InsightRow[]> {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${ACCOUNT_ID}/insights`);
  url.searchParams.set('access_token', META_TOKEN);
  url.searchParams.set('level', 'account');
  url.searchParams.set('time_increment', '1');
  url.searchParams.set('time_range', JSON.stringify({ since, until }));
  url.searchParams.set('fields', 'date_start,spend,impressions,clicks,cpm,cpc,ctr,actions,action_values');
  url.searchParams.set('limit', '500');

  const all: InsightRow[] = [];
  let next: string | null = url.toString();
  while (next) {
    const res = await fetch(next);
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Meta API error ${res.status}: ${txt}`);
    }
    const json = await res.json();
    if (Array.isArray(json.data)) all.push(...json.data);
    next = json.paging?.next ?? null;
  }
  return all;
}

function extractPurchases(row: InsightRow): { count: number; value: number } {
  const types = new Set(['purchase', 'omni_purchase', 'offsite_conversion.fb_pixel_purchase']);
  let count = 0, value = 0;
  for (const a of row.actions || []) if (types.has(a.action_type)) count += Number(a.value) || 0;
  for (const a of row.action_values || []) if (types.has(a.action_type)) value += Number(a.value) || 0;
  return { count, value };
}

async function upsertStats(rows: InsightRow[]) {
  if (!rows.length) return 0;
  const payload = rows.map((r) => {
    const { count, value } = extractPurchases(r);
    return {
      date: r.date_start,
      spend: Number(r.spend) || 0,
      impressions: Number(r.impressions) || 0,
      clicks: Number(r.clicks) || 0,
      cpm: Number(r.cpm) || 0,
      cpc: Number(r.cpc) || 0,
      ctr: Number(r.ctr) || 0,
      purchases: count,
      purchase_value: value,
      raw: r,
      synced_at: new Date().toISOString(),
    };
  });

  const res = await fetch(`${SUPABASE_URL}/rest/v1/meta_ads_stats?on_conflict=date`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upsert failed ${res.status}: ${txt}`);
  }
  return payload.length;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    if (!META_TOKEN || !META_ACCOUNT_RAW) {
      return new Response(JSON.stringify({ error: 'Missing META_ADS_ACCESS_TOKEN or META_ADS_ACCOUNT_ID' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let days = 7;
    try {
      const body = await req.json();
      if (typeof body?.days === 'number' && body.days > 0 && body.days <= 90) days = Math.floor(body.days);
    } catch { /* GET / no body */ }

    const until = new Date();
    const since = new Date(until.getTime() - (days - 1) * 86400000);
    const rows = await fetchInsights(ymd(since), ymd(until));
    const count = await upsertStats(rows);

    return new Response(JSON.stringify({ ok: true, days, rows: count, account: ACCOUNT_ID }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('meta-ads-sync error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
