"use client";

import { useEffect, useState } from "react";

interface ArticlePurchaseThankYouProps {
  locale: string;
}

export function ArticlePurchaseThankYou({ locale }: ArticlePurchaseThankYouProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("thanks") === "article") {
      setShow(true);
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete("thanks");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "32px auto",
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
          ? "✦ ご購入いただき、誠にありがとうございます。記事の全文をお楽しみください。"
          : "✦ Thank you so much for your purchase! Enjoy the full article."}
      </p>
    </div>
  );
}
