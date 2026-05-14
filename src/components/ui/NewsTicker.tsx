"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK — Rork が AI アプリビルダー Paperline を買収、エンジニアリング人材の確保を目的に今後も買収継続の方針",
    "GROWTH — Rork の月間訪問数が 743,000 を突破、前年比 85% 成長で AI モバイルビルダー市場の最大手に",
    "FUNDING — Rork が $1,500 万シードを調達（4/10）、Left Lane Capital 主導・a16z Speedrun など参加",
    "MAX — Rork Max（Claude Code + Opus 4.6）がネイティブ Swift アプリを直接生成、X で 800 万ビュー突破",
    "MARKET — Bubble・Lovable・Natively など AI ネイティブ開発ツールが増加、Rork は Swift 生成で市場を差別化",
    "APPSTORE — Rork が「次世代の個人開発者プラットフォーム」として App Store 起業家を本格支援",
  ],
  en: [
    "RORK — Rork acquires AI app builder Paperline for engineering talent; plans to stay acquisitive going forward",
    "GROWTH — Rork hits 743k monthly visitors with 85% YoY growth, cementing its lead in the AI mobile builder market",
    "FUNDING — Rork raises $15M seed (Apr 10) led by Left Lane Capital, with a16z Speedrun & Peak XV joining",
    "MAX — Rork Max (Claude Code + Opus 4.6) generates native Swift apps directly; hit 8M views on X at launch",
    "MARKET — AI-native builders like Bubble, Lovable & Natively proliferate; Rork differentiates with Swift generation",
    "APPSTORE — Rork positions itself as 'the next-gen indie developer platform' to back the next wave of App Store entrepreneurs",
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
