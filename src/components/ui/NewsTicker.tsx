"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "IOS27 — iOS 27 と iPadOS 27 は9月14日配信です。あと3日。ノーコードのアプリビルダーは、新しい OS の直後に足場が揺れます",
    "WAIT — 標準の Rork は Expo と React Native の版が上がるのを待ちます。Rork Max は Xcode と SDK が対応すれば追随できます",
    "FOLD — 折りたたみの iPhone Duo は $1,999 から。新しい画面形状は、生成されたレイアウトがいちばん最初に壊れる場所です",
    "STACK — 標準の Rork は Expo 経由の React Native、Rork Max はネイティブ Swift を生成します。混同した紹介記事が非常に多い領域です",
    "PRICE — 標準は Free と Junior $25、Middle $50、Senior $100。Rork Max は $200 から $1,800/月で、階層によって変わります",
    "SOURCE — 資金調達の額が二次情報で割れています。裏が取れないのであれば、金額には触れないほうが安全です",
  ],
  en: [
    "IOS27 — iOS 27 and iPadOS 27 ship on September 14, three days out. The ground always shifts under app builders in the days right after a release",
    "WAIT — Standard Rork waits on Expo and React Native to catch up. Rork Max can follow as soon as Xcode and the SDK are ready. Different kinds of waiting",
    "FOLD — The folding iPhone Duo starts at $1,999. A new screen shape is the first place a generated layout tends to come apart",
    "STACK — Standard Rork emits React Native through Expo; Rork Max emits native Swift. A great many write-ups still conflate the two",
    "PRICE — Standard tiers run Free, Junior at $25, Middle at $50 and Senior at $100. Rork Max spans $200 to $1,800 a month depending on tier",
    "SOURCE — Funding figures differ across secondary coverage right now. If you cannot verify a number at the source, leave it out",
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
