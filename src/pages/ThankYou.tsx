import { useState, useEffect } from "react";
import { Check, ChevronDown, Download, Star, X, Clock, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { createStorefrontCheckout, CartItem, ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

// Simulated order data (in production, this comes from Shopify Liquid variables)
const getOrderData = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    customerName: params.get('name') || 'Cliente',
    customerEmail: params.get('email') || 'cliente@email.com',
    orderNumber: params.get('order') || '1001',
    orderDate: params.get('date') || new Date().toLocaleDateString('it-IT'),
    totalPaid: '€37,00'
  };
};

// Lifetime Access product variant ID (from Shopify)
const LIFETIME_VARIANT_ID = "gid://shopify/ProductVariant/56481765949784";

const testimonials = [
  {
    name: "Paolo M.",
    location: "Bologna",
    text: "Ho preso Lifetime Access al lancio e già ricevuto 2 aggiornamenti con nuovi capitoli. Vale ogni centesimo!"
  },
  {
    name: "Simone D.",
    location: "Milano",
    text: "Ogni aggiornamento aggiunge tecniche nuove che non trovi altrove. Miglior investimento fatto!"
  },
  {
    name: "Alessia B.",
    location: "Roma",
    text: "Aggiornamenti gratuiti = niente stress di restare indietro. Lo consiglio a tutti!"
  }
];

const faqs = [
  {
    question: "Cosa succede se acquisto Lifetime dopo oggi?",
    answer: "Dopo questa pagina, Lifetime Access sarà disponibile solo a prezzo pieno €97. Questa è l'unica occasione per averlo a €12."
  },
  {
    question: "Gli aggiornamenti sono davvero gratis?",
    answer: "Sì, tutti gli aggiornamenti futuri dell'ebook (nuovi capitoli, tecniche, casi studio) sono inclusi senza costi aggiuntivi. Per sempre."
  },
  {
    question: "Posso avere rimborso se non mi piace?",
    answer: "Assolutamente sì. Hai 60 giorni per richiedere rimborso completo, senza domande. Vale sia per ebook base che per Lifetime."
  }
];

const benefits = [
  {
    icon: "🔓",
    title: "Aggiornamenti illimitati FOREVER",
    description: "Tutte le versioni future (v2.0, v3.0, v4.0...) automatiche via email"
  },
  {
    icon: "🔓",
    title: "Early access futuri prodotti",
    description: "Sconti 20% su tutto ciò che creo dopo questo ebook"
  },
  {
    icon: "🔓",
    title: "Supporto prioritario via email",
    description: "Risposte rapide alle tue domande specifiche"
  }
];

