"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — AR/LiDAR、Metalによる3D、ウィジェット、Dynamic Island、Live Activities、HealthKit、NFC、Core MLまで踏み込めます",
    "PUBLISH — App Storeへの公開を2クリックで実行でき、個人開発の申請作業を大きく短縮できます",
    "SWIFT — 自然文で指示するだけで動くコードが生成され、iOS・Android・Webのアプリを素早く形にできます",
    "GROWTH — Rorkは直近で1,500万ドルを調達。月間743,000訪問・成長率85%と伸びています",
    "PRICING — 無料で開始でき、有料プランは月25ドルから。Rork Maxは月200ドルです",
  ],
  en: [
    "MAX — Rork Max builds native Swift apps instead of React Native, supporting iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — It reaches AR/LiDAR, Metal 3D, widgets, Dynamic Island, Live Activities, HealthKit, NFC, and on-device Core ML",
    "PUBLISH — Two-click App Store publishing sharply shortens the submission work for solo developers",
    "SWIFT — Describe your app in plain English and Rork generates working code for iOS, Android, and web",
    "GROWTH — Rork recently raised $15M and now sees over 743,000 monthly visits with 85% growth",
    "PRICING — It is free to start, with paid plans from $25/month and Rork Max at $200/month",
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
