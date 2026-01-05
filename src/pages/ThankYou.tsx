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
    name: "Marco P.",
    location: "Bologna",
    text: "Ho preso Lifetime Access al lancio e già ricevuto 2 aggiornamenti con nuovi capitoli. Vale ogni centesimo!"
  },
  {
    name: "Luca T.",
    location: "Milano",
    text: "Ogni aggiornamento aggiunge tecniche nuove che non trovi altrove. Miglior investimento fatto!"
  },
  {
    name: "Giulia R.",
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
  const orderData = getOrderData();

  useEffect(() => {
    // Staggered animations
    setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    setTimeout(() => setIsVisible(prev => ({ ...prev, download: true })), 500);
    setTimeout(() => setIsVisible(prev => ({ ...prev, upsell: true })), 1000);
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
        
        {/* SECTION 1 - ORDER CONFIRMATION HEADER */}
        <section 
          className={`bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10 mb-8 transition-all duration-500 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-7xl md:text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="font-bold text-[26px] md:text-[32px] text-[#1A1A1A] mb-6">
              Grazie {orderData.customerName}! Il Tuo Ordine è Confermato
            </h1>
            
            {/* Order Details Card */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 max-w-md mx-auto mb-6">
              <div className="text-left text-[15px] leading-8 text-[#555555]">
                <p>📧 Email: {orderData.customerEmail}</p>
                <p>🔢 Ordine: #{orderData.orderNumber}</p>
                <p>💳 Totale pagato: {orderData.totalPaid}</p>
                <p>📅 Data: {orderData.orderDate}</p>
              </div>
            </div>
            
            <p className="text-sm text-[#666666]">
              ✅ Riceverai email di conferma a {orderData.customerEmail} con link download
            </p>
          </div>
        </section>

        {/* SECTION 2 - EBOOK DOWNLOAD */}
        <section 
          className={`rounded-2xl p-8 md:p-10 mb-8 border-l-4 border-[#2E7D32] transition-all duration-500 ${
            isVisible.download ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ background: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%)' }}
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl mb-4 text-[#2E7D32]">📥</div>
            <h2 className="font-semibold text-xl md:text-2xl text-[#2E7D32] mb-3">
              📥 Il Tuo Ebook è Pronto per il Download!
            </h2>
            <p className="text-base text-[#555555] mb-6 max-w-lg mx-auto">
              Manuale dell'Idraulico Distratto (PDF, 200+ pagine) disponibile per download immediato.
            </p>
            
            <a 
              href="/ebook.pdf" 
              download
              className="inline-block w-[90%] max-w-[400px] bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-lg py-4 px-12 rounded-xl shadow-[0_6px_20px_rgba(46,125,50,0.3)] hover:scale-[1.02] transition-all duration-300"
            >
              SCARICA EBOOK PDF ORA
            </a>
            
            <p className="text-[13px] text-[#666666] mt-4">
              ✓ Download istantaneo • ✓ Formato PDF • ✓ Link backup via email
            </p>
          </div>
        </section>

        {/* SECTION 3 - TRANSITION DIVIDER */}
        <div className="relative my-16 md:my-16">
          <div className="h-0.5 bg-[#E0E0E0]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 md:px-8 py-2 max-w-[90%] md:max-w-none">
            <span className="font-bold text-sm md:text-lg text-[#FF6B35] flex items-center gap-2 whitespace-nowrap">
              <Clock className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="hidden sm:inline">ASPETTA! Non Chiudere Ancora...</span>
              <span className="sm:hidden">ASPETTA! Non Chiudere...</span>
            </span>
          </div>
        </div>

        {/* SECTION 4 - UPSELL OFFER */}
        <section 
          className={`relative bg-white border-[3px] border-[#FFD700] rounded-[20px] p-8 md:p-12 shadow-[0_8px_30px_rgba(255,215,0,0.2)] transition-all duration-700 ${
            isVisible.upsell ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Badge */}
          <div className="absolute -top-4 right-4 md:right-8 bg-[#FF6B35] text-white font-bold text-xs md:text-sm uppercase px-4 md:px-5 py-2 rounded-full">
            🔥 SOLO QUI
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-[40%_60%] gap-8 md:gap-12">
            
            {/* Left Column - Mockups */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center gap-4 mb-4">
                {/* Base Ebook (faded) */}
                <div className="relative opacity-70">
                  <div className="w-24 md:w-32 h-32 md:h-44 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-gray-500 text-xs text-center px-2">Versione Base</span>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="text-2xl animate-pulse">→</div>
                
                {/* Lifetime Ebook (glowing) */}
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-40 rounded-lg"></div>
                  <div className="relative w-28 md:w-36 h-36 md:h-48 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg shadow-xl flex items-center justify-center border-2 border-[#FFD700]">
                    <span className="text-[#8B4513] text-xs md:text-sm font-bold text-center px-2">LIFETIME<br/>ACCESS</span>
                  </div>
                </div>
              </div>
              
              {/* Badge */}
              <div className="bg-[#FFD700] text-[#8B4513] font-bold text-xs md:text-sm uppercase px-4 py-2 rounded-full">
                ⭐ DIVENTA LIFETIME MEMBER ⭐
              </div>
            </div>

            {/* Right Column - Content */}
            <div>
              <h2 className="font-bold text-2xl md:text-[28px] text-[#1A1A1A] mb-3">
                Vuoi che Questo Ebook CRESCA con Te?
              </h2>
              <p className="text-base md:text-lg text-[#555555] leading-relaxed mb-6">
                Passa a LIFETIME ACCESS e ricevi tutti gli aggiornamenti futuri, supporto prioritario e molto altro.
              </p>

              {/* Warning Box */}
              <div className="bg-[#FFF3CD] border-l-4 border-[#FFC107] rounded-lg p-5 mb-6">
                <p className="font-semibold text-[#856404] mb-2">⚠️ Con la versione BASE che hai acquistato:</p>
                <ul className="text-[15px] leading-7 text-[#856404]">
                  <li><span className="text-[#D32F2F]">❌</span> NON ricevi aggiornamenti futuri (v2.0, v3.0...)</li>
                  <li><span className="text-[#D32F2F]">❌</span> NON hai supporto prioritario via email</li>
                  <li><span className="text-[#D32F2F]">❌</span> Dovresti ricomprare ogni update a €37!</li>
                </ul>
              </div>

              {/* Benefits Box */}
              <div 
                className="rounded-xl p-6 md:p-8 border-2 border-[#FFD700] mb-6"
                style={{ background: 'linear-gradient(180deg, #FFF9E6 0%, #FFEDCC 100%)' }}
              >
                <h3 className="font-bold text-xl md:text-[22px] text-[#2E7D32] text-center mb-5">
                  ✅ PASSA A LIFETIME ACCESS ORA
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-2xl text-[#FFD700]">{benefit.icon}</span>
                      <div>
                        <p className="font-semibold text-[#333333]">{benefit.title}</p>
                        <p className="text-sm text-[#666666]">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Value Stack */}
              <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] text-center mb-6">
                <p className="text-lg text-[#999999] line-through mb-1">Valore se acquistato separato: €97</p>
                <p className="font-bold text-4xl md:text-[40px] text-[#FF6B35] mb-1">PER TE OGGI: Solo +€12</p>
                <p className="text-sm text-[#666666] italic">(meno di €1 al mese se consideri 1 anno!)</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleUpsellPurchase}
                disabled={isLoading}
                className="w-full bg-[#FF6B35] hover:bg-[#E55A25] text-white font-bold text-lg md:text-xl py-5 px-8 rounded-xl shadow-[0_8px_24px_rgba(255,107,53,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,107,53,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed animate-[subtle-pulse_3s_ease-in-out_infinite]"
              >
                {isLoading ? "Caricamento..." : "SÌ, VOGLIO LIFETIME ACCESS (+€12)"}
              </button>
              
              <p className="text-[13px] text-[#666666] text-center mt-4">
                <span className="text-[#2E7D32]">✓</span> Pagamento sicuro 1 click • 
                <span className="text-[#2E7D32]">✓</span> Stesso metodo usato prima • 
                <span className="text-[#2E7D32]">✓</span> Garanzia 60 giorni
              </p>

              {/* Scarcity Box */}
              <div className="bg-[#FFEBEE] rounded-lg p-5 text-center mt-6">
                <p className="font-semibold text-base text-[#C62828]">
                  ⏰ ATTENZIONE: Questa offerta è valida SOLO ORA. Quando chiudi questa pagina, scompare per sempre.
                </p>
              </div>

              {/* Decline Link */}
              <p className="text-center mt-6">
                <a href="#" className="text-sm text-[#999999] underline hover:text-[#666666] transition-colors">
                  No grazie, voglio solo la versione base
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 - SOCIAL PROOF */}
        <section className="bg-[#F8F9FA] rounded-xl p-8 md:p-10 mt-12">
          <h2 className="font-bold text-2xl text-[#1A1A1A] text-center mb-8">
            Cosa Dicono i Lifetime Members
          </h2>
          
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <p className="text-[15px] text-[#555555] italic mb-4">
                  "{testimonial.text}"
                </p>
                <p className="text-[13px] text-[#999999] text-right">
                  — {testimonial.name}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6 - FAQ ACCORDION */}
        <section className="bg-white rounded-2xl p-8 md:p-10 mt-12">
          <h2 className="font-bold text-2xl text-[#1A1A1A] text-center mb-8">
            Domande Frequenti
          </h2>
          
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#E0E0E0]">
                <AccordionTrigger className="font-semibold text-base text-left py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-[#666666] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#1A1A1A] text-[#CCCCCC] rounded-2xl p-8 mt-12 text-center text-sm">
          <p className="mb-4">
            © 2026 Manuale dell'Idraulico Distratto. Tutti i diritti riservati.
          </p>
          <p className="mb-4">
            <a href="#" className="text-[#FFD700] hover:underline">Privacy Policy</a>
            {" • "}
            <a href="#" className="text-[#FFD700] hover:underline">Termini e Condizioni</a>
            {" • "}
            <a href="#" className="text-[#FFD700] hover:underline">Contatti</a>
          </p>
          <p className="text-[#999999]">
            Hai domande? Rispondi all'email di conferma ricevuta.
          </p>
        </footer>
      </div>
    </div>
  );
}
