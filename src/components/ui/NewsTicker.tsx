"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MARKET — AI ノーコード市場が急拡大：$29B（2026年）→ $264B（2032年）の成長予測（3/26）",
    "NEWLY — 競合 Newly が $2M 調達＆参入するも、Rork Max のネイティブ Swift 路線は唯一無二（3/24）",
    "ARR — Rork Max が3日で $1.5M ARR 達成：ネイティブ Swift 開発の圧倒的需要を実証（3/24）",
    "FUND — Rork が a16z (Andreessen Horowitz) から $2.8M プレシード資金調達に成功（3/22）",
    "APPLE — Apple が iOS 26.4 で Gemini AI 連携を拡大、モバイル AI 開発の新時代へ（3/25）",
    "GROWTH — Rork 月間訪問数74万超え、成長率85%でノーコード AI アプリビルダー市場をリード（3/18）",
  ],
  en: [
    "MARKET — AI no-code market surging: projected growth from $29B (2026) to $264B by 2032 (3/26)",
    "NEWLY — Competitor Newly raises $2M, but Rork Max's native Swift approach remains unmatched (3/24)",
    "ARR — Rork Max hits $1.5M ARR in just 3 days, proving massive demand for native Swift (3/24)",
    "FUND — Rork secures $2.8M pre-seed from a16z (Andreessen Horowitz) (3/22)",
    "APPLE — Apple expands Gemini AI integration in iOS 26.4, opening new era for mobile AI dev (3/25)",
    "GROWTH — Rork surpasses 743K monthly visits with 85% growth, leading no-code AI app builder market (3/18)",
  ],
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
        background: "color-mix(in srgb, var(--accent-coral) 4%, transparent)",
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
              fontFamily: "'DM Mono', monospace",
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
