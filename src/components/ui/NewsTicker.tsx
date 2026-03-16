"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "Rork Max — ネイティブ Swift アプリをノーコードで生成、a16z から $2.8M 調達で急成長",
    "NEW — Rork Max、Metal + SceneKit で本格 3D ゲームも AI プロンプトで実現",
    "UPDATE — Rork Max、ARKit・LiDAR ネイティブサポートで AR/空間コンピューティングも開発可能",
    "Rork — 月間 74.3 万訪問・前年比 85% 成長、ノーコード AI アプリビルダー首位をキープ",
    "Rork Max — iPhone/iPad/Apple Watch/Vision Pro 対応、2 タップで App Store 申請",
    "Rork — 英語プロンプトだけで iOS/Android 同時対応アプリを数分で生成",
  ],
  en: [
    "Rork Max — Build native Swift apps with no code; $2.8M raised from a16z",
    "NEW — Rork Max enables full 3D game dev using Metal shaders & SceneKit via AI prompts",
    "UPDATE — Rork Max adds native ARKit & LiDAR support for AR and spatial computing apps",
    "Rork — 743K monthly visits, 85% YoY growth as no-code AI app builder leads the market",
    "Rork Max — Supports iPhone, iPad, Apple Watch & Vision Pro with 2-tap App Store publish",
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
