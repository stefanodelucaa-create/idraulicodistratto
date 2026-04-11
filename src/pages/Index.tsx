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
import { initClickTracking, trackAddToCart } from "@/hooks/useMetaPixel";
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts } from "@/lib/shopify";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addItem, getCheckoutUrl, isLoading } = useCartStore();

  useEffect(() => {
    initClickTracking();
  }, []);

  const handleBuyClick = () => {
    trackAddToCart("29", "EUR");
    setIsSidebarOpen(true);
  };

  const handleCheckout = async (_includeLifetime: boolean) => {
    try {
      const products = await fetchProducts(10);
      if (products.length === 0) {
        toast.error("Nessun prodotto disponibile al momento.");
        return;
      }
      // Add first product to cart
      const product = products[0];
      const variant = product.node.variants.edges[0]?.node;
      if (!variant) {
        toast.error("Variante prodotto non disponibile.");
        return;
      }
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });

      // If includeLifetime and there's a second product, add it too
      if (_includeLifetime && products.length > 1) {
        const lifetimeProduct = products[1];
        const lifetimeVariant = lifetimeProduct.node.variants.edges[0]?.node;
        if (lifetimeVariant) {
          await addItem({
            product: lifetimeProduct,
            variantId: lifetimeVariant.id,
            variantTitle: lifetimeVariant.title,
            price: lifetimeVariant.price,
            quantity: 1,
            selectedOptions: lifetimeVariant.selectedOptions || [],
          });
        }
      }

      const checkoutUrl = useCartStore.getState().getCheckoutUrl();
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      } else {
        toast.error("Errore nella creazione del checkout.");
      }
    } catch (error) {
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

