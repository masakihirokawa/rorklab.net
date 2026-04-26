import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
    httpClient: Stripe.createFetchHttpClient(),
  });
}

/**
 * Stripe フォールバック: KV に該当ユーザーが居ない場合、Stripe を直接検索して
 * 課金済みなら KV を再構築する。
 *
 * これにより以下のケースを救済できる:
 *   - 過去に email を case-sensitive のまま KV に書いてしまった既存ユーザー
 *   - KV がエッジレプリケーション中で一時的に欠落しているケース
 *   - KV TTL を過ぎてレコード自体が消えたが Stripe には課金履歴が残っているケース
 */
async function recoverFromStripe(
  email: string
): Promise<{ type: "pro" | "premium"; record: string; ttlSeconds: number } | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  const stripe = getStripe();

  // 同一メールで複数 Customer がある可能性に備えて全件取得
  const customers = await stripe.customers.list({ email, limit: 10 });
  if (customers.data.length === 0) return null;

  for (const cust of customers.data) {
    // 1) アクティブなサブスク → Pro
    const subs = await stripe.subscriptions.list({
      customer: cust.id,
      status: "active",
      limit: 1,
    });
    if (subs.data.length > 0) {
      const TTL = 31 * 24 * 3600; // Pro = 31日
      const record = JSON.stringify({
        type: "pro",
        mode: "subscription",
        stripe_customer_id: cust.id,
        stripe_session_id: subs.data[0].id,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + TTL * 1000).toISOString(),
        recovered: true,
      });
      return { type: "pro", record, ttlSeconds: TTL };
    }

    // 2) Premium 買い切り（一回払い）→ Checkout Session で plan_type=premium を探す
    const sessions = await stripe.checkout.sessions.list({
      customer: cust.id,
      limit: 100,
    });
    const premiumSession = sessions.data.find((s) => {
      if (s.payment_status !== "paid") return false;
      if (s.mode !== "payment") return false;
      const pt = s.metadata?.plan_type;
      // tip / article は会員資格ではない
      return pt !== "tip" && pt !== "article";
    });
    if (premiumSession) {
      const TTL = 10 * 365 * 24 * 3600; // Premium = 10年
      const record = JSON.stringify({
        type: "premium",
        mode: "payment",
        stripe_customer_id: cust.id,
        stripe_session_id: premiumSession.id,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + TTL * 1000).toISOString(),
        recovered: true,
      });
      return { type: "premium", record, ttlSeconds: TTL };
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
    if (!kv) {
      return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
    }

    const kvKey = `site:rorklab:email:${normalizedEmail}`;
    let data = await kv.get(kvKey);

    // ── KV に無ければ Stripe フォールバックで救済 ──
    let recoveredType: "pro" | "premium" | null = null;
    let recoveredTtl: number | null = null;
    if (!data) {
      try {
        const recovery = await recoverFromStripe(normalizedEmail);
        if (recovery) {
          data = recovery.record;
          recoveredType = recovery.type;
          recoveredTtl = recovery.ttlSeconds;
          // KV にも書き戻して次回以降は早期ヒットさせる
          try {
            await kv.put(kvKey, data, { expirationTtl: recovery.ttlSeconds });
          } catch {
            // 非致命: cookie だけは発行する
          }
        }
      } catch {
        // Stripe 呼び出し失敗 → 404 として扱う
      }
    }

    if (!data) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const record = JSON.parse(data);

    if (record.expires_at && new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: "expired" }, { status: 403 });
    }

    const type = (recoveredType ?? record.type) as "pro" | "premium";
    const ttlSeconds = recoveredTtl ?? (type === "premium" ? 10 * 365 * 24 * 3600 : 31 * 24 * 3600);

    // Refresh KV expiry (recovery 経由でも refresh で OK)
    try {
      await kv.put(kvKey, data, { expirationTtl: ttlSeconds });
    } catch {
      // Non-fatal: cookie will still be issued
    }

    const token = btoa(`${normalizedEmail}:restored`);
    const response = NextResponse.json({ success: true, type });

    response.cookies.set("premium_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: ttlSeconds,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
