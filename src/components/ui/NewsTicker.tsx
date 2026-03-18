"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "Rork Max — 2026年2月ローンチ：React Native から完全ネイティブ Swift へ移行した新プロダクト",
    "NEW — Rork Max が Apple 全デバイス対応：iPhone・iPad・Watch・Vision Pro・Apple TV・iMessage",
    "Funding — Rork が a16z から $280 万調達、月間 74.3 万訪問・85% 成長で急拡大中",
    "Rork Max — AR/LiDAR・Metal 3D・Dynamic Island・Live Activities・HealthKit に完全ネイティブ対応",
    "RANKING — 2026 年 AI ノーコードツール比較でネイティブモバイルアプリ開発 No.1 に選出",
    "MVP — Rork を使えば数時間でネイティブアプリの MVP が完成、App Store 申請まで完結",
  ],
  en: [
    "Rork Max — Launched Feb 2026: Major shift from React Native to fully native Swift apps",
    "NEW — Rork Max supports entire Apple ecosystem: iPhone, iPad, Watch, Vision Pro, Apple TV & iMessage",
    "Funding — Rork raises $2.8M from a16z; 743K monthly visits with 85% growth rate",
    "Rork Max — Native AR/LiDAR, Metal 3D games, Dynamic Island, Live Activities & HealthKit support",
    "RANKING — Rated #1 no-code AI tool for native mobile app development in 2026 reviews",
    "MVP — Build a working native app MVP in hours with Rork, all the way to App Store submission",
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
