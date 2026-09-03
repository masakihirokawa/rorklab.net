"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FOUNDATION — アプリビルダーが載っているモデル層が今週まとめて動きました。9月2日に Gemini 3.8 Flash が一般提供へ、9月1日には Claude Fable 5.1 が出ています",
    "IMPACT — こうした更新は、使う側からは選べない形で降ってきます。生成されるコードの質がある日から静かに変わるので、いつ何が変わったかを自分で記録しておく価値があると考えています",
    "MAX — Rork Max はネイティブ Swift を生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage までを対象にします。クラウド上の Mac ファームでコンパイルするため、手元に Mac がなくても組めます",
    "DEPTH — 届く範囲が広いのが Rork Max の特徴です。AR や LiDAR スキャン、Dynamic Island、Live Activities、HealthKit、NFC、Core ML によるオンデバイス機械学習まで扱えます",
    "PRICING — Max プランは月額 $200、無料枠は週5プロンプト程度です。個人開発で試すなら、まず無料枠の範囲でどこまで届くかを見極める使い方が現実的だと思います",
    "STACK — 標準の Rork は React Native と Expo が土台です。Web ラッパーではないネイティブ体験を狙う構成で、Max とは作り分けの判断が必要になります",
  ],
  en: [
    "FOUNDATION — The model layer underneath every AI app builder moved this week. Gemini 3.8 Flash reached general availability on September 2, and Claude Fable 5.1 arrived on September 1",
    "IMPACT — Updates like these land without you choosing them. The quality of generated code can shift quietly from one day to the next, which is why it helps to keep your own record of when things changed",
    "MAX — Rork Max generates native Swift across iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage. It compiles on a cloud Mac fleet, so you can build for Apple platforms without owning a Mac",
    "DEPTH — Its reach into native capabilities is the real draw: AR and LiDAR scanning, Dynamic Island, Live Activities, HealthKit, NFC, and on-device machine learning through Core ML",
    "PRICING — The Max plan runs $200 a month, with a free tier of roughly five prompts a week. For solo developers, working out how far the free tier gets you is a sensible first step",
    "STACK — Standard Rork is built on React Native and Expo, aiming for a genuinely native experience rather than a web wrapper. Choosing between it and Max is a decision worth making deliberately",
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
