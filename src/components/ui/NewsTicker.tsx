"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "LOWCODE — Gartner：2026 年はローコードが新規開発の 75% を占める、Rork の追い風さらに強まる（3/29）",
    "COST — AI アプリビルダーで開発コスト最大 80% 削減、スタートアップの参入障壁が劇的に低下（3/28）",
    "$264B — AI アプリビルダー市場が 2032 年に $264B 規模へ成長予測、Rork Max が先行者優位を拡大（3/28）",
    "APPLE — iOS 26.4 で Apple × Gemini AI 統合が本格化、SwiftUI ネイティブの Rork Max に好機（3/26）",
    "TOP4 — 2026 年の AI モバイルアプリビルダー TOP 4 に Rork が選出、ネイティブ生成で差別化（3/27）",
    "ARR — Rork Max が 3 日で $1.5M ARR を達成、ノーコード × ネイティブの需要を証明（3/24）",
  ],
  en: [
    "LOWCODE — Gartner: low-code to account for 75% of new apps in 2026, strengthening Rork's tailwind (3/29)",
    "COST — AI app builders slash dev costs up to 80%, dramatically lowering barriers for startups (3/28)",
    "$264B — AI app builder market projected to reach $264B by 2032, Rork Max extends first-mover lead (3/28)",
    "APPLE — iOS 26.4 deepens Apple-Gemini AI integration, creating opportunity for Rork Max's SwiftUI (3/26)",
    "TOP4 — Rork named among top 4 AI mobile app builders for 2026, differentiated by native generation (3/27)",
    "ARR — Rork Max hits $1.5M ARR in 3 days, proving massive demand for no-code native apps (3/24)",
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
