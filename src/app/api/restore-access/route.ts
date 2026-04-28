import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Stripe from "stripe";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

function getKV(): KVNamespace | null {
  try {
    const { env } = getCloudflareContext();
    return (env as Record<string, unknown>).PREMIUM_ACCESS as KVNamespace || null;
  } catch {
    return null;
  }
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, admin_grant } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const kv = getKV();
    if (!kv) {
      return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
    }

    const kvKey = `site:rorklab:email:${normalizedEmail}`;

    // ── Admin grant: protected by webhook secret ──
    if (admin_grant && (admin_grant === "premium" || admin_grant === "pro")) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader || authHeader !== `Bearer ${process.env.STRIPE_WEBHOOK_SECRET}`) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }

      const ttlSeconds = admin_grant === "premium" ? 10 * 365 * 24 * 3600 : 31 * 24 * 3600;
      const kvValue = JSON.stringify({
        type: admin_grant,
        plan: admin_grant,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
        source: "admin-grant",
      });
      await kv.put(kvKey, kvValue, { expirationTtl: ttlSeconds });

      const token = btoa(`${normalizedEmail}:restored`);
      const response = NextResponse.json({ success: true, type: admin_grant, source: "admin" });
      response.cookies.set("premium_token", token, {
        httpOnly: true, secure: true, sameSite: "lax", maxAge: ttlSeconds, path: "/",
      });
      return response;
    }

    // ── Step 1: Check KV ──
    const data = await kv.get(kvKey);
    if (data) {
      const record = JSON.parse(data);
      if (new Date(record.expires_at) < new Date()) {
        return NextResponse.json({ error: "expired" }, { status: 403 });
      }
      const type = (record.type || record.plan) as "pro" | "premium";
      const ttlSeconds = type === "premium" ? 10 * 365 * 24 * 3600 : 31 * 24 * 3600;
      try { await kv.put(kvKey, data, { expirationTtl: ttlSeconds }); } catch { /* non-fatal */ }

      const token = btoa(`${normalizedEmail}:restored`);
      const response = NextResponse.json({ success: true, type });
      response.cookies.set("premium_token", token, {
        httpOnly: true, secure: true, sameSite: "lax", maxAge: ttlSeconds, path: "/",
      });
      return response;
    }

    // ── Step 2: KV miss — check Stripe as fallback ──
    try {
      const stripe = getStripe();

      // Search for customer by email
      const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });
      if (customers.data.length > 0) {
        const customer = customers.data[0];
        let plan: string | null = null;
        let ttlSeconds = 0;

        // Check active subscriptions (Pro)
        const subs = await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 1 });
        if (subs.data.length > 0) {
          plan = "pro";
          ttlSeconds = 31 * 24 * 3600;
        }

        // Check checkout sessions for plan_type metadata
        const sessions = await stripe.checkout.sessions.list({ customer: customer.id, limit: 20 });
        for (const session of sessions.data) {
          if (session.payment_status === "paid") {
            const pt = session.metadata?.plan_type;
            if (pt === "premium") { plan = "premium"; ttlSeconds = 10 * 365 * 24 * 3600; break; }
            else if (pt === "pro" && plan !== "premium") { plan = "pro"; ttlSeconds = 31 * 24 * 3600; }
          }
        }

        if (plan) {
          const kvValue = JSON.stringify({
            type: plan, plan, stripe_customer_id: customer.id,
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
            source: "restore-stripe-fallback",
          });
          try { await kv.put(kvKey, kvValue, { expirationTtl: ttlSeconds }); } catch { /* non-fatal */ }

          const token = btoa(`${normalizedEmail}:restored`);
          const response = NextResponse.json({ success: true, type: plan });
          response.cookies.set("premium_token", token, {
            httpOnly: true, secure: true, sameSite: "lax", maxAge: ttlSeconds, path: "/",
          });
          return response;
        }
      }

      // Fallback: search recent checkout sessions by iterating (for guest checkouts)
      let hasMore = true;
      let startingAfter: string | undefined;
      let found = false;
      for (let page = 0; page < 5 && hasMore && !found; page++) {
        const params: Record<string, unknown> = { limit: 100 };
        if (startingAfter) params.starting_after = startingAfter;
        const sessions = await stripe.checkout.sessions.list(params as Stripe.Checkout.SessionListParams);
        for (const session of sessions.data) {
          const sessionEmail = session.customer_details?.email?.trim().toLowerCase();
          if (sessionEmail === normalizedEmail && session.payment_status === "paid") {
            const pt = session.metadata?.plan_type;
            if (pt === "premium" || pt === "pro") {
              const ttlSeconds = pt === "premium" ? 10 * 365 * 24 * 3600 : 31 * 24 * 3600;
              const kvValue = JSON.stringify({
                type: pt, plan: pt,
                created_at: new Date().toISOString(),
                expires_at: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
                source: "restore-session-scan",
              });
              try { await kv.put(kvKey, kvValue, { expirationTtl: ttlSeconds }); } catch { /* non-fatal */ }

              const token = btoa(`${normalizedEmail}:restored`);
              const response = NextResponse.json({ success: true, type: pt });
              response.cookies.set("premium_token", token, {
                httpOnly: true, secure: true, sameSite: "lax", maxAge: ttlSeconds, path: "/",
              });
              return response;
            }
          }
        }
        hasMore = sessions.has_more;
        if (sessions.data.length > 0) startingAfter = sessions.data[sessions.data.length - 1].id;
      }
    } catch {
      // Stripe API failed
    }

    return NextResponse.json({ error: "not_found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
