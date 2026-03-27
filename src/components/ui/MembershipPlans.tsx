"use client";

import { useState, useEffect } from "react";
import { PRICES, CAMPAIGN } from "@/config/pricing";

interface StripeConfig {
  pro: { priceId: string };
  premium: { priceId: string };
}

interface MembershipPlansProps {
  locale: string;
  stripeConfig: StripeConfig;
  accentColor?: string;
}

const TEXT = {
  ja: {
    pro: "Pro プラン",
    proPrice: PRICES.ja.pro,
    proDesc: "月額制で全プレミアム記事にアクセス",
    premium: "Premium プラン",
    premiumPrice: CAMPAIGN.enabled ? CAMPAIGN.prices.ja : PRICES.ja.premium,
    premiumOriginalPrice: CAMPAIGN.enabled ? PRICES.ja.premium : null,
    premiumDesc: "一括払いで永久アクセス",
    recommended: CAMPAIGN.enabled ? CAMPAIGN.name.ja : "おすすめ",
    cta: "メンバーシップに登録する →",
    processing: "処理中…",
    error: "エラーが発生しました。もう一度お試しください。",
  },
  en: {
    pro: "Pro Plan",
    proPrice: PRICES.en.pro,
    proDesc: "Monthly access to all premium articles",
    premium: "Premium Plan",
    premiumPrice: CAMPAIGN.enabled ? CAMPAIGN.prices.en : PRICES.en.premium,
    premiumOriginalPrice: CAMPAIGN.enabled ? PRICES.en.premium : null,
    premiumDesc: "One-time payment for lifetime access",
    recommended: CAMPAIGN.enabled ? CAMPAIGN.name.en : "RECOMMENDED",
    cta: "Join Membership →",
    processing: "Processing…",
    error: "An error occurred. Please try again.",
  },
};

export function MembershipPlans({ locale, stripeConfig, accentColor }: MembershipPlansProps) {
  const t = TEXT[locale as keyof typeof TEXT] || TEXT.en;
  const accent = accentColor || "var(--accent-coral)";
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Reset loading state when returning from Stripe via browser back button (bfcache)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setLoading(null);
        setError("");
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleCheckout = async (priceId: string, mode: "payment" | "subscription", key: string) => {
    setLoading(key);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          priceId,
          mode,
          cancelUrl: `${window.location.origin}/${locale === "en" ? "en/" : ""}membership`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || t.error);
        setLoading(null);
      }
    } catch {
      setError(t.error);
      setLoading(null);
    }
  };

  return (
    <>
      {/* Plans */}
      <div style={{ display: "flex", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
        {/* Premium — Recommended */}
        <button
          onClick={() => handleCheckout(stripeConfig.premium.priceId, "payment", "premium")}
          disabled={loading !== null}
          className="plan-card"
          style={{
            display: "block",
            padding: "16px 24px",
            borderRadius: 10,
            border: `1px solid color-mix(in srgb, ${accent} 50%, transparent)`,
            background: `color-mix(in srgb, ${accent} 8%, var(--bg-primary))`,
            minWidth: 200,
            textDecoration: "none",
            position: "relative",
            transition: "all 0.25s",
            cursor: loading ? "wait" : "pointer",
            textAlign: "left" as const,
            opacity: loading && loading !== "premium" ? 0.5 : 1,
          }}
        >
          <span style={{
            position: "absolute" as const, top: -9, right: 12,
            fontSize: 9, fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em",
            padding: "3px 8px 1px", borderRadius: 4,
            background: CAMPAIGN.enabled ? "linear-gradient(135deg, #b8860b, #daa520, #f0c040)" : accent,
            color: CAMPAIGN.enabled ? "#fff" : "var(--bg-primary)",
            fontWeight: 700,
          }}>
            {t.recommended}
          </span>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
            {t.premium}
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, marginBottom: 4, display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            {t.premiumOriginalPrice && (
              <span style={{
                fontSize: 15,
                color: "var(--text-dim)",
                textDecoration: "line-through",
                textDecorationColor: "var(--text-faint)",
                fontWeight: 400,
              }}>
                {t.premiumOriginalPrice}
              </span>
            )}
            <span style={{
              color: CAMPAIGN.enabled ? "#daa520" : accent,
              fontWeight: CAMPAIGN.enabled ? 600 : 300,
            }}>
              {t.premiumPrice}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
            {loading === "premium" ? t.processing : t.premiumDesc}
          </div>
        </button>
        {/* Pro */}
        <button
          onClick={() => handleCheckout(stripeConfig.pro.priceId, "subscription", "pro")}
          disabled={loading !== null}
          className="plan-card"
          style={{
            display: "block",
            padding: "16px 24px",
            borderRadius: 10,
            border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
            background: `color-mix(in srgb, ${accent} 4%, var(--bg-primary))`,
            minWidth: 200,
            textDecoration: "none",
            transition: "all 0.25s",
            cursor: loading ? "wait" : "pointer",
            textAlign: "left" as const,
            opacity: loading && loading !== "pro" ? 0.5 : 1,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
            {t.pro}
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, color: accent, marginBottom: 4 }}>
            {t.proPrice}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
            {loading === "pro" ? t.processing : t.proDesc}
          </div>
        </button>
      </div>

      {/* CTA */}
      <button
        onClick={() => handleCheckout(stripeConfig.premium.priceId, "payment", "premium-cta")}
        disabled={loading !== null}
        className="membership-cta"
        style={{
          display: "inline-block",
          fontSize: 14,
          fontWeight: 600,
          color: accent,
          padding: "12px 28px",
          borderRadius: 8,
          border: `1px solid color-mix(in srgb, ${accent} 40%, transparent)`,
          background: `color-mix(in srgb, ${accent} 8%, transparent)`,
          transition: "all 0.25s",
          cursor: loading ? "wait" : "pointer",
          opacity: loading && loading !== "premium-cta" ? 0.5 : 1,
        }}
      >
        {loading === "premium-cta" ? t.processing : t.cta}
      </button>

      {error && (
        <p style={{ color: "#e74c3c", fontSize: 13, marginTop: 12 }}>{error}</p>
      )}
    </>
  );
}
