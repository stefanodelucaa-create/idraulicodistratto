import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift } from "lucide-react";

interface StickyCTAProps {
  onBuyClick: () => void;
  price: string;
}

export const StickyCTA = ({ onBuyClick, price }: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (roughly 600px)
      const shouldShow = window.scrollY > 600;
      
      // Hide when near bottom of page (near final CTA)
      const nearBottom = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 400;
      
      setIsVisible(shouldShow && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-r from-card via-card to-card/95 backdrop-blur-xl border-t border-primary/20 shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.2)] px-3 sm:px-4 py-3 sm:py-3.5 safe-area-pb">
        <div className="flex items-center justify-between gap-3">
          {/* Left section: Product name + bonus + price */}
          <div className="flex flex-col min-w-0 flex-shrink">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] sm:text-xs font-semibold text-foreground truncate">
                Manuale dell'Idraulico Distratto
              </span>
              <span className="flex items-center gap-0.5 bg-primary/15 text-primary text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                <Gift className="w-2.5 h-2.5" />
                +BONUS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs text-muted-foreground line-through">€79</span>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{price}</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            variant="cta" 
            onClick={onBuyClick}
            className="flex-shrink-0 group min-h-[48px] sm:min-h-[52px] px-4 sm:px-5 text-sm sm:text-base font-bold shadow-lg shadow-primary/25"
          >
            Acquista Ora
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
