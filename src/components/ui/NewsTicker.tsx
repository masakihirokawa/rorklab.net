"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ARR15M — Rork Max ローンチから3日で $1.5M ARR 達成と複数メディアが報道、AI アプリビルダー史上最速級の立ち上がり（2月〜）",
    "MAXPRICE — Rork Max は $200/月（無料枠は週5プロンプト程度）、Native Swift 生成の対価として開発者層に定着（5月）",
    "ALLAPPLE — Rork Max が iPhone/iPad/Watch/TV/Vision Pro/iMessage 全 Apple プラットフォームを単一プロンプトで網羅（2026）",
    "NATIVEAPI — AR/LiDAR・Metal 3D・Dynamic Island・Live Activities・Siri Intents・HealthKit・HomeKit・NFC・Core ML まで対応、RN 不可領域に到達（2026）",
    "COMPANION — Rork Companion アプリで Apple Developer 未契約でも実機テスト可、$99/年なしで開発を開始できる（2026）",
    "AISTUDIOAND — Google AI Studio が native Android 生成に参入、ノーコード AI 競争が iOS と Android の両側面で激化（5/19）",
  ],
  en: [
    "ARR15M — Rork Max reportedly hit $1.5M ARR in three days after launch — one of the fastest ramps in AI app builders (Feb onward)",
    "MAXPRICE — Rork Max is $200/month (free tier offers ~5 prompts/week), positioned as the price of true native Swift generation (May)",
    "ALLAPPLE — A single prompt in Rork Max produces apps for iPhone, iPad, Watch, TV, Vision Pro, and iMessage (2026)",
    "NATIVEAPI — Unlocks AR/LiDAR, Metal 3D, Dynamic Island, Live Activities, Siri Intents, HealthKit, HomeKit, NFC, and Core ML — territory React Native cannot reach (2026)",
    "COMPANION — The Rork Companion app enables real-iPhone testing without a paid Apple Developer account — no $99/year required to start (2026)",
    "AISTUDIOAND — Google AI Studio enters native Android generation; the no-code AI race now heats up on both iOS and Android sides (5/19)",
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
