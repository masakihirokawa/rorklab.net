"use client";

import { useEffect, useState } from "react";
import { getArticleLabels, getArticlePriceId, getArticlePrice } from "@/config/pricing";

interface SingleArticleCTAProps {
  locale: string;
  slug: string;
  category: string;
}

export function SingleArticleCTA({ locale, slug, category }: SingleArticleCTAProps) {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const labels = getArticleLabels(locale);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("thanks") === "article") {
      setPurchased(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("thanks");
      window.history.replaceState({}, "", url.toString());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, []);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const prefix = locale === "ja" ? "" : `/${locale}`;
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const articleUrl = `${origin}${prefix}/articles/${category}/${slug}`;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          priceId: getArticlePriceId(locale),
          mode: "payment",
          returnUrl: articleUrl,
          cancelUrl: articleUrl,
          articleSlug: slug,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  const membershipHref = locale === "ja" ? "/membership" : "/en/membership";

  if (purchased) {
    return (
      <div
        style={{
          margin: "32px 0",
          padding: "20px 24px",
          borderRadius: 10,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "var(--accent-coral)",
            lineHeight: 1.8,
            margin: 0,
            fontWeight: 500,
          }}
        >
          {locale === "ja"
            ? "✦ ご購入いただき、誠にありがとうございます。全文を読み込んでいます..."
            : "✦ Thank you so much for your purchase! Loading the full article..."}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        margin: "32px 0 0",
        padding: "28px 24px",
        borderRadius: 10,
        border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
        background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-surface))",
        textAlign: "center",
      }}
    >
      {/* Icon + heading */}
      <div style={{ fontSize: 22, marginBottom: 8 }}>✦</div>
      <h4
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: 10,
        }}
      >
        {locale === "ja" ? "この記事を単体で購入する" : "Purchase This Article"}
      </h4>

      <p
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: 20,
          maxWidth: 360,
          margin: "0 auto 20px",
        }}
      >
        {labels.description}
      </p>

      {/* Purchase button */}
      <button
        onClick={handlePurchase}
        disabled={loading}
        style={{
          display: "block",
          width: "100%",
          maxWidth: 320,
          margin: "0 auto 16px",
          padding: "14px 24px",
          borderRadius: 8,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 50%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 12%, transparent)",
          color: "var(--accent-coral)",
          fontSize: 14,
          fontWeight: 700,
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s",
          letterSpacing: "-0.01em",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.background =
              "color-mix(in srgb, var(--accent-coral) 20%, transparent)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "color-mix(in srgb, var(--accent-coral) 12%, transparent)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {loading
          ? (locale === "ja" ? "決済ページへ移動中..." : "Redirecting to checkout...")
          : labels.button}
      </button>

      {/* Or separator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          maxWidth: 320,
          margin: "0 auto 14px",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
        <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
          {labels.orSeparator}
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
      </div>

      {/* Membership upsell */}
      <a
        href={membershipHref}
        style={{
          display: "inline-block",
          fontSize: 13,
          color: "var(--accent-coral)",
          padding: "8px 20px",
          borderRadius: 6,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
          background: "transparent",
          textDecoration: "none",
          fontWeight: 500,
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "color-mix(in srgb, var(--accent-coral) 8%, transparent)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {labels.memberNote} →
      </a>
    </div>
  );
}
