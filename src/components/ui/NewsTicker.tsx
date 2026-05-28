"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "TOP 2 — Rork が App Store「Developer Tools」カテゴリで世界 Top 2 を継続キープ、モバイル特化路線が奏功（5月）",
    "RORK MAX — iPhone/iPad/Apple Watch/TV/Vision Pro/iMessage まで Swift Native でカバー、2 クリック公開（4月）",
    "PAPERLINE — Swift ネイティブ AI ビルダー Paperline を買収、ブラウザで Xcode を完全置換するロードマップ加速（4/9）",
    "$15M SEED — Left Lane Capital リード、Peak XV/True/Goodwater/a16z Speedrun が参加、Rork Max ローンチ直後（4月）",
    "COMPANION — Rork Companion で Apple Developer Program 未加入でも実機テスト、初期コストゼロ（継続）",
    "WWDC 2026 — 6/8 開幕、iOS 27 と Gemini ベース新 Siri 発表予定、Rork Max の追従が試金石（5月）",
  ],
  en: [
    "TOP 2 — Rork holds a global Top 2 spot in the App Store Developer Tools category (May)",
    "RORK MAX — Swift-native build for iPhone, iPad, Apple Watch, TV, Vision Pro and iMessage, two-click publish (Apr)",
    "PAPERLINE — Rork acquires Paperline, a Swift-native AI builder, accelerating the plan to replace Xcode in the browser (4/9)",
    "$15M SEED — Left Lane Capital leads, with Peak XV, True, Goodwater and a16z Speedrun joining post-Rork Max launch (Apr)",
    "COMPANION — Rork Companion lets you test on real devices without an Apple Developer Program subscription (ongoing)",
    "WWDC 2026 — Kicks off 6/8 with iOS 27 and a Gemini-backed new Siri; Rork Max's API catch-up is the bellwether (May)",
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
