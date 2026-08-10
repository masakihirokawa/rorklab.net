"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PUBLISH — Rork Max は生成したアプリの App Store 公開までを製品内で扱うとされています。他の AI アプリビルダーにはない範囲です",
    "STEPS — 対象になるのは署名・プロビジョニング・審査提出という、初めての人がいちばん詰まる工程です",
    "CAVEAT — ただし審査そのものは Apple 側の判断であり、通ることが保証される仕組みではありません",
    "COMPANION — Rork Companion を使えば、有料の Apple Developer アカウントなしで実機の iPhone で試せます",
    "FUNDING — 2026年4月9日、Left Lane Capital がリードする1,500万ドルのシードが発表されました。それ以前に a16z から280万ドルを調達しています",
    "SCALE — アプリビルダーの Paperline を買収し、月間74万3,000訪問・成長率85%という数字が挙げられています",
  ],
  en: [
    "PUBLISH — Rork Max handles App Store submission inside the product itself, a step no other AI app builder currently covers",
    "STEPS — That means signing, provisioning, and review submission, the exact places first-time publishers tend to get stuck",
    "CAVEAT — Approval still rests with Apple, so nothing here guarantees your app makes it through review",
    "COMPANION — With Rork Companion you can try a generated app on a real iPhone without a paid Apple Developer account",
    "FUNDING — On April 9, 2026, Rork announced a $15M seed led by Left Lane Capital, following an earlier $2.8M from a16z",
    "SCALE — The company acquired app builder Paperline and reports roughly 743,000 monthly visits at an 85% growth rate",
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
