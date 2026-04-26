"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15M — Rorkが1,500万ドルのSeed調達、Left Lane Capitalがリード（4/9）",
    "RORKMAX — Rork Max登場、Claude Code＋Opus 4.6搭載で初のWebベースSwift IDE（4月）",
    "PAPERLINE — アプリビルダーPaperlineを買収、エンジニアリング人材を強化（4月）",
    "8MVIEWS — Rork Max発表のX投稿が800万view超え、年間収益が2週間で2倍に（4月）",
    "FUNDERS — Peak XV / True Ventures / Goodwater / a16z Speedrunが投資ラウンドに参加（4/9）",
    "LARGEST — Rorkが1年未満で世界最大のモバイルAIアプリ構築プラットフォームに（4月）",
  ],
  en: [
    "SEED15M — Rork raises $15M Seed funding led by Left Lane Capital (4/9)",
    "RORKMAX — Rork Max launches as first web-based Swift IDE powered by Claude Code & Opus 4.6 (Apr)",
    "PAPERLINE — Rork acquires app builder Paperline to bring in engineering talent (Apr)",
    "8MVIEWS — Rork Max launch X post tops 8M views, doubling annual revenue in two weeks (Apr)",
    "FUNDERS — Peak XV, True Ventures, Goodwater & a16z Speedrun join the seed round (4/9)",
    "LARGEST — Rork becomes the world's largest mobile AI app-building platform in under a year (Apr)",
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
