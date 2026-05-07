"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが$1500万シード調達、Left Lane Capital主導・Peak XV・True Ventures・a16z参加（2026）",
    "RORKMAX — Rork Max登場、Claude Code + Opus 4.7でネイティブSwiftUIアプリを1プロンプトで生成（2月）",
    "NATIVE — React NativeではなくSwiftで真のネイティブiOSアプリを生成、AR・3D・HealthKit等に対応（2月）",
    "PAPERLINE — RorkがPaperlineを買収、エンジニアリング人材強化・複雑UI対応を加速（2026）",
    "NOCODE75 — Gartner予測: 2026年末までに新規アプリの75%がローコード/ノーコードで開発される（2026）",
    "GOOGLEIO — Google I/O 2026が5月19日開幕、Flutter・Firebase・Androidの大規模アップデートに注目（5月）",
  ],
  en: [
    "FUNDING — Rork raises $15M seed led by Left Lane Capital with Peak XV, True Ventures & a16z (2026)",
    "RORKMAX — Rork Max: build native SwiftUI apps in one prompt powered by Claude Code + Opus 4.7 (Feb)",
    "NATIVE — True native Swift apps (not React Native): AR, 3D, HealthKit, Dynamic Island & more (Feb)",
    "PAPERLINE — Rork acquires Paperline for engineering talent to accelerate complex UI & API support (2026)",
    "NOCODE75 — Gartner: 75% of new apps will be built with low-code/no-code tools by end of 2026",
    "GOOGLEIO — Google I/O 2026 opens May 19 with major Flutter, Firebase & Android updates expected",
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
