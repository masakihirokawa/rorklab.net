"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ARCH — Expo SDK 56 は React Native 0.85 と React 19.2 を同梱します。New Architecture が既定になり、実験的採用の段階を抜けました",
    "ENGINE — Hermes V1 が既定の JavaScript エンジンになりました。起動の高速化・実行時性能の改善・メモリ使用量の削減が入っています",
    "SPEED — expo start が約5倍、Metro のファイルクロールが6倍、cold bundling が20〜50%、warm bundling が3〜8倍と公称されています。手元での実測と突き合わせたいところです",
    "UI — Expo UI の Jetpack Compose と SwiftUI の API が SDK 56 で安定版になり、create-expo-app の既定テンプレートにも入りました",
    "ANDROID — 6月16日配信の Android 17 は adaptive-first を必須の開発標準とした最初のバージョンです。大画面でのリサイズと画面向き変更への対応が求められます",
    "GLASS — iOS 27 は Liquid Glass を採用した2013年以来最大の刷新です。対応アプリは Featured の編集コレクションで優先されるとされています",
  ],
  en: [
    "ARCH — Expo SDK 56 ships React Native 0.85 and React 19.2, and the New Architecture is now the default rather than the early-adopter path",
    "ENGINE — Hermes V1 is the default JavaScript engine, bringing faster startup, better runtime performance, and lower memory use",
    "SPEED — Expo quotes roughly 5x faster expo start, a 6x faster Metro file crawl, cold bundling 20 to 50 percent quicker, and warm bundling 3 to 8x faster, all worth measuring on your own project",
    "UI — The Jetpack Compose and SwiftUI APIs in Expo UI are stable as of SDK 56 and now ship in the default create-expo-app template",
    "ANDROID — Android 17, released June 16, is the first version to make adaptive-first a mandatory standard, requiring apps to handle resizing and orientation changes on large screens",
    "GLASS — iOS 27 brings Liquid Glass, Apple's biggest platform redesign since 2013, and apps adopting it are reported to get priority in editorial featuring",
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
              fontFamily: "'DM Mono', monospace",
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
