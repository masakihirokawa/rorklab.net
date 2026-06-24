"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ACQUISITION — Rorkが初の買収を実施。macOSでネイティブSwiftアプリを生成するPaperlineを取得しました",
    "FUNDING — Left Lane Capital主導の$15Mシードは、AI時代のモバイルアプリの作り方と収益化の再定義に充てられます",
    "GROWTH — Rork Maxはローンチから3日でARR $1.5Mに到達し、2週間で年間売上を倍増させたとされます",
    "ENGINE — Rork MaxはClaude Code＋Claude Opus 4.6駆動。Web初のSwiftビルダーとしてXcodeを置き換えます",
    "SPLIT — 通常RorkはReact Native(Expo)、Rork MaxはネイティブSwiftでAppleエコシステム全域が対象です",
    "PRICING — 無料で開始でき、有料は月25ドル〜、Rork Maxは月200ドルです",
  ],
  en: [
    "ACQUISITION — Rork makes its first acquisition, buying Paperline, a macOS app that generates native Swift apps with AI",
    "FUNDING — The $15M seed led by Left Lane Capital backs Rork's push to redefine how mobile apps are built and monetized",
    "GROWTH — Rork Max reportedly hit $1.5M ARR within three days of launch and doubled annual revenue in two weeks",
    "ENGINE — Rork Max runs on Claude Code and Claude Opus 4.6, the first web Swift builder aiming to replace Xcode",
    "SPLIT — Standard Rork uses React Native (Expo); Rork Max generates native Swift across the whole Apple ecosystem",
    "PRICING — Start free; paid plans begin at $25/month, with Rork Max at $200/month",
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
