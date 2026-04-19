import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { isAdminEmail } from "@/lib/adminConfig";

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Accedi alla dashboard" : "Crea account admin"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Attendere..." : mode === "login" ? "Login" : "Registrati"}
            </Button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground underline w-full text-center"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Non hai un account? Registrati" : "Hai già un account? Login"}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Solo email autorizzate possono accedere alla dashboard.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
