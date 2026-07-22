"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはApple全プラットフォーム向けにネイティブSwiftを出力します。ゲーム・ウィジェット・Live Activitiesといった、React Nativeからは扱いづらかった領域がここで開きます",
    "FUND — a16zから280万ドルを調達しました。月間74万3,000訪問・成長率85%という数字が出ており、モバイル特化という賭けが機能していることを示しています",
    "NICHE — BoltやLovableがWeb中心なのに対し、Rorkはモバイル専業です。Macを持たずにiOS公開まで到達できる点は、個人開発では実務的な意味が大きい部分です",
    "COST — 無料で始められ、有料プランは月25ドルからです。UIの細かい反復調整とクレジット消費が実運用でのボトルネックとして挙がっています",
    "EAS — Expo SDK 55のEAS UpdateがHermesバイトコードの差分配信に対応し、更新サイズが75%小さくなりました。バックグラウンドでの適用がほぼ即座になっています",
    "OTA — EAS Updateには段階的ロールアウト、republishによるロールバック、OTAで足りるか本体ビルドが必要かを自動判定するfingerprintツールが揃っています",
  ],
  en: [
    "MAX — Rork Max generates native Swift for every Apple platform, opening up games, widgets, and Live Activities — territory React Native never handled comfortably",
    "FUND — Rork raised $2.8M from a16z. With 743,000 monthly visits and 85% growth, the bet on going mobile-only appears to be working",
    "NICHE — Where Bolt and Lovable center on the web, Rork is mobile-exclusive. Reaching an iOS release without owning a Mac matters a great deal for solo developers",
    "COST — It's free to start, with paid plans from $25/month. UI iteration and credit consumption remain the practical bottlenecks in day-to-day use",
    "EAS — EAS Update in Expo SDK 55 ships Hermes bytecode diffs, cutting update size by 75% and making background application nearly instant",
    "OTA — EAS Update also offers percentage rollouts, republish for rolling back a bad update, and a fingerprint tool that detects whether a change needs OTA or a full build",
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
