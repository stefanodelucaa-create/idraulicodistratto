import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrderData {
  customerName: string;
  customerEmail: string;
  amountTotal: string;
  orderDate: string;
  downloadUrl: string | null;
  bonusDownloadUrl: string | null;
  includesLifetime: boolean;
}

export default function ThankYou() {
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'noindex, nofollow';
    return () => {
      if (metaRobots) metaRobots.content = 'index, follow';
    };
  }, []);

  const [searchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState({ hero: false, download: false });
  const [isVerifying, setIsVerifying] = useState(true);
  const [orderData, setOrderData] = useState<OrderData>({
    customerName: "Cliente",
    customerEmail: "",
    amountTotal: "€29,00",
    orderDate: new Date().toLocaleDateString("it-IT"),
    downloadUrl: null,
    bonusDownloadUrl: null,
    includesLifetime: false,
  });

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setIsVerifying(false);
      return;
    }
    const verifyPayment = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-session", {
          body: { session_id: sessionId },
        });
        if (error) throw error;
        if (data?.success) {
          // Track Purchase conversion on Meta Pixel
          const amountEur = ((data.amountTotal || 0) / 100).toFixed(2);
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Purchase', {
              value: amountEur,
              currency: 'EUR',
              content_type: 'product',
              content_name: 'Manuale Idraulico Distratto',
            });
          }
          setOrderData({
            customerName: data.customerName || "Cliente",
            customerEmail: data.customerEmail || "",
            amountTotal: `€${((data.amountTotal || 0) / 100).toFixed(2).replace(".", ",")}`,
            orderDate: new Date().toLocaleDateString("it-IT"),
            downloadUrl: data.downloadUrl || null,
            bonusDownloadUrl: data.bonusDownloadUrl || null,
            includesLifetime: data.includesLifetime || false,
          });
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        toast.error("Errore nella verifica del pagamento");
      } finally {
        setIsVerifying(false);
      }
    };
    verifyPayment();
  }, [searchParams]);

  useEffect(() => {
    setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    setTimeout(() => setIsVisible(prev => ({ ...prev, download: true })), 500);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[800px] mx-auto px-5 md:px-10 py-10 md:py-16">

        {/* ORDER CONFIRMATION */}
        <section
          className={`bg-card rounded-2xl shadow-elevated p-8 md:p-10 mb-8 transition-all duration-500 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="text-center">
            <h1 className="font-bold text-[26px] md:text-[32px] text-foreground mb-6">
              🎉 Grazie {orderData.customerName}! Il Tuo Ordine è Confermato 🎉
            </h1>
            <div className="bg-secondary rounded-xl p-5 max-w-md mx-auto mb-6">
              <div className="text-left text-[15px] leading-8 text-muted-foreground">
                <p>📧 Email: {orderData.customerEmail}</p>
                <p>💳 Totale pagato: {orderData.amountTotal}</p>
                <p>📅 Data: {orderData.orderDate}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              ✅ Riceverai email di conferma a {orderData.customerEmail} con link download
            </p>
          </div>
        </section>

        {/* DOWNLOAD SECTION */}
        <section
          className={`rounded-2xl p-8 md:p-10 border-l-4 border-primary bg-gradient-to-b from-primary/10 to-primary/20 transition-all duration-500 ${
            isVisible.download ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">📥</div>
            <h2 className="font-semibold text-xl md:text-2xl text-primary mb-3">
              {isVerifying ? "Verifica pagamento in corso..." : "Scarica il Tuo Ebook!"}
            </h2>

            {orderData.downloadUrl ? (
              <>
                <p className="text-base text-muted-foreground mb-6 max-w-lg mx-auto">
                  I tuoi file sono pronti! Clicca i pulsanti qui sotto per scaricarli subito.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={orderData.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-4 px-8 rounded-xl shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    Scarica il Manuale (PDF)
                  </a>
                  {orderData.bonusDownloadUrl && (
                    <a
                      href={orderData.bonusDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-4 px-8 rounded-xl shadow-soft hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      Scarica il Bonus Checklist
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  ⏰ I link sono validi per 1 ora. Dopo la scadenza, ricarica questa pagina per ottenerne di nuovi.
                </p>
              </>
            ) : (
              <p className="text-base text-muted-foreground mb-6 max-w-lg mx-auto">
                {isVerifying
                  ? "Stiamo verificando il tuo pagamento..."
                  : "Riceverai un'email con il link per il download a " + orderData.customerEmail}
              </p>
            )}

            <div className="bg-secondary/50 rounded-lg p-4 max-w-md mx-auto mt-6">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Hai bisogno di aiuto?</strong> Contattaci a <a href="mailto:info@manualeidraulicodistratto.com" className="text-primary underline hover:no-underline">info@manualeidraulicodistratto.com</a>
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-foreground text-muted rounded-2xl p-8 mt-12 text-center text-sm">
          <p className="mb-4">
            © {new Date().getFullYear()} Manuale dell'Idraulico Distratto. Tutti i diritti riservati.
          </p>
          <p className="mb-4">
            <Link to="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>
            {" • "}
            <Link to="/termini-condizioni" className="text-accent hover:underline">Termini e Condizioni</Link>
            {" • "}
            <Link to="/contatti" className="text-accent hover:underline">Contatti</Link>
          </p>
          <p className="text-muted-foreground/70">
            Hai domande? Rispondi all'email di conferma ricevuta.
          </p>
        </footer>
      </div>
    </div>
  );
}
