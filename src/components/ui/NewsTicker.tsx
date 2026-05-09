"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "TRAFFIC743K — Rork が月間 743k MAU・85% 成長を達成、AI モバイルビルダー市場の最大手に（5月）",
    "RORK15M — Rork が $1500 万シードを調達、Left Lane Capital 主導・a16z Speedrun も参加（4/10）",
    "RORKMAX — Rork Max が Claude Opus 4.6 ベースで Swift native アプリを量産、ARR 短期間で倍増（5月）",
    "CLOUDCOMPILE — Rork Max Cloud Compile が Mac 不要に、クラウド Mac 上で署名・配布まで完結（4〜5月）",
    "LOVABLEAPP — Lovable iOS/Android リリース、バイブコーディング競合がスマホ完結に（4/28）",
    "VIBE12B — Vibe Coding 市場が 2027 年に $12.3B 予測、ユーザーの 63% が非開発者（Taskade 調査）",
  ],
  en: [
    "TRAFFIC743K — Rork hits 743K monthly visits with 85% growth, leading the AI mobile builder market (May)",
    "RORK15M — Rork raises $15M seed led by Left Lane Capital with a16z Speedrun also joining (4/10)",
    "RORKMAX — Rork Max ships native Swift apps powered by Claude Opus 4.6, ARR doubling quickly (May)",
    "CLOUDCOMPILE — Rork Max Cloud Compile removes the Mac requirement, signs and ships from the cloud (Apr-May)",
    "LOVABLEAPP — Lovable launches iOS/Android, bringing vibe coding fully onto the phone (4/28)",
    "VIBE12B — Vibe coding market projected at $12.3B by 2027, with 63% of users being non-developers (Taskade)",
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
