import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Download, CheckCircle } from "lucide-react";

interface FinalCTAProps {
  onBuyClick: () => void;
  price: string;
  originalPrice?: string;
}

export const FinalCTA = ({ onBuyClick, price, originalPrice }: FinalCTAProps) => {
  return (
    <section id="acquista" className="py-16 md:py-20 bg-foreground text-primary-foreground">
      <div className="container px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-5 leading-tight">
            Pronto a Trasformare il Tuo Rapporto<br className="hidden sm:block" />
            da Ansia a Connessione?
          </h2>
          
          <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Puoi continuare a sentirti sotto esame ad ogni rapporto, improvvisare tra miti porno e forum, 
            o puoi seguire una roadmap chiara, rispettosa e basata su psicologia e anatomia reale.
          </p>

          {/* Price block */}
          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-6 md:p-8 mb-8 border border-primary-foreground/20">
            {/* Value stack */}
            <div className="space-y-2 mb-6 text-sm md:text-base">
              <div className="flex items-center justify-center gap-4 text-primary-foreground/70">
                <span>Valore totale (Ebook + 6 bonus):</span>
                <span className="line-through">€204</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-primary-foreground/70">
                <span>Prezzo normale:</span>
                <span className="line-through">€79</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-lg md:text-xl text-primary-foreground/80">Oggi solo:</span>
              <span className="text-4xl md:text-5xl font-bold">{price}</span>
              <span className="bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded">-40%</span>
            </div>

            <Button 
              variant="cta" 
              size="xl" 
              onClick={onBuyClick}
              className="w-full sm:w-auto bg-primary-foreground text-foreground hover:bg-primary-foreground/90 group min-h-[52px] text-base md:text-lg px-8"
            >
              SÌ, VOGLIO INIZIARE ORA
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <p className="mt-5 text-sm md:text-base text-primary-foreground/70 max-w-lg mx-auto">
              Ricorda: hai 60 giorni per provarlo con zero rischi. 
              Se non fa per te, rimborso completo e tieni comunque i bonus.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-primary-foreground/70">
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
              <span>Garanzia 60 Giorni</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
