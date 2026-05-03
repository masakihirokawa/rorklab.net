"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORK15M — Rork が 1,500 万ドルのシード調達、Left Lane Capital・a16z Speedrun ら参加（4/9）",
    "RORKMAX — Rork Max が Claude Code + Opus 4.6 搭載で公開、2週間で年間収益2倍を達成",
    "PAPERLINE — Rork が App Builder の Paperline を買収、機能統合で開発体験を強化",
    "SWIFT — Rork Max が Web 上初の Swift アプリビルダーに、Xcode なしで iOS アプリを生成",
    "LOVABLE — Lovable も iOS/Android アプリをリリース、音声・テキストで vibe コーディング（4/28）",
    "NOCODE75 — Gartner 予測：2026 年末までに新規アプリの 75% がローコード・ノーコードで開発",
  ],
  en: [
    "RORK15M — Rork raises $15M seed from Left Lane Capital, a16z Speedrun & more (4/9)",
    "RORKMAX — Rork Max powered by Claude Code + Opus 4.6 doubles annual revenue in 2 weeks",
    "PAPERLINE — Rork acquires app builder Paperline to strengthen its development experience",
    "SWIFT — Rork Max becomes the first web-based Swift app builder, generating iOS apps without Xcode",
    "LOVABLE — Lovable launches iOS & Android vibe-coding app for mobile-first development (4/28)",
    "NOCODE75 — Gartner: 75% of new apps built with low-code/no-code tools by end of 2026",
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
