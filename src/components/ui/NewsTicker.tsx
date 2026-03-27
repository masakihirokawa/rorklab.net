"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MARKET — AI アプリビルダー市場が $264B（2032 年予測）へ成長、Rork Max が先行者優位を拡大（3/28）",
    "APPLE — Apple × Gemini AI 提携で Core ML 強化：SwiftUI ネイティブの Rork Max に大きな追い風（3/26）",
    "COST — AI 活用でアプリ開発コスト 40% 削減＆バグ率 20% 低下、小規模チームの品質革命（3/26）",
    "COMPANION — Rork Companion でリアルタイム実機テスト＆QR インストールが好評（3/25）",
    "ARR — Rork Max が 3 日で $1.5M ARR 達成：ネイティブ Swift 2 クリック公開の需要を実証（3/24）",
    "FUND — Rork が a16z から $2.8M 調達、ノーコード AI × ネイティブアプリの新時代を牽引（3/22）",
  ],
  en: [
    "MARKET — AI app builder market projected to hit $264B by 2032, Rork Max extends first-mover edge (3/28)",
    "APPLE — Apple-Gemini AI deal strengthens Core ML: major tailwind for Rork Max's SwiftUI approach (3/26)",
    "COST — AI cuts app dev costs 40% & bugs 20%, enabling small teams to ship enterprise quality (3/26)",
    "COMPANION — Rork Companion gains traction with real-time on-device testing & QR install (3/25)",
    "ARR — Rork Max hits $1.5M ARR in 3 days, proving massive demand for native Swift 2-click publish (3/24)",
    "FUND — Rork secures $2.8M from a16z, leading the no-code AI × native app revolution (3/22)",
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
