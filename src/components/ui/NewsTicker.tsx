"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK-MAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成、Appleエコシステム全体をネイティブ性能で対象化（2月）",
    "APPLE-NATIVE — Rork MaxがAR/LiDAR・Metal 3D・Live Activities・Dynamic Island・HealthKit・HomeKit・Core MLを解放（2026）",
    "DEVICES — iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応（2026）",
    "CROSSPLATFORM — 従来RorkはReact Native（Expo）でiOS/Androidを生成、コードを書かず自然言語でアプリ構築（2026）",
    "PRICING — 無料で開始、有料プランは$25/月から、Rork Maxは$200/月（2026）",
    "PUBLISH — 2クリックでApp Storeへ公開できる機能が引き続き目玉（2026）",
  ],
  en: [
    "RORK-MAX — Rork Max generates native Swift apps instead of React Native, targeting the whole Apple ecosystem with native performance (Feb)",
    "APPLE-NATIVE — Rork Max unlocks AR/LiDAR, Metal 3D, Live Activities, Dynamic Island, HealthKit, HomeKit, and Core ML (2026)",
    "DEVICES — Supports iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage (2026)",
    "CROSSPLATFORM — The original Rork builds iOS/Android with React Native (Expo), no code, just plain language (2026)",
    "PRICING — Free to start, paid plans from $25/mo, with Rork Max at $200/mo (2026)",
    "PUBLISH — Two-click App Store publishing remains a standout feature (2026)",
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
