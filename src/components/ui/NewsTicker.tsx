"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK15M — Rork が $15M シードラウンドを Left Lane Capital リードで調達、X 上で 800 万 view・2 週間で年間収益 2 倍（4/9）",
    "PAPERLINE — Rork が Paperline を買収、ネイティブ Swift 生成能力が大幅強化、創業者の Mozharovskii / Konstantinov が参画",
    "RORKMAX — Rork Max が Web ベースの Xcode 代替として確立、Claude Code + Opus 4.6 を基盤に Swift をクラウド Mac で直接コンパイル",
    "APPLEFULL — Rork Max が iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage に対応、AR/LiDAR・Metal・Dynamic Island まで活用可能",
    "COMPANION — Rork Companion アプリで Apple Developer 有償契約なしに実機 iPhone テストが可能、個人開発者の参入障壁が大幅低下",
    "TRENDS2026 — Gartner 予測で 2026 年までに低コード開発が新規アプリの 75% を占める、Rork / Lovable / Anything の 3 強体制が定着",
  ],
  en: [
    "RORK15M — Rork closes a $15M seed round led by Left Lane Capital, with 8M+ X views and revenue doubling in two weeks (4/9)",
    "PAPERLINE — Rork acquires Paperline, strengthening native Swift generation as founders Mozharovskii and Konstantinov join the team",
    "RORKMAX — Rork Max emerges as a web-based Xcode alternative, powered by Claude Code + Opus 4.6 with cloud-Mac Swift compilation",
    "APPLEFULL — Rork Max covers iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage with AR/LiDAR, Metal, and Dynamic Island",
    "COMPANION — Rork Companion lets you test on real iPhones without a paid Apple Developer account, lowering the bar for solo devs",
    "TRENDS2026 — Gartner forecasts low-code tools to drive 75% of new app development in 2026, with Rork, Lovable, and Anything as the top 3",
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
