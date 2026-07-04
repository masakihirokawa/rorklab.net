"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが$15Mのシード資金調達を完了。Left Lane Capitalが主導し、Peak XV・True Ventures・Goodwater・a16z Speedrunが参加しました",
    "USERS — 利用者は200万人に達し、月間74.3万訪問・成長率85%と伸び続けています",
    "MAX — Rork MaxはネイティブSwiftアプリを生成し、iPhone・iPad・Watch・TV・Vision Pro・iMessageに対応します",
    "STACK — 通常のRorkはReact Native（Expo）でiOSとAndroidを同時に生成し、非エンジニアでも実機アプリを作れます",
    "PRICE — 料金は無料から用意され、有料プランは月$25から、Rork Maxは月$200です",
    "MARKET — Gartnerは2026年末までに新規アプリの75%が低コード/ノーコード製になると予測しています",
  ],
  en: [
    "FUNDING — Rork closed a $15M seed round led by Left Lane Capital, with Peak XV, True Ventures, Goodwater, and a16z Speedrun",
    "USERS — Rork now reaches 2M users with 743K monthly visits and an 85% growth rate",
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "STACK — Standard Rork builds iOS and Android together in React Native (Expo), so non-engineers can ship real apps",
    "PRICE — Plans start free, paid tiers from $25/month, and Rork Max at $200/month",
    "MARKET — Gartner projects 75% of new apps will be low-code or no-code by the end of 2026",
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
