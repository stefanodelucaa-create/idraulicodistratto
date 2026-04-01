import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  let event: Stripe.Event;

  try {
    if (endpointSecret && signature) {
      event = await stripe.webhooks.constructEventAsync(body, signature, endpointSecret);
    } else {
      // Fallback: parse without signature verification (dev mode)
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Determine if lifetime was included by checking line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const includesLifetime = lineItems.data.some(
      (item) => item.price?.id === "price_1TH5GeRryg4tt4sINoVbOH3K"
    );

    // Insert order record
    const { error } = await supabase.from("orders").insert({
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      customer_email: session.customer_details?.email || "",
      customer_name: session.customer_details?.name || "",
      amount_total: session.amount_total || 0,
      currency: session.currency || "eur",
      includes_lifetime: includesLifetime,
      status: "paid",
    });

    if (error) {
      console.error("Error inserting order:", error);
      return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
    }

    console.log(`Order created for session ${session.id}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
