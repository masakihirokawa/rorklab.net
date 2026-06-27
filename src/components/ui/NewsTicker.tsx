"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "TEST — Rork Companionアプリで、有料Apple Developerアカウント無しに実機iPhoneでテストできます",
    "CLOUD — クラウド上のMacでコンパイルし、60fpsのライブシミュレータをタッチ入力付きで確認できます",
    "BROWSER — Chrome・Safariだけで設計・コード・テストが完結。Xcodeは不要です",
    "PUBLISH — 2クリックのApp Store公開で、提出まわりの煩雑さを抑えられます",
    "MAX — Rork MaxはネイティブSwiftでiPhone・iPad・Apple Watch・Vision Proに対応します",
    "RN — 通常のRorkはReact Native(Expo)でiOS/Androidアプリをまとめて生成します",
  ],
  en: [
    "TEST — The Rork Companion app lets you test on a real iPhone without a paid Apple Developer account",
    "CLOUD — Code compiles on a cloud Mac, streaming a 60fps live simulator with real touch input",
    "BROWSER — Design, code, and test entirely in Chrome or Safari — no Xcode required",
    "PUBLISH — Two-click App Store publishing keeps the submission process simple",
    "MAX — Rork Max builds native Swift apps for iPhone, iPad, Apple Watch, and Vision Pro",
    "RN — Standard Rork generates iOS and Android apps together with React Native (Expo)",
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
