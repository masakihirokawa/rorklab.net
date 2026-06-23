"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — RorkがLeft Lane Capital主導で$15Mのシードを調達。Peak XV・True Ventures・Goodwater・a16z Speedrunが参加しました",
    "ENGINE — Rork MaxはClaude CodeとClaude Opus 4.6で駆動。X で800万超のビューを集め、2週間で年間売上を倍増させました",
    "SWIFT — Rork MaxはWebで初めてSwiftアプリを生成できるビルダーで、Apple伝統のXcodeを置き換える位置づけです",
    "PRODUCT — Rork MaxはiPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまでApple全域に対応します",
    "CLASSIC — 通常のRorkはReact Native（Expo）で、英語の説明だけからiOS/Androidアプリを生成しストア配信できます",
    "PRICING — 無料で始められ、有料は月25ドル〜。Rork Maxは月200ドルです",
  ],
  en: [
    "FUNDING — Rork raised a $15M seed led by Left Lane Capital, with Peak XV, True Ventures, Goodwater, and a16z Speedrun joining",
    "ENGINE — Rork Max runs on Claude Code and Claude Opus 4.6; it drew 8M+ views on X and doubled annual revenue in two weeks",
    "SWIFT — Rork Max is the first web-based Swift app builder, positioned to replace Apple's traditional Xcode",
    "PRODUCT — Rork Max covers the whole Apple ecosystem: iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "CLASSIC — The original Rork uses React Native (Expo), building iOS/Android apps from a plain-English description",
    "PRICING — Start free; paid plans begin at $25/mo, and Rork Max is $200/mo",
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
