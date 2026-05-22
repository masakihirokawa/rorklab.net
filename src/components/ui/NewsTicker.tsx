"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX2026 — Rork Max が 2026年2月にローンチ、React Native ではなくネイティブ Swift アプリビルダーとして Apple 全エコシステムへ対応",
    "ARR15M — Rork Max ローンチから 3日 で ARR $1.5M を突破、Left Lane Capital リードで $15M シード調達済み",
    "VISIONPRO — Rork Max が Vision Pro / Apple Watch / Apple TV / iMessage / iPad / iPhone に正式対応、AR・LiDAR・Metal を一気通貫で利用可能",
    "HEALTHKIT — HealthKit・HomeKit・NFC・App Clips・Core ML on-device ML までネイティブ機能をブラウザ完結で実装可能に",
    "CLOUDMAC — Rork Max は cloud Mac fleet で Swift コードをコンパイル、ストリーミングシミュレータでブラウザ内アプリ実行を実現",
    "PAPERLINE — Rork が アプリビルダー Paperline を買収、エンジニア人材を取り込み AI ネイティブ開発体制を強化",
  ],
  en: [
    "MAX2026 — Rork Max launched in February 2026 as a native Swift app builder that ships across the entire Apple ecosystem instead of React Native",
    "ARR15M — Rork Max hit $1.5M ARR within three days of launch and closed a $15M seed led by Left Lane Capital",
    "VISIONPRO — Rork Max now targets Vision Pro, Apple Watch, Apple TV, iMessage, iPad, and iPhone with first-class AR, LiDAR, and Metal support",
    "HEALTHKIT — HealthKit, HomeKit, NFC, App Clips, and on-device Core ML are all available in-browser without leaving the Rork Max workflow",
    "CLOUDMAC — Rork Max compiles Swift on a cloud Mac fleet and streams a live simulator into your browser so you never install Xcode",
    "PAPERLINE — Rork acquired app builder Paperline to bring in engineering talent and accelerate its AI-native development stack",
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
