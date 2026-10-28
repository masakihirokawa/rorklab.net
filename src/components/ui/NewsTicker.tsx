"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "GPT-6.1 SOL — Rork のモデルメニューに追加（09-29）。Low／Medium／High を選べ、Pro・Max に含まれます",
    "SONNET 5.5 — UI づくりが得意で、Sonnet 5 より出力が速いモデルが選べます（09-28）",
    "SONNET 4.5 — Claude API での提供終了は 11/30、残り32日。API 連携を足したアプリは移行先の確認を",
    "SDK 58 ISSUE — Android ウィジェットが定期更新されない、Stripe が静的リンクになるなど初期報告が出ています",
    "OBSERVE — EAS Observe がネイティブクラッシュも記録します（SDK 57.0.21 以降・10/07）",
    "NEW — 起動広告が、背面から戻った回にしか出ていませんでした。「前面に戻った」合図が、…",
  ],
  en: [
    "GPT-6.1 SOL — Added to Rork's model menu (09-29) with Low, Medium and High effort; included on Pro and Max",
    "SONNET 5.5 — Claude Sonnet 5.5 is selectable: strong at UI design and faster than Sonnet 5 (09-28)",
    "SONNET 4.5 — Retires on the Claude API on 11/30, 32 days left. If your app calls it, check the migration target",
    "SDK 58 ISSUE — Early reports include Android widgets not refreshing on a schedule and Stripe linking statically",
    "OBSERVE — EAS Observe now records native crashes too (SDK 57.0.21 or later, 10/07)",
    "NEW — My App Open Ad Only Showed When the App…"
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
