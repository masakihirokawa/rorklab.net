"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはネイティブSwiftアプリを生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — Rork MaxはAR/LiDARスキャン、Metalの3D、ウィジェット、Live Activities、HealthKitなどネイティブ機能を解放します",
    "FUNDING — Rorkはa16zから280万ドルを調達し、月間訪問は74万を超え、成長率は85%に達しています",
    "RN — 通常のRorkはReact Native(Expo)でiOSとAndroidアプリをまとめて生成します",
    "FOCUS — Rorkはネイティブモバイルアプリ専業で、Web中心のBoltやLovableと一線を画します",
    "PRICING — 無料で始められ、有料プランは月25ドルから、Rork Maxは月200ドルで2クリックのApp Store公開に対応します",
  ],
  en: [
    "MAX — Rork Max builds native Swift apps for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — Rork Max unlocks AR/LiDAR scanning, Metal 3D, widgets, Live Activities, HealthKit, and more",
    "FUNDING — Rork raised $2.8M from a16z, now drawing 743k+ monthly visits at an 85% growth rate",
    "RN — Standard Rork generates iOS and Android apps together using React Native (Expo)",
    "FOCUS — Rork focuses solely on native mobile apps, setting it apart from web-first Bolt and Lovable",
    "PRICING — Free to start, paid plans from $25/mo, with Rork Max at $200/mo and two-click App Store publishing",
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
