"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKFUND — Rorkが$1500万シード資金調達、Left Lane Capital主導・Peak XV/a16z Speedrun参加（4月）",
    "RORKMAX — Rork Max: Claude Code + Opus 4.7搭載でネイティブSwiftアプリを1プロンプトで生成",
    "PAPERLINE — RorkがPaperlineを買収、エンジニアリング人材確保で複雑UI・バックエンド対応を加速",
    "LOVABLE — LovableがバイブコーディングアプリをiOS/Androidでリリース、競争激化（4/28）",
    "GOOGLEIO — Google I/O 2026が5月19日開幕、Flutter・Firebase・Android 新機能の発表に注目（5月）",
    "GARTNER70 — Gartner予測: 2026年末までに新規ビジネスアプリの70%がローコード・ノーコード化",
  ],
  en: [
    "RORKFUND — Rork raises $15M seed led by Left Lane Capital with Peak XV & a16z Speedrun (Apr)",
    "RORKMAX — Rork Max: Claude Code + Opus 4.7 generates native SwiftUI apps from one prompt",
    "PAPERLINE — Rork acquires Paperline to accelerate complex UI & backend API development",
    "LOVABLE — Lovable launches vibe-coding iOS/Android app, intensifying no-code competition (4/28)",
    "GOOGLEIO — Google I/O 2026 opens May 19 with Flutter, Firebase & Android announcements",
    "GARTNER70 — Gartner: 70% of new business apps via low-code/no-code platforms by year-end 2026",
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
