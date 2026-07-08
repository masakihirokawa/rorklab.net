"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — Rork MaxではAR/LiDARスキャン・Metalによる3Dゲーム・ウィジェット・Dynamic Islandなどネイティブ機能を利用できます",
    "APPLE — HealthKit・HomeKit・NFC・App Clips・オンデバイスCore MLといったAppleの高度な機能にもアクセスできます",
    "RN — 標準のRorkはReact Native（Expo）でiOSとAndroidを単一プロンプトから生成します",
    "PRICE — 無料で始められ、有料プランは月額$25から利用できます",
    "GROWTH — Rorkは月間訪問743,000超・成長率85%に達し、$15Mの資金を調達しました",
  ],
  en: [
    "MAX — Rork Max builds native Swift apps instead of React Native for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — Rork Max unlocks native features like AR/LiDAR scanning, Metal 3D games, widgets, and Dynamic Island",
    "APPLE — It also reaches advanced Apple capabilities such as HealthKit, HomeKit, NFC, App Clips, and on-device Core ML",
    "RN — Standard Rork builds iOS and Android from a single prompt using React Native (Expo)",
    "PRICE — Rork is free to start, with paid plans beginning at $25 per month",
    "GROWTH — Rork now sees 743,000+ monthly visits, 85% growth, and recently raised $15M",
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
