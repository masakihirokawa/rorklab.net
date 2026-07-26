"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ENGINE — Rork Maxのコード生成はClaude CodeとClaude Opus 4.6を土台にしています。プロンプトの粒度を考えるうえで押さえておきたい前提です",
    "SPLIT — Rork MaxはAppleプラットフォーム専用です。Androidも必要なら、React Nativeでクロスプラットフォームを生成する従来のRorkを選ぶことになります",
    "DEVICE — Rork MaxはiPhone・iPad・Apple Watch・Vision Proを対象にできます。React Nativeからは届きにくかった領域まで生成対象に入ります",
    "CREDIT — 課金はクレジット制で、AIとのやり取り1回につき1クレジットを消費します。毎月1日にリセットされ、繰り越しはできません",
    "PLAN — 無料は月35クレジット（1日5）、Juniorは月$25、Seniorは月$100、Rork Maxは月$200です。MVPの作り込みはSeniorが目安とされています",
    "FUND — Rorkはa16zから280万ドルを調達し、月間743,000件を超える訪問を集めています",
  ],
  en: [
    "ENGINE — Rork Max generates code on top of Claude Code and Claude Opus 4.6, which is worth knowing when you tune how specific your prompts are",
    "SPLIT — Rork Max is Apple-only. If you also need Android, the original Rork is the one that generates cross-platform apps with React Native",
    "DEVICE — Rork Max targets iPhone, iPad, Apple Watch, and Vision Pro, reaching territory React Native struggles to cover",
    "CREDIT — Billing runs on credits: one credit per AI interaction, reset on the 1st of each month with nothing carried over",
    "PLAN — Free gives 35 credits a month (5 per day); Junior is $25/mo, Senior $100/mo, and Rork Max $200/mo, with Senior the usual pick for MVP work",
    "FUND — Rork raised $2.8M from a16z and now draws over 743,000 monthly visits",
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
