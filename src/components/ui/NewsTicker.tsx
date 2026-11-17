"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO 58 — Expo は expo@58.0.26 と expo-web-browser@58.1.0 を 11/17 に公開しました",
    "RORK — rork.com の changelog は 9/29 の更新が最新のままです",
    "GEMINI 2.5 — gemini-2.5-flash・pro の API 停止は 12/1、残り13日。アプリに埋め込んだモデル名は審査待ちも見込んでください",
    "AUTH TAB — Android でログイン用のタブを開いている間にアプリが落とされる、という問いが出ています",
    "APP ICON — アイコンを差し替えても古いままのときは、キャッシュ・ビルド番号・ストア反映の順に確かめると早く片づきます",
    "NEW — iOS 27 の年齢確認エラーを「待つ・進む・直す」に分ける",
  ],
  en: [
    "EXPO 58 — Expo shipped expo@58.0.26 and expo-web-browser@58.1.0 on 11/17",
    "RORK — The rork.com changelog still shows 9/29 as its latest entry",
    "GEMINI 2.5 — gemini-2.5-flash and pro shut down on the API on 12/1, 13 days left. Allow for review time if model names ship in your app",
    "AUTH TAB — Developers ask why Android kills their app while the login Custom Tab is open",
    "APP ICON — Icon still old after replacing it? Check the cache, then the build number, then store propagation",
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
