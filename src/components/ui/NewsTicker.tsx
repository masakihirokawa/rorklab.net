"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact NativeでなくネイティブSwiftを生成、iPhone/iPad/Watch/TV/Vision Pro/iMessage対応（5月）",
    "NATIVE — AR/LiDAR・Metal 3D・Dynamic Island・HealthKit・NFC・Core MLなどネイティブApple機能を解放（5月）",
    "SIM — ブラウザのクラウドiOSシミュレータでXcodeやMacなしに実機環境テストが可能（5月）",
    "PUBLISH — ワンクリック/ツークリックのApp Store公開、ビルド・証明書・申請を自動化（5月）",
    "FUNDING — Rorkはa16zらから資金を調達、月間訪問は74万超で成長を継続（5月）",
    "EXPO — 標準のRorkはExpo（React Native）でiOS/Androidをクロスプラットフォーム生成（5月）",
  ],
  en: [
    "MAX — Rork Max generates native Swift instead of React Native, covering iPhone/iPad/Watch/TV/Vision Pro/iMessage (May)",
    "NATIVE — Rork Max unlocks native Apple features: AR/LiDAR, Metal 3D, Dynamic Island, HealthKit, NFC, and Core ML (May)",
    "SIM — A browser-based cloud iOS simulator lets you test on a real Apple environment without Xcode or a Mac (May)",
    "PUBLISH — One- and two-click App Store publishing automates builds, certificates, and submission (May)",
    "FUNDING — Rork has raised funding from a16z and others, with monthly visits topping 743k and steady growth (May)",
    "EXPO — Standard Rork builds cross-platform iOS and Android apps on Expo (React Native) from a description (May)",
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
