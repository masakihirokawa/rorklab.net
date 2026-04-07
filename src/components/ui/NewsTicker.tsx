"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GROWTH — Rork が a16z から $2.8M 調達、743K 月間訪問・85% 成長・$1.5M ARR を 3 日で達成（4月）",
    "SURGE — AI ツール普及で App Store 新規アプリが前年比 84% 急増 ─ ノーコード開発者にとって追い風（4/6）",
    "RORKMAX — Rork Max が SwiftUI ネイティブアプリを生成。クラウド Mac ビルド＋ライブシミュレーターで Xcode 不要（4/4）",
    "NATIVE — Rork Max が Vision Pro・Apple Watch・Dynamic Island・Core ML・ARKit・LiDAR をフルサポート（4/4）",
    "COMPARE — Lovable・Bolt・Rork を数週間実際に使って比較。本番アプリ開発に最も向くツールを検証（4/6）",
    "COMPANION — Rork Companion アプリで Apple Developer アカウント不要の実機テストが可能に（2026）",
  ],
  en: [
    "GROWTH — Rork raises $2.8M from a16z, achieves 743K monthly visits, 85% growth rate, and $1.5M ARR in just 3 days (Apr)",
    "SURGE — AI coding tools drive an 84% year-over-year surge in new App Store submissions — tailwind for no-code developers (4/6)",
    "RORKMAX — Rork Max generates native SwiftUI apps with cloud Mac builds and live streaming simulator — no Xcode or Mac required (4/4)",
    "NATIVE — Rork Max offers full support for Vision Pro, Apple Watch, Dynamic Island, Core ML, ARKit, and LiDAR out of the box (4/4)",
    "COMPARE — A real-world weeks-long comparison of Lovable, Bolt, and Rork reveals which AI app builder best suits production development (4/6)",
    "COMPANION — Rork Companion app enables on-device testing on a real iPhone without an Apple Developer account (2026)",
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
