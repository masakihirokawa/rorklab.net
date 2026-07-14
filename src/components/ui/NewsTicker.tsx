"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成し、Appleエコシステム全体を対象にします",
    "DEVICES — iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまで、一つの記述から広げられます",
    "NATIVE — AR・LiDARスキャン、Metalによる3Dゲーム、ウィジェット、Dynamic Island、オンデバイスCore MLを解放します",
    "SEED — RorkはLeft Lane Capital主導の$15Mシードを調達し、Peak XVやa16z Speedrunも参加しました",
    "PAPERLINE — アプリビルダーPaperlineを買収し、エンジニアリング人材の獲得を続ける姿勢です",
    "MARKET — 月間743,000訪問超。Gartnerは2026年末までに新規アプリの75%がローコード/ノーコードで作られると見込みます",
  ],
  en: [
    "MAX — Rork Max builds native Swift apps instead of React Native, targeting the whole Apple ecosystem",
    "DEVICES — From one description it spans iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "NATIVE — It unlocks AR and LiDAR scanning, 3D games with Metal, Home Screen widgets, Dynamic Island, and on-device Core ML",
    "SEED — Rork raised a $15M seed led by Left Lane Capital, joined by Peak XV and a16z Speedrun",
    "PAPERLINE — Rork acquired the app builder Paperline and plans to stay acquisitive for engineering talent",
    "MARKET — With 743,000+ monthly visits, and Gartner expects 75% of new apps to be low-code or no-code by end of 2026",
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
