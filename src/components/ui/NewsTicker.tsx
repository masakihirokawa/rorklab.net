"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "NEW — メモリインポート機能が全ユーザーに公開、ChatGPT・Geminiからの移行も対応",
    "UPDATE — Claude Opus 4.6 リリース、100万トークンコンテキストウィンドウ（ベータ）対応",
    "NEW — Agent Teams 発表、複数AIエージェントが並列でタスクを分担・協調",
    "Cowork — macOS デスクトップ版が Pro プランで利用可能に、ローカルVM搭載",
    "API — ウェブ検索ツールが正式GA、動的フィルタリングでトークンコスト削減",
    "Claude Code — /loop コマンド追加、音声入力が10言語に拡大",
  ],
  en: [
    "NEW — Memory import now available to all users, migrate from ChatGPT & Gemini",
    "UPDATE — Claude Opus 4.6 released with 1M token context window (beta)",
    "NEW — Agent Teams launched, multiple AI agents collaborate on tasks in parallel",
    "Cowork — macOS desktop available for Pro plan users with local VM support",
    "API — Web search tool now GA with dynamic filtering for lower token costs",
    "Claude Code — New /loop command added, voice STT expanded to 10 languages",
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
        height: 32,
        background: "color-mix(in srgb, var(--accent-coral) 4%, transparent)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
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
