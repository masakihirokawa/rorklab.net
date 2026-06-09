"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK-VS-MAX — 通常のRorkはExpo(React Native)でiOS/Android両対応、Rork Maxはネイティブ SwiftでApple全域。用途で使い分けを",
    "RORK-MAX — Rork Max（月$200）はiPhone・iPad・Watch・TV・Vision Pro・iMessageとAR/LiDAR・Metal・Live Activities・Core MLに対応",
    "PUBLISH — RorkはクラウドMacでビルドし共有リンクのテストから両プラットフォーム公開まで一気通貫。無料開始・有料$25〜",
    "ANDROID17 — Android 17はこの夏Pixelから先行配信見込み。大画面リサイズ対応が重要になります",
    "IOS27 — iOS 27はこの秋提供見込み。Siriのモデル刷新を含むアップデートに向けアプリ側の確認を",
    "WORKFLOW — 個人開発ではまずRorkで素早く検証し、Apple固有機能が必要になったらRork Maxを検討する流れが現実的",
  ],
  en: [
    "RORK-VS-MAX — Standard Rork ships cross-platform iOS/Android via Expo (React Native); Rork Max builds native Swift across the Apple ecosystem",
    "RORK-MAX — Rork Max ($200/mo) covers iPhone, iPad, Watch, TV, Vision Pro, and iMessage, plus AR/LiDAR, Metal, Live Activities, and Core ML",
    "PUBLISH — Rork compiles on cloud Macs, taking you from a shareable test link to publishing on both stores; free to start, paid from $25",
    "ANDROID17 — Android 17 is expected to reach Pixel first this summer; large-screen resizability is becoming important",
    "IOS27 — iOS 27 is expected this fall; with Siri's model revamp ahead, it's worth checking your app now",
    "WORKFLOW — For solo devs, validate fast with Rork first, then consider Rork Max when you need Apple-only native capabilities",
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
