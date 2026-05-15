"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK — Rork が AI アプリビルダー Paperline を買収、エンジニアリング人材の強化を目的に今後も買収継続の方針（5月）",
    "MAX — Rork Max（Claude Code + Claude Opus 4.6）がネイティブ Swift を直接生成、X で 800 万ビュー・ARR が 2週間で 2倍に",
    "GROWTH — Rork の月間訪問数が 743,000 を突破、前年比 85% 成長で AI モバイルビルダー市場の世界最大手に",
    "FUNDING — Rork が $1,500 万シードを調達（4/10）、Left Lane Capital 主導・a16z Speedrun・Peak XV など参加",
    "NATIVE — Rork Max が iPhone・iPad・Apple Watch・Vision Pro に対応、Dynamic Island・Live Activities・Siri Intents も実装可能",
    "MARKET — App Store に AI コーディングツール活用の個人開発ブーム到来、2026年の新規アプリの80%以上が AI 搭載",
  ],
  en: [
    "RORK — Rork acquires AI app builder Paperline for engineering talent, with more acquisitions planned ahead (May)",
    "MAX — Rork Max (Claude Code + Claude Opus 4.6) generates native Swift directly; 8M X views, ARR doubled in 2 weeks",
    "GROWTH — Rork hits 743k monthly visitors with 85% YoY growth, becoming the #1 AI mobile builder by web traffic",
    "FUNDING — Rork raises $15M seed (Apr 10) led by Left Lane Capital, with a16z Speedrun & Peak XV joining",
    "NATIVE — Rork Max supports iPhone, iPad, Apple Watch & Vision Pro — Dynamic Island, Live Activities & Siri Intents included",
    "MARKET — AI coding tools spark an indie dev boom on the App Store; 80%+ of new apps in 2026 ship with AI built in",
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
