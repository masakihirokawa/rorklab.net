"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ENGINE — Rork MaxはClaude CodeとClaude Opus 4.6を基盤に、ネイティブSwiftアプリを直接生成します",
    "CORE ML — Rork MaxからCore MLの端末内推論・HealthKit・HomeKit・NFC・App Clipsといった機能に手が届きます",
    "SEED — Rorkは2026年4月にLeft Lane Capital主導で$15Mのシードを調達し、Peak XVやa16z Speedrunが参加しました",
    "M&A — Rorkはアプリビルダー Paperline を買収し、エンジニアリング人材の獲得を目的に買収を継続する方針です",
    "MARKET — Gartnerは2026年末までに新規アプリの75%がローコードまたはノーコードで作られると予測しています",
    "GROWTH — ノーコードAI市場は2024年の$4.9Bから2029年に$24.8Bへ、年38.2%の成長が見込まれています",
  ],
  en: [
    "ENGINE — Rork Max is powered by Claude Code and Claude Opus 4.6, generating native Swift apps directly",
    "CORE ML — Rork Max reaches on-device Core ML inference alongside HealthKit, HomeKit, NFC, and App Clips",
    "SEED — Rork raised a $15M seed led by Left Lane Capital in April 2026, joined by Peak XV and a16z Speedrun",
    "M&A — Rork acquired the app builder Paperline and says it will stay acquisitive to bring in engineering talent",
    "MARKET — Gartner expects 75% of new applications to be built with low-code or no-code tools by the end of 2026",
    "GROWTH — The no-code AI platform market is projected to grow from $4.9B in 2024 to $24.8B by 2029",
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
