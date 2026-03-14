"use client";

import { useState } from "react";

interface PremiumPaywallProps {
  locale: string;
}

const PLANS: Record<string, { pro: { priceId: string; label: string }; premium: { priceId: string; label: string } }> = {
  ja: {
    pro: { priceId: "price_1T9XeNEGB5g6A54ofvfbFcSm", label: "Pro — ¥500/月" },
    premium: { priceId: "price_1T9XdUEGB5g6A54oZw62YMLI", label: "Premium — ¥2,980（永久）" },
  },
  en: {
    pro: { priceId: "price_1TALKEEGB5g6A54oBmnhCclK", label: "Pro — $5/mo" },
    premium: { priceId: "price_1TALKFEGB5g6A54oZp3kYK0z", label: "Premium — $19 (lifetime)" },
  },
};

export function PremiumPaywall({ locale }: PremiumPaywallProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const plans = PLANS[locale] || PLANS.en;

  const handleCheckout = async (priceId: string, mode: string, plan: string) => {
    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, priceId, mode, cancelUrl: window.location.href }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Checkout failed - error handling
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: -120,
        paddingTop: 120,
        background:
          "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 40%)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "48px 24px",
          borderRadius: 12,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-surface))",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 12 }}>✦</div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          {locale === "ja" ? "続きを読むには" : "Continue Reading"}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          {locale === "ja"
            ? "この記事の続きは Rork Lab メンバー限定です。すべてのプレミアム記事にアクセスできます。"
            : "The rest of this article is for Rork Lab members. Get access to all premium articles."}
        </p>

        {/* Pro button */}
        <button
          onClick={() => handleCheckout(plans.pro.priceId, "subscription", "pro")}
          disabled={!!loading}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 320,
            margin: "0 auto 12px",
            padding: "12px 24px",
            borderRadius: 8,
            border: "1px solid color-mix(in srgb, var(--accent-coral) 50%, transparent)",
            background: "color-mix(in srgb, var(--accent-coral) 12%, transparent)",
            color: "var(--accent-coral)",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading === "pro" ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading === "pro"
            ? locale === "ja" ? "処理中..." : "Loading..."
            : plans.pro.label}
        </button>

        {/* Premium button */}
        <button
          onClick={() => handleCheckout(plans.premium.priceId, "payment", "premium")}
          disabled={!!loading}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 320,
            margin: "0 auto",
            padding: "12px 24px",
            borderRadius: 8,
            border: "1px solid color-mix(in srgb, var(--accent-coral) 50%, transparent)",
            background: "color-mix(in srgb, var(--accent-coral) 12%, transparent)",
            color: "var(--accent-coral)",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading === "premium" ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading === "premium"
            ? locale === "ja" ? "処理中..." : "Loading..."
            : plans.premium.label}
        </button>

        <div
          style={{
            marginTop: 16,
            fontSize: 11,
            color: "var(--text-faint)",
          }}
        >
          {locale === "ja"
            ? "Stripe による安全な決済 · いつでもキャンセル可能"
            : "Secure payment via Stripe · Cancel anytime"}
        </div>
      </div>
    </div>
  );
}
