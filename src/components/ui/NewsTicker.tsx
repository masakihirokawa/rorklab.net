"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "BUILD — Rork Maxがネイティブ Swift アプリを生成し、React Nativeでは届きにくい領域に踏み込めます",
    "PLATFORM — Rork MaxはiPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — HealthKit・Core ML・NFC・Dynamic Island・Live Activitiesなどのネイティブ機能が使えます",
    "TEST — ブラウザ内ストリーミングiOSシミュレータで、XcodeやMacなしでテストできます",
    "DEPLOY — ビルド・証明書・App Store申請までの自動化で公開までを簡素化します",
    "PRICE — 無料で開始でき、有料プランは$25/月〜、Rork Maxは$200/月です",
  ],
  en: [
    "BUILD — Rork Max generates native Swift apps, reaching areas React Native struggles to touch",
    "PLATFORM — Rork Max supports iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — Tap native features like HealthKit, Core ML, NFC, Dynamic Island, and Live Activities",
    "TEST — A browser-based streaming iOS simulator lets you test without Xcode or a Mac",
    "DEPLOY — Automated builds, certificates, and App Store submission simplify shipping",
    "PRICE — Start free; paid plans begin at $25/month and Rork Max is $200/month",
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
