"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15M — Rork が $15M シードラウンド調達、Left Lane Capital がリード・a16z 継続出資（4月）",
    "RORKMAX — Rork Max が native Swift アプリ生成、iPhone/iPad/Watch/TV/Vision Pro 全対応（2月）",
    "CLOUDMAC — Rork Max がクラウド Mac fleet で native コンパイル、Xcode・Mac 不要に（2月）",
    "GROWTH743K — Rork が月間 743,000 訪問・成長率 85% に到達、ノーコード AI 市場で急成長（4月）",
    "AISTUDIOAND — Google AI Studio が native Android アプリ生成に対応、競合環境が激化（5/19）",
    "MIGRATION — Android Studio Migration Assistant、React Native→Kotlin 移行が週→時間に（5/19）",
  ],
  en: [
    "SEED15M — Rork raises $15M seed led by Left Lane Capital, a16z continues backing (Apr)",
    "RORKMAX — Rork Max generates native Swift apps for iPhone/iPad/Watch/TV/Vision Pro (Feb)",
    "CLOUDMAC — Rork Max compiles natively on cloud Mac fleet, no Xcode or Mac required (Feb)",
    "GROWTH743K — Rork hits 743K monthly visits with 85% growth in no-code AI market (Apr)",
    "AISTUDIOAND — Google AI Studio now generates native Android apps, competition intensifies (5/19)",
    "MIGRATION — Android Studio Migration Assistant cuts React Native to Kotlin port to hours (5/19)",
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
