"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "REVIEW — Rork Max レビュー高評価：SwiftUI ネイティブ + 2クリック App Store 公開が好評（3/25）",
    "ARR — Rork Max が3日で$1.5M ARR 達成：AI ネイティブアプリ開発の需要を実証（3/24）",
    "FUND — Rork が a16z (Andreessen Horowitz) から$2.8M プレシード資金調達に成功（3/22）",
    "GROWTH — Rork 月間訪問数74万超え、成長率85%でノーコード市場をリード（3/18）",
    "NATIVE — Rork Max：AR/LiDAR・Metal 3D・Dynamic Island・HealthKit 等ネイティブ機能に完全対応（3/15）",
    "APPLE — Vision Pro・Apple Watch・iPad・iMessage 含む全 Apple プラットフォームをサポート（3/12）",
  ],
  en: [
    "REVIEW — Rork Max earns strong reviews: SwiftUI native + 2-click App Store publishing praised (3/25)",
    "ARR — Rork Max hits $1.5M ARR in just 3 days, proving demand for AI native app development (3/24)",
    "FUND — Rork secures $2.8M pre-seed funding from a16z (Andreessen Horowitz) (3/22)",
    "GROWTH — Rork surpasses 743K monthly visits with 85% growth rate, leading no-code market (3/18)",
    "NATIVE — Rork Max: full native access to AR/LiDAR, Metal 3D, Dynamic Island, HealthKit & more (3/15)",
    "APPLE — Full Apple ecosystem support including Vision Pro, Apple Watch, iPad & iMessage (3/12)",
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
