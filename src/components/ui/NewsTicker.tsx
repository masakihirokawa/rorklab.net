"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはiPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage向けのネイティブSwiftアプリを生成し、2クリックでApp Store公開まで進められます",
    "CHOOSE — 標準RorkはReact Native (Expo)でiOS/Androidのクロスプラットフォーム、Rork Maxはネイティブ。作るものがどのプラットフォームに届くかで選ぶのが分かりやすいです",
    "PRICE — 無料で開始でき、有料プランは$25/月〜です。Rork Maxは上位プロダクトとして位置づけられています",
    "CREDIT — クレジット制は繰り越しがないため、月初にまとめず、週単位で区切って使い切る配分の方が噛み合います",
    "WORKFLOW — AIに全コードを書かせる段階から、スキャフォールドを生成させ状態管理・データ層は自分で書き直す使い方へ。修正を速く回すほどコード構造の内在化が効いてきます",
    "SIM — ブラウザ内のストリーミングiOSシミュレータで、XcodeやMacを用意せずに実機に近いApple環境でテストできます",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage, with 2-click App Store publishing",
    "CHOOSE — Standard Rork ships cross-platform iOS/Android via React Native (Expo); Rork Max goes native. Pick based on where your app needs to run",
    "PRICE — It's free to start, with paid plans from $25/month. Rork Max sits above that as the premium product",
    "CREDIT — Credits don't roll over, so spreading usage week by week works better than saving it all for the start of the month",
    "WORKFLOW — Reviews point toward generating a scaffold, then rewriting state and data layers yourself — internalizing structure speeds up iteration as features stack up",
    "SIM — An in-browser streaming iOS simulator lets you test in a near-real Apple environment without Xcode or a Mac",
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
