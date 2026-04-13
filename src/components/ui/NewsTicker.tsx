"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが1500万ドルのシード調達完了、Left Lane Capital主導でPeak XV・True Ventures・Goodwater・a16z Speedrunが参加（4/10）",
    "PAPERLINE — RorkがアプリビルダーのPaperlineを買収、エンジニアリング人材の獲得とプラットフォーム強化を加速（4月）",
    "RORK MAX — Claude Code + Opus 4.6搭載、X上で800万インプレッション超のバイラルを記録し年間売上が2週間で倍増（4月）",
    "NO XCODE — Rork MaxはクラウドMacフリートでネイティブSwiftUIアプリをコンパイル、XcodeなしでApp Store公開まで完結（4月）",
    "MARKET — RorkがWebトラフィックでモバイルアプリ向けAIプラットフォーム世界最大に成長（4月時点）",
    "APP STORE — AIコーディングツールの台頭でApp Store新規アプリが前年比84%急増、「Great App Renaissance」が到来（Q1 2026）",
  ],
  en: [
    "FUNDING — Rork raises $15M Seed led by Left Lane Capital with Peak XV, True Ventures, Goodwater, a16z Speedrun (4/10)",
    "PAPERLINE — Rork acquires app builder Paperline to accelerate engineering talent and platform expansion (Apr)",
    "RORK MAX — Powered by Claude Code + Opus 4.6: went viral with 8M+ views on X, doubling annual revenue in two weeks (Apr)",
    "NO XCODE — Rork Max compiles native SwiftUI apps via cloud Mac fleet — build, preview, and ship to App Store without Xcode (Apr)",
    "MARKET — Rork becomes the world's largest AI platform for building mobile apps by web traffic (Apr)",
    "APP STORE — New apps surge 84% YoY in Q1 2026 as AI tools spark the Great App Renaissance on the App Store",
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
