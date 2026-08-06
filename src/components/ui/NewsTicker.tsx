"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "VERIFY — Android の開発者認証が2026年9月に完全義務化されます。Android 17 以降の端末では認証が OS 側に実装され、認証を経ていないアプリは新規インストールが OS レベルでブロックされうる構造です",
    "REVIEW — 9月から、App Store への新規申請・アップデート申請と、代替配信向けの notarization で回答の提出が必須になります",
    "SDK — iOS 27 と Xcode 27 は9月に正式リリース見込みです。提出アプリへの iOS 27 SDK ビルド必須化は2027年春の予定で、こちらは1年近い猶予があります",
    "TIMELINE — Rork の $15M シードと Paperline 買収は2026年4月9日の発表です。直近のニュースではないため、記事で扱う際は時系列を明確に区別する必要があります",
    "MAX — Rork Max は native Swift を出力し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage が対象です。標準の Rork は React Native（Expo）でクロスプラットフォームのアプリを生成します",
    "EXPORT — 自動の Publish が失敗しても、GitHub へ同期して React Native のソース一式を無料でエクスポートし、手動で提出まで進められます",
  ],
  en: [
    "VERIFY — Android developer verification becomes fully mandatory in September 2026. On Android 17 devices verification lives in the OS, so unverified apps can be blocked from new installs at the OS level",
    "REVIEW — From September, responses are required when submitting new apps or updates to the App Store, and when notarizing for alternative distribution",
    "SDK — iOS 27 and Xcode 27 are expected to ship in September, but the requirement to submit iOS 27 SDK builds does not land until spring 2027",
    "TIMELINE — Rork's $15M seed and the Paperline acquisition were announced on April 9, 2026 — worth dating precisely rather than treating as breaking news",
    "MAX — Rork Max emits native Swift for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage, while standard Rork generates cross-platform apps with React Native (Expo)",
    "EXPORT — If the automated Publish step fails, you can sync to GitHub and export the full React Native source for free, then finish the submission by hand",
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
