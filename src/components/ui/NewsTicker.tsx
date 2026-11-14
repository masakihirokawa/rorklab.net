"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO 58 — expo パッケージは 11/12 公開の 58.0.25 が最新です",
    "GEMINI 2.5 — gemini-2.5-flash は 12/1 に API で停止、残り16日。アプリ内のモデル名を確かめてください",
    "SPEECH — Android で expo-speech の読み上げが無音のまま戻らない、という報告が出ています",
    "HYDROGEN — Gemini 4 Hydrogen（11/12 GA）の Rork への反映は、changelog にはまだ載っていません",
    "APPLE ID — Apple Developer Program を個人と法人のどちらで登録するかは、ストアの表示名から考えると決めやすくなります",
    "NEW — Rork への依頼、日本語と英語で比べて分かったこと",
  ],
  en: [
    "EXPO 58 — The expo package's latest release is 58.0.25, published 11/12",
    "GEMINI 2.5 — gemini-2.5-flash shuts down on the API on 12/1, 16 days left. Check the model names inside your app",
    "SPEECH — On Android, expo-speech reportedly stays silent after the TTS engine dies or the activity is recreated",
    "HYDROGEN — Gemini 4 Hydrogen (GA 11/12) has not appeared in Rork's changelog yet",
    "APPLE ID — Individual or organization enrollment in the Apple Developer Program? Start from the seller name you want on the store",
    "NEW — Prompting Rork in Japanese vs English: What We Learned",
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
