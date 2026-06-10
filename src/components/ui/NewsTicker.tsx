"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK-MAX — Rork MaxがReact Nativeでなく純粋なSwiftコードを生成。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまでネイティブ対応",
    "BROWSER-SIM — ブラウザ上のストリーミングiOSシミュレータで、XcodeやMac無しに実機相当の環境でアプリを検証",
    "AUTO-PUBLISH — App Storeへの自動公開に対応。ビルド・証明書・申請を手動設定なしで処理",
    "EXPO-RN — Rorkは説明文から本番品質のモバイルアプリをAIとExpo（React Native）で生成。モバイル特化が強みです",
    "PRICING — 無料で開始でき、有料プランは月$25から。Rork Maxは月$200",
    "NATIVE-FIRST — 2026年の新機能はAppleエコシステムのネイティブ強化が一貫テーマ",
  ],
  en: [
    "RORK-MAX — Rork Max now generates pure Swift instead of React Native, enabling native apps across iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "BROWSER-SIM — A browser-based streaming iOS simulator tests apps in a real Apple environment without Xcode or a Mac",
    "AUTO-PUBLISH — Rork adds automated App Store publishing, handling builds, certificates, and submission with no manual setup",
    "EXPO-RN — Rork builds production-ready mobile apps from a description using AI and Expo (React Native), staying mobile-only by design",
    "PRICING — Free to start, paid plans from $25/month, with Rork Max at $200/month",
    "NATIVE-FIRST — Rork's 2026 features share a clear theme: deeper native empowerment of the Apple ecosystem",
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
