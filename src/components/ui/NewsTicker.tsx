"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RESET — 11/23 の更新で、iPhone プレビューを新規インストールの状態に戻せる Reset が入りました",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 で提供終了、残り6日です。AI 機能の呼び出し先を確かめます",
    "AUTH TAB — Android でログインの画面を開いている間にアプリが終了されることがある、という報告が Expo に出ています",
    "NEW — 新着：一覧を片づけるなら削除ではなくアーカイブ、の線引き",
    "2.5 ROUTE — 12/1 から Gemini 2.5 系は別モデルへ自動で回り、料金も変わります。残り7日です",
    "COCOAPODS — CocoaPods Trunk の更新停止に備え、Expo アプリの SwiftPM 移行を考える記事が出ています",
  ],
  en: [
    "RESET — Since 11/23, Reset in the iPhone preview opens your app like a fresh install",
    "SONNET 4.5 — Sonnet 4.5 retires from the Claude API on 11/30, 6 days left. Check which model your AI features call",
    "AUTH TAB — Expo users report Android apps being killed while the sign-in tab is open",
    "NEW — New: Archive or delete? Where to draw the line when tidying projects",
    "2.5 ROUTE — From 12/1, Gemini 2.5 requests reroute to newer models at new rates. 7 days left",
    "COCOAPODS — With CocoaPods Trunk going read-only, developers are weighing a move to SwiftPM for Expo apps",
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
