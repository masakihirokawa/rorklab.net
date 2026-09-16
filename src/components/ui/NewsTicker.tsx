"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SWIFT — 新規プロジェクトは iPhone が Swift、Android が Kotlin、Web が React です。既にある Expo プロジェクトはビルドも公開も GitHub への出力も続けられます",
    "10/02 — gemini-2.5-flash-image の停止まで残り 15 日です。アプリ内で画像生成を呼んでいる場合は後継モデルへの差し替えを見ておきます",
    "EAS — EAS Build が async-storage の変種解決で止まる報告が、未解決のまま残っています。既存の Expo プロジェクトを抱えたままの方は踏みやすい箇所です",
    "NEW — 消したはずのトークンが再起動で戻ってきます。SecureStore の削除失敗を検知する設計を書きました",
    "ENV — eas env:list の出力を CI に渡す前に、平文・機微・secret の 3 種を分けて数えます。secret は EAS のサーバーから出ない仕様です",
    "EXPOGO — SDK 53 以降、Expo Go ではプッシュ通知を受け取れません。通知が来ない理由をここで一度つなげておきます",
  ],
  en: [
    "SWIFT — New projects are Swift on iPhone, Kotlin on Android and React on the web. An Expo project you already have still builds, publishes and exports to GitHub",
    "10/02 — Fifteen days until gemini-2.5-flash-image shuts down. If your app calls image generation, plan the move to its replacement now",
    "EAS — Reports of EAS Build stalling on async-storage variant resolution are still open. It is easy to hit if you are carrying an existing Expo project",
    "NEW — A token you deleted comes back after a restart. We wrote up a design that catches a failed SecureStore delete",
    "ENV — Before piping eas env:list into CI, separate plain, sensitive and secret variables and count them. Secrets are designed never to leave the EAS servers",
    "EXPOGO — Since SDK 53, Expo Go cannot receive push notifications. Worth connecting that to the silence before you go hunting elsewhere",
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
