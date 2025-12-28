import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Download } from "lucide-react";

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
            Pronto a Trasformare la Tua Intimità?
          </h2>
          
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Unisciti a oltre 500 coppie che hanno già migliorato la loro vita intima 
            con questa guida completa. Download immediato, accesso a vita.
          </p>

          {/* Price block */}
          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-8 mb-8 border border-primary-foreground/20">
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
              Acquista Ora
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
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