export default function ThankYou() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    download: false,
    upsell: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState({ minutes: 10, seconds: 0 });
  const orderData = getOrderData();

  useEffect(() => {
    // Staggered animations
    setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    setTimeout(() => setIsVisible(prev => ({ ...prev, download: true })), 500);
    setTimeout(() => setIsVisible(prev => ({ ...prev, upsell: true })), 1000);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUpsellPurchase = async () => {
    setIsLoading(true);
    try {
      // Create a cart item for the Lifetime Access upsell
      const mockProduct: ShopifyProduct = {
        node: {
          id: "gid://shopify/Product/15545650151768",
          title: "Lifetime Access - Aggiornamenti Illimitati",
          description: "",
          handle: "lifetime-access",
          priceRange: {
            minVariantPrice: {
              amount: "12.00",
              currencyCode: "EUR"
            }
          },
          images: { edges: [] },
          variants: {
            edges: [{
              node: {
                id: LIFETIME_VARIANT_ID,
                title: "Default",
                price: { amount: "12.00", currencyCode: "EUR" },
                availableForSale: true,
                selectedOptions: []
              }
            }]
          },
          options: []
        }
      };

      const cartItem: CartItem = {
        product: mockProduct,
        variantId: LIFETIME_VARIANT_ID,
        variantTitle: "Default",
        price: { amount: "12.00", currencyCode: "EUR" },
        quantity: 1,
        selectedOptions: []
      };

      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('Upsell checkout error:', error);
      toast.error("Errore durante il checkout", {
        description: "Riprova tra qualche secondo"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
        
        {/* SECTION 1 - ORDER CONFIRMATION HEADER */}
        <section 
          className={`bg-card rounded-2xl shadow-elevated p-8 md:p-10 mb-8 transition-all duration-500 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-7xl md:text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="font-bold text-[26px] md:text-[32px] text-foreground mb-6">
              Grazie {orderData.customerName}! Il Tuo Ordine è Confermato
            </h1>
            
            {/* Order Details Card */}
            <div className="bg-secondary rounded-xl p-5 max-w-md mx-auto mb-6">
              <div className="text-left text-[15px] leading-8 text-muted-foreground">
                <p>📧 Email: {orderData.customerEmail}</p>
                <p>🔢 Ordine: #{orderData.orderNumber}</p>
                <p>💳 Totale pagato: {orderData.totalPaid}</p>
                <p>📅 Data: {orderData.orderDate}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              ✅ Riceverai email di conferma a {orderData.customerEmail} con link download
            </p>
          </div>
        </section>

        {/* SECTION 2 - TRANSITION DIVIDER */}
        <div className="relative my-12 md:my-16 text-center">
          {/* Glow lines */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            
            {/* Badge */}
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-primary via-accent to-primary p-[2px] rounded-full shadow-glow animate-[subtle-pulse_2s_ease-in-out_infinite]">
                <div className="bg-background px-4 md:px-10 py-3 md:py-4 rounded-full">
                  <span className="font-bold text-sm md:text-xl text-primary flex items-center justify-center gap-1.5 md:gap-3 text-center">
                    <span className="text-lg md:text-2xl">🚨</span>
                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-accent animate-pulse flex-shrink-0" />
                    <span className="hidden sm:inline">ASPETTA! Non Chiudere Ancora...</span>
                    <span className="sm:hidden">ASPETTA!</span>
                    <span className="text-lg md:text-2xl">🚨</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Big Title */}
          <h2 className="font-bold text-2xl md:text-4xl text-primary animate-pulse">
            🎁 ABBIAMO UN REGALO PER TE 🎁
          </h2>
        </div>

        {/* SECTION 4 - UPSELL OFFER */}
        <section 
          className={`relative bg-card border-[3px] border-accent rounded-[20px] p-8 md:p-12 shadow-premium transition-all duration-700 ${
            isVisible.upsell ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 bg-primary text-primary-foreground font-bold text-xs md:text-sm uppercase px-4 md:px-5 py-2 rounded-full">
            🔥 SOLO QUI
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-[40%_60%] gap-8 md:gap-12">
            
            {/* Left Column - Mockups */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center gap-4 mb-4">
                {/* Base Ebook (faded) */}
                <div className="relative opacity-70">
                  <div className="w-24 md:w-32 h-32 md:h-44 bg-muted rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-xs text-center px-2">Versione Base</span>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="text-2xl animate-pulse text-primary">→</div>
                
                {/* Lifetime Ebook (glowing) */}
                <div className="relative">
                  <div className="absolute inset-0 bg-accent blur-xl opacity-40 rounded-lg"></div>
                  <div className="relative w-28 md:w-36 h-36 md:h-48 bg-gradient-to-br from-accent to-primary rounded-lg shadow-xl flex items-center justify-center border-2 border-accent">
                    <span className="text-accent-foreground text-xs md:text-sm font-bold text-center px-2">LIFETIME<br/>ACCESS</span>
                  </div>
                </div>
              </div>
              
              {/* Badge */}
              <div className="bg-accent text-accent-foreground font-bold text-xs md:text-sm uppercase px-4 py-2 rounded-full">
                ⭐ DIVENTA LIFETIME MEMBER ⭐
              </div>
            </div>

            {/* Right Column - Content */}
            <div>
              <h2 className="font-bold text-2xl md:text-[28px] text-foreground mb-3">
                Vuoi che Questo Ebook CRESCA con Te?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Passa a LIFETIME ACCESS e ricevi tutti gli aggiornamenti futuri, supporto prioritario e molto altro.
              </p>

              {/* Warning Box */}
              <div className="bg-secondary border-l-4 border-accent rounded-lg p-5 mb-6">
                <p className="font-semibold text-secondary-foreground mb-2">⚠️ Con la versione BASE che hai acquistato:</p>
                <ul className="text-[15px] leading-7 text-secondary-foreground">
                  <li><span className="text-destructive">❌</span> NON ricevi aggiornamenti futuri (v2.0, v3.0...)</li>
                  <li><span className="text-destructive">❌</span> NON hai supporto prioritario via email</li>
                  <li><span className="text-destructive">❌</span> Dovresti ricomprare ogni update a €37!</li>
                </ul>
              </div>

              {/* Benefits Box */}
              <div className="rounded-xl p-6 md:p-8 border-2 border-accent bg-gradient-to-b from-accent/10 to-accent/20 mb-6">
                <h3 className="font-bold text-xl md:text-[22px] text-primary text-center mb-5">
                  ✅ PASSA A LIFETIME ACCESS ORA
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-2xl text-accent">{benefit.icon}</span>
                      <div>
                        <p className="font-semibold text-foreground">{benefit.title}</p>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Value Stack */}
              <div className="bg-card rounded-xl p-6 shadow-soft text-center mb-6">
                <p className="text-lg text-muted-foreground line-through mb-1">Valore se acquistato separato: €97</p>
                <p className="font-bold text-4xl md:text-[40px] text-primary mb-1">PER TE OGGI: Solo +€12</p>
                <p className="text-sm text-muted-foreground italic">(meno di €1 al mese se consideri 1 anno!)</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleUpsellPurchase}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg md:text-xl py-5 px-8 rounded-xl shadow-glow hover:-translate-y-0.5 hover:shadow-premium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed animate-[subtle-pulse_3s_ease-in-out_infinite]"
              >
                {isLoading ? "Caricamento..." : "SÌ, VOGLIO LIFETIME ACCESS (+€12)"}
              </button>
              
              <p className="text-[13px] text-muted-foreground text-center mt-4">
                <span className="text-primary">✓</span> Pagamento sicuro 1 click • 
                <span className="text-primary">✓</span> Stesso metodo usato prima • 
                <span className="text-primary">✓</span> Garanzia 60 giorni
              </p>

              {/* Scarcity Box with Countdown */}
              <div className="bg-destructive/10 rounded-lg p-5 text-center mt-6">
                {/* Countdown Timer */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="bg-destructive text-destructive-foreground font-bold text-2xl md:text-3xl px-4 py-2 rounded-lg min-w-[60px]">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-destructive font-bold text-2xl">:</span>
                  <div className="bg-destructive text-destructive-foreground font-bold text-2xl md:text-3xl px-4 py-2 rounded-lg min-w-[60px]">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                </div>
                <p className="font-semibold text-base text-destructive">
                  ⏰ ATTENZIONE: Questa offerta scade tra pochi minuti. Quando il timer arriva a zero, scompare per sempre.
                </p>
              </div>

              {/* Decline Link */}
              <p className="text-center mt-6">
                <a href="#" className="text-sm text-muted-foreground underline hover:text-foreground transition-colors">
                  No grazie, voglio solo la versione base
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 - SOCIAL PROOF */}
        <section className="bg-secondary rounded-xl p-8 md:p-10 mt-12">
          <h2 className="font-bold text-2xl text-foreground text-center mb-8">
            Cosa Dicono i Lifetime Members
          </h2>
          
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-[15px] text-muted-foreground italic mb-4">
                  "{testimonial.text}"
                </p>
                <p className="text-[13px] text-muted-foreground/70 text-right">
                  — {testimonial.name}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6 - FAQ ACCORDION */}
        <section className="bg-card rounded-2xl p-8 md:p-10 mt-12">
          <h2 className="font-bold text-2xl text-foreground text-center mb-8">
            Domande Frequenti
          </h2>
          
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="font-semibold text-base text-left py-5 hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* SECTION 7 - EMAIL DELIVERY NOTICE */}
        <section 
          className={`rounded-2xl p-8 md:p-10 mt-12 border-l-4 border-primary bg-gradient-to-b from-primary/10 to-primary/20 transition-all duration-500 ${
            isVisible.download ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4">📧</div>
            <h2 className="font-semibold text-xl md:text-2xl text-primary mb-3">
              Il Tuo Ebook Sta Arrivando!
            </h2>
            <p className="text-base text-muted-foreground mb-6 max-w-lg mx-auto">
              Tra pochi istanti riceverai un'email a <span className="font-semibold text-foreground">{orderData.customerEmail}</span> con il link per scaricare:
            </p>
            
            <div className="bg-card rounded-xl p-5 max-w-md mx-auto mb-6 shadow-soft">
              <ul className="text-left text-[15px] leading-8 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> 
                  <span><strong>Manuale dell'Idraulico Distratto</strong> (PDF, 200+ pagine)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> 
                  <span><strong>BONUS: Checklist Operativa</strong> (PDF)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Non trovi l'email?</strong> Controlla la cartella spam o promozioni. 
                Se dopo 10 minuti non è arrivata, contattaci a <a href="mailto:info@idraulicodistratto.com" className="text-primary underline hover:no-underline">info@idraulicodistratto.com</a>
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-foreground text-muted rounded-2xl p-8 mt-12 text-center text-sm">
          <p className="mb-4">
            © 2026 Manuale dell'Idraulico Distratto. Tutti i diritti riservati.
          </p>
          <p className="mb-4">
            <a href="#" className="text-accent hover:underline">Privacy Policy</a>
            {" • "}
            <a href="#" className="text-accent hover:underline">Termini e Condizioni</a>
            {" • "}
            <a href="#" className="text-accent hover:underline">Contatti</a>
          </p>
          <p className="text-muted-foreground/70">
            Hai domande? Rispondi all'email di conferma ricevuta.
          </p>
        </footer>
      </div>
    </div>
  );
}
