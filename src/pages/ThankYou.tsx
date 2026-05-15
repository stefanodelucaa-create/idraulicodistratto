import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { trackPurchase } from "@/hooks/useMetaPixel";
import { SiteFooter } from "@/components/SiteFooter";

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

  const purchaseTracked = useRef(false);

  useEffect(() => {
    // Payment verification removed (Stripe integration removed)
    setIsVerifying(false);

    // Track Purchase event once
    if (!purchaseTracked.current) {
      purchaseTracked.current = true;
      const value = searchParams.get('amount') || '29';
      // order_id from Shopify enables deduplication with the server-side webhook event
      const orderId = searchParams.get('order_id') || searchParams.get('order') || undefined;
      const email = searchParams.get('email') || undefined;
      trackPurchase(value, 'EUR', 'Il Protocollo del Piacere', orderId, email ? { email } : undefined);
    }
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
                💡 <strong>Hai bisogno di aiuto?</strong> Contattaci a <a href="mailto:idraulicodistratto@gmail.com" className="text-primary underline hover:no-underline">idraulicodistratto@gmail.com</a>
              </p>
            </div>
          </div>
        </section>

      </div>
      <SiteFooter />
    </div>
  );
}
