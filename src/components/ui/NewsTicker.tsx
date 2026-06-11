"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "APPLE-AI — Appleが初回DL 200万未満の開発者にFoundation Modelsを無償開放。個人開発アプリへのAI組み込みコストが大幅に低下",
    "SWIFT-API — Foundation Modelsのサーバーサイド統合で、ClaudeやGeminiを同一Swift APIから呼び出し可能に。画像入力にも対応",
    "KOTLIN-MIGRATION — Android Studioの移行エージェントがReact Native製アプリをネイティブKotlinへ自動移行。Rork生成アプリの将来の選択肢に",
    "RORK-MAX — Rork MaxはネイティブSwiftコードを生成（月$200）。iPhone・iPad・Watch・TV・Vision Pro・iMessageまで対応",
    "SIMULATOR — ブラウザベースのストリーミングiOSシミュレータで、XcodeやMacなしに実機相当のApple環境で検証可能",
    "SWIFTUI — WWDC 2026でSwiftUIが進化。並べ替え可能コンテナ・任意コンテナのスワイプアクション・最大2倍速のレイアウト",
  ],
  en: [
    "APPLE-AI — Apple opens Foundation Models free to developers under 2M first-time downloads, slashing the cost of adding AI to indie apps",
    "SWIFT-API — Foundation Models server-side integration lets you call Claude and Gemini through the same Swift API, now with image input",
    "KOTLIN-MIGRATION — Android Studio's migration agent converts React Native apps into native Kotlin automatically — a future path for Rork-built apps",
    "RORK-MAX — Rork Max generates native Swift code ($200/mo), covering iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "SIMULATOR — A browser-based streaming iOS simulator lets you test on a real Apple environment without Xcode or Mac hardware",
    "SWIFTUI — SwiftUI evolves at WWDC 2026 with reorderable containers, swipe actions for any container, and layouts up to 2x faster",
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
