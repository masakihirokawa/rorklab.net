"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GROWTH — Rorkは月間74.3万訪問・成長率85%と、利用が伸び続けています",
    "MAX — Rork MaxはネイティブSwiftアプリを生成し、iPhone・iPad・Watch・TV・Vision Pro・iMessageに対応します",
    "MAX — AR/LiDARスキャン・Metalの3Dゲーム・Live Activities・HealthKit・Core MLなど、React Nativeでは届きにくい領域に踏み込めます",
    "STACK — 通常のRorkはReact Native（Expo）でiOSとAndroidを同時に生成し、非エンジニアでも実機アプリを作れます",
    "PRICE — 料金は無料から用意され、有料プランは月$25から、Rork Maxは月$200です",
    "MARKET — Gartnerは2026年末までに新規アプリの75%が低コード/ノーコード製になると予測しています",
  ],
  en: [
    "GROWTH — Rork keeps growing with 743K monthly visits and an 85% growth rate",
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "MAX — It reaches AR/LiDAR scanning, Metal 3D games, Live Activities, HealthKit, and Core ML, beyond React Native's reach",
    "STACK — Standard Rork builds iOS and Android together in React Native (Expo), so non-engineers can ship real apps",
    "PRICE — Plans start free, paid tiers from $25/month, and Rork Max at $200/month",
    "MARKET — Gartner projects 75% of new apps will be low-code or no-code by the end of 2026",
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
