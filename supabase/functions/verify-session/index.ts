import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return new Response(JSON.stringify({ error: "session_id required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ error: "Payment not completed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Ensure order exists in DB (webhook may not have fired yet)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    let { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (!order) {
      // Webhook hasn't arrived yet — create order now
      const lineItems = await stripe.checkout.sessions.listLineItems(session_id);
      const includesLifetime = lineItems.data.some(
        (item) => item.price?.id === "price_1TH5GeRryg4tt4sINoVbOH3K"
      );

      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          customer_email: session.customer_details?.email || "",
          customer_name: session.customer_details?.name || "",
          amount_total: session.amount_total || 0,
          currency: session.currency || "eur",
          includes_lifetime: includesLifetime,
          status: "paid",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating order:", error);
      }
      order = newOrder;
    }

    // Generate signed URLs for downloads (valid 1 hour)
    const { data: ebookUrl } = await supabase.storage
      .from("ebooks")
      .createSignedUrl("manuale-idraulico-distratto.pdf", 3600);

    const { data: bonusUrl } = await supabase.storage
      .from("ebooks")
      .createSignedUrl("bonus-checklist.pdf", 3600);

    return new Response(
      JSON.stringify({
        success: true,
        customerName: session.customer_details?.name || "Cliente",
        customerEmail: session.customer_details?.email || "",
        amountTotal: session.amount_total,
        downloadUrl: ebookUrl?.signedUrl || null,
        bonusDownloadUrl: bonusUrl?.signedUrl || null,
        includesLifetime: order?.includes_lifetime || false,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Verify session error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
