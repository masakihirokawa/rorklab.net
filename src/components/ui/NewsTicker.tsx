"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork Max が SwiftUI ネイティブアプリ生成で新時代へ、クラウド Mac ビルド＋ライブシミュレーター完備（4/3）",
    "ARR — Rork が $2.8M a16z 調達、月間 74 万訪問・85% 成長・$1.5M ARR を 3 日で達成（4/3）",
    "NATIVE — Rork Max が Vision Pro・Apple Watch・Apple TV・Dynamic Island・Live Activities・Core ML サポート（4/3）",
    "PUBLISH — Rork Max は 2 クリックで App Store 公開、Rork Companion で実機テスト無料・開発者登録不要（4/3）",
    "MARKET — ノーコード AI モバイル市場が 2032 年に $264B 規模へ、低コード開発が新規アプリの 75% を占める（4/3）",
    "TEAM — Rork が Claude Opus 4.6・Gemini 3 Pro・GPT モデル統合で高精度コード生成、複数 AI バックエンド対応（4月）",
  ],
  en: [
    "RORKMAX — Rork Max launches native SwiftUI app generation with cloud Mac builds and live simulator preview (4/3)",
    "ARR — Rork raises $2.8M a16z, hits 743K monthly visits, 85% growth, and $1.5M ARR in 3 days (4/3)",
    "NATIVE — Rork Max supports Vision Pro, Apple Watch, Apple TV, Dynamic Island, Live Activities, and Core ML (4/3)",
    "PUBLISH — Rork Max ships to App Store in 2 clicks; Rork Companion offers free real-device testing without paid dev account (4/3)",
    "MARKET — No-code AI mobile market projected $264B by 2032; low-code will drive 75% of new development (4/3)",
    "TEAM — Rork integrates Claude Opus 4.6, Gemini 3 Pro, and GPT models for multi-AI code generation backends (April)",
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
