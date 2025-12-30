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
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts, ShopifyProduct, createStorefrontCheckout, CartItem } from "@/lib/shopify";

const Index = () => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem, isLoading } = useCartStore();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts(1);
        if (products.length > 0) {
          setProduct(products[0]);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, []);

  const handleBuyClick = async () => {
    if (!product) {
      toast.error("Prodotto non disponibile", {
        description: "Riprova tra qualche momento.",
      });
      return;
    }

    const variant = product.node.variants.edges[0]?.node;
    if (!variant) {
      toast.error("Variante non disponibile");
      return;
    }

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    };

    try {
      toast.loading("Preparando il checkout...", { id: "checkout" });
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      toast.dismiss("checkout");
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      toast.dismiss("checkout");
      toast.error("Errore durante il checkout", {
        description: "Riprova tra qualche momento.",
      });
      console.error("Checkout error:", error);
    }
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    const num = parseFloat(amount);
    if (currencyCode === "EUR") {
      return `€${num.toFixed(0)}`;
    }
    return `${currencyCode} ${num.toFixed(2)}`;
  };

  // Display price must be consistent across the landing (launch offer)
  // Note: make sure the Shopify product price is also set to €47 to avoid checkout mismatch.
  const originalPrice = "€79";
  const price = "€47";

  // If you need the real Shopify price for debugging, keep it here (not shown in UI)
  const _shopifyPrice = product
    ? formatPrice(
        product.node.priceRange.minVariantPrice.amount,
        product.node.priceRange.minVariantPrice.currencyCode
      )
    : price;

  return (
    <main className="min-h-screen">
      <Hero 
        onBuyClick={handleBuyClick} 
        price={price}
        originalPrice={originalPrice}
      />
      <PainPoints onBuyClick={handleBuyClick} />
      <WhyDifferent />
      <TableOfContents />
      <ValueProposition onBuyClick={handleBuyClick} />
      <SocialProof />
      <IsForYou />
      <FAQ />
      <Guarantee />
      <FinalCTA 
        onBuyClick={handleBuyClick} 
        price={price}
        originalPrice={originalPrice}
      />
      <Footer />
      <StickyCTA onBuyClick={handleBuyClick} price={price} />
    </main>
  );
};

export default Index;
