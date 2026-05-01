"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GLOBAL-#1 — Rork がローンチ 1 年未満で web トラフィック世界一のモバイルアプリビルダーへ、英語でアプリを記述するパラダイムを牽引",
    "RORK15M — Rork が $15M シードラウンドを Left Lane Capital リードで調達、X 上で 800 万 view・2 週間で年間収益 2 倍（4/9）",
    "RORKMAX — Rork Max が Web ベース Xcode 代替として確立、Claude Code + Opus 4.6 基盤でローンチ 3 日で $1.5M ARR を達成",
    "PAPERLINE — Rork が Paperline を買収、ネイティブ Swift 生成能力が大幅強化、創業エンジニア 2 名が参画",
    "APP-BOOM — 4 月の iOS アプリリリース 80%+ 増、両 OS 合計 104% 増、AI 起因の新規開発ブームの主役に",
    "AGENT365 — Microsoft Agent 365（5/1 ローンチ）はエンタープライズ統制プレーン、個人開発者向け Rork とは別市場で住み分け",
  ],
  en: [
    "GLOBAL-#1 — In under a year Rork becomes the world's #1 mobile app builder by web traffic, leading the English-to-app paradigm",
    "RORK15M — Rork closes a $15M seed round led by Left Lane Capital, with 8M+ X views and revenue doubling in two weeks (4/9)",
    "RORKMAX — Rork Max emerges as a web-based Xcode alternative, hitting $1.5M ARR within three days on Claude Code + Opus 4.6",
    "PAPERLINE — Rork acquires Paperline, strengthening native Swift generation as the founders join the team",
    "APP-BOOM — April iOS app releases jumped 80%+, with combined OS releases up 104%, putting Rork at the heart of the AI-driven app boom",
    "AGENT365 — Microsoft Agent 365 launches May 1 as the enterprise control plane, leaving Rork to dominate the solo-developer market",
  ],
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
              fontFamily: "'DM Mono', monospace",
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
