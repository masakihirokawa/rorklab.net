"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが$15Mを調達。モバイル特化のノーコードAIという立ち位置に投資家の評価が集まっています",
    "MAX-NATIVE — Rork MaxはAR/LiDAR・Metal 3D・ウィジェット・Dynamic Island・Live Activities・HealthKit・Core MLなど、React Nativeでは届かないネイティブ領域に対応",
    "MOBILE-FIRST — BoltやLovableがWebアプリ中心なのに対し、Rorkはモバイルアプリ専業。説明文から本番品質のアプリを生成します",
    "WWDC — WWDC26が閉幕。AIがOSのコア機能となり、iOS 27世代へ。ウィジェットやLive Activitiesの価値がさらに上がる局面です",
    "PRICING — Rorkは無料で開始でき有料$25/月〜、Rork Maxは$200/月。Expoで素早く検証し、必要に応じてMaxでネイティブ化する多段戦略が現実的",
    "ALL-APPLE — Rork MaxのSwift直接生成はiPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまでカバーします",
  ],
  en: [
    "FUNDING — Rork raises $15M, drawing fresh attention to its mobile-first no-code AI positioning",
    "MAX-NATIVE — Rork Max reaches native territory React Native can't: AR/LiDAR, Metal 3D, widgets, Dynamic Island, Live Activities, HealthKit, and on-device Core ML",
    "MOBILE-FIRST — While Bolt and Lovable focus on web apps, Rork builds mobile apps — production-ready from a plain-language description",
    "WWDC — WWDC26 wraps with AI becoming a core OS capability; the iOS 27 generation raises the value of widgets and Live Activities",
    "PRICING — Free to start, paid plans from $25/mo, Rork Max at $200/mo — ship fast on Expo, then go native with Max where it pays off",
    "ALL-APPLE — Rork Max generates pure Swift covering iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
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
