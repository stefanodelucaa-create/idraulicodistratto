import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Clock, Shield, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import protocolloCover from "@/assets/protocollo-cover-transparent.png";
import lifetimeAccessCover from "@/assets/lifetime-access-cover.png";

interface PrePurchaseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (includeLifetime: boolean) => void;
}

const benefits = [
  { icon: "🔓", title: "Aggiornamenti illimitati A VITA" },
  { icon: "🎁", title: "20% di sconto sui futuri prodotti" },
  { icon: "📧", title: "Supporto prioritario via email" },
  { icon: "📚", title: "Nuovi capitoli esclusivi" },
  { icon: "💡", title: "Casi studio reali" }
];


const faqs = [
  {
    question: "Posso comprare Lifetime dopo?",
    answer: "Sì, ma a prezzo pieno €97. Ora lo ottieni a soli +€12."
  },
  {
    question: "Gli aggiornamenti sono davvero gratis?",
    answer: "Sì, tutti i futuri update dell'ebook sono inclusi per sempre."
  },
  {
    question: "E se non mi piace?",
    answer: "Hai 60 giorni per richiedere rimborso completo, senza domande."
  }
];

export const PrePurchaseSidebar = ({ isOpen, onClose, onCheckout }: PrePurchaseSidebarProps) => {
  const [countdown, setCountdown] = useState({ minutes: 5, seconds: 0 });
  const [includeLifetime, setIncludeLifetime] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    
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
  }, [isOpen]);

  const basePrice = 29;
  const lifetimePrice = 12;
  const totalPrice = includeLifetime ? basePrice + lifetimePrice : basePrice;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg overflow-y-auto p-0 bg-black border-l border-gray-800"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onClose}
              className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Chiudi carrello"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <SheetHeader className="flex-1 text-center">
              <SheetTitle className="text-xl font-bold text-white">
                Il Tuo Carrello
              </SheetTitle>
            </SheetHeader>
            <div className="w-9" />
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Product Card - Ebook Base */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex justify-center sm:justify-start flex-shrink-0">
                <img 
                  src={protocolloCover} 
                  alt="Il Protocollo del Piacere" 
                  className="w-28 sm:w-20 h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg sm:text-base text-white mb-1">
                  Il Protocollo del Piacere
                </h3>
                <p className="text-sm text-white font-medium mb-2">
                  Ebook completo + Bonus
                </p>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-sm text-white line-through">€79</span>
                  <span className="text-2xl sm:text-xl font-bold text-red-500">€{basePrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upsell Section - Lifetime Access */}
          <div className={`relative rounded-xl border-2 transition-all duration-300 ${
            includeLifetime 
              ? 'border-red-500 bg-red-900/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]' 
              : 'border-gray-800 bg-gray-900 hover:border-red-500/50'
          }`}>
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full whitespace-nowrap">
              Offerta Speciale
            </div>

            <div className="p-4 pt-6">
              {/* Countdown */}
              <div className="flex items-center justify-center gap-2 mb-4 bg-red-900/30 rounded-lg py-2 px-3 border border-red-800/50">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold text-red-400">
                  Offerta scade tra {String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                </span>
              </div>

              {/* Header with image */}
              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                <div className="flex justify-center sm:justify-start flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-lg"></div>
                    <img 
                      src={lifetimeAccessCover} 
                      alt="Lifetime Access" 
                      className="relative w-24 sm:w-20 h-auto rounded-lg shadow-lg border-2 border-red-500/50"
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-lg text-white mb-1">
                    Aggiungi Lifetime Access
                  </h4>
                  <p className="text-sm text-white font-medium mb-2">
                    Aggiornamenti illimitati <span className="font-bold">per sempre</span>
                  </p>
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="text-sm text-white line-through">€97</span>
                    <span className="text-xl font-bold text-red-500">+€{lifetimePrice}</span>
                    <span className="text-xs text-white font-semibold">(solo oggi)</span>
                  </div>
                </div>
              </div>

              {/* Benefits Full List */}
              <div className="bg-red-900/20 rounded-lg p-4 mb-4 border border-red-800/40">
                <h5 className="font-bold text-sm text-red-400 mb-3 text-center uppercase tracking-wide">
                  Con Lifetime Access ottieni:
                </h5>
                <div className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-lg flex-shrink-0">{benefit.icon}</span>
                      <p className="font-bold text-sm text-white">{benefit.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setIncludeLifetime(!includeLifetime)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  includeLifetime
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : 'bg-white text-black hover:bg-gray-100 shadow-lg'
                }`}
              >
                {includeLifetime ? (
                  <>
                    <Check className="w-5 h-5" />
                    Aggiunto al carrello!
                  </>
                ) : (
                  <>
                    Aggiungi Lifetime (+€{lifetimePrice})
                  </>
                )}
              </button>
            </div>
          </div>


          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800">
                <AccordionTrigger className="text-sm font-bold py-3 hover:no-underline text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 px-6 py-4 space-y-3">
          {/* Price Summary */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-medium">Totale:</span>
            <div className="flex items-baseline gap-2">
              {includeLifetime && (
                <span className="text-xs text-white line-through">€{79 + 97}</span>
              )}
              <span className="text-2xl font-bold text-white">€{totalPrice}</span>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 text-[11px] leading-snug text-gray-300 cursor-pointer">
            <Checkbox
              checked={acceptedTerms}
              onCheckedChange={(v) => setAcceptedTerms(v === true)}
              className="mt-0.5 border-gray-500 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
            />
            <span>
              Ho letto e accetto i{" "}
              <Link to="/termini-e-condizioni" target="_blank" className="underline text-white">
                Termini e Condizioni
              </Link>{" "}
              e confermo di rinunciare al diritto di recesso ai sensi dell'art. 59 del Codice del
              Consumo, poiché il prodotto digitale sarà disponibile immediatamente dopo il pagamento.
            </span>
          </label>

          {/* CTA Button */}
          <button
            onClick={() => acceptedTerms && onCheckout(includeLifetime)}
            disabled={!acceptedTerms}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl group transition-colors flex items-center justify-center"
          >
            Procedi al Checkout
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-white">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              SSL Sicuro
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-red-500" />
              Garanzia 60gg
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
