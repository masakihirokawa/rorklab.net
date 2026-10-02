"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GPT6.1 — Rork のモデルメニューに GPT-6.1 Sol が加わりました（9月29日）。changelog の最新エントリです",
    "SONNET — Rork に Claude Sonnet 5.5 が入りました（9月28日）。Sonnet 5 より出力が30%超速く、UI の生成に強いと説明されています",
    "10/12 — React Native 0.88.x の正式リリース予定まで残り9日。Expo SDK 58 の安定版は、10月上旬としか示されていません",
    "NEW — すでに「有効」になっている複数シート購入を、10月22日の前に残すか外すか決める",
    "NPM — SDK 58 の新規プロジェクトで npm install が失敗する問題の修正 PR（#50998）が出ています。安定版を待つ間の注意点です",
    "SHARED — 凍結された SharedObject を release() すると例外になる不具合の修正（#50970）が入る見込みです。モジュール作者向けの話題です",
  ],
  en: [
    "GPT6.1 — GPT-6.1 Sol joined the Rork model menu (Sep 29). It is the latest entry on the changelog",
    "SONNET — Claude Sonnet 5.5 is now in Rork (Sep 28). It is described as over 30% faster than Sonnet 5 and strong at UI generation",
    "10/12 — 9 days left until React Native 0.88.x is due. Expo SDK 58 stable is only described as early October",
    "NEW — Multiseat purchases are already enabled. Here is how to decide whether to keep or switch them off before October 22",
    "NPM — A fix PR (#50998) addresses npm install failing on new SDK 58 projects. Worth knowing while you wait for stable",
    "SHARED — A fix (#50970) is expected for release() throwing on a frozen SharedObject. A topic for module authors",
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
