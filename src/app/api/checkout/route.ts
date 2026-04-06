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
  "price_1TGSqUEGB5g6A54oxdnDOxOU": "Rork Lab メンバーシップ — Pro（月額プラン）",
  "price_1TCQyxEGB5g6A54oh8U6RHec": "Rork Lab メンバーシップ — Premium（永久アクセス）",
  "price_1TFRyLEGB5g6A54oCoY0I3Dc": "Rork Lab メンバーシップ — Premium（感謝価格 ¥980）",
  // EN
  "price_1TGTQMEGB5g6A54o6VMWCFNr": "Rork Lab — Tip ($1.50) Thank you for your support",
  "price_1TGTQMEGB5g6A54oI8AwS76H": "Rork Lab Membership — Pro (Monthly)",
  "price_1TGTQNEGB5g6A54oGbFKBsq7": "Rork Lab Membership — Premium (Lifetime Access)",
  "price_1TGTQNEGB5g6A54oCroqkbv3": "Rork Lab Membership — Premium (Thank You Price $7)",
};

// Tip price IDs — these should NOT grant premium access
const TIP_PRICE_IDS = new Set([
  "price_1TCQyPEGB5g6A54ofaB9e5to", // ¥150 JPY
  "price_1TGTQMEGB5g6A54o6VMWCFNr", // $1.50 USD
]);

// Article price IDs — per-article purchases
const ARTICLE_PRICE_IDS = new Set([
  "price_ARTICLE_JA_RORKLAB",  // ¥250 JPY
  "price_ARTICLE_EN_RORKLAB",  // $1.75 USD
]);

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { locale, priceId, mode, cancelUrl, returnUrl, articleSlug } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rorklab.net";
    const prefix = locale === "en" ? "en/" : "";
    const fallbackCancel = `${baseUrl}/${prefix}support`;
    const planName = PLAN_NAMES[priceId] || (locale === "en" ? "Rork Lab Membership" : "Rork Lab メンバーシップ");

    // Determine plan type for verify-session to handle correctly
    let planType: string;
    if (mode === "subscription") {
      planType = "pro";
    } else if (TIP_PRICE_IDS.has(priceId)) {
      planType = "tip";
    } else if (ARTICLE_PRICE_IDS.has(priceId)) {
      planType = "article";
    } else {
      planType = "premium";
    }

    // Article purchases require a slug
    if (planType === "article" && !articleSlug) {
      return NextResponse.json({ error: "articleSlug is required for article purchases" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: mode || "payment",
      line_items: [
        {
          price: priceId || process.env.STRIPE_TIP_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        plan_type: planType,
        ...(returnUrl && { return_url: returnUrl }),
        ...(articleSlug && { article_slug: articleSlug }),
      },
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
