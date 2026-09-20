"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "SDK58 — Expo SDK 58 のベータは3〜4週間と案内されています。安定版は React Native 0.88 が出たあと、とだけ書かれており、日付は公表されていません",
    "0.88RC1 — その React Native 0.88 は9月16日に rc.1 まで進みました。SDK 58 は 0.86 から 0.88 へ一気に上がるため、0.87 の片づけも同時に踏みます",
    "9/30 — Google Play のデベロッパー確認と Play Console 登録が未了のアプリは、9月30日以降の削除対象です。残り9日で、個人名義で出している方も対象になります",
    "KEYWINDOW — 依存の自動更新でクライアントパッケージだけ先に上がると、CI は通るのに iOS の本番ビルドだけが落ちる、という報告が出ています",
    "NEW — Expo Go がプレビューを開かなくなった日に、最初に見るところ",
    "RNREPO — React Native のリポジトリが facebook/react-native から react/react-native へ移りました。リンクやスクリプトの参照先を確かめておきたいところです",
  ],
  en: [
    "SDK58 — The Expo SDK 58 beta is described as three to four weeks. Stable lands after React Native 0.88 ships, and no date has been published",
    "0.88RC1 — React Native 0.88 reached rc.1 on September 16. SDK 58 jumps from 0.86 straight to 0.88, so you take the 0.87 cleanup at the same time",
    "9/30 — Apps without completed Google Play developer verification and Play Console registration are subject to removal from September 30, nine days away. Solo publishers are included",
    "KEYWINDOW — When automated dependency updates bump only the client packages, CI stays green and the production iOS build is the thing that fails",
    "NEW — Expo Go stopped opening your preview. Here is the first thing to check",
    "RNREPO — The React Native repository moved from facebook/react-native to react/react-native. Worth checking any links or scripts that point at the old path",
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
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
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
