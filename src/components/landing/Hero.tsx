import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, BookOpen, Gift } from "lucide-react";
import libroCover from "@/assets/libro-cover.png";
import bonusCover from "@/assets/bonus-cover.png";
import { Book3DScene } from "./Book3D";

interface HeroProps {
  onBuyClick: () => void;
  price: string;
  originalPrice?: string;
}

export const Hero = ({ onBuyClick, price, originalPrice }: HeroProps) => {
  return (
    <section className="min-h-screen bg-hero relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-6 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-soft animate-fade-up">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                +500 coppie soddisfatte
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Diventa il Partner
              <span className="text-gradient block">Che Lei Desidera</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              La guida definitiva di <span className="text-primary font-bold">oltre 200 pagine</span> per 
              soddisfare completamente la tua partner. Tecniche pratiche, fondamenti scientifici, 
              e segreti che trasformeranno la vostra intimità.
            </p>

            {/* Quick benefits */}
            <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {[
                { icon: BookOpen, text: "200+ pagine di contenuti completi" },
                { icon: CheckCircle, text: "Tecniche step-by-step illustrate" },
                { icon: Gift, text: "Bonus €20 incluso GRATIS (50 pagine)" }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                  <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                variant="cta" 
                size="xl" 
                onClick={onBuyClick}
                className="group"
              >
                Acquista Ora
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-foreground">{price}</span>
                {originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <span>✓ Download immediato</span>
              <span>✓ Accesso a vita</span>
              <span>✓ Pagamento sicuro</span>
            </div>
          </div>

          {/* 3D Product Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform scale-90" />
              
              {/* 3D Book Scene */}
              <Suspense fallback={
                <div className="flex items-end gap-4 justify-center">
                  <img
                    src={libroCover}
                    alt="Manuale dell'Idraulico Distratto - Ebook Cover"
                    className="w-48 lg:w-64 animate-float shadow-elevated rounded-lg"
                  />
                  <img
                    src={bonusCover}
                    alt="Bonus - Risorse Pratiche"
                    className="w-32 lg:w-44 animate-float shadow-elevated rounded-lg opacity-90"
                  />
                </div>
              }>
                <Book3DScene mainCover={libroCover} bonusCover={bonusCover} />
              </Suspense>

              {/* Floating badges */}
              <div className="absolute bottom-8 left-0 bg-card rounded-xl px-4 py-3 shadow-elevated z-20 animate-fade-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">200+ Pagine</p>
                    <p className="text-sm text-muted-foreground">6 Sezioni Complete</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-0 bg-accent/90 rounded-xl px-4 py-3 shadow-elevated z-20 animate-fade-up" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-accent-foreground" />
                  <div>
                    <p className="font-bold text-accent-foreground text-sm">BONUS GRATIS</p>
                    <p className="text-xs text-accent-foreground/80">Valore €20</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
