"use client";

import { useState, useEffect } from "react";

interface TipCTAProps {
  locale: string;
}

const STRIPE_TIP: Record<string, string> = {
  ja: "price_1TCQyPEGB5g6A54ofaB9e5to", // ¥150 JPY
  en: "price_1TCQyXEGB5g6A54oVQirhunP", // $1.50 USD
};

const CONTENT = {
  ja: {
    message:
      "この記事がお役に立ちましたら、チップ（¥150）で応援いただけると今後の執筆の励みになります。",
    link: "チップで応援する →",
    sending: "決済ページへ移動中...",
    error: "エラーが発生しました。もう一度お試しください。",
    thanks:
      "チップをお送りいただきありがとうございます！いただいたご支援は、サーバー費用やコンテンツ制作に大切に使わせていただきます。",
  },
  en: {
    message:
      "If you found this article helpful, a small tip ($1.50) would really encourage us to keep writing.",
    link: "Leave a Tip →",
    sending: "Redirecting to checkout...",
    error: "Something went wrong. Please try again.",
    thanks:
      "Thank you so much for your tip! Your support goes directly toward server costs and content creation.",
  },
};

export function TipCTA({ locale }: TipCTAProps) {
  const t = CONTENT[locale as keyof typeof CONTENT] || CONTENT.en;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("thanks") === "tip") {
      setShowThanks(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("thanks");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const handleTip = async () => {
    setLoading(true);
    setError("");
    try {
      const priceId = STRIPE_TIP[locale] || STRIPE_TIP.en;
      const currentUrl = window.location.href;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, priceId, mode: "payment", cancelUrl: currentUrl, returnUrl: currentUrl }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(t.error);
        setLoading(false);
      }
    } catch {
      setError(t.error);
      setLoading(false);
    }
  };

  if (showThanks) {
    return (
      <div
        style={{
          marginTop: 32,
          marginBottom: 8,
          padding: "20px 24px",
          borderRadius: 10,
          border:
            "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
          background:
            "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
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
          {t.thanks}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 32,
        marginBottom: 8,
        padding: "20px 24px",
        borderRadius: 10,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1 1 280px" }}>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {t.message}
        </p>
        {error && (
          <p style={{ fontSize: 12, color: "#ef4444", margin: "6px 0 0" }}>
            {error}
          </p>
        )}
      </div>
      <button
        onClick={handleTip}
        disabled={loading}
        style={{
          display: "inline-block",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--accent-coral)",
          padding: "8px 20px",
          borderRadius: 6,
          border:
            "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
          background:
            "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
          transition: "background 0.2s, transform 0.2s",
          whiteSpace: "nowrap",
          flexShrink: 0,
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.background =
              "color-mix(in srgb, var(--accent-coral) 14%, transparent)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "color-mix(in srgb, var(--accent-coral) 6%, transparent)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {loading ? t.sending : t.link}
      </button>
    </div>
  );
}
