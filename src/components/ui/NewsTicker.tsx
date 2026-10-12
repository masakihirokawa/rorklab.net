"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "EXPO — EAS Observe がネイティブクラッシュも記録（10/07）。SDK 57 は 57.0.21 以降で確認できます",
    "RORK — 09-29 に GPT-6.1 Sol、09-28 に Claude Sonnet 5.5 を追加。モデル選択で使えます",
    "RN 0.88 — 正式版は未公開。最新は rc.4（10/07）、Latest は 0.87.1 です",
    "Q&A — Expo + Supabase のアプリを TestFlight に出すまでに詰まる4点が共有されています",
    "ECOSYSTEM — Shopify はネイティブに戻る中、1人開発で Expo に残る理由を整理した記録が出ています",
    "NEW — 「1週間でリリース」と書く前に、待ち日数の内訳を見る",
  ],
  en: [
    "EXPO — EAS Observe now records native crashes too (Oct 7). Check on SDK 57 at 57.0.21 or later",
    "RORK — GPT-6.1 Sol (Sep 29) and Claude Sonnet 5.5 (Sep 28) were added to the model menu",
    "RN 0.88 — Not out yet. The latest is rc.4 (Oct 7), and 0.87.1 is the current Latest",
    "Q&A — A write-up lists four snags on the way to TestFlight with an Expo + Supabase app",
    "ECOSYSTEM — With Shopify going back to native, one write-up explains why a solo developer stays on Expo",
    "NEW — Before you write 'ship in a week', look at the breakdown of waiting days",
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
