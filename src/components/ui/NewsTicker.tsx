"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "ELOQUENT — Google AI Edge Eloquent が iOS でリリース。Gemma オンデバイスモデルが生声を即座にプロ品質テキストに変換（4/6）",
    "APPLE — Apple が App Store から AI アプリビルダー「Anything」を削除。未審査コードの実行を禁じるポリシーを適用（4月）",
    "COMPARE — Lovable・Bolt・Rork を数週間実際に使って比較。どのツールが本番アプリ開発に最も向いているかを検証（4/6）",
    "RORKMAX — Rork Max が SwiftUI ネイティブアプリを生成。クラウド Mac ビルド＋ライブシミュレーターで Xcode 不要（4/4）",
    "NATIVE — Rork Max が Vision Pro・Apple Watch・Dynamic Island・Core ML・ARKit・LiDAR をフルサポート（4/4）",
    "GROWTH — Rork が a16z から $2.8M 調達、743K 月間訪問・85% 成長・$1.5M ARR を 3 日で達成（4月）",
  ],
  en: [
    "ELOQUENT — Google AI Edge Eloquent launches on iOS: Gemma on-device model instantly converts raw voice into polished professional text (4/6)",
    "APPLE — Apple removes AI app builder 'Anything' from the App Store for executing unreviewed code, signaling tighter vibe-coding policies (Apr)",
    "COMPARE — A real-world weeks-long comparison of Lovable, Bolt, and Rork reveals which AI app builder best handles production app development (4/6)",
    "RORKMAX — Rork Max generates native SwiftUI apps with cloud Mac builds and live streaming simulator — no Xcode or Mac required (4/4)",
    "NATIVE — Rork Max offers full support for Vision Pro, Apple Watch, Dynamic Island, Core ML, ARKit, and LiDAR out of the box (4/4)",
    "GROWTH — Rork raises $2.8M from a16z, achieves 743K monthly visits, 85% growth rate, and $1.5M ARR in just 3 days (Apr)",
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
