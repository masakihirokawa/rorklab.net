"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GROWTH — Rork が月間 74 万訪問・成長率 85% を達成、ノーコード AI アプリビルダー市場をリード（3/30）",
    "FUND — Rork が a16z から $2.8M のプレシード資金調達に成功、プラットフォーム拡充を加速（3/28）",
    "MAX — Rork Max が 3 日で $1.5M ARR を達成、ネイティブ Swift 開発の圧倒的需要を証明（3/24）",
    "NATIVE — Rork Max が Dynamic Island・HealthKit・NFC・App Clips・Core ML など Apple ネイティブ機能に完全対応（3/30）",
    "LOWCODE — Gartner：2026 年はローコードが新規開発の 75%、AI エージェント搭載アプリは前年比 8 倍に（3/29）",
    "PUBLISH — Rork Max の 2 クリック App Store 公開：クラウド Mac ビルド → ライブシミュレーター → 審査提出（3/26）",
  ],
  en: [
    "GROWTH — Rork hits 743K monthly visits with 85% growth, leading the no-code AI app builder market (3/30)",
    "FUND — Rork secures $2.8M pre-seed from a16z to accelerate platform expansion (3/28)",
    "MAX — Rork Max reaches $1.5M ARR in just 3 days, proving massive demand for native Swift dev (3/24)",
    "NATIVE — Rork Max supports Dynamic Island, HealthKit, NFC, App Clips & Core ML natively (3/30)",
    "LOWCODE — Gartner: low-code to drive 75% of new apps in 2026, AI agents up 8x year-over-year (3/29)",
    "PUBLISH — Rork Max 2-click App Store publishing: cloud Mac build → live simulator → submit (3/26)",
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
