"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MILESTONE — Rork Max がローンチ3日で ARR $1.5M を達成、ネイティブアプリ開発に革命",
    "SwiftUI — Xcode 不要・Mac 不要、ブラウザだけで SwiftUI ネイティブアプリを開発・公開",
    "2-Click — QR コードでデバイスにインストール → 2クリックで App Store 申請まで完結",
    "全デバイス — iPhone/iPad/Apple Watch/Vision Pro/Apple TV/iMessage に 1 プロジェクトで対応",
    "3D/AR — Metal シェーダー + SceneKit で 3D ゲーム、ARKit + LiDAR で空間アプリ開発",
    "OpenClaw — NVIDIA NemoClaw 発表：OpenClaw エージェントをエンタープライズ対応に（GTC 2026）",
  ],
  en: [
    "MILESTONE — Rork Max hits $1.5M ARR in 3 days, revolutionizing native app development",
    "SwiftUI — No Xcode, no Mac required: build & publish native SwiftUI apps entirely in browser",
    "2-Click — Install via QR code, submit to App Store in 2 clicks — all from the browser",
    "All Devices — One project targets iPhone, iPad, Apple Watch, Vision Pro, Apple TV & iMessage",
    "3D/AR — Full 3D games with Metal shaders + SceneKit, spatial apps with ARKit + LiDAR",
    "OpenClaw — NVIDIA announces NemoClaw: enterprise-grade OpenClaw agents at GTC 2026",
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
