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
  {
    icon: "🔓",
    title: "Aggiornamenti FOREVER",
    description: "Tutte le versioni future (v2.0, v3.0...) gratis"
  },
  {
    icon: "🎁",
    title: "Early access prodotti futuri",
    description: "Sconti 20% su tutto ciò che creerò"
  },
  {
    icon: "📧",
    title: "Supporto prioritario",
    description: "Risposte rapide alle tue domande"
  }
];

const testimonials = [
  {
    name: "Paolo M.",
    text: "Ho preso Lifetime al lancio e già ricevuto 2 aggiornamenti!"
  },
  {
    name: "Simone D.",
    text: "Ogni aggiornamento aggiunge tecniche nuove. Vale tutto!"
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
  }
];

export const PrePurchaseSidebar = ({ isOpen, onClose, onCheckout }: PrePurchaseSidebarProps) => {
  const [countdown, setCountdown] = useState({ minutes: 10, seconds: 0 });
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
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              🛒 Il Tuo Carrello
            </SheetTitle>
          </SheetHeader>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Product Card - Ebook Base */}
          <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
            <div className="flex gap-4">
              <img 
                src={ebookMockup} 
                alt="Manuale dell'Idraulico Distratto" 
                className="w-20 h-auto rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-bold text-base text-foreground mb-1">
                  Manuale dell'Idraulico Distratto
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Ebook completo + Bonus
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-muted-foreground line-through">€79</span>
                  <span className="text-xl font-bold text-primary">€{basePrice}</span>
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

              <div className="flex gap-4 mb-4">
                <img 
                  src={lifetimeAccessCover} 
                  alt="Lifetime Access" 
                  className="w-16 h-auto rounded-lg shadow-md border border-accent/50"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-base text-foreground mb-1">
                    🚀 Aggiungi Lifetime Access
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Aggiornamenti illimitati per sempre
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-muted-foreground line-through">€97</span>
                    <span className="text-lg font-bold text-accent">+€{lifetimePrice}</span>
                  </div>
                </div>
              </div>

              {/* Benefits Quick List */}
              <div className="space-y-2 mb-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-base">{benefit.icon}</span>
                    <span className="text-muted-foreground">{benefit.title}</span>
                  </div>
                ))}
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setIncludeLifetime(!includeLifetime)}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  includeLifetime
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {includeLifetime ? (
                  <>
                    <Check className="w-4 h-4" />
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
