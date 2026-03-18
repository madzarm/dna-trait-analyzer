import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession, PRODUCTS, type PriceType } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in first." },
        { status: 401 }
      );
    }

    const { priceType } = await request.json();

    if (!priceType || !(priceType in PRODUCTS)) {
      return NextResponse.json(
        { error: "Invalid price type. Must be one of: starter, monthly, annual" },
        { status: 400 }
      );
    }

    const origin = new URL(request.url).origin;

    const session = await createCheckoutSession(
      priceType as PriceType,
      user.id,
      `${origin}/pricing?success=true`,
      `${origin}/pricing?cancelled=true`
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
