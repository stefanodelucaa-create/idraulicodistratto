import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { isAdminEmail } from "@/lib/adminConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from "recharts";
import { ArrowDown, ArrowUp, Download, LogOut, RefreshCw, Activity } from "lucide-react";

type Range = 1 | 7 | 30;

interface Kpis {
  counts: { view_content: number; add_to_cart: number; initiate_checkout: number; purchase: number };
  orders: number; revenue: number; aov: number;
  addToCartRate: number; checkoutRate: number; conversionRate: number;
  checkoutToOrder: number; cartAbandon: number;
}

interface AnalyticsResponse {
  ok: boolean;
  range: { days: number; since: string; now: string };
  kpis: { current: Kpis; previous: Kpis };
  timeseries: Array<{ date: string; revenue: number; view_content: number; add_to_cart: number; initiate_checkout: number; purchase: number }>;
  topProducts: Array<{ name: string; added: number; bought: number; revenue: number }>;
  feed: Array<{ id: string; event_type: string; source: string; customer_email: string | null; order_id: string | null; product_name: string | null; value: number | null; currency: string | null; created_at: string }>;
  orders: Array<{ id: string; order_id: string | null; customer_email: string | null; product_name: string | null; value: number | null; currency: string | null; created_at: string; metadata: Record<string, unknown> | null }>;
  lastEvent: string | null;
  totalEvents: number;
}

const fmtCurrency = (n: number, cur = "EUR") =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: cur }).format(n || 0);
const fmtPct = (n: number) => `${(n || 0).toFixed(1)}%`;
const fmtInt = (n: number) => new Intl.NumberFormat("it-IT").format(n || 0);

