"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "EXPO — EAS Observe がネイティブクラッシュも記録（10/07）。JavaScript エラーと並べて確認できます",
    "SDK 58 — SDK 58 Beta は 9/15 公開。stable の日付はまだ未確認です",
    "RN 0.88 — React Native 0.88.x の正式リリース予定は 10/12、残り4日",
    "Q&A — expo-widgets が本番ビルドだけ真っ黒になる、という問いが出ています",
    "RORK — 09-29 に GPT-6.1 Sol を追加。Pro・Max プランで利用できます",
    "NEW — 日本語の見出しだけ太字にならない Android の切り分け",
  ],
  en: [
    "EXPO — EAS Observe now records native crashes next to JavaScript errors (Oct 7)",
    "SDK 58 — SDK 58 Beta has been out since Sep 15. The stable date is still unconfirmed",
    "RN 0.88 — React Native 0.88.x is scheduled for Oct 12, 4 days left",
    "Q&A — People are asking why expo-widgets render blank only in production builds",
    "RORK — GPT-6.1 Sol was added on Sep 29, available on Pro and Max plans",
    "NEW — Japanese headings not bold on Android: how to isolate it",
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
