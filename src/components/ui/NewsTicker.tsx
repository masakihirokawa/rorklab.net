"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "EXPO — EAS Observe がネイティブクラッシュも記録（10/07）。SDK 57 は 57.0.21 以降で確認できます",
    "RORK — 09-29 に GPT-6.1 Sol、09-28 に Claude Sonnet 5.5 を追加。モデル選択で使えます",
    "SDK 58 — ベータ（9/15）のまま。stable が出る前に、SDK 57 のアプリで確かめておく点を整理しています",
    "Q&A — CPU が 2 コアだと jest が終わらない。CI で詰まる原因を追った記録が共有されています",
    "WIDGET — iOS のウィジェットが本番ビルドだけ真っ黒になる原因を追った記録が出ています",
    "NEW — 個人アカウントで出した iOS アプリを法人へ移せるか。App Transfer の前に外す5つ",
  ],
  en: [
    "EXPO — EAS Observe now records native crashes (Oct 7). On SDK 57, check for 57.0.21 or later",
    "RORK — GPT-6.1 Sol (09-29) and Claude Sonnet 5.5 (09-28) are in the model menu",
    "SDK 58 — Still in beta (since Sep 15). What to check on an SDK 57 app before the stable release",
    "Q&A — Jest never finishes on a 2-core CPU. A write-up traces the cause in CI",
    "WIDGET — A write-up traces why an iOS widget goes black only in production builds",
    "NEW — Moving an iOS app from a personal account to an organization: five things to clear before App Transfer"
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
