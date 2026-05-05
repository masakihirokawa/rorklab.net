"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "IO2026ANDROID — Google I/O 2026（5/19-20）で Android 17 と Gemini 深統合、アプリ開発エコシステムへの影響に注目",
    "APPBOOM — 2026年4月のアプリリリース数が前年比104%増、AI アプリビルダーが市場拡大を牽引",
    "RORK15M — Rork が 1,500 万ドルのシード調達、月間 74 万訪問・成長率 85% で首位（4/9）",
    "RORKMAX — Rork Max が Web 初の Swift アプリビルダー、2 週間で年間収益 2 倍を達成",
    "PAPERLINE — Rork が App Builder の Paperline を買収、さらなる買収も積極的に検討中",
    "WRESTLEAI — 18 歳の大学生が Rork で WrestleAI を構築、月収 3 万ドル超を達成",
  ],
  en: [
    "IO2026ANDROID — Google I/O 2026 (May 19-20): Android 17 + Gemini deep integration — big news for app devs",
    "APPBOOM — App releases up 104% YoY in April 2026 — AI builders like Rork are fueling the surge",
    "RORK15M — Rork raises $15M seed, hits 743K monthly visits with 85% growth rate (4/9)",
    "RORKMAX — Rork Max: the web's first Swift app builder, doubling annual revenue in just 2 weeks",
    "PAPERLINE — Rork acquires app builder Paperline and stays actively acquisitive for engineering talent",
    "WRESTLEAI — An 18-year-old student built WrestleAI with Rork and earns over $30K/month",
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
