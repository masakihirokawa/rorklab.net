import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { locale, priceId, mode, cancelUrl } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rorklab.net";
    const prefix = locale === "en" ? "en/" : "";
    const fallbackCancel = `${baseUrl}/${prefix}support`;

    const session = await stripe.checkout.sessions.create({
      mode: mode || "payment",
      line_items: [
        {
          price: priceId || process.env.STRIPE_TIP_PRICE_ID!,
          quantity: 1,
        },
      ],
      // Pro（月額）のみ初月無料トライアルを付与
      ...(mode === "subscription" && {
        subscription_data: { trial_period_days: 30 },
      }),
      success_url: `${baseUrl}/${prefix}api/verify-session?session_id={CHECKOUT_SESSION_ID}&locale=${locale}`,
      cancel_url: cancelUrl || fallbackCancel,
      locale: locale === "en" ? "en" : "ja",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    // Stripe checkout error handling
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Checkout failed: ${message}` },
      { status: 500 }
    );
  }
}
