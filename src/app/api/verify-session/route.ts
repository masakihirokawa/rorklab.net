import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");
    const locale = request.nextUrl.searchParams.get("locale") || "ja";

    if (!sessionId) {
      return NextResponse.redirect(new URL("/support", request.url));
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });

    if (session.payment_status !== "paid" && session.status !== "complete") {
      const prefix = locale === "en" ? "/en" : "";
      return NextResponse.redirect(new URL(`${prefix}/support?error=payment`, request.url));
    }

    // Check plan_type from metadata to distinguish tip from membership
    const planType = session.metadata?.plan_type;

    // Tip payments: just say thanks, no premium access granted
    // If return_url is set (e.g. from article page), redirect back to the article
    if (planType === "tip") {
      const returnUrl = session.metadata?.return_url;
      if (returnUrl) {
        const dest = new URL(returnUrl);
        dest.searchParams.set("thanks", "tip");
        return NextResponse.redirect(dest.toString());
      }
      const prefix = locale === "en" ? "/en" : "";
      return NextResponse.redirect(new URL(`${prefix}/support?thanks=tip`, request.url));
    }

    const email = session.customer_details?.email;
    if (!email) {
      const prefix = locale === "en" ? "/en" : "";
      return NextResponse.redirect(new URL(`${prefix}/support?error=email`, request.url));
    }

    const type = session.mode === "subscription" ? "pro" : "premium";
    const ttlSeconds = type === "premium" ? 10 * 365 * 24 * 3600 : 31 * 24 * 3600;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    try {
      const kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
      if (kv) {
        const kvKey = `site:rorklab:email:${email}`;
        const kvValue = JSON.stringify({
          type,
          mode: session.mode,
          stripe_customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id,
          stripe_session_id: sessionId,
          created_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString(),
        });
        await kv.put(kvKey, kvValue, { expirationTtl: ttlSeconds });
      }
    } catch {
      // KV not available yet
    }

    const token = btoa(`${email}:${sessionId}`);
    const prefix = locale === "en" ? "/en" : "";
    const response = NextResponse.redirect(new URL(`${prefix}/support?thanks=true`, request.url));

    response.cookies.set("premium_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: ttlSeconds,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL("/support?error=verify", request.url));
  }
}
