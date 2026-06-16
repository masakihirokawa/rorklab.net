"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはiPhone・iPad・Apple Watch・Apple TV・Vision Pro向けにネイティブSwiftを生成し、2クリックでApp Store公開でき、Xcodeを必要としません",
    "STACK — 通常のRorkはReact Native（Expo）でクロスプラットフォームのモバイルアプリを作る位置づけ。用途に応じた使い分けが鍵です",
    "FOCUS — BoltやLovableのようなWeb中心ツールと違い、RorkはiOS/Androidのネイティブアプリ生成に特化しています",
    "BUGS — 実利用レビューでは遭遇したバグの約70%を手動介入なしで解決、残り3割はエクスポート済みコードでの手修正が必要と報告されています",
    "FUNDING — Rorkはa16z（Andreessen Horowitz）から$2.8Mを調達しました",
    "PRICING — 無料で開始でき、有料プランは$25/月からです。まず触ってから判断できます",
  ],
  en: [
    "MAX — Rork Max generates native Swift for iPhone, iPad, Apple Watch, Apple TV, and Vision Pro, with 2-click App Store publishing and no Xcode required",
    "STACK — Standard Rork builds cross-platform mobile apps with React Native (Expo); choosing between the two by use case is the key decision",
    "FOCUS — Unlike web-first tools such as Bolt or Lovable, Rork specializes in native iOS and Android app generation",
    "BUGS — A hands-on review reports Rork resolved about 70% of bugs without manual help, with the remaining 30% needing edits in the exported codebase",
    "FUNDING — Rork raised $2.8M from a16z (Andreessen Horowitz)",
    "PRICING — It is free to start, with paid plans from $25/month, so you can try before committing",
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
