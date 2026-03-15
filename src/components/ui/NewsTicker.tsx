"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "Rork Max — ネイティブSwiftアプリをノーコードで生成、a16z出資で注目急上昇",
    "NEW — Rork Max、iPhone/iPad/Apple Watch/Vision Proに対応、2タップでApp Store申請",
    "UPDATE — Rork Max、ARKit・LiDARネイティブサポートでAR/空間コンピューティングも開発可能",
    "Rork — 月間74.3万訪問、85%成長率でノーコードAIアプリビルダーが急拡大",
    "Gartner — 2026年に低コード/ノーコードツールが新規開発の75%を占める見込み",
    "Rork — 英語プロンプトだけでiOS/Android同時対応アプリを数分で生成",
  ],
  en: [
    "Rork Max — Build native Swift apps with no code, backed by a16z",
    "NEW — Rork Max supports iPhone, iPad, Apple Watch & Vision Pro with 2-tap App Store publish",
    "UPDATE — Rork Max adds native ARKit & LiDAR support for AR and spatial computing apps",
    "Rork — 743K monthly visits with 85% growth rate as AI app builder gains momentum",
    "Gartner — Low-code/no-code tools projected to cover 75% of new app development in 2026",
    "Rork — Build iOS & Android apps from plain-English prompts in minutes",
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
        paddingTop: 1,
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
