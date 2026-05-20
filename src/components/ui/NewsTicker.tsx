"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15M — Rork が $15M シード調達（2026/4/9）、Left Lane Capital リード・Peak XV / True Ventures / Goodwater / a16z Speedrun が参加",
    "DOUBLED — Rork Max 発表後 2週間で年間収益が倍増、X で 8M+ ビューを獲得し App Store エントリ層を一気に獲得",
    "TOP2DEV — App Store「Developer Tools」カテゴリで世界2位以内を継続、モバイル AI コーディングのトップ プラットフォーム化",
    "MAXSWIFT — Rork Max が React Native ではなくネイティブ Swift アプリを生成、Claude Code + Opus 4.6 駆動でリリース3日 ARR $1.5M（2月〜）",
    "AISTUDIORIVAL — Google AI Studio Android が I/O 2026 で事前登録開始、Kotlin vibe coding で Rork の Android 領域に直接競合（5/19）",
    "DUALTRACK — Rork オリジナル（React Native/Expo）と Rork Max（Native Swift）の二本立てで、Android 廉価帯と Apple ネイティブを使い分け",
  ],
  en: [
    "SEED15M — Rork closes a $15M Seed round (2026/4/9) led by Left Lane Capital with Peak XV, True Ventures, Goodwater, and a16z Speedrun",
    "DOUBLED — Rork Max's launch announcement drew 8M+ views on X and doubled annual revenue inside two weeks by capturing App Store newcomers",
    "TOP2DEV — Rork stays inside the top two of the App Store's worldwide Developer Tools category, leading the mobile AI coding platform race",
    "MAXSWIFT — Rork Max generates native Swift apps instead of React Native, powered by Claude Code + Opus 4.6 and hit $1.5M ARR within 3 days (since Feb)",
    "AISTUDIORIVAL — Google AI Studio for Android opened pre-registration at I/O 2026, putting Kotlin vibe coding head-to-head with Rork on Android (5/19)",
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
