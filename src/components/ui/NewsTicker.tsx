"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MARKET — 2026 年 4 月最新：ノーコード AI モバイル市場は 2032 年に $264B 規模へ、AI アプリビルダーが急成長（4/1）",
    "ARR — Rork Max がローンチ 3 日間で $1.5M ARR を達成、a16z $2.8M 調達・月間 74 万訪問・成長率 85%（3/28）",
    "MAX — Rork Max の SwiftUI ネイティブアプリ：クラウド Mac ビルド＋ライブシミュレーターで Xcode 不要（4/1）",
    "NATIVE — Rork Max が AR/LiDAR・Metal 3D・Dynamic Island・Live Activities・HealthKit を完全サポート（4/1）",
    "VISION — Rork Max が Vision Pro・Apple Watch・Apple TV・iMessage・App Clips を単一プロンプトで生成（4/1）",
    "PUBLISH — Rork Max は 2 クリックで App Store 公開、Rork Companion で有料開発者アカウント不要の実機テストも（4/1）",
  ],
  en: [
    "MARKET — April 2026: No-code AI mobile market projected to hit $264B by 2032, with AI app builders leading growth (4/1)",
    "ARR — Rork Max hit $1.5M ARR in 3 days post-launch; a16z $2.8M funding, 743K monthly visits, 85% growth rate (3/28)",
    "MAX — Rork Max builds native SwiftUI apps via cloud Mac builds and a live simulator — zero Xcode needed (4/1)",
    "NATIVE — Rork Max supports AR/LiDAR, Metal 3D, Dynamic Island, Live Activities, HealthKit & HomeKit natively (4/1)",
    "VISION — Rork Max generates apps for Vision Pro, Apple Watch, Apple TV, iMessage & App Clips from one prompt (4/1)",
    "PUBLISH — Rork Max ships to App Store in 2 clicks; Rork Companion enables real-device testing without a paid dev account (4/1)",
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
