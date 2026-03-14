import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
      httpClient: Stripe.createFetchHttpClient(),
    });
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  let kv: KVNamespace | null = null;
  try {
    kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
  } catch {
    // KV not available
  }

  if (!kv) {
    return NextResponse.json({ received: true, note: "KV not available" });
  }

  switch (event.type) {
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const email = (sub as unknown as { customer_email?: string }).customer_email;
      if (email) {
        const kvKey = `site:rorklab:email:${email}`;
        const existing = await kv.get(kvKey);
        if (existing) {
          const record = JSON.parse(existing);
          record.expires_at = new Date(Date.now() + 31 * 24 * 3600 * 1000).toISOString();
          await kv.put(kvKey, JSON.stringify(record), { expirationTtl: 31 * 24 * 3600 });
        }
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const email = (sub as unknown as { customer_email?: string }).customer_email;
      if (email) {
        await kv.delete(`site:rorklab:email:${email}`);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
