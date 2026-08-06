import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { isAdminEmail } from "@/lib/adminConfig";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from "recharts";
import { ArrowDown, ArrowUp, Download, LogOut, RefreshCw, Activity, CalendarIcon, Trash2, Zap, HelpCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type Preset = "today" | "yesterday" | "7d" | "30d" | "90d" | "custom";

interface Filter {
  preset: Preset;
  from?: Date;
  to?: Date;
}

interface Kpis {
  counts: { view_content: number; add_to_cart: number; initiate_checkout: number; purchase: number };
  orders: number; revenue: number; aov: number;
  addToCartRate: number; checkoutRate: number; conversionRate: number;
  checkoutToOrder: number; cartAbandon: number;
  advertorialViews?: number; advertorialToLanding?: number; advertorialCtr?: number;
  websiteVisits?: number;
}

interface AdsKpis {
  spend: number; impressions: number; clicks: number; link_clicks: number;
  purchases: number; purchase_value: number;
  cpm: number; cpc: number; ctr: number;
  roas: number; cpa: number;
  timezone_name?: string | null;
  timezone_offset_hours_utc?: number | null;
}

interface AnalyticsResponse {
  ok: boolean;
  range: { days: number; since: string; now: string };
  kpis: { current: Kpis; previous: Kpis };
  ads?: {
    current: AdsKpis;
    previous: AdsKpis;
    timeseries: Array<{ date: string; spend: number; impressions: number; clicks: number }>;
  };
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
    <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${positive ? "text-green-400" : "text-red-400"}`}>
      {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

function KpiCard({ icon, label, value, trendValue }: { icon: string; label: string; value: string; trendValue: number }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 hover:border-red-600/50 rounded-xl p-4 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <TrendBadge value={trendValue} />
      </div>
      <div className="mt-2 text-2xl font-black text-white">{value}</div>
      <div className="text-xs text-white/70 mt-1 font-medium">{label}</div>
    </div>
  );
}

function FunnelStep({ label, value, conversion }: { label: string; value: number; conversion?: number | null }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-4 text-center">
        <div className="text-xs uppercase tracking-wider text-white/60 font-bold">{label}</div>
        <div className="text-2xl font-black mt-1 text-white">{fmtInt(value)}</div>
        {conversion !== undefined && conversion !== null && (
          <div className="text-xs mt-2 font-bold">
            <span className={conversion < 30 ? "text-red-500" : conversion < 60 ? "text-yellow-400" : "text-green-400"}>
              {fmtPct(conversion)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}


function eventBadge(type: string) {
  const map: Record<string, { label: string; cls: string }> = {
    view_content: { label: "View", cls: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
    add_to_cart: { label: "Cart", cls: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" },
    initiate_checkout: { label: "Checkout", cls: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
    purchase: { label: "Purchase", cls: "bg-red-600 text-white border-red-600" },
  };
  const m = map[type] || { label: type, cls: "bg-gray-800 text-gray-300 border-gray-700" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${m.cls}`}>{m.label}</span>;
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

const SectionCard = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 sm:p-5">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-black text-white">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

export default function AdminAnalytics() {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>({ preset: "7d" });
  const [search, setSearch] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerRange, setPickerRange] = useState<{ from?: Date; to?: Date }>({});
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSyncMetaAds = useCallback(async () => {
    setSyncing(true);
    setSyncError(null);
    const t = toast.loading("Sync Meta Ads in corso…");
    try {
      const { data: res, error } = await supabase.functions.invoke("meta-ads-sync", {
        body: { days: 2 },
      });
      if (error) {
        // Try to surface the underlying Meta error message
        let detail = error.message || "Errore sconosciuto";
        try {
          const ctx = (error as { context?: { body?: string } }).context;
          if (ctx?.body) {
            const parsed = JSON.parse(ctx.body);
            if (parsed?.error) detail = String(parsed.error);
          }
        } catch { /* noop */ }
        throw new Error(detail);
      }
      const upserted = (res as { upserted?: number })?.upserted ?? 0;
      toast.success(`Meta Ads sincronizzato (${upserted} righe)`, { id: t });
      await fetchData(filter);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(err);
      setSyncError(msg);
      // If it looks like an auth/permission error, open the checklist
      if (/access blocked|OAuthException|permission|token|forbidden|401|403|400/i.test(msg)) {
        setChecklistOpen(true);
      }
      toast.error("Sync Meta Ads fallito", { id: t, description: msg });
    } finally {
      setSyncing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const toggleCheck = (key: string) =>
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));

  const buildBody = useCallback((f: Filter): Record<string, unknown> => {
    if (f.preset === "today") return { preset: "today" };
    if (f.preset === "yesterday") return { preset: "yesterday" };
    if (f.preset === "7d") return { days: 7 };
    if (f.preset === "30d") return { days: 30 };
    if (f.preset === "90d") return { days: 90 };
    if (f.preset === "custom" && f.from && f.to) {
      // include the full "to" day
      const toEnd = new Date(f.to);
      toEnd.setHours(23, 59, 59, 999);
      return { from: f.from.toISOString(), to: toEnd.toISOString() };
    }
    return { days: 7 };
  }, []);

  const fetchData = useCallback(async (f: Filter) => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      const email = session?.user?.email;

      if (!session?.access_token || !email || !isAdminEmail(email)) {
        setIsAuthorized(false);
        setData(null);
        navigate("/admin/auth", { replace: true });
        return;
      }

      setIsAuthorized(true);
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify(buildBody(f)),
      });

      if (response.status === 401 || response.status === 403) {
        setIsAuthorized(false);
        setData(null);
        navigate("/admin/auth", { replace: true });
        return;
      }

      if (!response.ok) throw new Error(`analytics-data failed: ${response.status}`);
      setData(await response.json() as AnalyticsResponse);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore caricamento analytics");
    } finally {
      setLoading(false);
    }
  }, [buildBody, navigate]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: s }) => {
      if (!s.session?.user?.email || !isAdminEmail(s.session.user.email)) {
        setIsAuthorized(false);
        navigate("/admin/auth", { replace: true });
        return;
      }
      setIsAuthorized(true);
      fetchData(filter);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthorized && (filter.preset !== "custom" || (filter.from && filter.to))) {
      fetchData(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, isAuthorized]);

  useEffect(() => {
    const ch = supabase
      .channel("tracking-events-feed")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "tracking_events" }, () => {
        fetchData(filter);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  };

  const handleDeleteOrder = async (id: string, label: string) => {
    if (!window.confirm(`Eliminare definitivamente l'ordine "${label}"? Questa azione non può essere annullata.`)) return;
    try {
      const { data: res, error } = await supabase.functions.invoke("analytics-delete-event", {
        body: { id },
      });
      if (error) throw error;
      if ((res as { ok?: boolean })?.ok) {
        toast.success("Ordine eliminato");
        // Optimistic update + refetch
        setData((d) => d ? {
          ...d,
          orders: d.orders.filter((o) => o.id !== id),
          feed: d.feed.filter((e) => e.id !== id),
        } : d);
        fetchData(filter);
      } else {
        toast.error("Eliminazione fallita");
      }
    } catch (err) {
      console.error(err);
      toast.error("Errore durante l'eliminazione");
    }
  };

  const cur = data?.kpis.current;
  const prev = data?.kpis.previous;
  const adsCur = data?.ads?.current;
  const adsPrev = data?.ads?.previous;

  const funnel = useMemo(() => {
    if (!cur) return null;
    const c = cur.counts;
    const visits = Number(cur.websiteVisits) || 0;
    const stepConv = (a: number, b: number) => (a ? (b / a) * 100 : 0);
    return [
      { label: "Visite Sito", value: visits, conversion: null as number | null },
      { label: "Add to Cart", value: c.add_to_cart, conversion: stepConv(visits, c.add_to_cart) },
      { label: "Checkout", value: c.initiate_checkout, conversion: stepConv(c.add_to_cart, c.initiate_checkout) },
      { label: "Acquisti", value: cur.orders, conversion: stepConv(c.initiate_checkout, cur.orders) },
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

  const tooltipStyle = { background: "#0a0a0a", border: "1px solid #dc2626", borderRadius: "8px", color: "#fff" };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-red-600/30 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-xl font-black text-white">
              ANALYTICS <span className="text-red-500">DASHBOARD</span>
            </h1>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${liveStatus.live ? "bg-red-600 text-white border-red-600" : "bg-gray-900 text-gray-400 border-gray-800"}`}>
              <Activity className={`h-3 w-3 ${liveStatus.live ? "animate-pulse" : ""}`} />
              {liveStatus.live ? "LIVE" : "IDLE"} · {liveStatus.label}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex rounded-lg border border-gray-800 bg-gray-900/80 overflow-hidden">
              {([
                { key: "today" as Preset, label: "Oggi" },
                { key: "yesterday" as Preset, label: "Ieri" },
                { key: "7d" as Preset, label: "7g" },
                { key: "30d" as Preset, label: "30g" },
                { key: "90d" as Preset, label: "90g" },
              ]).map((p) => (
                <button
                  key={p.key}
                  onClick={() => setFilter({ preset: p.key })}
                  className={cn(
                    "px-3 py-1.5 text-sm font-bold transition-colors",
                    filter.preset === p.key
                      ? "bg-red-600 text-white"
                      : "text-white/70 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  className={cn(
                    "border text-white h-9 gap-2",
                    filter.preset === "custom"
                      ? "bg-red-600 hover:bg-red-700 border-red-600"
                      : "bg-gray-900 hover:bg-gray-800 border-gray-800"
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {filter.preset === "custom" && filter.from && filter.to
                    ? `${format(filter.from, "d MMM", { locale: it })} – ${format(filter.to, "d MMM", { locale: it })}`
                    : "Personalizzato"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="end">
                <Calendar
                  mode="range"
                  selected={pickerRange as { from: Date; to?: Date }}
                  onSelect={(r) => {
                    setPickerRange(r || {});
                    if (r?.from && r?.to) {
                      setFilter({ preset: "custom", from: r.from, to: r.to });
                      setPickerOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                  locale={it}
                  className={cn("p-3 pointer-events-auto bg-gray-900 text-white")}
                />
              </PopoverContent>
            </Popover>
            <Button
              size="sm"
              onClick={handleSyncMetaAds}
              disabled={syncing}
              className="bg-red-600 hover:bg-red-500 text-white h-9 gap-1.5 font-bold"
              title="Sincronizza Meta Ads in tempo reale"
            >
              <Zap className={`h-4 w-4 ${syncing ? "animate-pulse" : ""}`} />
              <span className="hidden sm:inline">{syncing ? "Sync…" : "Sync Ads"}</span>
            </Button>
            <Button
              size="sm"
              onClick={() => fetchData(filter)}
              disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white h-9"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              size="sm"
              onClick={logout}
              className="bg-gray-900 hover:bg-red-600 border border-gray-800 text-white"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Sync error banner with checklist trigger */}
        {syncError && (
          <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-red-200">Sync Meta Ads fallito</p>
              <p className="text-xs text-red-300/80 mt-1 break-all">{syncError}</p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 h-8 bg-transparent border-red-700 text-red-100 hover:bg-red-900/40"
                onClick={() => setChecklistOpen(true)}
              >
                <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
                Apri checklist diagnostica
              </Button>
            </div>
            <button
              onClick={() => setSyncError(null)}
              className="text-red-300/60 hover:text-red-200 text-xs"
              aria-label="Chiudi"
            >
              ✕
            </button>
          </div>
        )}

        {/* KPI Cards */}
        {loading && !data ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28 bg-gray-900" />)}
          </div>
        ) : cur && prev ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Funnel order: Adv → Landing → Cart → Checkout → Order → Revenue */}
            <KpiCard icon="➡️" label="Adv→Landing" value={fmtPct(cur.advertorialCtr ?? 0)} trendValue={trend(cur.advertorialCtr ?? 0, prev.advertorialCtr ?? 0)} />
            <KpiCard icon="🛒" label="Add-to-Cart Rate" value={fmtPct(cur.addToCartRate)} trendValue={trend(cur.addToCartRate, prev.addToCartRate)} />
            <KpiCard icon="🚀" label="Checkout Rate" value={fmtPct(cur.checkoutRate)} trendValue={trend(cur.checkoutRate, prev.checkoutRate)} />
            <KpiCard icon="🔁" label="Checkout→Order" value={fmtPct(cur.checkoutToOrder)} trendValue={trend(cur.checkoutToOrder, prev.checkoutToOrder)} />
            <KpiCard icon="✅" label="Conversion Rate" value={fmtPct(cur.conversionRate)} trendValue={trend(cur.conversionRate, prev.conversionRate)} />
            <KpiCard icon="📦" label="Ordini" value={fmtInt(cur.orders)} trendValue={trend(cur.orders, prev.orders)} />
            <KpiCard icon="💰" label="Fatturato" value={fmtCurrency(cur.revenue)} trendValue={trend(cur.revenue, prev.revenue)} />
            <KpiCard icon="📊" label="AOV" value={fmtCurrency(cur.aov)} trendValue={trend(cur.aov, prev.aov)} />
          </div>
        ) : null}

        {/* Funnel */}
        {funnel && (
          <SectionCard title="Funnel di Conversione">
            <div className="flex flex-wrap gap-2 items-stretch">
              {funnel.map((s, i) => (
                <div key={s.label} className="flex items-center flex-1 min-w-[140px]">
                  <FunnelStep label={s.label} value={s.value} conversion={s.conversion} />
                  {i < funnel.length - 1 && <span className="px-2 text-red-500 font-bold hidden md:inline">→</span>}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Meta Ads */}
        {adsCur && (
          <SectionCard title="Meta Ads · Performance">
            <div className="mb-3 text-xs font-medium text-white/70">
              Metriche allineate alle colonne account Meta: <span className="text-white">Spesa, Link Click, Link CTR, Link CPC</span>
              {adsCur.timezone_name ? <> · Fuso account: <span className="text-white">{adsCur.timezone_name}</span></> : null}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <KpiCard icon="💸" label="Spesa" value={fmtCurrency(adsCur.spend)} trendValue={trend(adsCur.spend, adsPrev?.spend || 0)} />
              <KpiCard icon="🎯" label="ROAS" value={`${adsCur.roas.toFixed(2)}x`} trendValue={trend(adsCur.roas, adsPrev?.roas || 0)} />
              <KpiCard icon="🧾" label="CPA" value={adsCur.cpa ? fmtCurrency(adsCur.cpa) : "—"} trendValue={-trend(adsCur.cpa, adsPrev?.cpa || 0)} />
              <KpiCard icon="👁️" label="Impression" value={fmtInt(adsCur.impressions)} trendValue={trend(adsCur.impressions, adsPrev?.impressions || 0)} />
              <KpiCard icon="🖱️" label="Link Click" value={fmtInt(adsCur.link_clicks)} trendValue={trend(adsCur.link_clicks, adsPrev?.link_clicks || 0)} />
              <KpiCard icon="📈" label="Link CTR" value={fmtPct(adsCur.ctr)} trendValue={trend(adsCur.ctr, adsPrev?.ctr || 0)} />
              <KpiCard icon="💵" label="Link CPC" value={fmtCurrency(adsCur.cpc)} trendValue={-trend(adsCur.cpc, adsPrev?.cpc || 0)} />
              <KpiCard icon="📡" label="CPM" value={fmtCurrency(adsCur.cpm)} trendValue={-trend(adsCur.cpm, adsPrev?.cpm || 0)} />
            </div>
            {data?.ads?.timeseries?.length ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.ads.timeseries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} stroke="#374151" />
                  <YAxis yAxisId="l" tick={{ fontSize: 11, fill: "#9ca3af" }} stroke="#374151" />
                  <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: "#9ca3af" }} stroke="#374151" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#fff" }} />
                  <Line yAxisId="l" type="monotone" dataKey="spend" name="Spesa €" stroke="#dc2626" strokeWidth={2} dot={false} />
                  <Line yAxisId="r" type="monotone" dataKey="clicks" name="Link Click" stroke="#eab308" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </SectionCard>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SectionCard title="Fatturato nel Tempo">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data?.timeseries || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} stroke="#374151" />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} stroke="#374151" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={3} dot={{ fill: "#dc2626", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </SectionCard>
          <SectionCard title="Volume Eventi">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data?.timeseries || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} stroke="#374151" />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} stroke="#374151" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#fff" }} />
                <Bar dataKey="add_to_cart" stackId="a" fill="#eab308" />
                <Bar dataKey="initiate_checkout" stackId="a" fill="#a855f7" />
                <Bar dataKey="purchase" stackId="a" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* Top products */}
        <SectionCard title="Top Prodotti">
          {data?.topProducts.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-white/60 border-b border-gray-800 uppercase font-bold">
                  <tr>
                    <th className="text-left py-2">Prodotto</th>
                    <th className="text-right">Aggiunti</th>
                    <th className="text-right">Acquistati</th>
                    <th className="text-right">Fatturato</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topProducts.map((p) => (
                    <tr key={p.name} className="border-b border-gray-800 last:border-0">
                      <td className="py-2.5 text-white">{p.name}</td>
                      <td className="text-right text-white/80">{fmtInt(p.added)}</td>
                      <td className="text-right text-white/80">{fmtInt(p.bought)}</td>
                      <td className="text-right text-red-400 font-bold">{fmtCurrency(p.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-sm text-white/60">Nessun dato.</p>}
        </SectionCard>

        {/* Feed + Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SectionCard
            title="Eventi Recenti"
            action={<span className="text-xs font-bold text-red-500 bg-red-600/10 border border-red-600/30 px-2 py-0.5 rounded">{data?.feed.length || 0}</span>}
          >
            <ScrollArea className="h-[400px] pr-2">
              <div className="space-y-2">
                {filteredFeed.map((e) => (
                  <div key={e.id} className="flex items-start gap-2 text-xs border-b border-gray-800 pb-2 last:border-0">
                    {eventBadge(e.event_type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <span className="truncate font-semibold text-white">{e.product_name || "—"}</span>
                        {e.value != null && <span className="text-red-400 font-bold whitespace-nowrap">{fmtCurrency(Number(e.value), e.currency || "EUR")}</span>}
                      </div>
                      <div className="text-white/50 truncate">
                        {e.customer_email || e.source} · {new Date(e.created_at).toLocaleString("it-IT")}
                      </div>
                    </div>
                  </div>
                ))}
                {!filteredFeed.length && <p className="text-sm text-white/50 text-center py-8">Nessun evento.</p>}
              </div>
            </ScrollArea>
          </SectionCard>

          <SectionCard title="Dettagli">
            <Input
              placeholder="Cerca email, ordine, prodotto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3 bg-black/60 border-gray-800 text-white placeholder:text-white/40 focus:border-red-500"
            />
            <Tabs defaultValue="orders">
              <TabsList className="grid grid-cols-2 w-full bg-gray-900 border border-gray-800">
                <TabsTrigger value="orders" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 font-bold">
                  Ordini ({data?.orders.length || 0})
                </TabsTrigger>
                <TabsTrigger value="events" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 font-bold">
                  Eventi ({data?.feed.length || 0})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <div className="flex justify-end mb-2">
                  <Button
                    size="sm"
                    onClick={() => downloadCSV(filteredOrders, `orders-${filter.preset}.csv`)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs h-8"
                  >
                    <Download className="h-3 w-3 mr-1" />CSV
                  </Button>
                </div>
                <ScrollArea className="h-[330px]">
                  <table className="w-full text-xs">
                    <thead className="text-white/60 border-b border-gray-800 sticky top-0 bg-gray-900 uppercase font-bold">
                      <tr>
                        <th className="text-left py-2">Data</th>
                        <th className="text-left">Email</th>
                        <th className="text-right">Valore</th>
                        <th className="text-right w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="border-b border-gray-800 last:border-0 group">
                          <td className="py-2 text-white/80">{new Date(o.created_at).toLocaleDateString("it-IT")}</td>
                          <td className="truncate max-w-[160px] text-white">{o.customer_email || "—"}</td>
                          <td className="text-right text-red-400 font-bold">{fmtCurrency(Number(o.value || 0), o.currency || "EUR")}</td>
                          <td className="text-right">
                            <button
                              onClick={() => handleDeleteOrder(o.id, o.order_id || o.customer_email || o.id)}
                              className="p-1.5 rounded text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                              title="Elimina ordine"
                              aria-label="Elimina ordine"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!filteredOrders.length && <p className="text-sm text-white/50 text-center py-8">Nessun ordine.</p>}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="events">
                <div className="flex justify-end mb-2">
                  <Button
                    size="sm"
                    onClick={() => downloadCSV(filteredFeed, `events-${filter.preset}.csv`)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs h-8"
                  >
                    <Download className="h-3 w-3 mr-1" />CSV
                  </Button>
                </div>
                <ScrollArea className="h-[330px]">
                  <table className="w-full text-xs">
                    <thead className="text-white/60 border-b border-gray-800 sticky top-0 bg-gray-900 uppercase font-bold">
                      <tr><th className="text-left py-2">Tipo</th><th className="text-left">Quando</th><th className="text-left">Email</th></tr>
                    </thead>
                    <tbody>
                      {filteredFeed.map((e) => (
                        <tr key={e.id} className="border-b border-gray-800 last:border-0">
                          <td className="py-2">{eventBadge(e.event_type)}</td>
                          <td className="text-white/60">{new Date(e.created_at).toLocaleString("it-IT")}</td>
                          <td className="truncate max-w-[160px] text-white">{e.customer_email || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </SectionCard>
        </div>
      </div>

      {/* Meta Ads diagnostics checklist */}
      <Dialog open={checklistOpen} onOpenChange={setChecklistOpen}>
        <DialogContent className="bg-gray-950 border border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-red-400" />
              Diagnostica Meta Ads — Checklist
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Segui i passi in ordine. L'errore "API access blocked" indica quasi sempre che il System User non ha accesso all'Ad Account o mancano permessi.
            </DialogDescription>
          </DialogHeader>

          <ol className="space-y-4 mt-2">
            {[
              {
                key: "step1",
                title: "1. Apri Meta Business Settings",
                body: (
                  <>
                    Vai su{" "}
                    <a
                      href="https://business.facebook.com/settings"
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-400 hover:underline inline-flex items-center gap-1"
                    >
                      business.facebook.com/settings <ExternalLink className="h-3 w-3" />
                    </a>{" "}
                    e seleziona il Business Manager corretto in alto a sinistra.
                  </>
                ),
              },
              {
                key: "step2",
                title: "2. Trova il System User",
                body: (
                  <>
                    Menu sinistro → <b>Users → System Users</b>. Seleziona il System User che ha generato il token (di solito uno con ruolo <b>Admin</b>).
                  </>
                ),
              },
              {
                key: "step3",
                title: "3. Assegna l'Ad Account come Asset",
                body: (
                  <>
                    Nel pannello del System User → tab <b>Assigned Assets</b> → <b>Add Assets</b> → <b>Ad Accounts</b>. Seleziona il tuo account pubblicitario e attiva almeno il permesso <b>"Manage campaigns"</b> (o <b>"View performance"</b> come minimo). Salva.
                  </>
                ),
              },
              {
                key: "step4",
                title: "4. Genera un nuovo Token",
                body: (
                  <>
                    Sempre nel System User → click su <b>Generate New Token</b>. Seleziona la tua App Meta. Spunta i permessi:
                    <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                      <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">ads_read</code></li>
                      <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">read_insights</code></li>
                      <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">business_management</code></li>
                    </ul>
                    <span className="block mt-2">Imposta <b>Token Expiration: Never</b>. Copia il token.</span>
                  </>
                ),
              },
              {
                key: "step5",
                title: "5. Verifica l'App in Live Mode",
                body: (
                  <>
                    Vai su{" "}
                    <a
                      href="https://developers.facebook.com/apps/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-400 hover:underline inline-flex items-center gap-1"
                    >
                      developers.facebook.com/apps <ExternalLink className="h-3 w-3" />
                    </a>{" "}
                    → la tua app → in alto deve essere su <b>"Live"</b> (non Development), altrimenti il System User che non è admin dell'app non può usarla.
                  </>
                ),
              },
              {
                key: "step6",
                title: "6. Testa il Token",
                body: (
                  <>
                    Prima di salvarlo, testalo nel{" "}
                    <a
                      href="https://developers.facebook.com/tools/debug/accesstoken/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-400 hover:underline inline-flex items-center gap-1"
                    >
                      Access Token Debugger <ExternalLink className="h-3 w-3" />
                    </a>
                    . Verifica che mostri: <b>Valid: True</b>, <b>Expires: Never</b>, e che gli scope includano <code className="bg-gray-800 px-1 rounded text-xs">ads_read</code>.
                  </>
                ),
              },
              {
                key: "step7",
                title: "7. Aggiorna il Secret in Lovable",
                body: (
                  <>
                    Quando hai un token valido e funzionante, chiedimi in chat di aggiornare <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300 text-xs">META_ADS_ACCESS_TOKEN</code>. Poi clicca <b>Sync Ads</b> qui in dashboard per verificare.
                  </>
                ),
              },
            ].map((step) => (
              <li key={step.key} className="flex items-start gap-3">
                <Checkbox
                  id={step.key}
                  checked={!!checklist[step.key]}
                  onCheckedChange={() => toggleCheck(step.key)}
                  className="mt-1 border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <label htmlFor={step.key} className="flex-1 cursor-pointer">
                  <p className={cn("font-bold text-sm", checklist[step.key] && "line-through text-gray-500")}>
                    {step.title}
                  </p>
                  <div className={cn("text-sm text-gray-300 mt-1", checklist[step.key] && "opacity-50")}>
                    {step.body}
                  </div>
                </label>
              </li>
            ))}
          </ol>

          <DialogFooter className="mt-4 gap-2">
            <Button
              variant="outline"
              className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
              onClick={() => setChecklist({})}
            >
              Reset
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white font-bold"
              onClick={() => {
                setChecklistOpen(false);
                handleSyncMetaAds();
              }}
              disabled={syncing}
            >
              <Zap className={`h-4 w-4 mr-1.5 ${syncing ? "animate-pulse" : ""}`} />
              Riprova Sync
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
