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
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const kv = getKV();
    if (!kv) {
      return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
    }

    const kvKey = `site:rorklab:email:${normalizedEmail}`;

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
      const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });
      if (customers.data.length === 0) {
        return NextResponse.json({ error: "not_found" }, { status: 404 });
      }

      const customer = customers.data[0];
      let plan: string | null = null;
      let ttlSeconds = 0;

      // Check active subscriptions (Pro)
      const subs = await stripe.subscriptions.list({
        customer: customer.id, status: "active", limit: 1,
      });
      if (subs.data.length > 0) {
        plan = "pro";
        ttlSeconds = 31 * 24 * 3600;
      }

      // Check checkout sessions for plan_type metadata
      const sessions = await stripe.checkout.sessions.list({
        customer: customer.id, limit: 20,
      });
      for (const session of sessions.data) {
        if (session.payment_status === "paid") {
          const pt = session.metadata?.plan_type;
          if (pt === "premium") {
            plan = "premium";
            ttlSeconds = 10 * 365 * 24 * 3600;
            break;
          } else if (pt === "pro" && plan !== "premium") {
            plan = "pro";
            ttlSeconds = 31 * 24 * 3600;
          }
        }
      }

      // Fallback: check one-time charges >= 500 cents () as likely premium
      if (!plan) {
        const charges = await stripe.charges.list({ customer: customer.id, limit: 10 });
        const premiumCharge = charges.data.find(c => c.paid && !c.refunded && (c.amount ?? 0) >= 500);
        if (premiumCharge) {
          plan = "premium";
          ttlSeconds = 10 * 365 * 24 * 3600;
        }
      }

      if (!plan) {
        return NextResponse.json({ error: "not_found" }, { status: 404 });
      }

      // Write to KV for future lookups
      const kvValue = JSON.stringify({
        type: plan,
        plan: plan,
        stripe_customer_id: customer.id,
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
    } catch {
      // Stripe API failed — return not_found since KV also had no record
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
