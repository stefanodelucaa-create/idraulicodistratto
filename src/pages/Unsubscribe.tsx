import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Status = "loading" | "valid" | "already_unsubscribed" | "invalid" | "success" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const token = searchParams.get("token");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then(r => r.json())
      .then(data => {
        if (data.valid === false && data.reason === "already_unsubscribed") setStatus("already_unsubscribed");
        else if (data.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: anonKey },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) setStatus("success");
      else if (data.reason === "already_unsubscribed") setStatus("already_unsubscribed");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-elevated p-8 text-center">
        {status === "loading" && <p className="text-muted-foreground">Caricamento...</p>}
        {status === "valid" && (
          <>
            <h1 className="text-xl font-bold text-foreground mb-4">Cancellazione iscrizione</h1>
            <p className="text-muted-foreground mb-6">Vuoi cancellare la tua iscrizione alle email?</p>
            <button onClick={handleUnsubscribe} className="bg-primary text-primary-foreground font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors">
              Conferma cancellazione
            </button>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="text-xl font-bold text-foreground mb-4">✅ Iscrizione cancellata</h1>
            <p className="text-muted-foreground">Non riceverai più email da noi.</p>
          </>
        )}
        {status === "already_unsubscribed" && (
          <>
            <h1 className="text-xl font-bold text-foreground mb-4">Già cancellato</h1>
            <p className="text-muted-foreground">La tua iscrizione è già stata cancellata.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h1 className="text-xl font-bold text-foreground mb-4">Link non valido</h1>
            <p className="text-muted-foreground">Questo link di cancellazione non è valido o è scaduto.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-xl font-bold text-foreground mb-4">Errore</h1>
            <p className="text-muted-foreground">Si è verificato un errore. Riprova più tardi.</p>
          </>
        )}
      </div>
    </div>
  );
}
