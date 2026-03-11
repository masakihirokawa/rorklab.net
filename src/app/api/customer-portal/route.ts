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
    const { sessionId, locale } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rorklab.net";

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!checkoutSession.customer) {
      return NextResponse.json(
        { error: "No customer found" },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: `${baseUrl}/${locale === "en" ? "en/" : ""}`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    // Customer portal error handling
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
