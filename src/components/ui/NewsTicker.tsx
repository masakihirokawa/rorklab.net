"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FORBES — Forbes が Rork を特集「次世代モバイルアプリ開発者を支援する Rork の挑戦」（4/10）",
    "SEED15M — Rork が1,500万ドルのシード調達、Left Lane Capital 主導・Peak XV・a16z 等が参加（4/9）",
    "RORKMAX — Rork Max が Claude Code + Claude Opus 4.6 搭載で X に 800万ビュー超え、年収を2週間で倍増（2月）",
    "NOCODE40 — エンタープライズアプリの 40% が 2026年末までに AI エージェント搭載予定（Gartner）",
    "FIGMAMAKE — Figma Make が Kit コンテキスト＆アタッチメント機能を追加、プロトタイプ作成を強化（4月）",
    "APPBLOCKED — Apple が AI コード生成アプリ（Replit・Vibecode 等）をアーキテクチャ問題でブロック（3月）",
  ],
  en: [
    "FORBES — Forbes features Rork: 'How Rork Aims To Help The Next Generation Of Mobile App Builders' (4/10)",
    "SEED15M — Rork raises $15M seed led by Left Lane Capital with Peak XV, a16z Speedrun & more (4/9)",
    "RORKMAX — Rork Max powered by Claude Code & Opus 4.6 hits 8M+ X views, doubles revenue in 2 weeks (Feb)",
    "NOCODE40 — 40% of enterprise apps to feature AI agents by year-end 2026 (Gartner)",
    "FIGMAMAKE — Figma Make adds Kit context & attachments for enhanced prototyping workflow (Apr)",
    "APPBLOCKED — Apple blocks Replit & Vibecode over AI-coded app architecture concerns (Mar)",
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
