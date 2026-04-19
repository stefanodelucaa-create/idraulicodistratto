// Admin-only endpoint to delete a single tracking_events row.
// Used by the analytics dashboard to remove test/erroneous orders.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

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

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
    const id = String(body?.id || '').trim();
    if (!UUID_RE.test(id)) {
      return new Response(JSON.stringify({ error: 'Invalid id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/tracking_events?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=representation',
      },
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`delete failed: ${res.status} ${txt}`);
    }
    const deleted = await res.json() as unknown[];

    return new Response(JSON.stringify({ ok: true, deleted: deleted.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('analytics-delete-event error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
