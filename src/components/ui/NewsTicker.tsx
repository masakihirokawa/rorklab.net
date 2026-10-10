"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO — EAS Observe がネイティブクラッシュも記録（10/07）。SDK 57 は 57.0.21 以降で確認できます",
    "RORK — 09-29 に GPT-6.1 Sol、09-28 に Claude Sonnet 5.5 を追加。モデル選択で使えます",
    "RN 0.88 — 正式リリース予定は 10/12、残り1日。10/07 時点は rc.4",
    "Q&A — expo-widgets のウィジェットが本番ビルドだけ真っ黒になる、という報告が出ています",
    "WINDOWS — Mac がなくても Windows だけで iPhone アプリを出す手順が共有されています",
    "NEW — クライアントのアプリを Rork で作る前に決める、公開アカウントの持ち主",
  ],
  en: [
    "EXPO — EAS Observe now records native crashes (Oct 7). On SDK 57, update to 57.0.21 or later",
    "RORK — GPT-6.1 Sol (Sep 29) and Claude Sonnet 5.5 (Sep 28) are now in the model menu",
    "RN 0.88 — Scheduled for Oct 12, 1 day left. As of Oct 7 it was at rc.4",
    "Q&A — Readers report expo-widgets showing a black widget in production builds only",
    "WINDOWS — A walkthrough shows how to ship an iPhone app from Windows only, with no Mac",
    "NEW — Before building a client's app in Rork, decide who owns the publishing account",
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
