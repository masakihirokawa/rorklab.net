"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getArticleLabels, getArticlePriceId, getArticlePrice } from "@/config/pricing";

interface SingleArticleCTAProps {
  locale: string;
  slug: string;
  category: string;
}

export function SingleArticleCTA({ locale, slug, category }: SingleArticleCTAProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const labels = getArticleLabels(locale);
  const price = getArticlePrice(locale);
  const prefix = locale === "ja" ? "" : `/${locale}`;
  const articleUrl = `${window?.location?.origin || ""}${prefix}/articles/${category}/${slug}`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("thanks") === "article") {
      setPurchased(true);
      // Remove the query param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("thanks");
      window.history.replaceState({}, "", url.toString());
      // Reload to show full content (server re-checks cookie)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }, []);

  const handlePurchase = async () => {
    setLoading(true);
    try {
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

  if (purchased) {
    return (
      <div
        style={{
          margin: "32px 0",
          padding: "20px 24px",
          borderRadius: 8,
          background: "var(--bg-subtle)",
          border: "1px solid var(--border-subtle)",
          textAlign: "center",
          fontSize: 14,
          color: "var(--text-primary)",
        }}
      >
        {locale === "ja"
          ? "✓ ご購入ありがとうございます！全文を読み込んでいます..."
          : "✓ Thank you for your purchase! Loading full article..."}
      </div>
    );
  }

  return (
    <div
      style={{
        margin: "32px 0",
        padding: "24px",
        borderRadius: 10,
        background: "var(--bg-subtle)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <p
        style={{
          fontSize: 14,
          color: "var(--text-muted)",
          marginBottom: 16,
          lineHeight: 1.6,
        }}
      >
        {labels.description}
      </p>

      <button
        onClick={handlePurchase}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px 20px",
          borderRadius: 7,
          background: loading ? "var(--bg-muted)" : "var(--accent)",
          color: "#fff",
          border: "none",
          fontSize: 15,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: 14,
          transition: "opacity 0.15s",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? locale === "ja"
            ? "処理中..."
            : "Processing..."
          : labels.button}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>{labels.orSeparator}</span>
        <a
          href={`${prefix}/membership`}
          style={{
            fontSize: 13,
            color: "var(--accent)",
            textDecoration: "none",
          }}
        >
          {labels.memberNote} →
        </a>
      </div>
    </div>
  );
}
