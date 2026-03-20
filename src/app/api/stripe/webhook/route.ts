import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@supabase/ssr";
import type Stripe from "stripe";

// Use service role key for webhook handler to bypass RLS.
// Falls back to anon key if service role isn't configured.
function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Signature verification failed";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = createServiceClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const priceType = session.metadata?.priceType;

        if (!userId || !priceType) break;

        // Record the purchase
        await supabase.from("purchases").insert({
          user_id: userId,
          stripe_session_id: session.id,
          product_type: priceType,
          amount: session.amount_total || 0,
          status: "completed",
        });

        // Store stripe customer ID on profile
        if (session.customer) {
          await supabase
            .from("profiles")
            .update({ stripe_customer_id: session.customer as string })
            .eq("id", userId);
        }

        // For one-time purchases: add credits
        if (priceType === "per_trait" || priceType === "starter") {
          const creditsToAdd = priceType === "per_trait" ? 1 : 10;
          const { data: profile } = await supabase
            .from("profiles")
            .select("credits_remaining, subscription_status")
            .eq("id", userId)
            .single();

          const currentStatus = profile?.subscription_status;
          const newStatus =
            currentStatus === "active" ? "active" : priceType === "starter" ? "starter" : currentStatus || "free";

          await supabase
            .from("profiles")
            .update({
              credits_remaining: (profile?.credits_remaining || 0) + creditsToAdd,
              subscription_status: newStatus,
            })
            .eq("id", userId);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) break;

        const status =
          subscription.status === "active" ||
          subscription.status === "trialing"
            ? "active"
            : "cancelled";

        await supabase
          .from("profiles")
          .update({
            subscription_status: status,
            subscription_plan: subscription.metadata?.priceType || "monthly",
            subscription_period_end: subscription.items.data[0]?.current_period_end
              ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
              : null,
          })
          .eq("id", userId);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) break;

        await supabase
          .from("profiles")
          .update({
            subscription_status: "cancelled",
            subscription_plan: null,
            subscription_period_end: null,
          })
          .eq("id", userId);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionRef =
          invoice.parent?.subscription_details?.subscription;
        const subscriptionId =
          typeof subscriptionRef === "string"
            ? subscriptionRef
            : subscriptionRef?.id;

        if (subscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata?.userId;

          if (userId) {
            await supabase
              .from("profiles")
              .update({ subscription_status: "past_due" })
              .eq("id", userId);
          }
        }
        break;
      }

      default:
        console.log(`[stripe] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`[stripe] Error handling ${event.type}:`, err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
