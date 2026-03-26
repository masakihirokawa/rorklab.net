"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "APPLE — Apple が Gemini からオンデバイス AI 蒸留へ：Core ML 活用の SwiftUI アプリに追い風（3/26）",
    "MARKET — AI アプリ開発コストが40%削減、小規模チームでもエンタープライズ品質が実現可能に（3/26）",
    "NEWLY — 競合 Newly が $2M 調達で参入するも、Rork Max のネイティブ Swift 路線は唯一無二（3/24）",
    "ARR — Rork Max が3日で $1.5M ARR 達成：ネイティブ Swift 開発の圧倒的需要を実証（3/24）",
    "FUND — Rork が a16z から $2.8M プレシード調達、ノーコード AI アプリ開発の未来に投資（3/22）",
    "GROWTH — Rork 月間訪問数 74 万超え、成長率 85% で AI アプリビルダー市場をリード中（3/18）",
  ],
  en: [
    "APPLE — Apple to distill on-device AI from Gemini: a tailwind for Core ML & SwiftUI apps (3/26)",
    "MARKET — AI cuts app development costs by 40%, enabling small teams to build enterprise quality (3/26)",
    "NEWLY — Competitor Newly raises $2M, but Rork Max's native Swift approach remains unmatched (3/24)",
    "ARR — Rork Max hits $1.5M ARR in just 3 days, proving massive demand for native Swift dev (3/24)",
    "FUND — Rork secures $2.8M pre-seed from a16z, investing in the future of no-code AI apps (3/22)",
    "GROWTH — Rork surpasses 743K monthly visits with 85% growth rate, leading AI app builder market (3/18)",
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
