"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EVENT — 本日9月9日、Apple が「Surprise and Shine」と題したイベントを開きます。日本時間では9月10日の未明2時からです",
    "EXPECT — iPhone 18 Pro と Pro Max、折りたたみ機、2nm プロセスの A20 Pro チップ、そして iOS 27 以下の配信日発表が見込まれています",
    "WAIT — この記事を書いている時点ではまだ開催前です。噂の段階で書いたものと発表後に書いたものが混ざると、読む側には区別がつきません",
    "MAX — Rork Max がネイティブ Swift を生成する以上、Apple の動きは他人事ではありません。標準の Rork は React Native、という線引きは繰り返し確認したいところです",
    "SIMULATOR — Rork Max はクラウド上の Mac でコンパイルし、ブラウザ内で動くストリーミングの iOS シミュレータで確認できます。Xcode も Mac の実機も要りません",
    "SEASON — OS が新しくなる時期は、自動生成の足場がいちばん揺れます。便利さを謳う記事ほど、この揺れに触れないと不誠実になると感じています",
  ],
  en: [
    "EVENT — Apple holds its Surprise and Shine event today, September 9, starting at 10:00 Pacific. That lands in the small hours of September 10 in Japan",
    "EXPECT — Expected are the iPhone 18 Pro and Pro Max, a foldable, the 2nm A20 Pro chip, and release dates for iOS 27 and its sibling updates",
    "WAIT — As this is written the event has not happened yet. Rumor-stage writing and post-announcement writing look identical once they are mixed together",
    "MAX — Since Rork Max generates native Swift, Apple news is not somebody else's problem. Worth repeating that the standard product still writes React Native",
    "SIMULATOR — Rork Max compiles on cloud Macs and lets you check the result in a streaming iOS simulator inside the browser, with no Xcode and no Mac hardware",
    "SEASON — A new OS is when automated build pipelines wobble most. An article selling convenience owes its readers a word about that wobble",
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
