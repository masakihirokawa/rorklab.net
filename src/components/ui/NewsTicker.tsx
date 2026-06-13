"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはWeb上でSwiftアプリを開発・公開できる初のビルダーをうたい、Xcode不要・2クリックでApp Store公開まで到達できます",
    "APPLE — iPhone・iPad・Apple Watch・Apple TV・Vision Pro向けのネイティブSwiftアプリを生成します",
    "EXPO — 通常版はReact Native（Expo）基盤。自然言語の要件記述からネイティブiOS/Androidアプリを生成します",
    "FUNDING — Rorkがa16zから$2.8Mを調達。AIノーコードのモバイル領域で存在感を強めています",
    "PRICE — 無料で開始でき、有料プランは$25/月から。個人開発者が試しやすい価格帯です",
    "WWDC — WWDC 2026でApple Intelligenceが前進。ネイティブ機能の価値が上がり、ノーコード生成アプリのAI統合の選択肢も広がります",
  ],
  en: [
    "MAX — Rork Max bills itself as the first web Swift app builder, publishing to the App Store in two clicks with no Xcode required",
    "APPLE — It generates native Swift apps for iPhone, iPad, Apple Watch, Apple TV, and Vision Pro",
    "EXPO — The standard tier builds native iOS and Android apps on React Native (Expo) from a plain-English description",
    "FUNDING — Rork raised $2.8M from a16z, strengthening its position in AI no-code mobile development",
    "PRICE — Free to start, with paid plans from $25/month — an accessible entry point for solo developers",
    "WWDC — WWDC 2026 pushes Apple Intelligence forward, raising the value of native features and widening AI integration options for no-code apps",
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
