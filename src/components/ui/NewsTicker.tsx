"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15 — Rork が $15M シード調達、Left Lane Capital 主導・Peak XV／True Ventures／Goodwater／a16z Speedrun 参加（4/10）",
    "HIRING — 資金使途は Rork Max モデル強化と複雑度の天井拡張、エンジニアチーム拡大で開発速度ボトルネックを解消（4月）",
    "PAPERLINE — アプリビルダー Paperline を買収、エンジニアリング人材を取り込みネイティブモバイル対応を強化（4月）",
    "VIRAL — Rork Max 発表から 2 週間で X 累計 800 万ビュー、年間収益ランレートが倍増（4月）",
    "RORKMAX — Rork Max は Claude Code + Claude Opus 4.6 で駆動、Xcode 代替を狙う Web 初の Swift アプリビルダー（4月）",
    "STACK — 出力は React Native + Expo プロジェクトと Swift ネイティブコード、App Store／Google Play にそのまま提出可能（4月）",
  ],
  en: [
    "SEED15 — Rork raises $15M seed led by Left Lane Capital with Peak XV, True Ventures, Goodwater and a16z Speedrun (4/10)",
    "HIRING — Funding focuses on Rork Max model upgrades and complexity-ceiling expansion, with engineering team growth to unblock velocity (Apr)",
    "PAPERLINE — Rork acquires app builder Paperline to absorb its engineering team and deepen native-mobile capabilities (Apr)",
    "VIRAL — Rork Max generates 8M+ X views and doubles annual revenue run-rate within two weeks of launch (Apr)",
    "RORKMAX — Rork Max is powered by Claude Code + Opus 4.6, the first Swift app builder on the web aimed at replacing Xcode (Apr)",
    "STACK — Outputs are real React Native + Expo projects plus native Swift code, ready to ship to App Store and Google Play (Apr)",
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
              letterSpacing: "0.02em",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
