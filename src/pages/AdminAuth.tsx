import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { isAdminEmail } from "@/lib/adminConfig";
import { Lock, Shield } from "lucide-react";

export default function AdminAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email && isAdminEmail(session.user.email)) {
        navigate("/admin/analytics", { replace: true });
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email && isAdminEmail(data.session.user.email)) {
        navigate("/admin/analytics", { replace: true });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/analytics` },
        });
        if (error) throw error;
        toast.success("Account creato. Effettuo il login...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background red glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur border-2 border-red-600/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-3 mb-6">
            <div className="mx-auto w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Area Riservata
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {mode === "login" ? (
                <>Accesso <span className="text-red-500">Admin</span></>
              ) : (
                <>Crea <span className="text-red-500">Account</span></>
              )}
            </h1>
            <p className="text-sm text-white/80">
              Dashboard analisi e tracking conversioni
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="bg-black/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/30 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="bg-black/60 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/30 h-11"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-base font-bold h-12 rounded-xl whitespace-normal"
            >
              {loading ? "Attendere..." : mode === "login" ? "Accedi alla Dashboard" : "Crea Account Admin"}
            </Button>
            <button
              type="button"
              className="text-sm text-white/70 hover:text-red-400 underline w-full text-center transition-colors"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
            </button>
            <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-800 text-xs text-white/60">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              <span>Solo email autorizzate possono accedere</span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
