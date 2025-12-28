import { useEffect } from "react";
import { toast } from "sonner";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { WhatYouGet } from "@/components/landing/WhatYouGet";
import { SocialProof } from "@/components/landing/SocialProof";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";

// Placeholder product data - will be replaced with real Shopify product
const PRODUCT_PRICE = "€37";
const ORIGINAL_PRICE = "€67";

const Index = () => {
  const { addItem, createCheckout, isLoading } = useCartStore();

  const handleBuyClick = async () => {
    // Since there's no product yet, show a message
    toast.info("Prodotto in arrivo!", {
      description: "Il prodotto sarà disponibile a breve. Contattaci per maggiori informazioni.",
    });
  };

  return (
    <main className="min-h-screen">
      <Hero 
        onBuyClick={handleBuyClick} 
        price={PRODUCT_PRICE}
        originalPrice={ORIGINAL_PRICE}
      />
      <Benefits />
      <WhatYouGet onBuyClick={handleBuyClick} />
      <SocialProof />
      <FAQ />
      <FinalCTA 
        onBuyClick={handleBuyClick} 
        price={PRODUCT_PRICE}
        originalPrice={ORIGINAL_PRICE}
      />
      <Footer />
    </main>
  );
};

export default Index;
