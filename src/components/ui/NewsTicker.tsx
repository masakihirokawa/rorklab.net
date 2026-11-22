"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ARCHIVE — 11/22 の更新で、プロジェクトを削除せずアーカイブできるようになりました。Archived から戻せます",
    "PLAY FIX — Google Play 向けの Expo アプリで Rork の AI キーが消え、AI 機能が失敗していた問題が直りました",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 で提供終了、残り7日です。API を足したアプリは呼び出し先を確かめます",
    "SPLASH — 更新を前の版へ巻き戻したあと、起動画面から進まないという報告が Expo に出ています",
    "NEW — 新着：「起動画面から進まない」レビューに返信する前の3つの手がかり",
    "2.5 ROUTE — 12/1 から Gemini 2.5 系は別モデルへ自動で回り、料金も変わります。残り8日です",
  ],
  en: [
    "ARCHIVE — Since 11/22 you can archive a Rork project instead of deleting it, and bring it back from Archived",
    "PLAY FIX — Fixed: Expo apps built for Google Play losing their Rork AI key, which broke AI features",
    "SONNET 4.5 — Sonnet 4.5 retires from the Claude API on 11/30, 7 days left. Check which model your app calls",
    "SPLASH — Expo users report apps stuck on the splash screen after rolling back to an earlier update",
    "NEW — New: Three clues to check before replying to a \"stuck on the splash screen\" review",
    "2.5 ROUTE — From 12/1, Gemini 2.5 requests reroute to newer models at new rates. 8 days left",
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
