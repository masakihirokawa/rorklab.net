"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PRICE — Rork Max の価格帯は月200ドルから1,800ドルまで幅があります。作業量の多い開発者やチーム向けの帯が上に伸びている形です",
    "FREE — 無料枠は週5プロンプト程度です。試すには足りますが、継続的に作るなら有料前提の設計になっています",
    "SHIP — App Store への公開はビルド・証明書・申請まで自動化されており、Mac も Xcode も持たずに iOS アプリを出せます",
    "SIM — ブラウザ配信のシミュレータで、実際の Apple 環境で動く画面を手元のブラウザから確認できます",
    "NATIVE — HealthKit、ARKit と LiDAR、NFC、Dynamic Island、Metal による3D まで届きます。React Native では触れない領域です",
    "FUNDING — 2026年4月9日発表のシードで Left Lane Capital 主導の1,500万ドルを調達し、アプリビルダーの Paperline を買収しています",
  ],
  en: [
    "PRICE — Rork Max spans $200 to $1,800 per month, with the upper tiers aimed at heavier builders and teams",
    "FREE — The free tier lands at roughly five prompts per week, enough to try it but not to build on continuously",
    "SHIP — App Store publishing is automated through builds, certificates, and submission, so you can ship an iOS app without a Mac or Xcode",
    "SIM — A browser-streamed simulator lets you watch your app run in a real Apple environment from your own browser",
    "NATIVE — It reaches HealthKit, ARKit and LiDAR, NFC, Dynamic Island, and Metal 3D — territory React Native cannot touch",
    "FUNDING — Rork raised a $15M seed led by Left Lane Capital, announced April 9, 2026, and acquired app builder Paperline",
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
