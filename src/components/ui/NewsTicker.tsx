"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — 8月31日から、Google Play の新規アプリと更新はすべて Android 16（API レベル36）を対象にする必要があります。残り6日です",
    "IOS27 — iOS 27 と macOS 27 の7回目の開発者ベータが8月24日に配布されました。正式リリースは来月です。Apple Intelligence 側の変更を含むため、手元のビルドの確認を始める時期です",
    "ANDROID17 — Android 17 QPR1 のベータでは、Circle to Search を使った後に画面下のジェスチャーバーでアプリを切り替えられなくなる不具合が修正されました",
    "FUNDING — Rork は2026年4月9日、Left Lane Capital 主導で1,500万ドルのシードラウンドを発表しました。あわせてアプリビルダーの Paperline を買収し、今後も人材獲得を目的とした買収を続ける方針を示しています",
    "TRAFFIC — Rork のプラットフォームは月間74万3,000訪問を集め、成長率は85%と報告されています。AI アプリビルダーの中でも、ネイティブモバイルに絞った位置取りが効いている形です",
    "FORECAST — Gartner は2026年に新規アプリケーションの75%がローコードまたはノーコードで作られると見ています。2020年時点では25%未満でした",
  ],
  en: [
    "DEADLINE — From August 31, every new app and update on Google Play must target Android 16 (API level 36). Six days to go",
    "IOS27 — The seventh developer betas of iOS 27 and macOS 27 landed on August 24, with the public releases due next month. They include Apple Intelligence changes, so it is time to check your own builds",
    "ANDROID17 — The Android 17 QPR1 beta fixed a bug that prevented swiping the bottom gesture bar to switch apps after using Circle to Search",
    "FUNDING — On April 9, 2026, Rork announced a $15M seed round led by Left Lane Capital. It also acquired app builder Paperline and signalled it will keep acquiring to bring in engineering talent",
    "TRAFFIC — Rork reports over 743,000 monthly visits with 85 percent growth, which suggests its narrow focus on native mobile is paying off among AI app builders",
    "FORECAST — Gartner expects 75 percent of new applications to be built with low-code or no-code in 2026, up from under 25 percent in 2020",
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
