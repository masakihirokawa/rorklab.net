"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Maxはネイティブ Swiftアプリを生成。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — AR/LiDAR・Metalによる3D・ウィジェット・Dynamic Island・Live Activities・Siri Intents・HealthKitなど、ネイティブ機能を引き出せます",
    "RN — 標準のRorkはReact Native（Expo）でクロスプラットフォーム。素早く形にするならこちらが向いています",
    "CHOICE — 手早さならReact Native版、Appleのハード/OS統合を活かすならRork Maxという棲み分けが現実的です",
    "PRICE — Rorkは無料で開始でき有料は月$25から、Rork Maxは月$200です",
    "FLOW — 作りたいアプリを平易な言葉で説明すると、ストアに配信できる動くコードが生成されます",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — It unlocks native capabilities React Native cannot reach: AR/LiDAR, Metal 3D, widgets, Dynamic Island, Live Activities, Siri Intents, and HealthKit",
    "RN — Standard Rork builds cross-platform apps with React Native (Expo), a good fit when you want something working fast",
    "CHOICE — Pick React Native for speed, or Rork Max when you need Apple hardware and OS integration",
    "PRICE — Rork is free to start with paid plans from $25/mo; Rork Max is $200/mo",
    "FLOW — Describe the app you want in plain language and Rork produces working code you can ship to the stores",
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
