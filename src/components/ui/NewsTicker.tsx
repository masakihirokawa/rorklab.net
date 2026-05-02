"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "LOVABLE_RIVAL — Lovable が iOS / Android モバイルアプリで vibe-coding 市場に参入、Rork の主要競合に（4/28）",
    "APP_STORE_BOOM — Q1 の新規アプリが前年比60%増、4月は104%増。AIアプリビルダーが個人開発を加速",
    "RORK_MAX — Rork Max が Claude Opus 4.6 + Claude Code 基盤でネイティブ Swift アプリ生成、Web 版 Xcode の代替へ",
    "SEED_15M — Rork、Left Lane Capital 主導で $15M シードラウンドを調達（4/9）— App Store 起業家を支援",
    "APPLE_GUARD — Apple が動的コード実行系の vibe-coding ツールを審査強化。Rork Companion は引き続き安定運用",
    "CLOUD_MAC — Cloud Mac fleet による2クリック App Store 公開、Mac / Xcode 不要の体制が個人開発者に好評",
  ],
  en: [
    "LOVABLE_RIVAL — Lovable enters the mobile vibe-coding market with iOS and Android apps, becoming a direct Rork rival (4/28)",
    "APP_STORE_BOOM — Q1 new app releases up 60% YoY and 104% in April, with AI app builders accelerating indie development",
    "RORK_MAX — Rork Max generates native Swift apps on Claude Opus 4.6 + Claude Code, positioning as a web-based Xcode alternative",
    "SEED_15M — Rork closes a $15M seed round led by Left Lane Capital (Apr 9) to back the next wave of App Store entrepreneurs",
    "APPLE_GUARD — Apple tightens review on dynamic code execution tools while Rork Companion continues to ship reliably",
    "CLOUD_MAC — Two-click App Store publishing via the cloud Mac fleet—no Mac or Xcode needed—keeps winning indie developers",
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
