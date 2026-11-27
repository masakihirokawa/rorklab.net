"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO 58.1 — expo@58.1.0（11/26）で、読み込み前の分割チャンクが誤って致命的エラーになる問題が直りました",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 で提供終了、残り2日です。連携しているアプリは移行先を確認してください",
    "IME — iOS 18 以降、日本語の変換中に TextField が落ちるという報告が出ています",
    "SEARCH — ⌘K の検索で、最近開いたもの以外のプロジェクトも見つかるようになりました（11/26）",
    "GEMINI 2.5 — 12/1 から gemini-2.5 系は別モデルへ自動で回ります。残り3日、アプリに埋め込んだモデル名を確認しましょう",
    "ICON — アプリのアイコンが更新されないときの解説が、よく読まれています",
  ],
  en: [
    "EXPO 58.1 — expo@58.1.0 (11/26) fixes false fatal errors when loading split chunks that weren't preloaded",
    "SONNET 4.5 — Sonnet 4.5 retires from the Claude API on 11/30, 2 days left. Check what your app calls next",
    "IME — Users report TextField crashing on iOS 18+ while composing Japanese or other CJK text",
    "SEARCH — Cmd+K search now finds any project, not just the ones you opened recently (11/26)",
    "GEMINI 2.5 — From 12/1, gemini-2.5 models reroute to newer ones. 3 days left to check model names in your app",
    "ICON — Our guide to app icons that won't update is one of the most-read pages",
  ]
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
        background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-primary))", // 2026-10-09: 不透明に（固定バーの下を流れる本文が透けて重なっていた）
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
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
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
