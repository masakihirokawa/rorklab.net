"use client";

import { useState } from "react";

interface PremiumPaywallProps {
  locale: string;
}

const PRO_PRICE: Record<string, string> = {
  ja: "price_1T9XeNEGB5g6A54ofvfbFcSm", // ¥500/月 JPY
  en: "price_1TALKEEGB5g6A54oBmnhCclK",  // $5/mo USD
};

export function PremiumPaywall({ locale }: PremiumPaywallProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, priceId: PRO_PRICE[locale] || PRO_PRICE.en, mode: "subscription" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Checkout failed - error handling
    } finally {
      setLoading(false);
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
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: 32,
            marginBottom: 16,
          }}
        >
          🔒
        </div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          {locale === "ja" ? "プレミアム記事" : "Premium Article"}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          {locale === "ja"
            ? "この記事の続きを読むには Rork Lab Pro メンバーシップが必要です。月額 ¥500 ですべての有料記事にアクセスできます。"
            : "A Rork Lab Pro membership is required to read the rest of this article. Get access to all premium articles for $5/month."}
        </p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 32px",
            borderRadius: 8,
            border: "none",
            background: "var(--accent-coral)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading
            ? locale === "ja"
              ? "処理中..."
              : "Loading..."
            : locale === "ja"
              ? "Pro メンバーになる — ¥500/月"
              : "Become a Pro Member — $5/mo"}
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
