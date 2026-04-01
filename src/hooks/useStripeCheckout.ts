import { useCallback, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useStripeCheckout = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const startCheckout = useCallback(async (includeLifetime = false, openInNewTab = false) => {
    const popup = openInNewTab ? window.open("about:blank", "_blank") : null;

    try {
      setIsCheckingOut(true);
      toast.loading("Preparando il checkout...", { id: "checkout" });

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { includeLifetime },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("Checkout URL non disponibile");

      toast.dismiss("checkout");

      if (popup) {
        popup.location.href = data.url;
      } else {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
      toast.dismiss("checkout");
      toast.error("Errore durante il checkout. Riprova.");
      if (popup) popup.close();
    } finally {
      setIsCheckingOut(false);
    }
  }, []);

  return { startCheckout, isCheckingOut };
};
