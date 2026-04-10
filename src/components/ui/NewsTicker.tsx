"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK MAX — Rork Max発表：React Native廃し、Swift専用Rorkで真のネイティブiOSアプリ開発を実現。エコシステム全体で次世代へ移行",
    "FUNDING — Rorkが$2.8Mシード調達完了：a16z（Andreessen Horowitz）主導で、モバイルAIアプリ開発市場の急速拡大に対応",
    "USERS — 743,000月間ユーザー達成、85%成長率を記録：ノーコードアプリ市場でLovable・Boltに次ぐ速度でシェア拡大中",
    "PRICING — Rork 2026年料金体系：Free（35クレジット/月）・Junior（$25/月）・Senior（$100/月）で段階的なアイデア検証→MVP構築を支援",
    "COMPARISON — Rork vs Lovable vs Bolt徹底比較：ネイティブモバイル専門（Rork）vs Webサービス高速構築（Lovable）の明確な棲み分けが確立",
    "EXPO — React Native + Expo基盤でクロスプラットフォーム開発：iOS＆Androidを一度のAIプロンプトで同時構築、開発時間を90%削減",
  ],
  en: [
    "RORK MAX — Rork Max unveiled: abandon React Native, go pure Swift. True native iOS development with AI agents transforms entire ecosystem",
    "FUNDING — Rork closes $2.8M seed led by a16z. Mobile AI app development reaches hypergrowth phase, capturing market momentum (2/2026)",
    "USERS — 743,000 monthly users with 85% growth rate. Rork now dominates no-code mobile builders, closing gap with Lovable & Bolt",
    "PRICING — Rork 2026 tiers: Free (35 credits/mo), Junior ($25/mo for demos), Senior ($100/mo for full MVPs). Pay-as-you-validate model",
    "COMPARISON — Rork vs Lovable vs Bolt: mobile-native specialists (Rork) vs web-first builders (Lovable) define clear market segmentation",
    "EXPO — React Native + Expo: single AI prompt generates iOS & Android simultaneously. 90% faster than traditional mobile development",
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
