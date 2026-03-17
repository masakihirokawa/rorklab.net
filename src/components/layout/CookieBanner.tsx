"use client";

import { useEffect, useState } from "react";

interface CookieBannerProps {
  gaId: string;
  privacyHref: string;
  locale: string;
  storageKey: string;
}

export function CookieBanner({ gaId, privacyHref, locale, storageKey }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      setVisible(true);
    } else if (stored === "accepted") {
      loadGA(gaId);
    }
  }, [gaId, storageKey]);

  function loadGA(id: string) {
    if (document.getElementById("ga-script")) return;
    // Initialize dataLayer and gtag BEFORE loading the script (Google official order)
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function () { (window as any).dataLayer.push(arguments); };
    (window as any).gtag("js", new Date());
    (window as any).gtag("config", id);
    // Load gtag.js script
    const s = document.createElement("script");
    s.id = "ga-script";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
  }

  function handleAccept() {
    localStorage.setItem(storageKey, "accepted");
    loadGA(gaId);
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(storageKey, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  const isJa = locale === "ja";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(680px, calc(100vw - 32px))",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
      }}
    >
      <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", flex: 1, lineHeight: 1.5 }}>
        {isJa ? (
          <>
            サービス改善のため Cookie を使用しています。{" "}
            <a href={privacyHref} style={{ color: "var(--text-primary)", textDecoration: "underline" }}>
              プライバシーポリシー
            </a>
          </>
        ) : (
          <>
            We use cookies to improve our service.{" "}
            <a href={privacyHref} style={{ color: "var(--text-primary)", textDecoration: "underline" }}>
              Privacy Policy
            </a>
          </>
        )}
      </p>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={handleDecline}
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            border: "1px solid var(--border-subtle)",
            background: "transparent",
            color: "var(--text-dim)",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {isJa ? "拒否" : "Decline"}
        </button>
        <button
          onClick={handleAccept}
          style={{
            padding: "7px 16px",
            borderRadius: 8,
            border: "none",
            background: "var(--accent)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {isJa ? "同意する" : "Accept"}
        </button>
      </div>
    </div>
  );
}
