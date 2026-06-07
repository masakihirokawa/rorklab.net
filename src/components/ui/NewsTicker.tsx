"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "WWDC — WWDC 2026が6/8開幕。iOS 27の新機能はRork Maxが狙うAppleネイティブ領域（Widgets・Live Activities・Core MLなど）に直結",
    "MAX — Rork Maxはネイティブ Swiftコードを生成。AR/LiDAR・Metal 3D・Dynamic Island・NFC・App Clips・オンデバイスCore MLに対応",
    "範囲 — iPhone/iPad/Apple Watch/Apple TV/Vision Pro/iMessageまで一気通貫。React Nativeでは届かないネイティブ能力を全開放",
    "BUILD — クラウドMacフリートでネイティブコンパイル。XcodeもMac実機も不要で、ブラウザ上のクラウドiOSシミュレータで実機テスト",
    "PUBLISH — 2クリックでApp Store公開。ノーコードAIアプリ開発が公開フローまで自動化",
    "TREND — ノーコードAIアプリ開発は「クロスプラットフォームの最大公約数」から「ネイティブ能力の全開放」へ移行",
  ],
  en: [
    "WWDC — WWDC 2026 opens Jun 8; iOS 27 features map directly onto the native Apple areas Rork Max targets (Widgets, Live Activities, Core ML)",
    "MAX — Rork Max generates native Swift code, unlocking AR/LiDAR, Metal 3D, Dynamic Island, NFC, App Clips, and on-device Core ML",
    "REACH — One pipeline spans iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage, opening up native power React Native can't reach",
    "BUILD — A cloud Mac fleet handles native compilation, so you test on a browser-based cloud iOS simulator with no Xcode or Mac required",
    "PUBLISH — Two-click App Store publishing brings no-code AI app building all the way through release",
    "TREND — No-code AI app building is shifting from cross-platform lowest-common-denominator to fully unlocking native capabilities",
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
