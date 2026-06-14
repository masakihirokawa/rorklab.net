"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK MAX — Rork MaxがiPhone・iPad・Apple Watch・Apple TV・Vision Pro向けのネイティブSwiftアプリを生成できるようになりました",
    "PUBLISH — Rork Maxは Xcode不要の「2クリックApp Store公開」に対応。申請・公開までの摩擦を大きく減らします",
    "EXPO — 標準のRorkはReact Native（Expo）ベースで、プレーンな英語の説明からiOS／Androidネイティブアプリを生成します",
    "PRICING — Rorkは無料で始められ、有料プランは月額$25から。個人開発で試しやすい価格帯です",
    "FUNDING — Rorkがa16z（Andreessen Horowitz）から$2.8Mを調達。AIアプリビルダー領域への資金流入が続いています",
    "REVIEW — 実運用では生成コードの可読性・保守性、Expo由来の制約、課金・プッシュ・広告SDKの組み込みやすさが評価の鍵になります",
  ],
  en: [
    "RORK MAX — Rork Max can now build native Swift apps for iPhone, iPad, Apple Watch, Apple TV, and Vision Pro",
    "PUBLISH — Rork Max offers two-click App Store publishing with no Xcode required, cutting the friction of getting an app shipped",
    "EXPO — The standard Rork is built on React Native (Expo), generating native iOS and Android apps from plain-English descriptions",
    "PRICING — Rork is free to start, with paid plans beginning at $25/month, an accessible tier for solo developers",
    "FUNDING — Rork raised $2.8M from a16z (Andreessen Horowitz) as investment keeps flowing into AI app builders",
    "REVIEW — In real use the keys are generated-code readability and maintainability, Expo-related constraints, and how easily billing, push, and ad SDKs slot in",
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
