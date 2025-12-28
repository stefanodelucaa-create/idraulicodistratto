import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { TableOfContents } from "@/components/landing/TableOfContents";
import { WhatYouGet } from "@/components/landing/WhatYouGet";
import { SocialProof } from "@/components/landing/SocialProof";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
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

    // Create cart item for direct checkout
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
      
      // Direct checkout without cart drawer for single product landing page
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      
      toast.dismiss("checkout");
      
      // Open checkout in new tab
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      toast.dismiss("checkout");
      toast.error("Errore durante il checkout", {
        description: "Riprova tra qualche momento.",
      });
      console.error("Checkout error:", error);
    }
  };

  // Format price for display
  const formatPrice = (amount: string, currencyCode: string) => {
    const num = parseFloat(amount);
    if (currencyCode === "EUR") {
      return `€${num.toFixed(0)}`;
    }
    return `${currencyCode} ${num.toFixed(2)}`;
  };

  const price = product 
    ? formatPrice(
        product.node.priceRange.minVariantPrice.amount,
        product.node.priceRange.minVariantPrice.currencyCode
      )
    : "€37";
  
  const originalPrice = "€67";

  return (
    <main className="min-h-screen">
      <Hero 
        onBuyClick={handleBuyClick} 
        price={price}
        originalPrice={originalPrice}
      />
      <Benefits />
      <TableOfContents />
      <WhatYouGet onBuyClick={handleBuyClick} />
      <SocialProof />
      <FAQ />
      <FinalCTA 
        onBuyClick={handleBuyClick} 
        price={price}
        originalPrice={originalPrice}
      />
      <Footer />
    </main>
  );
};

export default Index;
