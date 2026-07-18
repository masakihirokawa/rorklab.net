"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成します。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "NATIVE — Rork MaxはAR/LiDARやMetalの3D、ウィジェット、Dynamic Island、Live Activities、HealthKit、HomeKit、NFC、Core MLなど、React Nativeでは届かない機能を解放します",
    "PUBLISH — 2クリックでのApp Store公開に対応し、生成から公開までの手数が大きく減りました",
    "SIM — ブラウザ内のストリーミングiOSシミュレータで、XcodeやMacを用意せずに実機に近いApple環境でテストできます",
    "STANDARD — 標準のRorkは自然言語でアプリを記述すると、React Native（Expo）の動くコードを生成します",
    "PRICING — 料金は無料で始められ、有料プランは月25ドルから、Rork Maxは月200ドルです",
  ],
  en: [
    "RORKMAX — Rork Max builds native Swift apps instead of React Native, targeting iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — Rork Max unlocks capabilities React Native can't reach: AR/LiDAR, Metal 3D, widgets, Dynamic Island, Live Activities, HealthKit, HomeKit, NFC, and Core ML",
    "PUBLISH — Two-click App Store publishing cuts the steps between generating an app and shipping it",
    "SIM — A browser-based streaming iOS simulator lets you test in a real Apple environment without Xcode or a Mac",
    "STANDARD — Standard Rork turns a plain-English description into working React Native (Expo) code",
    "PRICING — It's free to start, paid plans begin at $25/month, and Rork Max is $200/month",
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
