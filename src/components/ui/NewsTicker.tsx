"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork Max は Claude Code + Claude Opus 4.6 がエンジン、X で 800 万 view・2 週間で年商 2 倍化（2 月）",
    "PAPERLINE — Rork が macOS の Swift ネイティブ AI アプリビルダー Paperline を買収、Xcode 置換ロードマップ加速（4/9）",
    "SEED15M — Rork が $15M シード調達、Left Lane Capital リード（Peak XV / True Ventures / Goodwater / a16z Speedrun 参加）（4 月）",
    "MAXAPPLE — Rork Max が iPhone / iPad / Watch / TV / Vision Pro / iMessage を 1 プロジェクトでカバー、Core ML 等も（5 月）",
    "COMPANION — Rork Companion 経由なら Apple Developer Program なしでも実機テスト可能（5 月）",
    "WWDC26 — WWDC 2026（6/8 開幕）で Xcode 26 が ChatGPT 統合、Rork Max の Xcode 置換戦略と対比（6 月予定）",
  ],
  en: [
    "RORKMAX — Rork Max runs on Claude Code + Claude Opus 4.6, hit 8M views on X and doubled ARR in 2 weeks (Feb)",
    "PAPERLINE — Rork acquires Paperline, a macOS Swift-native AI app builder, accelerating Xcode replacement (4/9)",
    "SEED15M — Rork raises $15M Seed led by Left Lane Capital with Peak XV, True Ventures, Goodwater, a16z Speedrun (Apr)",
    "MAXAPPLE — Rork Max covers iPhone, iPad, Watch, TV, Vision Pro & iMessage in one project, incl. Core ML (May)",
    "COMPANION — Rork Companion enables real-device testing without paid Apple Developer Program (May)",
    "WWDC26 — WWDC 2026 (Jun 8) brings Xcode 26 with ChatGPT, contrasting Rork Max's Xcode-replacement bet (June)",
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
