import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Clock, Download, Brain, Target, Heart } from "lucide-react";
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
      <div className="bg-primary text-primary-foreground py-2.5 text-center text-sm font-medium px-4">
        🎁 Offerta Lancio: 6 Bonus (valore €125) inclusi GRATIS + 40% di sconto!
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Product Images - Mobile First */}
          <div className="order-1 flex justify-center lg:order-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full max-w-[300px] lg:max-w-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform scale-90" />
              
              {/* Book Mockups */}
              <div className="relative flex items-end justify-center">
                {/* Main Book */}
                <img
                  src={ebookMockup}
                  alt="Squirting: La Guida Completa - Ebook"
                  className="w-56 md:w-72 lg:w-80 drop-shadow-2xl animate-float relative z-10"
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))' }}
                />
                
                {/* Bonus Book */}
                <img
                  src={bonusMockup}
                  alt="6 Bonus Inclusi"
                  className="w-32 md:w-40 lg:w-48 drop-shadow-2xl animate-float absolute -right-2 md:right-0 bottom-0"
                  style={{ 
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))',
                    animationDelay: '0.5s'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-1 space-y-5 text-center lg:text-left">
            <h1 className="text-[28px] md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Elimina l'Ansia da Prestazione e Trasforma il Sesso da
              <span className="text-gradient block">Missione a Connessione</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
              La guida scientifica di <span className="text-primary font-bold">oltre 200 pagine</span> che ti insegna psicologia sessuale, anatomia femminile reale e comunicazione strutturata per esplorare lo squirting senza pressione, senza miti porno e senza sentirti inadeguato.
            </p>

            {/* 3 Bullet points */}
            <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {[
                { icon: Brain, text: "70% psicologia e comunicazione, 30% tecnica fisica" },
                { icon: Target, text: "Basato su anatomia reale: clitoride interno, punto G, ghiandole di Skene" },
                { icon: Heart, text: "Per coppie che vogliono connessione autentica, non solo 'risultati'" },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 justify-center lg:justify-start">
                  <benefit.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium text-left text-sm md:text-base">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Price block */}
            <div className="bg-card/80 backdrop-blur rounded-2xl p-5 shadow-elevated border border-border/50 animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-sm text-muted-foreground line-through">Prezzo normale: €79</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">{price}</span>
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">-40%</span>
                  </div>
                  <span className="text-sm text-primary font-medium">Risparmi: €32</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                variant="cta" 
                size="xl" 
                onClick={onBuyClick}
                className="w-full group min-h-[52px] text-base md:text-lg"
              >
                Ottieni Accesso Immediato + 6 Bonus
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Trust line */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-primary" /> Download immediato PDF</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-primary" /> Pagamento sicuro</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> Garanzia 60 giorni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
