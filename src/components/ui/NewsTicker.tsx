"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork MaxがネイティブSwiftアプリを生成、Claude Code + Claude Opus 4.6駆動（2026）",
    "APPLE — AR/LiDAR・Metal 3D・Dynamic Island・HealthKit・NFC・Core MLまでネイティブ機能を解放（2026）",
    "COMPANION — Rork Companionで有料Apple Developerなしでも実機iPhoneテストが可能（2026）",
    "SEED — Left Lane CapitalがリードしRorkが$15Mシードを調達（2026）",
    "GROWTH — 月間743,000訪問・成長率85%でApp Store事業の立ち上げを後押し（2026）",
    "CHOICE — クロスプラットフォームは従来Rork、Apple深掘りはRork Maxの使い分けが定着（2026）",
  ],
  en: [
    "RORKMAX — Rork Max generates native Swift apps, powered by Claude Code and Claude Opus 4.6 (2026)",
    "APPLE — It unlocks AR/LiDAR, Metal 3D, Dynamic Island, HealthKit, NFC and Core ML natively (2026)",
    "COMPANION — Rork Companion enables real-iPhone testing without a paid Apple Developer account (2026)",
    "SEED — Rork raises a $15M seed round led by Left Lane Capital (2026)",
    "GROWTH — 743,000 monthly visits at 85% growth fuel new App Store ventures (2026)",
    "CHOICE — Use original Rork for cross-platform, Rork Max for deep Apple-native features (2026)",
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
