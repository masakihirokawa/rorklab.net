"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "SDK58 — Expo SDK 58 のベータが始まりました。iOS 27 の UIScene ライフサイクルを採用し、Android のリリースビルドでは R8 が既定で有効になります",
    "SWIFT — Rork では Expo プロジェクトを新しく作れなくなりました。新規は Swift・Kotlin・React の3択で、既存のプロジェクトはこれまでどおり動きます",
    "11/01 — Google Play の対象 API レベル、延長を申請した方の配信期限まで残り42日です。過ぎると新しい端末の新規利用者に表示されなくなります",
    "EXPOGO — Expo Go で QR を読んでも開かない、という声が出ています。9月3日から iOS 版はターミナル側とアプリ側の両方でログインが要ります",
    "NEW — prebuild が Swift の AppDelegate を求めて止まったときに、どこを直したかの記録です",
    "XCODE27 — いま Xcode 27 が要るわけではありません。EAS Build の latest イメージは現在も 26.6 で、27 のイメージは準備中です",
  ],
  en: [
    "SDK58 — The Expo SDK 58 beta is open. It adopts the iOS 27 UIScene lifecycle, and R8 is now on by default for Android release builds",
    "SWIFT — Rork no longer creates new Expo projects. New apps are Swift, Kotlin or React, and existing Expo projects keep building as before",
    "11/01 — Forty-two days remain for anyone who filed an extension on Google Play's target API level. Miss it and new users on newer devices stop seeing the app",
    "EXPOGO — Scanning the QR code in Expo Go stopped working for some people. Since September 3, iOS requires you to be signed in on both the terminal and the app",
    "NEW — What I changed when prebuild stopped and asked for the standard Swift AppDelegate",
    "XCODE27 — Xcode 27 is not required yet. The latest EAS Build image is still 26.6, and the 27 image is listed as coming soon",
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
