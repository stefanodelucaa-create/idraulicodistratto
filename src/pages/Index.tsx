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
import { fetchProducts, ShopifyProduct, createStorefrontCheckout, CartItem } from "@/lib/shopify";
import { initClickTracking, trackAddToCart, trackInitiateCheckout } from "@/hooks/useMetaPixel";

// Variant IDs for Shopify checkout
const BASE_VARIANT_ID = "56459385897304";
const LIFETIME_VARIANT_ID = "56481765949784";

const Index = () => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    initClickTracking();
    
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(1);
        if (products.length > 0) {
          setProduct(products[0]);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };
    loadProduct();
  }, []);

  const handleBuyClick = () => {
    trackAddToCart("29", "EUR");
    setIsSidebarOpen(true);
  };

  const handleCheckout = (includeLifetime: boolean) => {
    const totalPrice = includeLifetime ? "41" : "29";
    trackInitiateCheckout(totalPrice, "EUR");
    
    let checkoutUrl: string;
    
    if (includeLifetime) {
      checkoutUrl = `https://www.idraulicodistratto.com/cart/${BASE_VARIANT_ID}:1,${LIFETIME_VARIANT_ID}:1?checkout`;
    } else {
      checkoutUrl = `https://www.idraulicodistratto.com/cart/${BASE_VARIANT_ID}:1?checkout`;
    }
    
    window.open(checkoutUrl, "_blank");
    setIsSidebarOpen(false);
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