const trend = (cur: number, prev: number) => {
  if (!prev) return cur ? 100 : 0;
  return ((cur - prev) / prev) * 100;
};

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${positive ? "text-emerald-500" : "text-red-500"}`}>
      {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

function KpiCard({ icon, label, value, trendValue }: { icon: string; label: string; value: string; trendValue: number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl">{icon}</span>
          <TrendBadge value={trendValue} />
        </div>
        <div className="mt-2 text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}

function FunnelStep({ label, value, dropoff }: { label: string; value: number; dropoff?: number | null }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="rounded-lg border bg-card p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold mt-1">{fmtInt(value)}</div>
        {dropoff !== undefined && dropoff !== null && (
          <div className="text-xs mt-2">
            <span className={dropoff > 70 ? "text-red-500" : dropoff > 40 ? "text-yellow-500" : "text-emerald-500"}>
              {fmtPct(dropoff)} drop
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function eventBadge(type: string) {
  const map: Record<string, { label: string; cls: string }> = {
    view_content: { label: "View", cls: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    add_to_cart: { label: "Cart", cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
    initiate_checkout: { label: "Checkout", cls: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
    purchase: { label: "Purchase", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  };
  const m = map[type] || { label: type, cls: "" };
  return <Badge variant="outline" className={m.cls}>{m.label}</Badge>;
}

function downloadCSV(rows: Record<string, unknown>[], filename: string) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<Range>(7);
  const [search, setSearch] = useState("");

  const fetchData = async (days: Range) => {
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("analytics-data", {
        body: { days },
      });
      if (error) throw error;
      setData(res as AnalyticsResponse);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: s }) => {
      if (!s.session?.user?.email || !isAdminEmail(s.session.user.email)) {
        navigate("/admin/auth", { replace: true });
        return;
      }
      fetchData(range);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  // Realtime subscription on tracking_events
  useEffect(() => {
    const ch = supabase
      .channel("tracking-events-feed")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "tracking_events" }, () => {
        fetchData(range);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  };

  const cur = data?.kpis.current;
  const prev = data?.kpis.previous;

  const funnel = useMemo(() => {
    if (!cur) return null;
    const c = cur.counts;
    const stepDrop = (a: number, b: number) => (a ? ((a - b) / a) * 100 : 0);
    return [
      { label: "Visualizzazioni", value: c.view_content, dropoff: null as number | null },
      { label: "Add to Cart", value: c.add_to_cart, dropoff: stepDrop(c.view_content, c.add_to_cart) },
      { label: "Checkout", value: c.initiate_checkout, dropoff: stepDrop(c.add_to_cart, c.initiate_checkout) },
      { label: "Acquisti", value: cur.orders, dropoff: stepDrop(c.initiate_checkout, cur.orders) },
    ];
  }, [cur]);

  const liveStatus = useMemo(() => {
    if (!data?.lastEvent) return { live: false, label: "Nessun evento" };
    const ageMin = (Date.now() - new Date(data.lastEvent).getTime()) / 60000;
    return { live: ageMin < 60, label: ageMin < 1 ? "ora" : `${Math.floor(ageMin)}m fa` };
  }, [data?.lastEvent]);

  const filteredFeed = useMemo(() => {
    if (!data) return [];
    if (!search) return data.feed;
    const s = search.toLowerCase();
    return data.feed.filter((e) =>
      [e.customer_email, e.order_id, e.product_name, e.event_type].some((v) => v?.toLowerCase().includes(s))
    );
  }, [data, search]);

  const filteredOrders = useMemo(() => {
    if (!data) return [];
    if (!search) return data.orders;
    const s = search.toLowerCase();
    return data.orders.filter((o) =>
      [o.customer_email, o.order_id, o.product_name].some((v) => v?.toLowerCase().includes(s))
    );
  }, [data, search]);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">Analytics Dashboard</h1>
            <Badge variant="outline" className={liveStatus.live ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-muted text-muted-foreground"}>
              <Activity className={`h-3 w-3 mr-1 ${liveStatus.live ? "animate-pulse" : ""}`} />
              {liveStatus.live ? "Live" : "Idle"} · {liveStatus.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border bg-card">
              {([1, 7, 30] as Range[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 text-sm ${range === r ? "bg-primary text-primary-foreground" : "hover:bg-muted"} ${r === 1 ? "rounded-l-md" : ""} ${r === 30 ? "rounded-r-md" : ""}`}
                >
                  {r === 1 ? "Oggi" : `${r}g`}
                </button>
              ))}
            </div>
            <Button size="sm" variant="outline" onClick={() => fetchData(range)} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button size="sm" variant="ghost" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        {loading && !data ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
          </div>
        ) : cur && prev ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard icon="💰" label="Fatturato" value={fmtCurrency(cur.revenue)} trendValue={trend(cur.revenue, prev.revenue)} />
            <KpiCard icon="📦" label="Ordini" value={fmtInt(cur.orders)} trendValue={trend(cur.orders, prev.orders)} />
            <KpiCard icon="📊" label="AOV" value={fmtCurrency(cur.aov)} trendValue={trend(cur.aov, prev.aov)} />
            <KpiCard icon="🛒" label="Add-to-Cart Rate" value={fmtPct(cur.addToCartRate)} trendValue={trend(cur.addToCartRate, prev.addToCartRate)} />
            <KpiCard icon="🚀" label="Checkout Rate" value={fmtPct(cur.checkoutRate)} trendValue={trend(cur.checkoutRate, prev.checkoutRate)} />
            <KpiCard icon="✅" label="Conversion Rate" value={fmtPct(cur.conversionRate)} trendValue={trend(cur.conversionRate, prev.conversionRate)} />
            <KpiCard icon="🔁" label="Checkout→Order" value={fmtPct(cur.checkoutToOrder)} trendValue={trend(cur.checkoutToOrder, prev.checkoutToOrder)} />
            <KpiCard icon="💸" label="Cart Abandon" value={fmtPct(cur.cartAbandon)} trendValue={-trend(cur.cartAbandon, prev.cartAbandon)} />
          </div>
        ) : null}

        {/* Funnel */}
        {funnel && (
          <Card>
            <CardHeader><CardTitle className="text-base">Funnel di conversione</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 items-stretch">
                {funnel.map((s, i) => (
                  <div key={s.label} className="flex items-center flex-1 min-w-[140px]">
                    <FunnelStep label={s.label} value={s.value} dropoff={s.dropoff} />
                    {i < funnel.length - 1 && <span className="px-2 text-muted-foreground hidden md:inline">→</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Fatturato nel tempo</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data?.timeseries || []}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Volume eventi</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data?.timeseries || []}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="add_to_cart" stackId="a" fill="#eab308" />
                  <Bar dataKey="initiate_checkout" stackId="a" fill="#a855f7" />
                  <Bar dataKey="purchase" stackId="a" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top products */}
        <Card>
          <CardHeader><CardTitle className="text-base">Top prodotti</CardTitle></CardHeader>
          <CardContent>
            {data?.topProducts.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground border-b">
                    <tr><th className="text-left py-2">Prodotto</th><th className="text-right">Aggiunti</th><th className="text-right">Acquistati</th><th className="text-right">Fatturato</th></tr>
                  </thead>
                  <tbody>
                    {data.topProducts.map((p) => (
                      <tr key={p.name} className="border-b last:border-0">
                        <td className="py-2">{p.name}</td>
                        <td className="text-right">{fmtInt(p.added)}</td>
                        <td className="text-right">{fmtInt(p.bought)}</td>
                        <td className="text-right">{fmtCurrency(p.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="text-sm text-muted-foreground">Nessun dato.</p>}
          </CardContent>
        </Card>

        {/* Feed + Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Eventi recenti
                <Badge variant="outline">{data?.feed.length || 0}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-2">
                <div className="space-y-2">
                  {filteredFeed.map((e) => (
                    <div key={e.id} className="flex items-start gap-2 text-xs border-b pb-2 last:border-0">
                      {eventBadge(e.event_type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <span className="truncate font-medium">{e.product_name || "—"}</span>
                          {e.value != null && <span className="text-muted-foreground whitespace-nowrap">{fmtCurrency(Number(e.value), e.currency || "EUR")}</span>}
                        </div>
                        <div className="text-muted-foreground truncate">
                          {e.customer_email || e.source} · {new Date(e.created_at).toLocaleString("it-IT")}
                        </div>
                      </div>
                    </div>
                  ))}
                  {!filteredFeed.length && <p className="text-sm text-muted-foreground text-center py-8">Nessun evento.</p>}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dettagli</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Cerca email, ordine, prodotto..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-3" />
              <Tabs defaultValue="orders">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="orders">Ordini ({data?.orders.length || 0})</TabsTrigger>
                  <TabsTrigger value="events">Tutti gli eventi ({data?.feed.length || 0})</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                  <div className="flex justify-end mb-2">
                    <Button size="sm" variant="outline" onClick={() => downloadCSV(filteredOrders, `orders-${range}d.csv`)}>
                      <Download className="h-3 w-3 mr-1" />CSV
                    </Button>
                  </div>
                  <ScrollArea className="h-[330px]">
                    <table className="w-full text-xs">
                      <thead className="text-muted-foreground border-b sticky top-0 bg-card">
                        <tr><th className="text-left py-1.5">Data</th><th className="text-left">Email</th><th className="text-right">Valore</th></tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((o) => (
                          <tr key={o.id} className="border-b last:border-0">
                            <td className="py-1.5">{new Date(o.created_at).toLocaleDateString("it-IT")}</td>
                            <td className="truncate max-w-[160px]">{o.customer_email || "—"}</td>
                            <td className="text-right">{fmtCurrency(Number(o.value || 0), o.currency || "EUR")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!filteredOrders.length && <p className="text-sm text-muted-foreground text-center py-8">Nessun ordine.</p>}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="events">
                  <div className="flex justify-end mb-2">
                    <Button size="sm" variant="outline" onClick={() => downloadCSV(filteredFeed, `events-${range}d.csv`)}>
                      <Download className="h-3 w-3 mr-1" />CSV
                    </Button>
                  </div>
                  <ScrollArea className="h-[330px]">
                    <table className="w-full text-xs">
                      <thead className="text-muted-foreground border-b sticky top-0 bg-card">
                        <tr><th className="text-left py-1.5">Tipo</th><th className="text-left">Quando</th><th className="text-left">Email</th></tr>
                      </thead>
                      <tbody>
                        {filteredFeed.map((e) => (
                          <tr key={e.id} className="border-b last:border-0">
                            <td className="py-1.5">{eventBadge(e.event_type)}</td>
                            <td className="text-muted-foreground">{new Date(e.created_at).toLocaleString("it-IT")}</td>
                            <td className="truncate max-w-[160px]">{e.customer_email || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
