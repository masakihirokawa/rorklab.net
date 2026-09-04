"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FOUNDATION — アプリビルダーの土台にあるモデル層が動きました。9月2日に Gemini 3.8 Flash が一般提供へ移り、長期にわたるコーディングと自律エージェントへ向けた世代交代が進んでいます",
    "RECORD — 生成されるコードの質は、こうした更新に合わせて静かに変わります。いつ何が変わったかを手元に書き留めておくと、後から挙動の差を追いやすくなると考えています",
    "MAX — Rork Max はネイティブ Swift を書き、クラウド上の Mac 群でコンパイルします。ブラウザに実機さながらのシミュレータが流れ、App Store への公開まで Xcode なしで進められます",
    "DEPTH — 触れる範囲の広さが持ち味です。LiDAR、Dynamic Island、Live Activities、HealthKit、ウィジェット、App Clips、そして Core ML によるオンデバイス推論まで扱えます",
    "PRICING — Max は月額 $200 から。上位の階層では $1,800 まで幅があり、無料枠は週5プロンプト程度です。個人開発でしたら、まず無料枠でどこまで届くかを見極めるところからだと思います",
    "STACK — 標準の Rork は React Native と Expo が土台です。Web ラッパーではない体験を狙う構成で、ネイティブの深いところまで要るときに Max を選ぶ、という切り分けになります",
  ],
  en: [
    "FOUNDATION — The model layer underneath every AI app builder moved again. Gemini 3.8 Flash reached general availability on September 2, aimed squarely at long-horizon coding and autonomous agents",
    "RECORD — The quality of generated code shifts quietly alongside updates like these. Keeping your own note of when something changed makes it far easier to trace a difference in behavior later",
    "MAX — Rork Max writes native Swift and compiles it on a cloud Mac fleet. A live simulator streams to your browser, and you can publish to the App Store without ever opening Xcode",
    "DEPTH — Its reach into native capabilities is the real draw: LiDAR, Dynamic Island, Live Activities, HealthKit, widgets, App Clips, and on-device inference through Core ML",
    "PRICING — Max starts at $200 a month and runs up to $1,800 at higher tiers, with a free tier of roughly five prompts a week. For solo developers, working out how far the free tier gets you is a sensible first step",
    "STACK — Standard Rork is built on React Native and Expo, aiming for a genuinely native feel rather than a web wrapper. Max is the choice when you need to reach deeper into the platform",
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
