"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO 58.0.25 — expo パッケージの 58.0.25 が公開されました（11/12）",
    "SUPABASE — Expo の新機能で、ターミナルから Supabase を作り、鍵を各環境へ入れられるようになりました（11/10）",
    "SONNET 4.5 — Claude API での提供終了は 11/30、残り17日。API 連携を足したアプリは移行先の確認を",
    "AUDIO — expo-audio の play() が iOS で無音のまま止まるという報告が出ています",
    "MODELS — Fable 5.2 と Gemini 4 Hydrogen が各社で GA に。Rork のモデルメニューへの反映はまだ確認できていません",
    "NEW — Android の expo/fetch が途切れた応答を成功扱いする件",
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
