"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAXSWIFT — Rork Max が React Native ではなくネイティブ Swift アプリを生成、Claude Code + Opus 4.6 駆動でリリース3日 ARR $1.5M（2月〜）",
    "APPLEFULL — Rork Max は iPhone・iPad・Watch・TV・Vision Pro・iMessage と AR/LiDAR・Metal 3D・Live Activities・Core ML までフル対応",
    "TWOCLICK — Cloud Mac フリート上で native compile、Xcode・Mac 不要で 2-click App Store publishing が可能に",
    "AISTUDIORIVAL — Google AI Studio Android が I/O 2026 で事前登録開始、Kotlin vibe coding で Rork の Android 領域に直接競合（5/19）",
    "MAXPRICING — Rork Max は $200/月 + Apple Developer Program $99/年、ネイティブビルド無制限の Max プラン継続",
    "DUALTRACK — Rork オリジナル（React Native/Expo）と Rork Max（Native Swift）の二本立てで、Android 廉価帯と Apple ネイティブを使い分け",
  ],
  en: [
    "MAXSWIFT — Rork Max generates native Swift apps instead of React Native, powered by Claude Code + Opus 4.6 and hit $1.5M ARR within 3 days (since Feb)",
    "APPLEFULL — Rork Max ships for iPhone, iPad, Watch, TV, Vision Pro, and iMessage with full access to AR/LiDAR, Metal 3D, Live Activities, and Core ML",
    "TWOCLICK — Rork Max compiles on a Cloud Mac fleet, enabling 2-click App Store publishing with no Xcode and no Mac required",
    "AISTUDIORIVAL — Google AI Studio for Android opened pre-registration at I/O 2026, putting Kotlin vibe coding head-to-head with Rork on Android (5/19)",
    "MAXPRICING — Rork Max remains $200/month plus Apple Developer Program ($99/year), with unlimited native Swift builds on the Max plan",
    "DUALTRACK — Rork's dual-track strategy (React Native + Native Swift) covers low-cost Android and premium Apple-native workflows side by side",
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
