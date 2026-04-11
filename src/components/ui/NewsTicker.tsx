"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK MAX — 2026年2月リリース、ネイティブSwiftアプリビルダー。iPhone・iPad・Watch・TV・Vision Pro対応（4/12）",
    "FUNDING — a16zからシリーズA $2.8M調達。743,000+月間訪問、85%成長率で急速拡大中（4/12）",
    "NATIVE APPS — React Native + Expo基盤でiOS・Android同時デプロイ。Webビルダーとは異なるネイティブ品質（4/12）",
    "MVP HOURS — 自然言語からプロダクション対応アプリまで数時間で完成。Lovable・Boltとは別のモバイル特化（4/12）",
    "FREE TIER — 無料プラン: 月35クレジット（日5クレジット上限）。有料: $25/月で100クレジット・無制限（4/12）",
    "MARKET POSITION — Newly AI・Fabricateとの差別化。唯一のトゥルーネイティブアプリビルダー（4/12）",
  ],
  en: [
    "RORK MAX — Launched February 2026, native Swift app builder. Support for iPhone, iPad, Watch, TV, Vision Pro (4/12)",
    "FUNDING — Closes $2.8M Series A from a16z. 743,000+ monthly visits with 85% growth rate accelerating (4/12)",
    "NATIVE APPS — React Native + Expo stack enables iOS and Android simultaneous deployment, true native quality (4/12)",
    "MVP HOURS — Natural language to production-ready apps in hours. Distinct from web-only builders like Lovable and Bolt (4/12)",
    "FREE TIER — Free plan: 35 credits/month with 5 daily cap. Paid: $25/month for 100 credits with no daily limits (4/12)",
    "MARKET POSITION — Differentiated from Newly AI and Fabricate. Only true native app builder in its category (4/12)",
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
