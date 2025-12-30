import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Clock, Brain, Target, Heart, Gift } from "lucide-react";
import ebookMockup from "@/assets/ebook-mockup.png";
import bonusMockup from "@/assets/bonus-mockup.png";

interface HeroProps {
  onBuyClick: () => void;
  price: string;
  originalPrice?: string;
}

export const Hero = ({ onBuyClick, price, originalPrice }: HeroProps) => {
  return (
    <section className="min-h-screen bg-hero relative overflow-hidden">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground py-2 sm:py-2.5 text-center text-xs sm:text-sm font-medium px-3 sm:px-4">
        🎁 Offerta Lancio: 6 Bonus (valore €125) inclusi GRATIS + 53% di sconto!
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 py-6 sm:py-8 lg:py-16 px-4 sm:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Product Images - Mobile First */}
          <div
            className="order-1 flex justify-center lg:order-2 animate-fade-up min-w-0 py-8"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] md:max-w-[540px] lg:max-w-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform scale-90" />

              {/* Book Mockups - Main centered, bonus bottom-right on same plane */}
              <div className="relative flex items-end justify-center pb-4">
                {/* Main Book */}
                <img
                  src={ebookMockup}
                  alt="Squirting: La Guida Completa - Ebook"
                  loading="eager"
                  className="w-64 sm:w-72 md:w-80 lg:w-96 drop-shadow-2xl animate-float relative z-10"
                  style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))" }}
                />

                {/* Bonus Book - positioned bottom right, same plane */}
                <div className="absolute bottom-0 -right-2 sm:-right-6 md:-right-10 z-20">
                  <img
                    src={bonusMockup}
                    alt="6 Bonus Inclusi"
                    loading="eager"
                    className="w-48 sm:w-52 md:w-56 lg:w-60 drop-shadow-2xl animate-float"
                    style={{
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
                      animationDelay: "0.5s",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-1 min-w-0 w-full max-w-[560px] mx-auto lg:mx-0 space-y-4 sm:space-y-5 text-center lg:text-left">
            <h1
              className="text-[22px] sm:text-[26px] md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Elimina l'Ansia da Prestazione e Trasforma il Sesso da
              <span className="text-gradient block">Missione a Connessione</span>
            </h1>

            <p
              className="text-[15px] sm:text-base md:text-lg lg:text-xl text-muted-foreground animate-fade-up leading-relaxed break-words"
              style={{ animationDelay: "0.2s" }}
            >
              La guida scientifica di <span className="text-primary font-bold">oltre 200 pagine</span> che ti insegna psicologia sessuale, anatomia femminile reale e comunicazione strutturata per esplorare lo squirting senza pressione, senza miti porno e senza sentirti inadeguato.
            </p>

            {/* 3 Bullet points */}
            <div className="space-y-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {[
                { icon: Brain, text: "70% psicologia e comunicazione, 30% tecnica fisica" },
                { icon: Target, text: "Basato su anatomia reale: clitoride interno, punto G, ghiandole di Skene" },
                { icon: Heart, text: "Per coppie che vogliono connessione autentica, non solo 'risultati'" },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 justify-center lg:justify-start min-w-0">
                  <benefit.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 text-foreground font-medium text-left text-[14px] sm:text-[15px] md:text-base leading-snug break-words">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Price block */}
            <div
              className="bg-card/80 backdrop-blur rounded-2xl p-5 sm:p-6 shadow-elevated border border-border/50 animate-fade-up w-full"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground line-through">Prezzo normale: €79</span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">{price}</span>
                  <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">-53%</span>
                </div>
                <span className="text-sm text-primary font-medium">Risparmi: €42</span>
              </div>

              {/* CTA Button */}
              <Button
                variant="cta"
                size="xl"
                onClick={onBuyClick}
                className="w-full group min-h-[52px] text-[15px] sm:text-base md:text-lg whitespace-normal"
              >
                Ottieni Accesso Immediato + 6 Bonus
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Trust line */}
              <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Download immediato</span>
                  <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Pagamento sicuro</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Garanzia 60 giorni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};