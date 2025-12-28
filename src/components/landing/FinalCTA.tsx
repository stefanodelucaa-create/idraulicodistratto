import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Download, Gift, BookOpen } from "lucide-react";

interface FinalCTAProps {
  onBuyClick: () => void;
  price: string;
  originalPrice?: string;
}

export const FinalCTA = ({ onBuyClick, price, originalPrice }: FinalCTAProps) => {
  return (
    <section id="acquista" className="py-20 bg-foreground text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Diventa il Partner Che Lei Desidera
          </h2>
          
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Oltre 500 uomini hanno già trasformato la loro intimità di coppia con questa guida 
            di <span className="font-bold text-primary-foreground">200+ pagine</span>. 
            Il momento di agire è adesso.
          </p>

          {/* Price block */}
          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-8 mb-8 border border-primary-foreground/20">
            {/* What you get summary */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6 pb-6 border-b border-primary-foreground/20">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Manuale 200+ pagine</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent" />
                <span>Bonus 50 pagine (€20) <strong>GRATIS</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-sm text-primary-foreground/60">Valore totale: €87</span>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-4xl md:text-5xl font-bold">{price}</span>
              {originalPrice && (
                <span className="text-xl text-primary-foreground/60 line-through">
                  {originalPrice}
                </span>
              )}
            </div>

            <Button 
              variant="cta" 
              size="xl" 
              onClick={onBuyClick}
              className="w-full sm:w-auto bg-primary-foreground text-foreground hover:bg-primary-foreground/90 group"
            >
              Acquista Ora - Soddisfala Stasera
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <p className="mt-4 text-sm text-primary-foreground/60">
              Download immediato dopo il pagamento
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Pagamento 100% Sicuro</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download Immediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Accesso a Vita</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
