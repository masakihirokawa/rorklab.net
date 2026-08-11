"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ENGINE — Rork Max の内側では Claude Code と Opus 4.6 が動いています。長い作業を続け、自分の誤りに気づく点が強みとされています",
    "NATIVE — 生成されるのは React Native ではなくネイティブ Swift です。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage が対象になります",
    "BUILD — ビルドはクラウド上の Mac で行われます。手元に Mac がなくても Apple 向けのアプリを組み立てられる構成です",
    "CHOICE — iOS と Android と web を1つのコードで賄うなら従来の Rork、Apple に絞って作り込むなら Rork Max という分かれ方になります",
    "TRACTION — 2026年2月に公開された Rork Max は、3日で年間経常収益150万ドルに達したと報じられています",
    "LIMIT — ネイティブに寄せた分、Rork Max では Android や web に出せません。対象プラットフォームを先に決めてから選ぶ必要があります",
  ],
  en: [
    "ENGINE — Rork Max runs on Claude Code paired with Opus 4.6, which is credited with sustaining longer tasks and catching its own mistakes",
    "NATIVE — It generates native Swift rather than React Native, covering iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "BUILD — Compilation happens on cloud Mac servers, so you can assemble an Apple app without owning a Mac yourself",
    "CHOICE — Original Rork covers iOS, Android, and web from one codebase; Rork Max trades that reach for depth on Apple platforms",
    "TRACTION — Rork Max, released in February 2026, is reported to have reached $1.5M in annual recurring revenue within three days",
    "LIMIT — That native focus is also a boundary: Rork Max cannot ship to Android or web, so pick your target platforms first",
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
