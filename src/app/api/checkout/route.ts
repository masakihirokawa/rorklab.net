import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { locale, priceId, mode } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rorklab.net";
    const prefix = locale === "en" ? "en/" : "";

    const session = await stripe.checkout.sessions.create({
      mode: mode || "payment",
      line_items: [
        {
          price: priceId || process.env.STRIPE_TIP_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/${prefix}support?thanks=true`,
      cancel_url: `${baseUrl}/${prefix}support`,
      locale: locale === "en" ? "en" : "ja",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe checkout error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Checkout failed: ${message}` },
      { status: 500 }
    );
  }
}
