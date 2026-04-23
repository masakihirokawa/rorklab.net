"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15 — Rork が $15M シード調達、Left Lane Capital 主導・Peak XV／True Ventures／Goodwater／a16z Speedrun 参加（4月）",
    "RORKMAX — Rork Max が Web 初の Swift アプリビルダーとして登場、Xcode 代替を狙う（2 月）",
    "APPLESTACK — AR／LiDAR・Metal 3D・Dynamic Island・HealthKit・HomeKit・Core ML などネイティブ Apple 機能をフル解放（4月）",
    "PAPERLINE — Rork が Paperline 買収を完了、ネイティブ Swift チームを取り込み Rork Max 機能を強化（4月）",
    "PLATFORMS — iPhone／iPad／Apple Watch／Apple TV／Vision Pro／iMessage の全 Apple プラットフォームに対応（4月）",
    "RENAISSANCE — App Store 新規アプリが前年比 +84%、AI アプリビルダーが個人開発者の黄金時代を後押し（4月）",
  ],
  en: [
    "SEED15 — Rork raises $15M seed led by Left Lane Capital with Peak XV, True Ventures, Goodwater and a16z Speedrun (Apr)",
    "RORKMAX — Rork Max launches as the first Swift app builder on the web, aiming to replace Xcode (Feb)",
    "APPLESTACK — Unlocks native Apple features including AR/LiDAR, Metal 3D, Dynamic Island, HealthKit, HomeKit and Core ML (Apr)",
    "PAPERLINE — Rork completes Paperline acquisition, bringing its native-Swift team into Rork Max (Apr)",
    "PLATFORMS — Ships to iPhone, iPad, Apple Watch, Apple TV, Vision Pro and iMessage from plain English prompts (Apr)",
    "RENAISSANCE — App Store sees +84% YoY new-app growth as AI builders usher in an indie-developer renaissance (Apr)",
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
              letterSpacing: "0.02em",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
