"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PAPERLINE — Rork が AI アプリビルダー Paperline を買収、エンジニアリング人材獲得で開発力を強化（5/11）",
    "OPUS47 — Rork Max が Claude Opus 4.7 に対応準備中、コーディング精度 +13% でより精度の高いアプリ生成へ（5/11）",
    "TRAFFIC743K — Rork が月間 743k MAU・85% 成長を達成、AI モバイルビルダー市場の最大手に（5月）",
    "RORK15M — Rork が $1500 万シードを調達、Left Lane Capital 主導・a16z Speedrun も参加（4/10）",
    "RORKMAX — Rork Max が Swift native アプリを量産、iPhone・iPad・Watch・TV・Vision Pro 全対応（5月）",
    "CLOUDCOMPILE — Rork Max Cloud Compile が Mac 不要に、クラウド Mac 上で署名・配布まで完結（4〜5月）",
  ],
  en: [
    "PAPERLINE — Rork acquires AI app builder Paperline to strengthen engineering talent and capabilities (5/11)",
    "OPUS47 — Rork Max prepares Claude Opus 4.7 integration: +13% coding accuracy means sharper app generation (5/11)",
    "TRAFFIC743K — Rork hits 743K monthly visits with 85% growth, leading the AI mobile builder market (May)",
    "RORK15M — Rork raises $15M seed led by Left Lane Capital with a16z Speedrun also joining (4/10)",
    "RORKMAX — Rork Max ships native Swift apps for iPhone, iPad, Watch, TV, and Vision Pro (May)",
    "CLOUDCOMPILE — Rork Max Cloud Compile removes the Mac requirement, signs and ships entirely from the cloud (Apr-May)",
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
