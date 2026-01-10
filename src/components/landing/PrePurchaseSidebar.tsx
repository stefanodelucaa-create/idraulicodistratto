import { useState, useEffect } from "react";
import { X, Star, Clock, Shield, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ebookMockup from "@/assets/ebook-mockup.png";
import lifetimeAccessCover from "@/assets/lifetime-access-cover.jpeg";

interface PrePurchaseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (includeLifetime: boolean) => void;
}

const benefits = [
  { icon: "🔓", title: "Aggiornamenti illimitati FOREVER" },
  { icon: "🎁", title: "20% di sconto sui futuri prodotti" },
  { icon: "📧", title: "Supporto prioritario via email" },
  { icon: "📚", title: "Nuovi capitoli esclusivi" },
  { icon: "💡", title: "Casi studio reali" }
];

const testimonials = [
  {
    name: "Paolo M.",
    text: "Ho preso Lifetime al lancio e già ricevuto 2 aggiornamenti con nuovi capitoli!"
  },
  {
    name: "Simone D.",
    text: "Ogni aggiornamento aggiunge tecniche nuove che non trovi altrove."
  },
  {
    name: "Alessia B.",
    text: "Aggiornamenti gratuiti = niente stress di restare indietro!"
  }
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

  const basePrice = 37;
  const lifetimePrice = 12;
  const totalPrice = includeLifetime ? basePrice + lifetimePrice : basePrice;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg overflow-y-auto p-0 bg-background border-l border-border"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onClose}
              className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Chiudi carrello"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <SheetHeader className="flex-1 text-center">
              <SheetTitle className="text-xl font-bold text-foreground">
                🛒 Il Tuo Carrello
              </SheetTitle>
            </SheetHeader>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Product Card - Ebook Base */}
          <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image - centered and larger on mobile */}
              <div className="flex justify-center sm:justify-start flex-shrink-0">
                <img 
                  src={ebookMockup} 
                  alt="Manuale dell'Idraulico Distratto" 
                  className="w-28 sm:w-20 h-auto rounded-lg shadow-md"
                />
              </div>
              {/* Content - centered on mobile */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg sm:text-base text-foreground mb-1">
                  Manuale dell'Idraulico Distratto
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Ebook completo + Bonus
                </p>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="text-sm text-muted-foreground line-through">€79</span>
                  <span className="text-2xl sm:text-xl font-bold text-primary">€{basePrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upsell Section - Lifetime Access */}
          <div className={`relative rounded-xl border-2 transition-all duration-300 ${
            includeLifetime 
              ? 'border-accent bg-accent/10 shadow-glow' 
              : 'border-border bg-card hover:border-accent/50'
          }`}>
            {/* Badge */}
            <div className="absolute -top-3 left-4 bg-accent text-accent-foreground font-bold text-xs uppercase px-3 py-1 rounded-full">
              🔥 Offerta Speciale
            </div>

            <div className="p-4 pt-6">
              {/* Countdown */}
              <div className="flex items-center justify-center gap-2 mb-4 bg-destructive/10 rounded-lg py-2 px-3">
                <Clock className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold text-destructive">
                  Offerta scade tra {String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                </span>
              </div>

              {/* Header with image - Mobile optimized */}
              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                {/* Image container - centered on mobile, left on desktop */}
                <div className="flex justify-center sm:justify-start flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/30 blur-xl rounded-lg"></div>
                    <img 
                      src={lifetimeAccessCover} 
                      alt="Lifetime Access" 
                      className="relative w-24 sm:w-20 h-auto rounded-lg shadow-lg border-2 border-accent/50"
                    />
                  </div>
                </div>
                
                {/* Text content - centered on mobile */}
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-lg text-foreground mb-1">
                    🚀 Aggiungi Lifetime Access
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Aggiornamenti illimitati per sempre
                  </p>
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="text-sm text-muted-foreground line-through">€97</span>
                    <span className="text-xl font-bold text-accent">+€{lifetimePrice}</span>
                    <span className="text-xs text-muted-foreground">(solo oggi)</span>
                  </div>
                </div>
              </div>


              {/* Benefits Full List */}
              <div className="bg-accent/10 rounded-lg p-4 mb-4 border border-accent/30">
                <h5 className="font-bold text-sm text-primary mb-3 text-center">
                  ✅ CON LIFETIME ACCESS OTTIENI:
                </h5>
                <div className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-lg flex-shrink-0">{benefit.icon}</span>
                      <p className="font-semibold text-sm text-foreground">{benefit.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setIncludeLifetime(!includeLifetime)}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  includeLifetime
                    ? 'bg-accent text-accent-foreground shadow-glow'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
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

          {/* Social Proof Mini */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
            </div>
            <div className="space-y-2">
              {testimonials.map((t, i) => (
                <p key={i} className="text-xs text-muted-foreground italic">
                  "{t.text}" — <span className="font-medium">{t.name}</span>
                </p>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-6 py-4 space-y-3">
          {/* Price Summary */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Totale:</span>
            <div className="flex items-baseline gap-2">
              {includeLifetime && (
                <span className="text-xs text-muted-foreground line-through">€{79 + 97}</span>
              )}
              <span className="text-2xl font-bold text-primary">€{totalPrice}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            variant="cta"
            size="lg"
            onClick={() => onCheckout(includeLifetime)}
            className="w-full text-lg font-bold py-6 group"
          >
            Procedi al Checkout
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-primary" />
              SSL Sicuro
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-primary" />
              Garanzia 60gg
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
