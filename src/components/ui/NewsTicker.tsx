"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはClaude CodeとClaude Opus 4.6を基盤に、React NativeではなくネイティブSwiftアプリを直接生成します",
    "APPLE — Rork MaxはiPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまでAppleエコシステム全体を対象にします",
    "WORKFLOW — 実運用ではAIに足場を作らせ、状態管理とデータ層は自分で書き直す分担に落ち着いてきたという声が目立ちます",
    "SEED — 4月にLeft Lane Capital主導で$15Mのシードを調達しました（Peak XV・True Ventures・a16z Speedrunが参加）",
    "PAPERLINE — アプリビルダーPaperlineを買収。エンジニア人材の獲得へ今後も買収を続ける方針です",
    "REVIEW — 3ヶ月使ったユーザーの再訪レビューが増え、得意・不得意と向く用途の見極めが進んでいます",
  ],
  en: [
    "MAX — Rork Max is built on Claude Code and Claude Opus 4.6, generating native Swift apps directly instead of React Native",
    "APPLE — Rork Max targets the whole Apple ecosystem: iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "WORKFLOW — In practice, users settle into letting the AI scaffold while they rewrite the state management and data layer themselves",
    "SEED — Rork raised a $15M seed led by Left Lane Capital in April, with Peak XV, True Ventures, and a16z Speedrun joining",
    "PAPERLINE — Rork acquired app builder Paperline and says it will stay acquisitive to bring in engineering talent",
    "REVIEW — Three-month revisit reviews are growing, clarifying where the tool shines and where it doesn't",
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
