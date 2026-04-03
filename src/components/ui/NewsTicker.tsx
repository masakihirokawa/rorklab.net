"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork Max が SwiftUI ネイティブアプリを生成、クラウド Mac ビルド＋ライブシミュレーターで Xcode 不要の開発を実現（4/4）",
    "ARR — Rork が a16z から $2.8M を調達、月間 74 万訪問・85% 成長・$1.5M ARR を 3 日で達成し急成長を継続（4/4）",
    "NATIVE — Rork Max が Vision Pro・Apple Watch・Apple TV・Dynamic Island・Live Activities・Core ML をフルサポート（4/4）",
    "PUBLISH — Rork Max は 2 クリックで App Store 公開可能、Rork Companion アプリで実機テストが無料・開発者登録不要（4/4）",
    "GEMMA4 — Google Gemma 4 がオンデバイスモバイル AI を刷新、Rork のような AI アプリビルダーとの連携に期待高まる（4/2）",
    "MARKET — ノーコード AI モバイル市場が 2032 年に $264B 規模へ成長、低コード開発が新規アプリの 75% を占める見通し（4/4）",
  ],
  en: [
    "RORKMAX — Rork Max generates native SwiftUI apps with cloud Mac builds and live simulator, making Xcode unnecessary for Apple app development (4/4)",
    "ARR — Rork raises $2.8M from a16z, hitting 743K monthly visits, 85% growth rate, and $1.5M ARR achieved in just 3 days (4/4)",
    "NATIVE — Rork Max fully supports Vision Pro, Apple Watch, Apple TV, Dynamic Island, Live Activities, Core ML, ARKit, and LiDAR (4/4)",
    "PUBLISH — Rork Max deploys to the App Store in 2 clicks; Rork Companion app provides free real-device testing without a paid developer account (4/4)",
    "GEMMA4 — Google Gemma 4 redefines on-device mobile AI with 2B to 31B models, raising expectations for AI app builders like Rork to integrate next (4/2)",
    "MARKET — No-code AI mobile market forecast to reach $264B by 2032, with low-code development set to account for 75% of new app creation (4/4)",
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
