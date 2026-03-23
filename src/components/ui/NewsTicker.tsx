"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ARR — Rork Max が3日で$1.5M ARR 達成：ネイティブ Swift 開発の需要を実証（3/24）",
    "FUND — Rork が a16z (Andreessen Horowitz) から$2.8M プレシード資金調達に成功（3/22）",
    "MAX — Rork Max が急成長：ネイティブ Swift アプリを Xcode 不要で構築＆公開（3/20）",
    "GROWTH — Rork 月間訪問数74万超え、成長率85%でノーコード市場をリード（3/18）",
    "CLOUD — クラウド Mac でコンパイル＆QR コードで実機インストール対応（3/15）",
    "APPLE — iPhone・iPad・Apple Watch・Vision Pro・iMessage 全プラットフォーム対応（3/12）",
  ],
  en: [
    "ARR — Rork Max hits $1.5M ARR in just 3 days, proving demand for native Swift development (3/24)",
    "FUND — Rork secures $2.8M pre-seed funding from a16z (Andreessen Horowitz) (3/22)",
    "MAX — Rork Max growing fast: build & publish native Swift apps without Xcode (3/20)",
    "GROWTH — Rork surpasses 743K monthly visits with 85% growth rate, leading no-code market (3/18)",
    "CLOUD — Cloud Mac compilation with QR code install to your device (3/15)",
    "APPLE — Full support for iPhone, iPad, Apple Watch, Vision Pro & iMessage (3/12)",
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
