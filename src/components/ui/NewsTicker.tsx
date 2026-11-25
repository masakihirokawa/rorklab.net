"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPORT — 11/25 の更新で、GitHub 同期やダウンロードで書き出したプロジェクトが Rork の外でもそのまま動くようになりました",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 で提供終了、残り4日です。AI 機能の呼び出し先を確かめます",
    "CRYPTO — Android 8.1 で expo-crypto の復号結果が16バイト長くなるという報告が Expo に出ています",
    "NEW — 新着：12/1 の切り替え前に gemini-2.5-flash の答えを比べる",
    "PLATFORM — 新しいプロジェクトは、最初のメッセージで頼んだ iPhone・Android・Web で始まるようになりました",
    "APP ICON — アプリのアイコンが更新されないときの解説が、いまいちばん読まれています",
  ],
  en: [
    "EXPORT — Since 11/25, projects you sync to GitHub or download run outside Rork as they are",
    "SONNET 4.5 — Sonnet 4.5 retires from the Claude API on 11/30, 4 days left. Check which model your AI features call",
    "CRYPTO — Expo users report expo-crypto returning 16 extra bytes when decrypting on Android 8.1",
    "NEW — New: Compare gemini-2.5-flash answers before the 12/1 switch",
    "PLATFORM — A new project now starts on the platform your first message asks for: iPhone, Android or web",
    "APP ICON — Our guide to an app icon that won't update is the most-read page right now",
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
