"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Max は従来の Rork とは別系統です。React Native ではなくネイティブ Swift を生成し、クラウド上の Mac 群でコンパイルします",
    "REACH — 対応は iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage。AR/LiDAR、Metal の3D、Dynamic Island、Live Activities、HealthKit、NFC、Core ML まで届きます",
    "CHOICE — ですので選び方は素直です。必要な OS 機能から逆算して、React Native で足りるなら通常の Rork、届かないなら Max という順に考えます",
    "FUNDING — 4月9日、Left Lane Capital 主導のシードラウンドで1,500万ドルを調達しました。あわせてアプリビルダーの Paperline を買収しています",
    "TRACTION — 2月の Max ローンチから3日で ARR 150万ドル。人材獲得を目的に、今後も買収を続ける方針が示されています",
    "REALITY — ただ「ワンクリックで App Store 公開」は言葉のあやです。審査、証明書、スクリーンショット、年齢区分と、人手の要る工程はいまも残ります",
  ],
  en: [
    "MAX — Rork Max is a separate line from the original Rork. It generates native Swift rather than React Native and compiles on a cloud Mac fleet",
    "REACH — It covers iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage, reaching AR/LiDAR, Metal 3D, Dynamic Island, Live Activities, HealthKit, NFC, and Core ML",
    "CHOICE — So the decision works backwards from the OS features you need: the original Rork if React Native gets you there, Max if it does not",
    "FUNDING — Rork raised a $15M seed led by Left Lane Capital on April 9, and acquired the app builder Paperline around the same time",
    "TRACTION — Max reached $1.5M ARR within three days of its February launch, and the company has signalled it will keep acquiring to bring in engineering talent",
    "REALITY — Still, one-click App Store publishing is a figure of speech. Review, certificates, screenshots, and age ratings remain steps you do by hand",
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
