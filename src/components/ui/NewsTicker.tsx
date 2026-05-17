"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUND — Rork が Left Lane Capital 主導で $1500 万シードラウンド調達、Paperline 買収・積極 M&A 方針を表明（2026年4月）",
    "MAX — Rork Max 正式リリース、React Native から脱却しネイティブ Swift アプリをブラウザから直接生成（2026年2月）",
    "TEST — Rork Companion アプリで Apple Developer アカウントなしに実機テスト可能に、個人開発のハードルが大幅低下",
    "GROWTH — Rork が月間 743,000 訪問・成長率 85% を達成、AI アプリビルダー市場でのプレゼンス急拡大",
    "SPEED — AI がテキストプロンプトから Android アプリを 1 時間以内に生成、ビルド→テスト→公開まで自動実行（2026年4月）",
    "MARKET — AI ノーコードビルダー市場が急拡大、Rork・Bubble・Adalo が「真のネイティブアプリ生成」で差別化競争へ",
  ],
  en: [
    "FUND — Rork raises $15M seed round led by Left Lane Capital, acquires Paperline, plans continued M&A (April 2026)",
    "MAX — Rork Max launches: generates native Swift apps instead of React Native, directly from a browser (February 2026)",
    "TEST — Rork Companion app enables real-device testing without an Apple Developer account, lowering the barrier for indie devs",
    "GROWTH — Rork hits 743,000 monthly visits with 85% growth rate, rapidly expanding presence in AI app builder market",
    "SPEED — AI generates a working Android app from a text prompt in under an hour: build, test & publish fully automated (April 2026)",
    "MARKET — AI no-code builder market booms as Rork, Bubble & Adalo compete on 'true native app generation' capability",
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
