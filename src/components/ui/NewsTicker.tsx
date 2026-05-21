"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAXSWIFT — Rork Max が React Native ではなくネイティブ Swift アプリを生成、Claude Code + Opus 駆動で2-click App Store 公開を実現",
    "COMPANION — Rork Companion アプリ経由で有料 Apple Developer アカウントなしに実機 iPhone でテスト可能に（2026）",
    "CLOUDMAC — Rork Max は cloud Mac fleet でネイティブコンパイル、Xcode/Mac を持たずに HealthKit や AR 機能まで実装可能",
    "AISTUDIORIVAL — Google AI Studio Android が I/O 2026 で事前登録開始、Kotlin vibe coding で Rork の Android 領域に直接競合（5/19）",
    "LOWCODE75 — Gartner 予測: 2026 年に新規アプリ開発の 75% が low-code/no-code に、80% を非IT 人材が担う見込み",
    "MAXPRICE — Rork Max は月 $200 プランで Swift ビルド無制限、無料枠は週5プロンプトに制限",
  ],
  en: [
    "MAXSWIFT — Rork Max generates native Swift apps instead of React Native, powered by Claude Code + Opus with 2-click App Store publishing built in",
    "COMPANION — Rork Companion app lets you test creations on a real iPhone without a paid Apple Developer account (2026)",
    "CLOUDMAC — Rork Max compiles natively on a cloud Mac fleet, enabling HealthKit, AR, and other native features without owning Xcode or a Mac",
    "AISTUDIORIVAL — Google AI Studio for Android opened pre-registration at I/O 2026, putting Kotlin vibe coding head-to-head with Rork on Android (5/19)",
    "LOWCODE75 — Gartner forecast: 75% of new application development will use low-code/no-code by 2026, with 80% built by non-IT professionals",
    "MAXPRICE — Rork Max sells at $200/month with unlimited native Swift builds; the free tier is capped at roughly 5 prompts per week",
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
