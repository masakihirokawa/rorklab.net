import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
    httpClient: Stripe.createFetchHttpClient(),
  });
}

const PLAN_NAMES: Record<string, string> = {
  // JA
  "price_1TCQyPEGB5g6A54ofaB9e5to": "Rork Lab — チップ（¥150）ご支援ありがとうございます",
  "price_1TGSqUEGB5g6A54oxdnDOxOU": "Rork Lab メンバーシップ — プロ（月額プラン）",
  "price_1TCQyxEGB5g6A54oh8U6RHec": "Rork Lab メンバーシップ — プレミアム（永久アクセス）",
  "price_1TFRyLEGB5g6A54oCoY0I3Dc": "Rork Lab メンバーシップ — プレミアム（感謝価格 ¥980）",
  // EN
  "price_1TCQyXEGB5g6A54oVQirhunP": "Rork Lab — Tip ($1.50) Thank you for your support",
  "price_1TGSqWEGB5g6A54oTOwX2C6I": "Rork Lab Membership — Pro (Monthly)",
  "price_1TCQyyEGB5g6A54oUojdhfBa": "Rork Lab Membership — Premium (Lifetime Access)",
  "price_1TFRyLEGB5g6A54opRFYkqzY": "Rork Lab Membership — Premium (Thank You Price $7)",
};

// Tip price IDs — these should NOT grant premium access
const TIP_PRICE_IDS = new Set([
  "price_1TCQyPEGB5g6A54ofaB9e5to", // ¥150 JPY
  "price_1TCQyXEGB5g6A54oVQirhunP", // $1.50 USD
]);

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { locale, priceId, mode, cancelUrl, returnUrl } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rorklab.net";
    const prefix = locale === "en" ? "en/" : "";
    const fallbackCancel = `${baseUrl}/${prefix}support`;
    const planName = PLAN_NAMES[priceId] || (locale === "en" ? "Rork Lab Membership" : "Rork Lab メンバーシップ");

    // Determine plan type for verify-session to handle correctly
    const planType = mode === "subscription" ? "pro" : TIP_PRICE_IDS.has(priceId) ? "tip" : "premium";

    const session = await stripe.checkout.sessions.create({
      mode: mode || "payment",
      line_items: [
        {
          price: priceId || process.env.STRIPE_TIP_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: { plan_type: planType, ...(returnUrl && { return_url: returnUrl }) },
      // Pro（月額）のみ初月無料トライアルを付与
      ...(mode === "subscription" && {
        subscription_data: { trial_period_days: 30, description: planName },
      }),
      ...(mode === "payment" && {
        payment_intent_data: { description: planName },
      }),
      success_url: `${baseUrl}/${prefix}api/verify-session?session_id={CHECKOUT_SESSION_ID}&locale=${locale}`,
      cancel_url: cancelUrl || fallbackCancel,
      locale: locale === "en" ? "en" : "ja",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Checkout failed: ${message}` },
      { status: 500 }
    );
  }
}
