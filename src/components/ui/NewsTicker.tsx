"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PLUGINS — 11/19 に Rork の Connectors が Plugins に。Gmail・Google Drive・Slack・Zoom など7つが加わりました",
    "SONNET 4.5 — Claude API の Sonnet 4.5 提供終了は 11/30、残り10日。アプリに埋め込んだモデル名を確かめてください",
    "OOM — 古い Android で expo-image の画像がメモリに残り続ける、という問いが出ています",
    "NEW — 絞り込みにだけ新作が出ない日の点検表",
    "SPM — CocoaPods Trunk の更新停止を受けて、Expo アプリでも SwiftPM への移行に備える動きが出ています",
    "ICON — アプリのアイコンが更新されないときは、アセット・キャッシュ・ビルド番号の順に見ると早く片づきます",
  ],
  en: [
    "PLUGINS — On 11/19 Rork renamed Connectors to Plugins and added seven, including Gmail, Google Drive, Slack and Zoom",
    "SONNET 4.5 — Sonnet 4.5 retires on the Claude API on 11/30, 10 days left. Check any model names shipped in your app",
    "OOM — Developers report expo-image holding bitmaps in memory on older Android versions",
    "NEW — A Checklist for When New Items Skip Your Category Filter",
    "SPM — With CocoaPods Trunk frozen, Expo teams are getting ready to move to SwiftPM",
    "ICON — App icon won't update? Check the asset, then caches, then the build number",
  ]
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
        background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-primary))", // 2026-10-09: 不透明に（固定バーの下を流れる本文が透けて重なっていた）
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
