"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "OPUS5.5 — Rork が9月22日に Claude Opus 5.5 をモデルメニューへ加えました。effort は5段階で、Pro と Max に含まれます",
    "11/01 — Google Play の対象 API レベル、延長申請組の配信期限は11月1日です。残り38日です",
    "IOS27 — iOS 27 で headerTransparent を指定してもヘッダーが透明にならない、という報告が expo に立っています",
    "NEW — R8 が既定になる前に測っておく4つの数字",
    "RN0.88 — React Native 0.88 の安定版は10月12日の予定です。Expo SDK 58 の安定版の日付はまだ公表されていません",
    "FIRSTAPP — 最初の題材は、入力・保存・集計の3つがそろう小さなアプリにすると、つまずく場所が早いうちに見えてきます",
  ],
  en: [
    "OPUS5.5 — Rork added Claude Opus 5.5 to its model menu on September 22, with five effort levels, included on the Pro and Max plans",
    "11/01 — For anyone who filed a Google Play target API level extension, the delivery deadline is November 1, thirty-eight days away",
    "IOS27 — An Expo issue reports that headerTransparent no longer makes the header transparent on iOS 27",
    "NEW — Four numbers to measure before R8 becomes the default",
    "RN0.88 — React Native 0.88 stable is expected on October 12. No date has been announced yet for a stable Expo SDK 58",
    "FIRSTAPP — A first project that needs input, saving and a simple total shows you where you will get stuck while the app is still small",
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
