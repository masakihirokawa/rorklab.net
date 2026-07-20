"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはApple エコシステム全体に向けたネイティブSwiftアプリを生成します。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまでが射程です",
    "WATCH — ウォッチやVision Proまで一続きで出せる点は、個人開発の届く範囲を素直に広げてくれます。まずは小さなコンパニオンアプリから試すのが現実的です",
    "CREDIT — クレジットは毎月1日にリセットされ、繰り越しはありません。月初にまとめて試し月末に仕上げる進め方は噛み合わないため、週ごとに使い切る配分が向いています",
    "FREE — 無料プランは月35クレジット（1日5回）です。プラットフォームの感触を掴み、簡単なプロトタイプを作るところまでが現実的な範囲になります",
    "PLAN — Junior（月25ドル）はアイデア検証とデモまで、Senior（月100ドル）がMVPを作り込む現実的な線とされています",
    "FUND — Rorkはa16zから280万ドルを調達し、月間74.3万訪問・成長率85%と伝えられています。モバイル特化のAIアプリビルダーとして選択肢に入れやすくなりました",
  ],
  en: [
    "MAX — Rork Max builds native Swift apps for the whole Apple ecosystem: iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "WATCH — Being able to ship all the way out to Apple Watch and Vision Pro genuinely widens what a solo developer can reach — a small companion app is a good first test",
    "CREDIT — Credits reset on the 1st of each month and do not roll over, so spreading usage across weeks works better than saving it all for a month-end push",
    "FREE — The free plan gives 35 credits a month (5 per day) — enough to get a feel for the platform and put together a simple prototype",
    "PLAN — Junior ($25/mo) is enough to validate an idea and build a demo, while Senior ($100/mo) is the realistic tier for building out a full MVP",
    "FUND — Rork raised $2.8 million from a16z and now sees over 743,000 monthly visits with 85% growth, making it easier to consider for mobile-first AI app building",
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
