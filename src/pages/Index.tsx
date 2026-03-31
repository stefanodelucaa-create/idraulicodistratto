import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Hero } from "@/components/landing/Hero";
import { PainPoints } from "@/components/landing/PainPoints";
import { WhyDifferent } from "@/components/landing/WhyDifferent";
import { TableOfContents } from "@/components/landing/TableOfContents";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { SocialProof } from "@/components/landing/SocialProof";
import { IsForYou } from "@/components/landing/IsForYou";
import { Guarantee } from "@/components/landing/Guarantee";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { PrePurchaseSidebar } from "@/components/landing/PrePurchaseSidebar";
import { supabase } from "@/integrations/supabase/client";
import { initClickTracking, trackAddToCart, trackInitiateCheckout } from "@/hooks/useMetaPixel";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    initClickTracking();
  }, []);

  const handleBuyClick = () => {
    trackAddToCart("29", "EUR");
    setIsSidebarOpen(true);
  };

  const handleCheckout = async (includeLifetime: boolean) => {
    const totalPrice = includeLifetime ? "41" : "29";
    trackInitiateCheckout(totalPrice, "EUR");
    setIsCheckingOut(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { includeLifetime },
      });
      
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Errore durante il checkout. Riprova.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const originalPrice = "€79";
  const price = "€29";

  return (
    <main className="min-h-screen">
      <Hero onBuyClick={handleBuyClick} price={price} originalPrice={originalPrice} />
      <PainPoints onBuyClick={handleBuyClick} />
      <WhyDifferent />
      <TableOfContents />
      <ValueProposition onBuyClick={handleBuyClick} />
      <SocialProof />
      <IsForYou />
      <FAQ />
      <Guarantee />
      <FinalCTA onBuyClick={handleBuyClick} price={price} originalPrice={originalPrice} />
      <Footer />
      <StickyCTA onBuyClick={handleBuyClick} price={price} />
      
      {/* Pre-Purchase Sidebar Cart */}
      <PrePurchaseSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCheckout={handleCheckout}
      />
    </main>
  );
};

export default Index;

