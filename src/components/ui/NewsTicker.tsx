"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "COMPANION — Rork Companion アプリを使えば、有料の Apple Developer アカウントなしでも実機の iPhone で自作アプリを試せます",
    "SEED — 調達は2026年4月、Left Lane Capital 主導の1,500万ドルのシードラウンドです。Peak XV・True Ventures・Goodwater・a16z Speedrun が参加しています",
    "PAPER — Rork はアプリビルダーの Paperline を買収しました。エンジニアリング人材の取り込みを目的に、今後も買収を続ける方針とされています",
    "ARR — Rork Max は2026年2月のローンチから3日で ARR 150万ドルに達したと報告されています",
    "NATIVE — Rork Max は AR・LiDAR スキャン、Metal の3Dゲーム、Dynamic Island、ライブアクティビティ、HealthKit、NFC、Core ML のオンデバイス推論に届きます",
    "PLATFORM — 対応は iPhone・iPad・Apple Watch・Apple TV・Vision Pro に加えて iMessage も含まれます",
  ],
  en: [
    "COMPANION — The Rork Companion app lets you test your build on a real iPhone without paying for an Apple Developer account first",
    "SEED — Rork raised a $15 million seed round in April 2026 led by Left Lane Capital, with Peak XV, True Ventures, Goodwater, and existing investor a16z Speedrun taking part",
    "PAPER — Rork acquired the app builder Paperline to bring in engineering talent, and says it plans to stay acquisitive",
    "ARR — Rork Max reportedly reached $1.5 million in ARR within three days of its February 2026 launch",
    "NATIVE — Rork Max reaches AR and LiDAR scanning, Metal-backed 3D games, Dynamic Island, Live Activities, HealthKit, NFC, and on-device Core ML",
    "PLATFORM — Targets include iPhone, iPad, Apple Watch, Apple TV, and Vision Pro, plus iMessage",
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
