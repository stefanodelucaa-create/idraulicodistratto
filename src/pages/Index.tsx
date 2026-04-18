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
import { initClickTracking, trackAddToCart, trackInitiateCheckout, trackViewContent } from "@/hooks/useMetaPixel";
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts } from "@/lib/shopify";
import { getLandingProducts, prefetchLandingProducts } from "@/lib/productsCache";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addItem, getCheckoutUrl, isLoading } = useCartStore();

  useEffect(() => {
    initClickTracking();
    trackViewContent('Il Protocollo del Piacere', '29', 'EUR');
    prefetchLandingProducts();
  }, []);

  const handleBuyClick = () => {
    trackAddToCart("29", "EUR");
    prefetchLandingProducts();
    setIsSidebarOpen(true);
  };

  const handleCheckout = async (includeLifetime: boolean) => {
    trackInitiateCheckout(includeLifetime ? "41.90" : "29.90", "EUR");
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    // Desktop: open blank tab synchronously. Mobile: redirect same tab (popup blockers)
    const checkoutWindow = isMobile ? null : window.open('', '_blank');
    try {
      useCartStore.getState().clearCart();

      const allProducts = await getLandingProducts();
      const mainProduct = allProducts.find(p => p.node.handle === "protocollo-del-piacere");
      if (!mainProduct) {
        checkoutWindow?.close();
        toast.error("Prodotto non trovato.");
        return;
      }
      const mainVariant = mainProduct.node.variants.edges[0]?.node;
      if (!mainVariant) { checkoutWindow?.close(); return; }

      await addItem({
        product: mainProduct, variantId: mainVariant.id, variantTitle: mainVariant.title,
        price: mainVariant.price, quantity: 1, selectedOptions: mainVariant.selectedOptions || [],
      });

      if (includeLifetime) {
        const lifetimeProduct = allProducts.find(p => p.node.handle === "lifetime-access-il-protocollo-del-piacere");
        const lifetimeVariant = lifetimeProduct?.node.variants.edges[0]?.node;
        if (lifetimeVariant && lifetimeProduct) {
          await addItem({
            product: lifetimeProduct, variantId: lifetimeVariant.id, variantTitle: lifetimeVariant.title,
            price: lifetimeVariant.price, quantity: 1, selectedOptions: lifetimeVariant.selectedOptions || [],
          });
        }
      }

      const checkoutUrl = useCartStore.getState().getCheckoutUrl();
      if (!checkoutUrl) {
        checkoutWindow?.close();
        toast.error("Errore nella creazione del checkout.");
        return;
      }

      if (isMobile || !checkoutWindow || checkoutWindow.closed) {
        window.location.href = checkoutUrl;
      } else {
        checkoutWindow.location.href = checkoutUrl;
      }
    } catch (error) {
      checkoutWindow?.close();
      console.error('Checkout error:', error);
      toast.error("Errore durante il checkout. Riprova.");
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

