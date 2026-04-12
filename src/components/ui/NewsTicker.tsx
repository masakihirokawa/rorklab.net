"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが1500万ドルのシード資金調達を完了、Left Lane Capital主導でPeak XV・True Ventures・Goodwater参加（4/10）",
    "GROWTH — Rork MaxがXで800万表示超のバイラル、発表2週間で年間売上が倍増（4月時点）",
    "SWIFT — Rork MaxはClaude Code + Opus 4.6搭載、React NativeからネイティブSwiftUIアプリ構築へ進化（2月〜）",
    "APP STORE — AIコーディングツールの台頭でApp Store新規アプリが前年比84%急増（Q1 2026）",
    "NO XCODE — Rork MaxはクラウドMacフリートでネイティブコンパイル、Xcode不要でブラウザからApp Store公開まで完結",
    "MARKET — Rorkがウェブトラフィックでモバイルアプリ向けAIプラットフォーム世界最大に成長（4月時点）",
  ],
  en: [
    "FUNDING — Rork raises $15M Seed led by Left Lane Capital with Peak XV, True Ventures, Goodwater, a16z Speedrun (4/10)",
    "GROWTH — Rork Max went viral with 8M+ views on X, doubling annual revenue within two weeks of launch (Apr)",
    "SWIFT — Rork Max powered by Claude Code + Opus 4.6, builds native SwiftUI apps instead of React Native (Feb+)",
    "APP STORE — New app submissions surge 84% YoY in Q1 2026 as AI coding tools drive the Great App Renaissance",
    "NO XCODE — Rork Max uses cloud Mac fleet for native compilation: build, preview, install via QR, and ship to App Store",
    "MARKET — Rork becomes the largest AI platform for building mobile apps in the world by web traffic (Apr)",
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
