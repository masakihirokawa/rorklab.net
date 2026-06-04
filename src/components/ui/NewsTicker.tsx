"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK-MAX — Rork MaxがネイティブSwiftアプリを生成、iPhone/iPad/Watch/TV/Vision Proを網羅（2026）",
    "NATIVE — Rork MaxがAR・LiDAR、Core ML、HealthKit、Dynamic Island等のApple機能を解禁（2026）",
    "CROSS — オリジナルRorkはReact Native(Expo)でiOS/Androidクロスプラットフォームに注力（2026）",
    "PRICE — Rorkは無料開始・$25/月〜、Rork Maxは$200/月（2026）",
    "MOBILE-ONLY — Web寄りのBolt/Lovableと違い、Rorkはモバイルアプリ専業（2026）",
    "ENGLISH — アプリ要件を自然な英語で書くと、ストア配信できるコードが生成される（2026）",
  ],
  en: [
    "RORK-MAX — Rork Max generates native Swift apps spanning iPhone, iPad, Watch, TV, and Vision Pro (2026)",
    "NATIVE — Rork Max unlocks Apple features like AR/LiDAR, Core ML, HealthKit, and Dynamic Island (2026)",
    "CROSS — The original Rork focuses on cross-platform iOS/Android via React Native (Expo) (2026)",
    "PRICE — Rork starts free at $25/mo, while Rork Max runs $200/mo (2026)",
    "MOBILE-ONLY — Unlike web-first Bolt/Lovable, Rork is built exclusively for mobile apps (2026)",
    "ENGLISH — Describe an app in plain English and Rork produces store-ready code (2026)",
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
