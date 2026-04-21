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
  inline_link_clicks?: string;
  inline_link_click_ctr?: string;
  cost_per_inline_link_click?: string;
  actions?: Array<{ action_type: string; value: string }>;
  action_values?: Array<{ action_type: string; value: string }>;
}

interface AccountInfo {
  timezone_name?: string;
  timezone_offset_hours_utc?: number;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function fetchAccountInfo(): Promise<AccountInfo> {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${ACCOUNT_ID}`);
  url.searchParams.set('access_token', META_TOKEN);
  url.searchParams.set('fields', 'timezone_name,timezone_offset_hours_utc');

  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Meta account fetch error ${res.status}: ${txt}`);
  }

  return await res.json() as AccountInfo;
}

async function fetchInsights(since: string, until: string): Promise<InsightRow[]> {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${ACCOUNT_ID}/insights`);
  url.searchParams.set('access_token', META_TOKEN);
  url.searchParams.set('level', 'account');
  url.searchParams.set('time_increment', '1');
  url.searchParams.set('action_report_time', 'conversion');
  url.searchParams.set('time_range', JSON.stringify({ since, until }));
  url.searchParams.set('fields', 'date_start,spend,impressions,clicks,cpm,cpc,ctr,inline_link_clicks,inline_link_click_ctr,cost_per_inline_link_click,actions,action_values');
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

async function upsertStats(rows: InsightRow[], accountInfo: AccountInfo) {
  if (!rows.length) return 0;
  const payload = rows.map((r) => {
    const { count, value } = extractPurchases(r);
    return {
      date: r.date_start,
      spend: Number(r.spend) || 0,
      impressions: Number(r.impressions) || 0,
      clicks: Number(r.clicks) || 0,
      link_clicks: Number(r.inline_link_clicks) || 0,
      cpm: Number(r.cpm) || 0,
      cpc: Number(r.cpc) || 0,
      link_cpc: Number(r.cost_per_inline_link_click) || 0,
      ctr: Number(r.ctr) || 0,
      link_ctr: Number(r.inline_link_click_ctr) || 0,
      purchases: count,
      purchase_value: value,
      account_timezone_name: accountInfo.timezone_name || null,
      account_timezone_offset_hours_utc: typeof accountInfo.timezone_offset_hours_utc === 'number' ? accountInfo.timezone_offset_hours_utc : null,
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

async function diagnose() {
  const out: Record<string, unknown> = { configured_account_id: ACCOUNT_ID };
  // 1) /me
  try {
    const meRes = await fetch(`https://graph.facebook.com/${API_VERSION}/me?access_token=${META_TOKEN}&fields=id,name`);
    out.me = { status: meRes.status, body: await meRes.json() };
  } catch (e) { out.me = { error: String(e) }; }
  // 2) /me/adaccounts (lista account visibili)
  try {
    const aaRes = await fetch(`https://graph.facebook.com/${API_VERSION}/me/adaccounts?access_token=${META_TOKEN}&fields=id,account_id,name,account_status,business&limit=100`);
    out.adaccounts = { status: aaRes.status, body: await aaRes.json() };
  } catch (e) { out.adaccounts = { error: String(e) }; }
  // 3) chiamata diretta all'account configurato
  try {
    const accRes = await fetch(`https://graph.facebook.com/${API_VERSION}/${ACCOUNT_ID}?access_token=${META_TOKEN}&fields=id,name,account_status,business,timezone_name`);
    out.target_account = { status: accRes.status, body: await accRes.json() };
  } catch (e) { out.target_account = { error: String(e) }; }
  return out;
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
    let diagnoseMode = false;
    try {
      const body = await req.json();
      if (typeof body?.days === 'number' && body.days > 0 && body.days <= 90) days = Math.floor(body.days);
      if (body?.diagnose === true) diagnoseMode = true;
    } catch { /* GET / no body */ }

    if (diagnoseMode) {
      const result = await diagnose();
      return new Response(JSON.stringify(result, null, 2), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const until = new Date();
    const since = new Date(until.getTime() - (days - 1) * 86400000);
    const accountInfo = await fetchAccountInfo();
    const rows = await fetchInsights(ymd(since), ymd(until));
    const count = await upsertStats(rows, accountInfo);

    return new Response(JSON.stringify({ ok: true, days, rows: count, account: ACCOUNT_ID, timezone: accountInfo.timezone_name || null }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('meta-ads-sync error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
