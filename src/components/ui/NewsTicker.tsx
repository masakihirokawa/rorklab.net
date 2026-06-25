"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "BUILD — RorkはReact Native(Expo)でネイティブのiOS/Androidアプリを生成。平易な説明からデプロイ可能な実コードが出力されます",
    "MAX — Rork Maxはnative Swiftを出力し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "MAX — 本物のSwift生成で性能とApp Store審査の通しやすさを両立。現状ほぼ唯一の選択肢です",
    "DEPLOY — テスト用の共有リンク作成とiOS/Android双方の自動ビルドに対応し、別々の開発工程を省けます",
    "PRICE — 無料で始められ、有料プランは月$25から。個人開発で試作から配布まで無理なく回せます",
    "FOCUS — BoltやLovableのようなWeb中心ツールと違い、Rorkはモバイルに特化しています",
  ],
  en: [
    "BUILD — Rork generates native iOS/Android apps with React Native (Expo) from a plain-English description into deployable code",
    "MAX — Rork Max outputs native Swift, targeting iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "MAX — Real Swift output balances performance and App Store eligibility — currently the only tool doing this",
    "DEPLOY — Shareable test links and automatic iOS/Android builds remove the need for separate build pipelines",
    "PRICE — Free to start, with paid plans from $25/month — practical for solo devs from prototype to release",
    "FOCUS — Unlike web-first tools like Bolt or Lovable, Rork specializes in mobile apps",
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
