"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO 58 — Expo の最新は expo@58.0.25（11/12）のまま、新しいリリースは出ていません",
    "RORK — rork.com の changelog は 9/29 の更新が最新のままです",
    "GEMINI 2.5 — gemini-2.5-flash・pro の API 停止は 12/1、残り14日。アプリに埋め込んだモデル名は審査待ちも見込んでください",
    "AGE RANGE — iOS 27 で増えた年齢確認のエラー3種を、アプリ側でどう見分けるかという問いが出ています",
    "WATERMARK — Claude の生成テキストに 11/16 から透かしが入ります。AI で書いた説明文を使うアプリは一度確かめておくと安心です",
    "NEW — cameraPermission を false にしたら QR 読み取りが止まった",
  ],
  en: [
    "EXPO 58 — Expo is still on expo@58.0.25 (11/12), with no newer release yet",
    "RORK — The rork.com changelog still shows 9/29 as its latest entry",
    "GEMINI 2.5 — gemini-2.5-flash and pro shut down on the API on 12/1, 14 days left. Allow for review time if model names ship in your app",
    "AGE RANGE — Developers ask how to tell apart the three new iOS 27 age-range errors in their apps",
    "WATERMARK — Claude-generated text carries a watermark from 11/16; worth checking if your app ships AI-written copy",
    "NEW — Turning Off cameraPermission Broke QR Scanning",
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
