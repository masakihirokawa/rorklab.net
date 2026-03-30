"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "COMPARE — 2026 AI アプリビルダー比較：Rork が Lovable（47 分）・Bolt.new（52 分）をプロト生成速度で凌駕（3/31）",
    "MAX — Rork Max が Claude Code + Opus 4.6 搭載で SwiftUI ネイティブアプリを自動生成、Xcode 完全不要（3/31）",
    "FUND — Rork が a16z から $2.8M のプレシード調達に成功、月間 74 万訪問・成長率 85% を記録（3/28）",
    "VISIONPRO — Rork Max が Vision Pro・Apple Watch・Apple TV にも対応、マルチデバイス展開をワンプロンプトで実現（3/30）",
    "NATIVE — Rork Max の Apple ネイティブ機能：AR/LiDAR・Metal 3D・Dynamic Island・Live Activities・Core ML（3/30）",
    "PUBLISH — Rork Max なら 2 クリックで App Store 公開、Companion アプリで有料開発者アカウント不要のテストも可能（3/26）",
  ],
  en: [
    "COMPARE — 2026 AI app builder showdown: Rork outpaces Lovable (47 min) & Bolt.new (52 min) in prototyping (3/31)",
    "MAX — Rork Max generates native SwiftUI apps with Claude Code + Opus 4.6, no Xcode required (3/31)",
    "FUND — Rork secures $2.8M pre-seed from a16z, hits 743K monthly visits with 85% growth rate (3/28)",
    "VISIONPRO — Rork Max now supports Vision Pro, Apple Watch & Apple TV for multi-device deployment (3/30)",
    "NATIVE — Rork Max unlocks AR/LiDAR, Metal 3D, Dynamic Island, Live Activities & Core ML natively (3/30)",
    "PUBLISH — Rork Max: 2-click App Store publishing, test on real iPhones via Companion without paid dev account (3/26)",
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
