"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Maxが全Appleプラットフォーム向けのネイティブSwiftを生成。iPhoneからVision Proまで対応します",
    "NATIVE — AR/LiDAR・Metalの3D・Dynamic Island・Live Activities・HealthKitなどネイティブ機能に踏み込めます",
    "PUBLISH — 2クリックでApp Storeへ公開できます。Rork Maxは月$200です",
    "EXPO — 通常のRorkはReact Native（Expo）でiOS/Androidを同時生成し、無料から始められます",
    "PROMPT — プレーンな英語でアプリの構想を書くと、ストアへ配布できる動くコードが生成されます",
    "PRICE — 無印Rorkの有料プランは月$25から。まず無印で作り、ネイティブ機能が要る段でMaxを検討できます",
  ],
  en: [
    "MAX — Rork Max generates native Swift for every Apple platform, from iPhone to Vision Pro",
    "NATIVE — It reaches native capabilities like AR/LiDAR, Metal 3D, Dynamic Island, Live Activities, and HealthKit",
    "PUBLISH — Publish to the App Store in two clicks; Rork Max is $200/month",
    "EXPO — Standard Rork builds iOS and Android together via React Native (Expo) and is free to start",
    "PROMPT — Describe your app idea in plain English and Rork generates deployable, store-ready code",
    "PRICE — Standard Rork's paid plans start at $25/month: build with it first, then consider Max for native features",
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
