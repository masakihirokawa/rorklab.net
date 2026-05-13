"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ACQUISITION — Rork が AI アプリビルダー Paperline を買収、エンジニアリング人材強化・今後も買収継続の方針（5月）",
    "GROWTH — Rork が月間 743k MAU・85% 成長を達成、AI モバイルビルダー市場の世界最大手に（5月）",
    "SWIFT — Rork Max が Swift ネイティブコード生成に完全移行、Claude Code + Opus 4.6 搭載で X に800万ビュー超",
    "FUNDING — Rork が $15M シード調達（4/10）。Left Lane Capital 主導、Peak XV・True Ventures・a16z Speedrun 参加",
    "CLOUD — Cloud Compile で Mac・Xcode 不要の署名・配布フローを確立、2クリックで App Store 公開可能",
    "MARKET — Vibe Coding 市場は 2027年に $12.3B 規模へ。非開発者63%が活用、AI ネイティブ開発が主流に",
  ],
  en: [
    "ACQUISITION — Rork acquires AI app builder Paperline to expand engineering talent (May 2026, more acquisitions planned)",
    "GROWTH — Rork hits 743k MAU with 85% growth, cementing its lead as the top AI mobile builder platform (May)",
    "SWIFT — Rork Max on Claude Code + Opus 4.6 goes fully native Swift — 8M+ X views, doubled ARR in 2 weeks",
    "FUNDING — Rork raises $15M seed (4/10): Left Lane Capital leads; Peak XV, True Ventures & a16z Speedrun join",
    "CLOUD — Cloud Compile: 2-click App Store publishing with no Mac or Xcode required",
    "MARKET — Vibe Coding market headed for $12.3B by 2027; 63% non-developers driving AI-native app development",
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
