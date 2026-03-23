"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Max が急成長：ネイティブ Swift アプリを Xcode 不要で構築＆公開（3/22）",
    "TEST — Rork Companion アプリ：有料開発者アカウント不要で実機テスト可能に（3/20）",
    "CLOUD — クラウド Mac でコンパイル＆QR コードで実機インストール対応（3/18）",
    "APPLE — iPhone・iPad・Apple Watch・Vision Pro・iMessage 全プラットフォーム対応（3/15）",
    "NATIVE — AR/LiDAR・Metal 3D・ウィジェット・HealthKit 等ネイティブ API 完全対応（3/12）",
    "TREND — ノーコードモバイル開発の主流に：AI 駆動ツールが App Store 公開を民主化（3/10）",
  ],
  en: [
    "MAX — Rork Max growing fast: build & publish native Swift apps without Xcode (3/22)",
    "TEST — Rork Companion app: test on real devices without a paid developer account (3/20)",
    "CLOUD — Cloud Mac compilation with QR code install to your device (3/18)",
    "APPLE — Full support for iPhone, iPad, Apple Watch, Vision Pro & iMessage (3/15)",
    "NATIVE — Complete native API support: AR/LiDAR, Metal 3D, widgets, HealthKit & more (3/12)",
    "TREND — No-code mobile dev goes mainstream: AI tools democratize App Store publishing (3/10)",
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
