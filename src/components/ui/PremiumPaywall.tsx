"use client";

import { useState } from "react";

interface PremiumPaywallProps {
  locale: string;
}

const PLANS: Record<string, { pro: { priceId: string; label: string }; premium: { priceId: string; label: string } }> = {
  ja: {
    pro: { priceId: "price_1TCQyjEGB5g6A54opYFArVOk", label: "Pro — ¥380/月" },
    premium: { priceId: "price_1TCQyxEGB5g6A54oh8U6RHec", label: "Premium — ¥1,480（永久）" },
  },
  en: {
    pro: { priceId: "price_1TCQylEGB5g6A54oNYYQAjPX", label: "Pro — $3/mo" },
    premium: { priceId: "price_1TCQyyEGB5g6A54oUojdhfBa", label: "Premium — $10 (lifetime)" },
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
      // Checkout error handled silently
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: -200,
        paddingTop: 200,
        background:
          "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 65%)",
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
          {locale === "ja" ? "ここまでお読みいただきありがとうございます" : "Thank you for reading this far"}
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
            ? "この先には、実装コードやベンチマーク結果など、より実践的な内容をご用意しています。メンバーシップで続きをお読みいただけます。"
            : "What follows includes implementation code, benchmarks, and more hands-on content. Membership unlocks the full article."}
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
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 20%, transparent)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 12%, transparent)";
            e.currentTarget.style.transform = "translateY(0)";
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
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 20%, transparent)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 12%, transparent)";
            e.currentTarget.style.transform = "translateY(0)";
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
