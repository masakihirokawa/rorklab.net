"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GPT 6.2 — 11/18 に Rork のモデル選択へ GPT-6.2 Astra と Sol が入り、旧版を選んでいた場合は同じ effort のまま新版に切り替わります",
    "REVIEW — 同じ日の更新で、in-app event が待機中だと App Review への送信が失敗する問題が直りました",
    "GEMINI 2.5 — gemini-2.5-flash・pro の API 停止は 12/1、残り12日。アプリに埋め込んだモデル名は審査待ちも見込んでください",
    "WEBP — 画像ライブラリの事前ビルドに古い libwebp が入っていた、という問いが出ています",
    "SPLASH — 起動画面で止まるときは、アセット・設定・初回の読み込みの順に確かめると早く片づきます",
    "NEW — iOS 27 の年齢確認エラーを「待つ・進む・直す」に分ける",
  ],
  en: [
    "GPT 6.2 — Rork added GPT-6.2 Astra and Sol on 11/18; if you had the older version picked, it now builds with the new one at the same effort",
    "REVIEW — The same update fixes App Review submissions failing while an in-app event is waiting",
    "GEMINI 2.5 — gemini-2.5-flash and pro shut down on the API on 12/1, 12 days left. Allow for review time if model names ship in your app",
    "WEBP — Developers flagged an outdated libwebp inside a prebuilt image library",
    "SPLASH — Stuck on the splash screen? Check assets, then config, then the first data load",
    "NEW — When Age Checks Fail on iOS 27, Sort the Errors Into Wait, Continue, or Fix",
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
