"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成。iPhone・iPad・Watch・TV・Vision Pro・iMessageに対応します",
    "NATIVE — AR/LiDAR・Metalの3Dゲーム・Dynamic Island・Live Activities・HealthKit・Core MLなどネイティブ機能を解放します",
    "CORE — 通常のRorkはReact Native（Expo）でiOS/Androidアプリを生成。自然言語からストア公開まで到達できます",
    "FUNDING — Rorkはa16zから$2.8Mを調達しました",
    "GROWTH — 月間743,000訪問・成長率85%と勢いを増しています",
    "PRICING — 無料で始められ、有料プランは$25/月〜です",
  ],
  en: [
    "MAX — Rork Max builds native Swift apps instead of React Native, supporting iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "NATIVE — It unlocks native capabilities: AR/LiDAR, Metal 3D games, Dynamic Island, Live Activities, HealthKit, and Core ML",
    "CORE — Standard Rork generates iOS/Android apps with React Native (Expo), taking you from plain English to the app stores",
    "FUNDING — Rork raised $2.8M from a16z (Andreessen Horowitz)",
    "GROWTH — The platform now sees 743,000 monthly visits with 85% growth",
    "PRICING — Free to start, with paid plans from $25/month",
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
