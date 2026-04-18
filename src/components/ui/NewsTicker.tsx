"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rork が $15M シード調達、Left Lane Capital 主導・Peak XV / True Ventures / a16z Speedrun 参加（4/9）",
    "RORKMAX — Rork Max ローンチ、Claude Code + Opus 4.6 搭載で X に 800 万ビュー・年間収益が 2 週間で倍増（4月）",
    "FORBES — Forbes が Rork を特集「次世代モバイルアプリビルダーを育てる」、インディー開発者支援に注目（4/10）",
    "PAPERLINE — Rork がアプリビルダー Paperline を買収、エンジニアリング人材を強化（4月）",
    "TRAFFIC — Rork が 1 年未満でモバイルアプリ AI プラットフォームのウェブトラフィック世界 No.1 に（4月）",
    "NOCODE — ノーコード AI ビルダー競争激化：Lovable・v0・Bubble・Base44 が機能競争を加速（4月）",
  ],
  en: [
    "FUNDING — Rork raises $15M seed led by Left Lane Capital with Peak XV, True Ventures, a16z Speedrun (4/9)",
    "RORKMAX — Rork Max launches with Claude Code + Opus 4.6: 8M views on X, revenue doubled in 2 weeks (Apr)",
    "FORBES — Forbes features Rork: 'How Rork Aims To Help The Next Generation Of Mobile App Builders' (4/10)",
    "PAPERLINE — Rork acquires app builder Paperline to strengthen engineering talent (Apr)",
    "TRAFFIC — Rork becomes #1 AI mobile app platform by web traffic in under one year (Apr)",
    "NOCODE — No-code AI builder competition heats up: Lovable, v0, Bubble, Base44 all accelerating (Apr)",
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
              letterSpacing: "0.02em",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
