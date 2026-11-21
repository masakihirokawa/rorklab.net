"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MCP — Rork で、自前の MCP サーバーを Plugins の中で追加・管理できるようになりました（11/21）",
    "2.5 ROUTE — 12/1 から、アプリに埋め込んだ gemini-2.5-flash は 3.5 Flash-Lite へ自動で回り、料金も変わります（残り9日）",
    "CHANNEL — Expo Go で Android の通知チャネルの読み書きが失敗する、という報告が出ています",
    "NEW — 新着：「起動画面から進みません」に返信する前の3つの手がかり",
    "EXPORT — プランを下げる・解約する前は、先にプロジェクトをエクスポートしておくと安心です",
    "SONNET 4.5 — API 連携で Sonnet 4.5 を使っているアプリは、11/30 の提供終了前に移行先へ切り替えておきましょう",
  ],
  en: [
    "MCP — Rork now lets you add and manage your own MCP servers inside Plugins (11/21)",
    "2.5 ROUTE — From 12/1, apps calling gemini-2.5-flash are routed to 3.5 Flash-Lite and billed at its rates (9 days left)",
    "CHANNEL — Users report Android notification channel reads and writes failing in Expo Go",
    "NEW — New: three clues to check before replying to a stuck-on-splash review",
    "EXPORT — Export your projects before you downgrade or cancel a plan",
    "SONNET 4.5 — Apps that call Sonnet 4.5 through the API should switch before it retires on 11/30",
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
