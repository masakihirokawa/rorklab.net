"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15M — Rork が Left Lane 主導で 1,500 万ドルのシードラウンドを完了（4月）",
    "RORKMAX — Rork Max リリース、React Native ではなくネイティブ Swift アプリを生成（2月）",
    "APPLECAPS — AR/LiDAR・Metal 3D ゲーム・Live Activities・Core ML などネイティブ機能をフル活用",
    "MULTITARGET — iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage に対応",
    "TRAFFIC — 月間アクセス 743,000、成長率 +85% で no-code AI ビルダーの主要プレイヤーに",
    "A16Z — a16z からの 280 万ドル調達に続く本格拡大ステージへ突入",
  ],
  en: [
    "SEED15M — Rork closes a $15M seed round led by Left Lane Capital (April)",
    "RORKMAX — Rork Max launches, generating native Swift apps instead of React Native (February)",
    "APPLECAPS — Full native access to AR/LiDAR scanning, Metal 3D games, Live Activities, and Core ML",
    "MULTITARGET — Supports iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage targets",
    "TRAFFIC — 743K monthly visits with 85% growth, becoming a top player in no-code AI app builders",
    "A16Z — Building on an earlier $2.8M round from a16z, Rork moves into its scale-up stage",
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
