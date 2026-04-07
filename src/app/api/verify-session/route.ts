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

    const planType = session.metadata?.plan_type;

    // ── Tip payment: just say thanks ─────────────────────────────
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

    // ── Article purchase: grant access to the specific article ───
    if (planType === "article") {
      const articleSlug = session.metadata?.article_slug;
      const returnUrl = session.metadata?.return_url;
      const email = session.customer_details?.email;

      if (articleSlug && email) {
        const ARTICLE_TTL = 10 * 365 * 24 * 3600; // 10 years
        try {
          const kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
          if (kv) {
            const kvKey = `site:rorklab:article:${email}:${articleSlug}`;
            const kvValue = JSON.stringify({
              type: "article",
              slug: articleSlug,
              stripe_session_id: sessionId,
              purchased_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + ARTICLE_TTL * 1000).toISOString(),
            });
            await kv.put(kvKey, kvValue, { expirationTtl: ARTICLE_TTL });
          }
        } catch {
          // KV not available — cookie-only fallback
        }

        // Build article_purchases cookie with slug list
        // Format: btoa(JSON.stringify({ email, slugs: ["slug1", "slug2", ...] }))
        // Read existing cookie to accumulate purchased slugs
        let existingSlugs: string[] = [];
        const existingToken = request.cookies.get("article_purchases")?.value;
        if (existingToken) {
          try {
            const decoded = atob(existingToken);
            // Handle new JSON format
            if (decoded.startsWith("{")) {
              const parsed = JSON.parse(decoded);
              existingSlugs = Array.isArray(parsed.slugs) ? parsed.slugs : [];
            }
            // Old format "email:article" — no slugs to carry over
          } catch {
            // Malformed cookie — start fresh
          }
        }

        // Add new slug if not already present
        if (!existingSlugs.includes(articleSlug)) {
          existingSlugs.push(articleSlug);
        }

        const articleToken = btoa(JSON.stringify({ email, slugs: existingSlugs }));
        const dest = returnUrl
          ? new URL(returnUrl)
          : new URL(`${locale === "en" ? "/en" : ""}/support`, request.url);

        if (returnUrl) {
          dest.searchParams.set("thanks", "article");
        }

        const response = NextResponse.redirect(dest.toString());
        response.cookies.set("article_purchases", articleToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: ARTICLE_TTL,
          path: "/",
        });
        return response;
      }

      // Fallback if slug/email missing
      const prefix = locale === "en" ? "/en" : "";
      return NextResponse.redirect(new URL(`${prefix}/support?thanks=article`, request.url));
    }

    // ── Membership purchase (pro / premium) ──────────────────────
    const email = session.customer_details?.email;
    if (!email) {
      const prefix = locale === "en" ? "/en" : "";
      return NextResponse.redirect(new URL(`${prefix}/support?error=email`, request.url));
    }

    const type = session.mode === "subscription" ? "pro" : "premium";
    const ttlSeconds = type === "premium" ? 10 * 365 * 24 * 3600 : 31 * 24 * 3600;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    // Save to Cloudflare KV
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
      // KV not available yet — continue with cookie-only auth
    }

    // Issue cookie
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
