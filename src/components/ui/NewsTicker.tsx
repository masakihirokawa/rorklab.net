"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "SEATS — App Store Connect では9月16日から、サブスクの複数シート購入が既定で有効になっています。組織向けの Volume Purchasing は10月22日に始まります",
    "11/01 — Google Play の対象 API レベルで延長を申請したアプリの配信期限は11月1日です。残り35日です",
    "RUNTIME — Google Play の自動翻訳が expo_runtime_version を書き換え、その言語だけ OTA 更新が届かなくなる、という報告が出ています",
    "NEW — 一覧画面を Opus 5.5 と GPT-6 Sol で作り分ける、最初の一画面",
    "XCODE27.1 — Apple は9月18日に Xcode 27.1 beta と iPhone Duo 向けのデザインキットを公開しました。発売は10月23日です",
    "SCENE — SDK 57 で ios.enableSceneSupport を有効にすると、keyWindow に頼る currentViewController が当てにならない、という Issue が開いています",
  ],
  en: [
    "SEATS — Since September 16, multiseat purchases are enabled by default for subscriptions in App Store Connect. Volume Purchasing for organizations opens on October 22",
    "11/01 — Apps that were granted a Google Play target API level extension must be updated by November 1, thirty-five days from now",
    "RUNTIME — A report shows Google Play's automatic string translation rewriting expo_runtime_version, so OTA updates stop reaching that one locale",
    "NEW — Building the same list screen with Opus 5.5 and GPT-6 Sol, one screen at a time",
    "XCODE27.1 — On September 18 Apple released the Xcode 27.1 beta and design kits for iPhone Duo, which ships on October 23",
    "SCENE — An open issue notes that with ios.enableSceneSupport on SDK 57, currentViewController still relies on keyWindow and becomes unreliable",
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
