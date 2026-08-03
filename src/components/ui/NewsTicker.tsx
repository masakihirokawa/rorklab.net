"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "CLOUD — Rork Max はクラウド上の Mac 群でネイティブ Swift をコンパイルします。Xcode をダウンロードする必要も Mac を所有する必要もありません",
    "PLATFORM — Rork Max は iPhone・iPad・Apple Watch・Vision Pro に対応し、ゲームやウィジェット、Live Activities まで扱えます",
    "SHIP — ブラウザでビルドし、ストリーミングのシミュレータでプレビューし、QR コードで実機に入れ、そのまま App Store へ提出できます",
    "SPLIT — 通常の Rork は React Native (Expo) でクロスプラットフォームに生成します。広く速く出すなら本体、Apple の機能を深く使うなら Max という分かれ方です",
    "CREDIT — 無料枠はおおむね週5プロンプト程度です。試すコストと作り切るコストは分けて見積もる必要があります",
    "PRICE — Rork Max は Max プランで月 $200、通常の Rork は無料から始められ、有料プランは月 $25 からです",
  ],
  en: [
    "CLOUD — Rork Max compiles native Swift on a fleet of cloud Macs, so you never download Xcode or need to own a Mac",
    "PLATFORM — Rork Max targets iPhone, iPad, Apple Watch, and Vision Pro, and reaches games, widgets, and Live Activities",
    "SHIP — Build in the browser, preview through a streaming simulator, install on device via QR code, and submit to the App Store without leaving Rork",
    "SPLIT — Regular Rork generates cross-platform apps with React Native and Expo. Reach for it to ship broadly and fast, and for Max when you need Apple-specific depth",
    "CREDIT — The free tier works out to roughly five prompts a week. It helps to budget the cost of trying something separately from the cost of finishing it",
    "PRICE — Rork Max sits on the $200/month Max plan, while regular Rork starts free with paid plans from $25/month",
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
