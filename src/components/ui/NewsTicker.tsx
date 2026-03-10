"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "NEW — Rork Max で AI ネイティブアプリを数分で構築、App Store 公開も数時間で",
    "Rork Lab — Rork Max の日英ナレッジベースがオープンしました",
    "GUIDE — React Native × Rork Max ハイブリッド開発入門を公開",
    "UPDATE — Rork Max が Widgets、Live Activities、Apple Watch に対応",
  ],
  en: [
    "NEW — Build AI-native mobile apps in minutes with Rork Max, publish to App Store in hours",
    "Rork Lab — Japanese & English knowledge base for Rork Max is now live",
    "GUIDE — Getting Started with React Native × Rork Max hybrid development",
    "UPDATE — Rork Max now supports Widgets, Live Activities, and Apple Watch",
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
        height: 32,
        background: "color-mix(in srgb, var(--accent-coral) 4%, transparent)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
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
