"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK-MAX — Rork MaxはネイティブSwiftアプリを生成（月$200）。iPhone・iPad・Watch・TV・Vision Pro・iMessageとAR/LiDAR・Live Activitiesに対応",
    "CLOUD-MAC — Rork MaxはクラウドMacフリートでネイティブコンパイル。Xcode不要・Mac不要で2クリックApp Store公開が可能です",
    "EXPO — 通常のRorkはExpo(React Native)でiOS/Android両対応の本番アプリを記述から生成。無料開始・有料は月$25〜",
    "WWDC — WWDC 2026でiOS 27発表。iPhone 11以降が対象、写真70%高速化・AirDrop 80%高速化。秋にiPhone 18 Proと同時提供",
    "ANDROID17 — Android 17が6月に安定版見込み。大画面リサイズ必須化で、折りたたみ・タブレット対応がモバイルアプリの前提に",
    "SIRI-INTENTS — iOS 27のSiriはGeminiベースに刷新。App Intents連携を備えるネイティブアプリの設計が見直しどころです",
  ],
  en: [
    "RORK-MAX — Rork Max builds native Swift apps ($200/mo) for iPhone, iPad, Watch, TV, Vision Pro, and iMessage, with AR/LiDAR and Live Activities",
    "CLOUD-MAC — Rork Max compiles natively on a cloud Mac fleet, so you publish to the App Store in two clicks with no Xcode and no Mac",
    "EXPO — The original Rork generates production iOS/Android apps from a description via Expo (React Native); free to start, paid from $25/mo",
    "WWDC — WWDC 2026 unveils iOS 27 for iPhone 11 and later, with photos 70% faster and AirDrop 80% faster; it ships this fall with iPhone 18 Pro",
    "ANDROID17 — Android 17 is expected stable in June; mandatory large-screen resizability makes foldable and tablet support a baseline for apps",
    "SIRI-INTENTS — iOS 27's Siri is rebuilt on Gemini, making native apps with solid App Intents integration worth revisiting in your design",
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
