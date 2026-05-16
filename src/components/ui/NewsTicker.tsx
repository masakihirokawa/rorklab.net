"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Max が Claude Code + Claude Opus 4.6 を採用、Native Swift アプリを直接生成、X で 800 万ビュー獲得（2/2026）",
    "FUND — Rork が Left Lane Capital リードで $15M シード調達、次世代 App Store 起業家を支援するプラットフォームを強化（4/9）",
    "ACQ — Rork が AI アプリビルダー Paperline を買収、エンジニアリング人材を強化し機能拡充を加速（5/2026）",
    "GROWTH — Rork の月間訪問数が 743k MAU を突破、前年比 85% 成長で AI モバイルビルダー市場の最大手に（5/2026）",
    "RIVAL — OpenAI が Codex を ChatGPT モバイルに展開（5/14）、Rork の Native Swift 差別化と ARKit 活用が競争優位に",
    "NATIVE — Rork Max が SwiftUI・AR/LiDAR・Dynamic Island・Live Activities・Siri Intents に直接対応、他の AI ビルダーと一線（2/2026）",
  ],
  en: [
    "MAX — Rork Max powered by Claude Code & Opus 4.6 builds native Swift apps directly; 8M X views, ARR doubled in 2 weeks (Feb 2026)",
    "FUND — Rork raises $15M seed led by Left Lane Capital to power the next generation of App Store entrepreneurs (Apr 9)",
    "ACQ — Rork acquires AI app builder Paperline to bring in engineering talent and accelerate feature development (May 2026)",
    "GROWTH — Rork hits 743k MAU with 85% YoY growth, becoming the largest AI mobile builder platform (May 2026)",
    "RIVAL — OpenAI deploys Codex to ChatGPT mobile (May 14); Rork's native Swift & ARKit edge remains a key differentiator",
    "NATIVE — Rork Max supports SwiftUI, AR/LiDAR, Dynamic Island, Live Activities & Siri Intents — no other AI builder matches this (Feb 2026)",
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
