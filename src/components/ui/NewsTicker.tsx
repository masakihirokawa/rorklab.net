"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはネイティブSwiftアプリを生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — Rork MaxはAR/LiDAR・Metalの3D・ウィジェット・Dynamic Island・Live Activities・HealthKit・Core MLなどネイティブ機能を解放します",
    "STACK — RorkはReact Native（Expo）でiOS/Androidのネイティブアプリを生成し、英語の説明だけで動くコードを書き出します",
    "GROWTH — Rorkの月間アクセスは743,000件を超え、成長率は85%に達しています",
    "PRICE — 料金は無料から始められ、有料プランは月$25から利用できます",
    "TREND — Gartnerは2026年末までに新規アプリの75%がローコード/ノーコードで作られると予測しています",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — Rork Max unlocks native features: AR/LiDAR, Metal 3D, widgets, Dynamic Island, Live Activities, HealthKit, and Core ML",
    "STACK — Rork builds native iOS and Android apps with React Native (Expo) from a plain-English description",
    "GROWTH — Rork now attracts over 743,000 monthly visits, growing at an 85% rate",
    "PRICE — Rork is free to start, with paid plans from $25/month",
    "TREND — Gartner projects 75% of new apps will be built with low-code/no-code by the end of 2026",
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
