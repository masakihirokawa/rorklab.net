"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PREVIEW — 11/24 の更新で、作り直している間もプレビューが消えず、前の版を使い続けられるようになりました",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 で提供終了、残り5日です。AI 機能の呼び出し先を確かめます",
    "DOCKER — Metro を Docker で動かすと、デバッガーへのアクセスで dev サーバーが落ちるという報告が Expo に出ています",
    "NEW — 新着：起動直後のカルーセルで1枚目だけ空白になるとき",
    "2.5 ROUTE — 12/1 から Gemini 2.5 系は別モデルへ自動で回り、料金も変わります。残り6日です",
    "PRICING — プランを選ぶ前に、ひと月に作り直す回数を数えておくと上限を決めやすくなります",
  ],
  en: [
    "PREVIEW — Since 11/24, the preview stays up while Rork rebuilds, so you can keep using the previous version",
    "SONNET 4.5 — Sonnet 4.5 retires from the Claude API on 11/30, 5 days left. Check which model your AI features call",
    "DOCKER — Expo users report the dev server exiting on a debugger request when Metro runs in Docker",
    "NEW — New: The first carousel page is blank at launch? Here's why",
    "2.5 ROUTE — From 12/1, Gemini 2.5 requests reroute to newer models at new rates. 6 days left",
    "PRICING — Before picking a plan, count how often you rebuild in a month — it makes the limit easier to set",
  ]
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
        background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-primary))", // 2026-10-09: 不透明に（固定バーの下を流れる本文が透けて重なっていた）
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
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
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
