import { useCallback } from "react";
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

const Index = () => {
  // Display price must be consistent across the landing (launch offer)
  const originalPrice = "€79";
  const price = "€37";

  // NOTE: Checkout Shopify temporaneamente scollegato dai pulsanti.
  // I pulsanti CTA portano all'ancora "#acquista" (senza aprire carrelli/checkout).
  const handleBuyClick = useCallback(() => {
    const el = document.getElementById("acquista");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "acquista";
    }
  }, []);

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
    </main>
  );
};

export default Index;

