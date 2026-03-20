"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "Rork Max — ネイティブ Swift アプリ生成モードが正式リリース（2月）",
    "MILESTONE — Rork Max、ローンチ3日で ARR $1.5M 達成、開発者コミュニティで話題に",
    "Apple — Vision Pro / Apple Watch / Apple TV 等 Apple 全デバイスをワンプロジェクトで対応",
    "MARKET — ノーコード市場が $210億 突破、2029年には $900億 規模へ（Gartner）",
    "TREND — 2026年末までにアプリ開発の 75% がローコード・ノーコードに移行予測",
    "NATIVE — Metal / ARKit / HealthKit 等ネイティブ API にフルアクセス可能",
  ],
  en: [
    "Rork Max — Native Swift app generation mode officially launched (February)",
    "MILESTONE — Rork Max hits $1.5M ARR in 3 days, trending in developer community",
    "Apple — Target Vision Pro, Apple Watch, Apple TV & more from a single project",
    "MARKET — No-code market surpasses $21B, projected to reach $90B by 2029 (Gartner)",
    "TREND — 75% of new app development to use low-code/no-code by end of 2026",
    "NATIVE — Full access to Metal, ARKit, HealthKit and other native Apple APIs",
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
