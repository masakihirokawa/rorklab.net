"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED — 2026年4月9日に Left Lane Capital 主導で1,500万ドルのシードラウンドを実施したと報じられています",
    "M&A — 同じ発表でアプリビルダー Paperline の買収も明かされ、技術者を迎え入れる形の買収を続ける方針が示されています",
    "MAX — 2026年2月公開の Rork Max はネイティブ Swift を書き出します。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage が対象です",
    "CLOUD — ビルドはクラウド上の Mac で走ります。手元に Mac がなくても Apple 向けのアプリを組み立てられる構成になっています",
    "REACH — 月間アクセスは74万を超え、伸び率は85%と集計されています。ノーコードのモバイル開発では上位に位置しています",
    "CHOICE — iOS と Android と web を1つのコードで賄うなら従来の Rork、Apple に絞って作り込むなら Rork Max という分かれ方です",
  ],
  en: [
    "SEED — Rork is reported to have raised a $15M seed round led by Left Lane Capital, announced on April 9, 2026",
    "M&A — The same announcement revealed the acquisition of app builder Paperline, with more talent-driven acquisitions signalled ahead",
    "MAX — Rork Max, released in February 2026, emits native Swift for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "CLOUD — Builds run on a cloud Mac fleet, so you can assemble an Apple app without owning a Mac yourself",
    "REACH — Traffic is tracked at over 743,000 monthly visits with 85% growth, placing it near the top of no-code mobile tooling",
    "CHOICE — Original Rork covers iOS, Android, and web from one codebase; Rork Max trades that reach for depth on Apple platforms",
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
