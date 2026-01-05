import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

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
      {/* Premium gradient border top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      
      <div 
        className="bg-gradient-to-b from-card to-background backdrop-blur-xl px-4 pt-3 pb-5 safe-area-pb"
        style={{ boxShadow: "0 -10px 40px -10px hsl(32 80% 35% / 0.15)" }}
      >
        {/* Single row layout: Price info + CTA */}
        <div className="flex items-center gap-4">
          {/* Left: Compact price display */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Offerta Lancio</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground line-through">€79</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{price}</span>
              </div>
            </div>
          </div>
          
          {/* Right: Full-width CTA */}
          <Button 
            variant="cta" 
            onClick={onBuyClick}
            className="flex-1 group min-h-[52px] text-base font-bold shadow-lg shadow-primary/30"
          >
            <span className="truncate">Acquista Ora</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
