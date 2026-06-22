"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PRODUCT — Rork Maxがネイティブ Swift アプリを生成。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — Rork MaxはAR/LiDAR・Metalの3Dゲーム・Dynamic Island・Live Activities・HealthKit・Core MLなどを解放します",
    "CLASSIC — 通常のRorkはReact Native（Expo）で、英語の説明だけからiOS/Androidアプリを生成しストア配信できます",
    "FUNDING — a16zから$2.8Mを調達（別途$15Mも）。月743,000訪問・成長率85%と伸びています",
    "PRICING — 無料で始められ、有料プランは月25ドル〜。Rork Maxは月200ドルです",
    "CHOICE — クロスプラットフォームのRorkか、Apple専用機能まで踏み込むRork Maxか、用途で選び分けられます",
  ],
  en: [
    "PRODUCT — Rork Max generates native Swift apps for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — Rork Max unlocks AR/LiDAR, Metal 3D games, Dynamic Island, Live Activities, HealthKit, and Core ML",
    "CLASSIC — The original Rork uses React Native (Expo), turning plain-English prompts into shippable iOS/Android apps",
    "FUNDING — Rork raised $2.8M from a16z (plus $15M more), reaching 743,000 monthly visits at 85% growth",
    "PRICING — Rork is free to start, with paid plans from $25/month; Rork Max is $200/month",
    "CHOICE — Pick cross-platform Rork or Rork Max for deep Apple-native capabilities, depending on your goal",
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
