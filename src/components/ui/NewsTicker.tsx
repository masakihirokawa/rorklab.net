"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX1.5M — Rork Max が2月ローンチから3日で $1.5M ARR 達成、Claude Code + Opus 4.6 をバックエンドに採用",
    "APPLEFULL — Rork Max が iPhone / iPad / Apple Watch / Apple TV / Vision Pro / iMessage の全 Apple プラットフォームをカバー",
    "NATIVEPOWER — AR/LiDAR・Metal 3D・Dynamic Island・HealthKit・Core ML 等 React Native では不可能なネイティブ機能を解放",
    "TESTFLIGHT — Rork Companion で Apple Developer 有料登録なしで実機テスト、App Store / TestFlight 提出も完結",
    "VIBE47B — Vibe coding 市場が $4.7B に到達、ユーザーの63%が非開発者というメインストリーム化",
    "COMPETE — Replit Agent 4 が parallel task と Design Mode 対応、Lovable は $330M Series B / $6.6B 評価額に到達",
  ],
  en: [
    "MAX1.5M — Rork Max hits $1.5M ARR in 3 days from its Feb launch, powered by Claude Code + Opus 4.6",
    "APPLEFULL — Rork Max covers the full Apple stack: iPhone, iPad, Apple Watch, Apple TV, Vision Pro, iMessage",
    "NATIVEPOWER — Unlocks native-only features: AR/LiDAR, Metal 3D, Dynamic Island, HealthKit, Core ML — beyond React Native",
    "TESTFLIGHT — Test on real iPhone via Rork Companion without paid Apple Developer, ship to App Store / TestFlight from Rork",
    "VIBE47B — Vibe coding market hits $4.7B with 63% non-developer users, going fully mainstream in 2026",
    "COMPETE — Replit Agent 4 adds parallel tasks and Design Mode; Lovable closes $330M Series B at $6.6B valuation",
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
