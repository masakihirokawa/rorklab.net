"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "GROWTH — Rork が月間 743k MAU・85% 成長を達成、AI モバイルビルダー市場の世界最大手に（5月）",
    "FUNDING — Rork が $15M シード調達。Left Lane Capital 主導、Peak XV・a16z Speedrun 参加（4/10）",
    "PAPERLINE — Rork が AI アプリビルダー Paperline を買収、エンジニアリング人材獲得目的（4〜5月）",
    "RORKMAX — Rork Max（Swift native）が Claude Opus 4.7 ベースに進化、Apple 全デバイス対応を強化（5月）",
    "VIBECODING — 「バイブコーディング」がモバイル開発の主流に。自然言語からプロダクション級アプリを生成（2026年）",
    "COMPARISON — Rork vs Lovable vs Bolt.new 徹底比較：Cloud Compile・ATTダイアログ・background refresh で差別化（5月）",
  ],
  en: [
    "GROWTH — Rork hits 743k MAU with 85% growth, becoming the world's largest AI mobile builder platform (May)",
    "FUNDING — Rork raises $15M seed led by Left Lane Capital with Peak XV & a16z Speedrun (4/10)",
    "PAPERLINE — Rork acquires AI app builder Paperline for engineering talent, signals more acquisitions (Apr-May)",
    "RORKMAX — Rork Max (Swift native) upgrades to Claude Opus 4.7 base with enhanced full Apple device support (May)",
    "VIBECODING — Vibe coding goes mainstream: natural language to production-grade mobile apps is now standard (2026)",
    "COMPARISON — Rork vs Lovable vs Bolt.new: Cloud Compile, ATT dialog & background refresh set Rork apart (May)",
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
