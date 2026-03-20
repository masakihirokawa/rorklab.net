"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "LAUNCH — Rork Max：Xcode 不要でネイティブ Swift アプリを構築する AI プラットフォーム（3/20）",
    "RECORD — Rork Max が ARR $1.5M を 3日で達成（3/18）",
    "APPLE — iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage に対応（3/15）",
    "NATIVE — AR/LiDAR・Metal 3D・ウィジェット・Dynamic Island・HealthKit 等ネイティブ API 完全対応（3/13）",
    "CLOUD — クラウド Mac でコンパイル：Mac 不要・Xcode 不要で App Store 公開（3/10）",
    "AI — Claude Code + Opus 4.6 で駆動：1プロンプトでフルアプリ生成（3/8）",
  ],
  en: [
    "LAUNCH — Rork Max: AI platform to build native Swift apps without Xcode (3/20)",
    "RECORD — Rork Max hits $1.5M ARR in 3 days (3/18)",
    "APPLE — Support for iPhone, iPad, Apple Watch, Apple TV, Vision Pro & iMessage (3/15)",
    "NATIVE — Full native API support: AR/LiDAR, Metal 3D, widgets, Dynamic Island, HealthKit (3/13)",
    "CLOUD — Cloud Mac compilation: publish to App Store without Mac or Xcode (3/10)",
    "AI — Powered by Claude Code + Opus 4.6: generate full apps from one prompt (3/8)",
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
