"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ANYTHING — Anything が AI App Builder ランキング1位を獲得、Rork Max の最大競合として急浮上（4/28）",
    "LOVABLE — Lovable がモバイルアプリを iOS / Android で公開、ノーコード競争はモバイル戦線へ突入（4/27）",
    "APPSTORE — App Store 新規アプリリリース60%増、4月単月では前年比104%増と AI ツール普及で開発民主化が加速",
    "RORK15M — Rork が $15M シードラウンドを完了、Paperline 買収で Native Swift 生成を強化（4/9）",
    "MAX — Rork Max が iPhone・iPad・Watch・TV・Vision Pro・iMessage まで Apple 全プラットフォーム対応",
    "CLOUDMAC — Cloud Mac Fleet でビルド、Xcode 不要・Mac 不要で2クリック App Store 公開を実現",
  ],
  en: [
    "ANYTHING — Anything ranks #1 in the Top 8 AI App Builders, emerging as Rork Max's biggest rival (4/28)",
    "LOVABLE — Lovable launches its AI app builder on iOS and Android, the no-code race shifts to mobile (4/27)",
    "APPSTORE — App Store launches up 60% YoY in Q1 2026, with April alone +104% as AI tools democratize app dev",
    "RORK15M — Rork closes a $15M seed round and acquires Paperline to strengthen native Swift generation (4/9)",
    "MAX — Rork Max covers the full Apple lineup: iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "CLOUDMAC — Cloud Mac fleet handles builds, no Xcode and no Mac required, with two-click App Store submission",
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
