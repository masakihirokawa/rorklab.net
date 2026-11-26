"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEARCH — ⌘K の検索が全プロジェクトを対象に。以前は最近開いた12件しか見つかりませんでした（11/26）",
    "PREVIEW — Safari と iPhone・iPad のブラウザで、iPhone・Android のプレビューが再び動くようになりました",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 で提供終了、残り3日です。連携しているアプリは移行先を確認してください",
    "HMR — 開発サーバーを2つ動かすと、HMR が別のバンドルを拾ってサーバーが落ちるという報告が出ています",
    "GEMINI 2.5 — 12/1 から gemini-2.5 系は別モデルへ自動で回ります。残り4日、アプリに埋め込んだモデル名を確認しましょう",
    "APP STORE — App Store の提出が capability 不足で断られたとき、Rork が名前と直し方を示すようになりました",
  ],
  en: [
    "SEARCH — Cmd+K search now covers every project, not just the 12 you opened most recently (11/26)",
    "PREVIEW — iPhone and Android previews work again in Safari and in iPhone and iPad browsers",
    "SONNET 4.5 — Sonnet 4.5 retires from the Claude API on 11/30, 3 days left. Check what your app calls next",
    "HMR — Users report HMR picking up a bundle from a second dev server, which then shuts the server down",
    "GEMINI 2.5 — From 12/1, gemini-2.5 models reroute to newer ones. 4 days left to check model names in your app",
    "APP STORE — When an App Store upload is refused over a missing capability, Rork now names it and how to fix it",
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
