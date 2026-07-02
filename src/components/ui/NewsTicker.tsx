"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkの$15MシードはLeft Lane Capital主導で、Peak XV・True Ventures・Goodwater・a16z Speedrunが参加しています",
    "GROWTH — Rorkは月間74.3万訪問・成長率85%と、利用の伸びが続いています",
    "MAX — Rork MaxはネイティブSwiftアプリを生成し、iPhone・iPad・Watch・TV・Vision Pro・iMessageに対応します",
    "MAX — HealthKit・Core ML・Dynamic Islandなど、React Nativeでは届きにくい領域に踏み込めます",
    "MARKET — AppleもXcode 27でエージェント型コーディングを推進し、AIがネイティブ開発を担う流れが加速しています",
    "MARKET — Gartnerは2026年末までに新規アプリの75%が低コード/ノーコード製になると予測しています",
  ],
  en: [
    "FUNDING — Rork's $15M seed was led by Left Lane Capital with Peak XV, True Ventures, Goodwater, and a16z Speedrun",
    "GROWTH — Rork keeps growing with 743K monthly visits and an 85% growth rate",
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "MAX — It reaches HealthKit, Core ML, and Dynamic Island — territory React Native struggles with",
    "MARKET — Apple pushes agentic coding in Xcode 27, accelerating AI-driven native development",
    "MARKET — Gartner projects 75% of new apps will be low-code or no-code by the end of 2026",
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
