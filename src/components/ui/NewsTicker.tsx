"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GROWTH — Rork が月間 743k MAU・85% 成長を達成、AI モバイルビルダー市場の世界最大手に（5月）",
    "SWIFT — Rork Max が Swift ネイティブコード生成に完全移行、React Native 不使用で人間開発者と同水準の品質",
    "FUNDING — Rork が $15M シード調達（4/10）。Left Lane Capital 主導、a16z Speedrun 参加。ARR $1.5M を3日で達成",
    "CLOUD — Cloud Compile で Mac・Xcode 不要の署名・配布フローを確立、2クリックで App Store 公開可能",
    "LOVABLE — Lovable が iOS / Android アプリをリリース（4/28）、モバイルからのバイブコーディングが標準化へ",
    "MARKET — Vibe Coding 市場は 2027年に $12.3B 規模へ。非開発者63%が活用、4ツールによる競争が激化",
  ],
  en: [
    "GROWTH — Rork hits 743k MAU with 85% growth, cementing its lead as the top AI mobile builder platform (May)",
    "SWIFT — Rork Max fully pivots to native Swift codegen — no React Native, matching human developer quality",
    "FUNDING — Rork raises $15M seed (4/10), a16z Speedrun joins; booked $1.5M ARR in just 3 days post-launch",
    "CLOUD — Cloud Compile enables 2-click App Store publishing with no Mac or Xcode required",
    "LOVABLE — Lovable launches iOS & Android app (4/28), normalizing mobile vibe coding for builders everywhere",
    "MARKET — Vibe Coding market headed for $12.3B by 2027; 63% non-developers driving four-way platform race",
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
