"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "QR — 11/20 から、作った Android アプリを QR コードで自分の端末に入れられます",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 で提供終了、残り9日です",
    "SPLASH — 更新の巻き戻りのあと起動画面から進まない、という報告が Expo で出ています",
    "NEW — 新着：Plugins で Google Docs の仕様メモを読ませる前に確かめること",
    "ENROLL — Apple Developer Program は個人か法人か。表示名と後からの移し替えで選ぶと迷いません",
    "PHASED — 段階公開（Phased Release）を使うと、不具合が出ても影響を小さく抑えられます",
  ],
  en: [
    "QR — Since 11/20, you can install your Android app on your phone from a QR code",
    "SONNET 4.5 — Sonnet 4.5 retires from the Claude API on 11/30, 9 days left",
    "SPLASH — Expo users report apps stuck on the splash screen after an update rollback",
    "NEW — New: what to check before letting Plugins read your Google Docs spec",
    "ENROLL — Individual or organization for the Apple Developer Program? Decide by seller name and transfers",
    "PHASED — A phased release keeps the impact small if a bug slips through",
  ]
};

export function NewsTicker() {
  const locale = useLocale();
  const items = NEWS_ITEMS[locale] || NEWS_ITEMS.en;
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        width: "100%",
        zIndex: 99,
        height: 35,
        background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-primary))", // 2026-10-09: 不透明に（固定バーの下を流れる本文が透けて重なっていた）
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: 2,
      }}
    >
      <div
        className="animate-ticker"
        style={{
          display: "flex",
          gap: 60,
          whiteSpace: "nowrap",
        }}
      >
        {doubled.map((text, i) => (
          <span
            key={i}
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              letterSpacing: "0.03em",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "var(--accent-coral)", fontSize: 8 }}>●</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
