import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${process.env.STRIPE_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "email_required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Look up customer in Stripe
    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });
    if (customers.data.length === 0) {
      return NextResponse.json({ error: "customer_not_found" }, { status: 404 });
    }

    const customer = customers.data[0];

    // Check for active subscriptions (Pro)
    const subs = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    // Check for one-time payments (Premium)
    const charges = await stripe.charges.list({
      customer: customer.id,
      limit: 10,
    });

    const paidCharges = charges.data.filter(c => c.paid && !c.refunded);

    let plan: string | null = null;
    let ttlSeconds = 0;

    if (subs.data.length > 0) {
      plan = "pro";
      ttlSeconds = 31 * 24 * 3600;
    }

    // Check for premium (one-time >=  / 500 cents)
    const premiumCharge = paidCharges.find(c => (c.amount ?? 0) >= 500 && !c.invoice);
    if (premiumCharge) {
      plan = "premium";
      ttlSeconds = 10 * 365 * 24 * 3600;
    }

    // Also check checkout sessions
    const sessions = await stripe.checkout.sessions.list({
      customer: customer.id,
      limit: 10,
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

    if (!plan) {
      return NextResponse.json({
        error: "no_qualifying_payment",
        customer_id: customer.id,
        charges_count: paidCharges.length,
        sessions_count: sessions.data.length,
      }, { status: 404 });
    }

    // Write to KV
    let kvResult = "not_available";
    try {
      const { env } = getCloudflareContext();
      const kv = (env as Record<string, unknown>).PREMIUM_ACCESS as KVNamespace;
      if (kv) {
        const kvKey = `site:rorklab:email:${normalizedEmail}`;
        const kvValue = JSON.stringify({
          type: plan,
          plan: plan,
          mode: plan === "pro" ? "subscription" : "payment",
          stripe_customer_id: customer.id,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
          source: "admin-seed",
        });
        await kv.put(kvKey, kvValue, { expirationTtl: ttlSeconds });
        kvResult = "written";

        // Verify
        const check = await kv.get(kvKey);
        if (check) kvResult = "verified";
      }
    } catch (e) {
      kvResult = `error: ${String(e)}`;
    }

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      plan,
      customer_id: customer.id,
      kv: kvResult,
    });
  } catch (e) {
    return NextResponse.json({ error: "server_error", detail: String(e) }, { status: 500 });
  }
}
