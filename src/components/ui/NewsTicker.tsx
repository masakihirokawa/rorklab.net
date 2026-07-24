"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはネイティブのSwiftアプリを生成します。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまで対応します",
    "FUND — Rorkはa16zから280万ドルを調達。月間743,000訪問、成長率85%という規模に達しています",
    "RN — プレーンな英語のプロンプトから、iOS・Androidの実働アプリ（React Native）を生成できます",
    "FREE — 無料プラン（35クレジット/月・1日5まで）で試作でき、まずプラットフォームを試すのに十分です",
    "PLAN — Junior（月$25）はアイデア検証、Senior（月$100）はMVPの作り込みに向く水準です",
    "CROSS — 従来のRorkはReact Nativeでクロスプラットフォーム、Rork MaxはApple向けネイティブと、用途で選び分けられます",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps, covering iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "FUND — Rork raised $2.8M from a16z and now sees over 743,000 monthly visits with 85% growth",
    "RN — Plain-English prompts turn into working iOS and Android apps built on React Native",
    "FREE — The free plan (35 credits a month, 5 a day) is enough to test the platform and build a simple prototype",
    "PLAN — Junior ($25/mo) suits idea validation, while Senior ($100/mo) is the sweet spot for building out an MVP",
    "CROSS — Original Rork targets cross-platform React Native; Rork Max goes native for Apple, so you pick by use case",
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
