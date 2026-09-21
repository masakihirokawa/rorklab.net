"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "R8 — Expo SDK 58 から、Android のリリースビルドで R8 が既定で有効になります。同じコードで前後を測っておくと、縮んだ分と壊れた箇所が見えます",
    "XCODE26.6 — EAS Build の Xcode 27 イメージはまだ準備中で、latest はいまも Xcode 26.6 です。手元の Xcode を 27 に上げているかどうかで、踏む不具合が変わります",
    "11/01 — Google Play の target API level の延長申請は11月1日までです。残り40日。新規と更新は API 36 以上、既存アプリは API 35 以上が要ります",
    "FETCH — expo/fetch が iOS では応答を返さないまま止まり、Android では切り詰めた本文を 200 のまま返すという報告です。例外が飛ばないため、タイムアウトは自分で被せる形になります",
    "NEW — exit code 0 で止まるビルド — ログを黙らせていた設定と、空ファイルを通した存在チェック",
    "SCENE — SDK 57 のまま Xcode 27 で起動させるための opt-in が expo@57.0.23 に入りました。expo-build-properties の ios.enableSceneSupport で有効にします",
  ],
  en: [
    "R8 — From Expo SDK 58, R8 is enabled by default for Android release builds. Measuring the same code before and after shows both what shrank and what broke",
    "XCODE26.6 — The Xcode 27 image for EAS Build is still coming soon, and latest is still Xcode 26.6. Which bugs you hit depends on whether your local Xcode is already on 27",
    "11/01 — Extension requests for the Google Play target API level close on November 1, forty days away. New and updated apps need API 36 or higher, existing apps API 35 or higher",
    "FETCH — expo/fetch is reported to hang without settling on iOS, while Android resolves a truncated body as a plain 200. Nothing throws, so the timeout has to be yours",
    "NEW — A build that stops at exit code 0: the flag that silenced the logs, and the check that let an empty file through",
    "SCENE — expo@57.0.23 added an opt-in for launching under Xcode 27 while staying on SDK 57. Enable ios.enableSceneSupport through expo-build-properties",
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
