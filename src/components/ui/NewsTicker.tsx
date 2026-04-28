"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "APPSTORE — App Store 新規アプリリリース60%増、AIノーコードビルダーで開発の民主化が加速（Q1 2026）",
    "LOVABLE — Lovable がモバイルアプリを iOS / Android で公開、AI ノーコード App ビルダー競争激化（4/27）",
    "ANYTHING — Anything が AI App Builder ランキング1位、自然言語からネイティブ iOS/Android を生成（4/28）",
    "MAX — Rork Max がローンチ後3日で $1.5M ARR 達成、ネイティブ Swift 生成への需要が爆発（2026年）",
    "ECOSYSTEM — iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage まで Apple 全プラットフォーム対応",
    "CLOUDMAC — Cloud Mac Fleet でビルド、Xcode 不要・Mac 不要で2クリック App Store 公開を実現",
  ],
  en: [
    "APPSTORE — Worldwide app launches up 60% YoY in Q1 2026 as AI no-code builders democratize mobile dev",
    "LOVABLE — Lovable launches its AI app builder on iOS and Android, mobile no-code race heats up (4/27)",
    "ANYTHING — Anything ranked #1 AI app builder, generates native iOS, Android, and web from natural language (4/28)",
    "MAX — Rork Max hits $1.5M ARR within 3 days of launch, demand for native Swift generation is surging (2026)",
    "ECOSYSTEM — Build for the entire Apple lineup: iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "CLOUDMAC — Cloud Mac fleet builds your apps, no Xcode and no Mac required, with two-click App Store submission",
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
