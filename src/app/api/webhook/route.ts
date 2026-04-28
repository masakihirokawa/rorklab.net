import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
      kv = (() => { try { const { env } = getCloudflareContext(); return (env as Record<string, unknown>).PREMIUM_ACCESS as KVNamespace; } catch { return null; } })();
    } catch {
      // KV not available
    }

    if (!kv) {
      return NextResponse.json({ received: true, note: "KV not available" });
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          const rawEmail = checkoutSession.customer_details?.email;
          if (!rawEmail) break;
          const email = rawEmail.trim().toLowerCase();

          // Skip tip purchases — check against tip price IDs
          const tipPriceIds = [
            "price_1TCQyPEGB5g6A54ofaB9e5to", // JA tip
            "price_1TGTQMEGB5g6A54o6VMWCFNr", // EN tip
          ];
          const isPurchasedTip = checkoutSession.line_items?.data.some((item) =>
            tipPriceIds.includes(item.price?.id || "")
          );
          if (isPurchasedTip) break;

          // Only write KV if no existing record (backup for verify-session)
          const kvKey = `site:rorklab:email:${email}`;
          const existing = await kv.get(kvKey);
          if (existing) break;

          // Determine plan type and TTL based on mode
          const type = checkoutSession.mode === "subscription" ? "pro" : "premium";
          const ttlSeconds = type === "premium" ? 10 * 365 * 24 * 3600 : 31 * 24 * 3600;
          const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

          const kvValue = JSON.stringify({
            type,
            mode: checkoutSession.mode,
            stripe_customer_id: checkoutSession.customer,
            stripe_session_id: checkoutSession.id,
            created_at: new Date().toISOString(),
            expires_at: expiresAt.toISOString(),
          });
          await kv.put(kvKey, kvValue, { expirationTtl: ttlSeconds });
          break;
        }
        case "customer.subscription.updated": {
          const sub = event.data.object as Stripe.Subscription;
          const rawEmail = (sub as unknown as { customer_email?: string }).customer_email;
          if (!rawEmail) break;
          const email = rawEmail.trim().toLowerCase();
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
          const rawEmail = (sub as unknown as { customer_email?: string }).customer_email;
          if (!rawEmail) break;
          const email = rawEmail.trim().toLowerCase();
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
