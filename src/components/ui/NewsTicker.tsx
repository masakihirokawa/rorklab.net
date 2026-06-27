"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxがネイティブSwiftアプリを生成。iPhone・iPad・Watch・TV・Vision Pro・iMessageに対応します",
    "NATIVE — AR/LiDARスキャン、Metalの3Dゲーム、ウィジェット、Live Activities、Core MLまで踏み込めます",
    "FUNDING — Rorkがa16zから$2.8Mを調達。月間74.3万訪問・成長率85%と勢いがあります",
    "PRICING — 無料で開始でき、有料プランは月額$25から利用できます",
    "FLOW — アイデアを英語で説明すると動くコードを生成。共有リンク発行やiOS/Androidビルドに対応します",
    "COMPARE — 従来のRorkはExpo/React Nativeでクロスプラットフォーム。用途で使い分けられます",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps across iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "NATIVE — It reaches AR/LiDAR scanning, Metal 3D games, widgets, Live Activities, and on-device Core ML",
    "FUNDING — Rork raised $2.8M from a16z, with 743K monthly visits and 85% growth",
    "PRICING — It's free to start, with paid plans beginning at $25 per month",
    "FLOW — Describe your idea in plain English to get working code, a shareable test link, and iOS/Android builds",
    "COMPARE — The original Rork builds cross-platform apps on Expo/React Native; choose the right tool per goal",
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
