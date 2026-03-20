import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

/** @deprecated Use getStripe() for lazy initialization */
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type PriceType = "per_trait" | "starter" | "monthly" | "annual";

export const PRODUCTS = {
  per_trait: {
    name: "Single Trait",
    description: "1 trait analysis — one-time purchase",
    priceId: process.env.STRIPE_PRICE_PER_TRAIT!,
    mode: "payment" as const,
    analyses: 1,
    amount: 99, // $0.99
  },
  starter: {
    name: "Starter Pack",
    description: "5 trait analyses — one-time purchase",
    priceId: process.env.STRIPE_PRICE_STARTER!,
    mode: "payment" as const,
    analyses: 5,
    amount: 999, // $9.99
  },
  monthly: {
    name: "Monthly Pro",
    description: "Unlimited analyses — billed monthly",
    priceId: process.env.STRIPE_PRICE_MONTHLY!,
    mode: "subscription" as const,
    analyses: Infinity,
    amount: 1499, // $14.99/mo
  },
  annual: {
    name: "Annual Pro",
    description: "Unlimited analyses — billed annually",
    priceId: process.env.STRIPE_PRICE_ANNUAL!,
    mode: "subscription" as const,
    analyses: Infinity,
    amount: 9900, // $99/yr
  },
} as const;

export async function createCheckoutSession(
  priceType: PriceType,
  userId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const product = PRODUCTS[priceType];

  return stripe.checkout.sessions.create({
    mode: product.mode,
    line_items: [
      {
        price: product.priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      priceType,
    },
    ...(product.mode === "subscription"
      ? { subscription_data: { metadata: { userId, priceType } } }
      : { payment_intent_data: { metadata: { userId, priceType } } }),
  });
}

export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
