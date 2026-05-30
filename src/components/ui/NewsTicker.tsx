"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork Maxがネイティブ Swift アプリを生成、Vision Pro・Apple Watch・iMessageに対応（2026）",
    "NATIVE — Rork MaxがAR/LiDAR・Metal 3D・Dynamic Island・HealthKit等のApple機能を解放（2026）",
    "CLOUDSIM — クラウドiOSシミュレータでXcode/Mac不要、ブラウザでアプリをテスト（2026）",
    "PUBLISH — ワンクリック/ツークリックでApp Store公開、デプロイを簡素化（2026）",
    "CROSSPLAT — 従来RorkはReact Native+Expoでクロスプラットフォーム開発を高速化（2026）",
    "CHOICE — クロスプラットフォームはRork、Appleネイティブの深い機能はRork Maxの使い分けが定着（2026）",
  ],
  en: [
    "RORKMAX — Rork Max generates native Swift apps for Vision Pro, Apple Watch and iMessage (2026)",
    "NATIVE — Rork Max unlocks AR/LiDAR, Metal 3D, Dynamic Island, HealthKit and more (2026)",
    "CLOUDSIM — Cloud iOS simulator tests apps in the browser — no Xcode or Mac required (2026)",
    "PUBLISH — One- and two-click App Store publishing simplifies deployment (2026)",
    "CROSSPLAT — Original Rork uses React Native + Expo for fast cross-platform builds (2026)",
    "CHOICE — Use Rork for cross-platform, Rork Max for deep Apple-native features (2026)",
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
