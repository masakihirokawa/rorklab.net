import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
      httpClient: Stripe.createFetchHttpClient(),
    });

    let event: Stripe.Event;
    try {
      // Use constructEventAsync with SubtleCryptoProvider for Cloudflare Workers (Web Crypto API)
      event = await stripe.webhooks.constructEventAsync(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
        undefined,
        Stripe.createSubtleCryptoProvider()
      );
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

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const email = session.customer_details?.email?.trim().toLowerCase();
          if (email) {
            const kvKey = `site:rorklab:email:${email}`;
            const now = new Date();
            let plan: string;
            let ttlSeconds: number;

            if (session.mode === "subscription") {
              // Pro monthly plan
              plan = "pro";
              ttlSeconds = 31 * 24 * 3600;
            } else if ((session.amount_total ?? 0) >= 500) {
              // Premium lifetime
              plan = "premium";
              ttlSeconds = 10 * 365 * 24 * 3600; // 10 years
            } else {
              // Tip / supporter
              plan = "supporter";
              ttlSeconds = 365 * 24 * 3600; // 1 year
            }

            const record = {
              plan,
              granted_at: now.toISOString(),
              expires_at: new Date(now.getTime() + ttlSeconds * 1000).toISOString(),
              source: "checkout",
            };
            await kv.put(kvKey, JSON.stringify(record), { expirationTtl: ttlSeconds });
          }
          break;
        }
        case "customer.subscription.updated": {
          const sub = event.data.object as Stripe.Subscription;
          const email = (sub as unknown as { customer_email?: string }).customer_email?.trim().toLowerCase();
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
          const email = (sub as unknown as { customer_email?: string }).customer_email?.trim().toLowerCase();
          if (email) {
            await kv.delete(`site:rorklab:email:${email}`);
          }
          break;
        }
      }
    } catch {
      // KV operation failed — still acknowledge the webhook to prevent retries
      return NextResponse.json({ received: true, note: "KV operation error" });
    }

    return NextResponse.json({ received: true });
  } catch {
    // Top-level catch to prevent unhandled errors returning 500
    return NextResponse.json({ received: true, note: "Internal error" });
  }
}
