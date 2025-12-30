import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl px-4 py-3 safe-area-pb">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through">€79</span>
            <span className="text-xl font-bold text-foreground">{price}</span>
          </div>
          <Button 
            variant="cta" 
            onClick={onBuyClick}
            className="flex-1 max-w-[200px] group min-h-[48px]"
          >
            Accesso Immediato
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
