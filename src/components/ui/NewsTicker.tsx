"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "SDK58 — Expo SDK 58 のベータが始まりました。React Native 0.88 の RC を同梱し、ベータ期間は3〜4週間と公式に書かれています",
    "11/01 — Google Play の対象 API レベル、延長を申請した場合の配信期限は11月1日です。残り44日です",
    "EASENV — ローカルビルドに渡したはずの秘密が、中身ではなく変数名の文字列のまま届く、という報告が長く開いたままです",
    "NEW — 推奨された移行先が、すでに停止していました。廃止表を74行突き合わせた記録です",
    "UISCENE — iOS 27 では新しい画面ライフサイクルが必須です。SDK 57 では自分で有効にする設定で、既定になるのは 58 からです",
    "CREDIT — 「AI のエラーには消費しない」がどこまでを指すのかは、同じ修正を何度か頼んだ日の記録を取ると見えてきます",
  ],
  en: [
    "SDK58 — The Expo SDK 58 beta is open. It ships the React Native 0.88 release candidate, and the beta period is stated as three to four weeks",
    "11/01 — For anyone who requested an extension, Google Play's target API deadline lands on November 1. Forty-four days out",
    "EASENV — A long-open report: secrets handed to a local build arrive as the literal variable name rather than its value, and the damage surfaces much later",
    "NEW — The replacement the table recommended had already shut down. A record of reconciling all 74 rows of the deprecation list",
    "UISCENE — iOS 27 requires the new scene lifecycle. SDK 57 makes it something you opt into; it only becomes the default in 58",
    "CREDIT — What \"AI errors don't cost credits\" actually covers becomes clear once you record a day of asking for the same fix more than once",
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
