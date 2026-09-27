"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SDK58 — Expo SDK 58 は Beta（9/15）のまま。安定版は React Native 0.88 正式（10/12 予定）の後で、Expo Modules 2.0 もベータ扱いです",
    "10/22 — Apple の Volume Purchasing 開始まで残り24日。複数シート購入は 9/16 から既定で有効なので、残すか外すかを先に決めておく段階です",
    "REVIEW — 「提出直後の自動チェックで entitlement 不備と言われたが身に覚えがない」という問い。.ipa を開いて確かめ、作り直さずに通した例が出ています",
    "NEW — 一覧画面を Opus 5.5 と GPT-6 Sol で作り比べ、effort の選び方を記録",
    "NATIVE — Shopify の back-to-native を受けて、同じアプリを React Native とネイティブで作り実機計測した比較が公開。乗り換え判断の材料になります",
    "CREDITS — 「AI のエラーにはクレジットを使わない」はどこまでか。同じ修正を3回頼んだ日の消費を記録して、線を引く準備をしています",
  ],
  en: [
    "SDK58 — Expo SDK 58 is still in beta (September 15). Stable lands after React Native 0.88 ships, planned for October 12, and Expo Modules 2.0 stays beta until then",
    "10/22 — 24 days until Apple opens Volume Purchasing. Multiseat purchases have been on by default since September 16, so decide now whether to keep them",
    "REVIEW — A common question: the automated pre-review check flags a missing entitlement you never added. One developer opened the .ipa, confirmed it, and passed without a rebuild",
    "NEW — Building the same list screen with Opus 5.5 and GPT-6 Sol, and how we chose effort",
    "NATIVE — After Shopify's back-to-native post, someone built the same app in React Native and native and measured on device. Useful input for any migration debate",
    "CREDITS — How far does \"no credits for AI errors\" actually go? We are logging a day where the same fix was requested three times to draw the line",
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
