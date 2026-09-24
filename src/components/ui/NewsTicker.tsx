"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GPT6SOL — Rork のモデルメニューに9月22日、GPT-6 Sol が加わりました。effort は Low / Medium / High の3段階で、Pro と Max に含まれます",
    "11/01 — Google Play の対象 API レベルで延長を申請したアプリの配信期限は11月1日です。残り37日です",
    "EXPOIMAGE — 画像の読み込みに失敗した瞬間にビューの大きさが変わると、Android だけアプリが落ちる、という expo-image の報告が出ています",
    "NEW — 落ちたはずなのに固まって見える Android の白い画面",
    "RN0.88 — React Native 0.88 の安定版は10月12日の予定です。SDK 58 安定版の日付はまだ一次情報にありません",
    "ENROLL — Apple Developer Program を個人で登録するか法人で登録するかは、ストアの表示名とあとからの譲渡に響きます",
  ],
  en: [
    "GPT6SOL — Rork added GPT-6 Sol to its model menu on September 22. It offers Low, Medium and High effort and is included in Pro and Max",
    "11/01 — Apps that were granted a Google Play target API level extension must be updated by November 1, thirty-seven days from now",
    "EXPOIMAGE — An expo-image report shows Android apps crashing when an image fails to load while its view is being resized",
    "NEW — When an Android crash leaves a blank screen that looks frozen",
    "RN0.88 — React Native 0.88 stable is scheduled for October 12. No first-party date for the SDK 58 stable release yet",
    "ENROLL — Enrolling in the Apple Developer Program as an individual or an organization affects your store name and later transfers",
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
