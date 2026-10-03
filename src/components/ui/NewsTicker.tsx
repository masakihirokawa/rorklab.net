"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GPT6.1 — Rork のモデルメニューに GPT-6.1 Sol が加わりました（9月29日）。changelog の最新エントリです",
    "10/12 — React Native 0.88.x の正式リリース予定まで残り8日。Expo SDK 58 の安定版は、10月上旬としか示されていません",
    "NEW — すでに「有効」になっている複数シート購入を、10月22日の前に残すか外すか決める",
    "SQLITE — expo-sqlite で全文検索（FTS）を使い、接続を閉じるときに落ちる報告（#38168）があります。15.2.0 以降が対象とされています",
    "SONNET — Rork に Claude Sonnet 5.5 が入りました（9月28日）。Sonnet 5 より出力が30%超速いと説明されています",
    "iOS 27 — 2027年4月から、App Store へのアップロードは iOS 27 SDK が必須になります。ビルド環境の更新は余裕を持って進められます",
  ],
  en: [
    "GPT6.1 — GPT-6.1 Sol joined the Rork model menu (Sep 29). It is the latest entry on the changelog",
    "10/12 — 8 days left until React Native 0.88.x is due. Expo SDK 58 stable is only described as early October",
    "NEW — Multiseat Purchases Are Already On: Decide Whether to Keep Them Before October 22",
    "SQLITE — A report (#38168) says expo-sqlite with full-text search (FTS) crashes when the connection closes. It is said to affect 15.2.0 and later",
    "SONNET — Claude Sonnet 5.5 is now in Rork (Sep 28). It is described as over 30% faster than Sonnet 5",
    "iOS 27 — From April 2027, App Store uploads require the iOS 27 SDK. There is time to update your build environment calmly",
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
