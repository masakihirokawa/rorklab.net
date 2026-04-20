"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork Max が Web 初の Swift アプリビルダーとして Xcode 代替を実現、クラウド完結で App Store 提出可能（4月）",
    "FUNDING — Rork が $15M シード調達、Left Lane Capital 主導・Peak XV / True Ventures / Goodwater / a16z Speedrun 参加（4/9）",
    "VIRAL — Rork Max バイラル：X で 800 万ビュー、発表から 2 週間で年間収益ランレートが倍増（4月）",
    "ROADMAP — 調達資金はバックエンド API 自動統合・複雑 UI パターン生成・マルチスクリーン展開に投下（4月）",
    "FORBES — Forbes が Rork を特集「次世代モバイルアプリビルダーを育てる」、インディー開発者支援に注目（4/10）",
    "TRAFFIC — Rork が 1 年未満でモバイルアプリ AI プラットフォームのウェブトラフィック世界 No.1 に（4月）",
  ],
  en: [
    "RORKMAX — Rork Max becomes the first Swift app builder on the web capable of replacing Xcode end-to-end (Apr)",
    "FUNDING — Rork raises $15M seed led by Left Lane Capital with Peak XV, True Ventures, Goodwater, a16z Speedrun (4/9)",
    "VIRAL — Rork Max launch hits 8M+ views on X and doubles annual revenue run-rate within 2 weeks (Apr)",
    "ROADMAP — Funding directed at automated backend API integration, complex UI patterns, multi-screen generation (Apr)",
    "FORBES — Forbes features Rork: 'How Rork Aims To Help The Next Generation Of Mobile App Builders' (4/10)",
    "TRAFFIC — Rork becomes #1 AI mobile app platform by web traffic in under one year (Apr)",
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
