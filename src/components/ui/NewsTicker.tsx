"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまでを対象にします",
    "APIS — SwiftUI・ARKit・HealthKit・HomeKit・Core ML・MetalといったネイティブAPIに手が届き、AR/LiDARスキャンやオンデバイス機械学習も扱えます",
    "CLOUD — Swiftコードを書き、クラウド上のMacでコンパイルし、実機タッチ入力に対応したライブシミュレータをストリーミングします",
    "SUBMIT — 実機インストール用、あるいはApp Store提出用のビルドまで用意されます",
    "SEED — Rorkは4月にLeft Lane Capital主導の$15Mシードを調達しました。Peak XVとa16z Speedrunも参加しています",
    "PRICE — 無料で始められ（週5プロンプト前後）、有料プランは$25/月から。Rork Maxは$200/月です",
  ],
  en: [
    "MAX — Rork Max builds native Swift apps rather than React Native, spanning iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "APIS — It reaches native Apple APIs including SwiftUI, ARKit, HealthKit, HomeKit, Core ML, and Metal, so AR/LiDAR scanning and on-device ML are in scope",
    "CLOUD — Rork Max writes Swift, compiles it on cloud-hosted Macs, and streams a live simulator that accepts real touch input",
    "SUBMIT — From there it prepares the build for device install or App Store submission",
    "SEED — Rork raised a $15M seed led by Left Lane Capital in April, joined by Peak XV and a16z Speedrun",
    "PRICE — It's free to start at roughly 5 prompts a week, paid plans begin at $25/month, and Rork Max runs $200/month",
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
