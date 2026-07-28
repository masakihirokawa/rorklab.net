"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Max は iPhone・iPad・Apple Watch・Apple TV・Vision Pro 向けにネイティブの Swift アプリを生成します。Xcode を開かずに2クリックで App Store へ出せる構成です",
    "WIDGET — Rork Max はゲーム・ウィジェット・ライブアクティビティにも対応します。React Native 一本だった守備範囲が Apple プラットフォーム側へ広がりました",
    "FUND — Rork は a16z から280万ドルを調達しました。月間訪問はおよそ743,000で、伸び率は85%とされています",
    "MAESTRO — Expo が Maestro の E2E テスト実行向けにインサイトダッシュボードを追加しました（7月20日）。チーム全体の実行時間の推移を追えます",
    "CICD — Posh の事例として、EAS Workflows・フィンガープリント・Expo Updates で CI/CD を組み直した記録が7月23日に公開されました",
    "SIRI — iOS 27 のパブリックベータが7月13日に始まりました。生成 AI ベースの新しい Siri は A17 Pro 以降・メモリ8GB以上が条件です",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Apple Watch, Apple TV, and Vision Pro, with two-click App Store publishing that never opens Xcode",
    "WIDGET — Rork Max also covers games, widgets, and live activities, widening the scope beyond the React Native output Rork started with",
    "FUND — Rork raised $2.8 million from a16z, and the platform now sees roughly 743,000 monthly visits with a reported 85% growth rate",
    "MAESTRO — Expo added an insights dashboard for Maestro end-to-end test runs on July 20, letting teams track run performance over time",
    "CICD — A Posh case study published July 23 walks through rebuilding a mobile CI/CD pipeline on EAS Workflows, fingerprinting, and Expo Updates",
    "SIRI — The iOS 27 public beta opened on July 13, and its generative-AI Siri requires an A17 Pro chip or newer with at least 8 GB of RAM",
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
