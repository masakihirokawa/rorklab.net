"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO 58.0.25 — expo パッケージは 11/12 公開の 58.0.25 が最新です",
    "HYDROGEN — Gemini 4 Hydrogen が GA に（11/12）。Rork のモデルメニューへの反映はまだ確認できていません",
    "SONNET 4.5 — Claude API での提供終了は 11/30、残り16日。API 連携を足したアプリは移行先の確認を",
    "EXPO GO — ターミナルで a を押すと古い Expo Go APK を取りに行き失敗する、という報告が出ています",
    "PRICE — Gemini 4 Carbon の導入価格は 11/30 まで。Gemini を呼ぶアプリは 12 月の単価を確認しておくと安心です",
    "NEW — 直したはずのクラッシュが減らない日に、修正そのものを疑う",
  ],
  en: [
    "EXPO 58.0.25 — The expo package 58.0.25 is out (11/12)",
    "SUPABASE — Expo can now create a Supabase project and put its keys into every environment from the terminal (11/10)",
    "SONNET 4.5 — Retires on the Claude API on 11/30, 17 days left. If your app calls it, check the migration target",
    "AUDIO — Reports say expo-audio play() can stall silently on iOS",
    "MODELS — Fable 5.2 and Gemini 4 Hydrogen are now GA; their arrival in Rork's model menu is not confirmed yet",
    "NEW — Android expo/fetch Treats Truncated Bodies as Success",
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
