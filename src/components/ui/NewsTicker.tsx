"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxがネイティブSwiftアプリを生成し、iPhone・iPad・Watch・TV・Vision Pro・iMessageに対応します",
    "NATIVE — AR/LiDAR、Metalによる3D、Dynamic Island、Live Activities、HealthKit、Core MLなどに手が届きます",
    "PUBLISH — 2クリックでApp Storeへ提出でき、申請まわりの手間が大きく圧縮されています",
    "PRICING — Rork Maxは月200ドル、元のRorkは無料で始められ有料は月25ドルからです",
    "FUNDING — Rorkがa16zから280万ドルを調達し、月間74万超の訪問・成長率85%と紹介されています",
    "TOOL — 元のRorkはReact Native（Expo）でiOSとAndroidのアプリを自然言語から生成します",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "NATIVE — It reaches AR/LiDAR, Metal 3D, Dynamic Island, Live Activities, HealthKit, and Core ML",
    "PUBLISH — Two-click App Store submission sharply cuts the overhead of shipping an app",
    "PRICING — Rork Max is 00/month, while the original Rork starts free with paid plans from 5/month",
    "FUNDING — Rork raised .8M from a16z, with over 743k monthly visits and 85% growth",
    "TOOL — The original Rork builds native iOS and Android apps from plain English using React Native (Expo)",
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
