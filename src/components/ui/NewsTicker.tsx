"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact NativeでなくネイティブSwiftを生成、iPhone/iPad/Watch/TV/Vision Pro/iMessage対応（5月）",
    "NATIVE — AR/LiDAR・Metal 3D・Dynamic Island・HealthKit・NFC・Core MLなどネイティブApple機能を解放（5月）",
    "SIM — ブラウザのクラウドiOSシミュレータでXcodeやMacなしに実機環境テストが可能（5月）",
    "PUBLISH — ワンクリック/ツークリックのApp Store公開、ビルド・証明書・申請を自動化（5月）",
    "ARR — Rorkは約$15M調達、Maxローンチから3日でARR $1.5Mに到達と報じられる（5月）",
    "WWDC — WWDC 2026は6/8〜12開催、オンデバイスAIが中心でRork Maxのネイティブ路線に追い風（6月）",
  ],
  en: [
    "MAX — Rork Max generates native Swift instead of React Native, covering iPhone/iPad/Watch/TV/Vision Pro/iMessage (May)",
    "NATIVE — Rork Max unlocks native Apple features: AR/LiDAR, Metal 3D, Dynamic Island, HealthKit, NFC, and Core ML (May)",
    "SIM — A browser-based cloud iOS simulator lets you test on a real Apple environment without Xcode or a Mac (May)",
    "PUBLISH — One- and two-click App Store publishing automates builds, certificates, and submission (May)",
    "ARR — Rork has raised ~$15M and reportedly hit $1.5M ARR within three days of the Max launch (May)",
    "WWDC — WWDC 2026 runs June 8-12, centered on on-device AI, a tailwind for Rork Max's native approach (Jun)",
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
