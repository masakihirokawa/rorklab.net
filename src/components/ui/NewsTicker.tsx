"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SURGE — AIアプリビルダー普及でApp Store新規アプリ提出が前年比84%急増 — ノーコード革命が加速中（4/6）",
    "MAX — Rork Max：ネイティブSwiftアプリをXcode不要で構築・公開、iPhone・iPad・Apple Watch・Vision Proに対応（3/24）",
    "FUND — Rork が a16z（Andreessen Horowitz）から280万ドルのプレシード資金調達に成功（3/22）",
    "GROWTH — Rork月間訪問数74.3万超え、成長率85%でAIノーコードアプリビルダー市場をリード（3/18）",
    "COMPANION — Rork Companion：Apple Developer登録不要で実機テストが可能、開発サイクルを大幅短縮（3/20）",
    "TREND — Gartner予測：2026年末に新規アプリ開発の75%がローコード・ノーコードに移行",
  ],
  en: [
    "SURGE — AI app builders drive an 84% YoY surge in new App Store submissions — the no-code revolution is accelerating (4/6)",
    "MAX — Rork Max: build & publish native Swift apps without Xcode for iPhone, iPad, Apple Watch & Vision Pro (3/24)",
    "FUND — Rork secures $2.8M pre-seed funding from a16z (Andreessen Horowitz) (3/22)",
    "GROWTH — Rork surpasses 743K monthly visits with 85% growth rate, leading the AI no-code app builder market (3/18)",
    "COMPANION — Rork Companion: test your app on a real device without an Apple Developer account (3/20)",
    "TREND — Gartner: by 2026, 75% of new app development will use low-code/no-code platforms",
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
