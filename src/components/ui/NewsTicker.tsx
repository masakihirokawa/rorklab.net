"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — Google Play は2026年8月31日以降、新規アプリと既存アプリの更新の双方に対象 API レベル36（Android 16）以上を要求します。残り13日です",
    "EXTENSION — 期限に間に合わない場合は Play Console の期限延長フォームから申請することで11月1日まで配信を継続できます。延長は自動ではなく、申請自体を期限内に行う必要があります",
    "TARGET SDK — Rork などのビルダーが出力する Expo / React Native アプリでも targetSdkVersion は自分で確認が必要です。テンプレートが古い SDK に固定されていると生成しただけでは要件を満たしません",
    "POLICY — スパムと最低限の機能に関するポリシーが改定され、高品質な機能とコンテンツ体験が求められます。薄いアプリを量産する運用は正面から影響を受ける領域です",
    "PRIVACY — 収集するデータの項目・用途・第三者への共有の有無について詳細な説明が求められます。ビルダーが自動で組み込む解析 SDK や広告 ID も申告の対象です",
    "RORK — 従来の Rork が React Native / Expo を出力するのに対し、Rork Max は SwiftUI を生成します。無料枠から始められ、有料プランは月25ドルからです",
  ],
  en: [
    "DEADLINE — From August 31, 2026, Google Play requires target API level 36 (Android 16) or higher for both new apps and updates to existing ones. Thirteen days left",
    "EXTENSION — If you cannot make the date, the deadline extension form in Play Console buys you until November 1. The extension is not automatic, so the request itself has to land before August 31",
    "TARGET SDK — Even for Expo and React Native apps produced by builders like Rork, the targetSdkVersion is yours to verify. A template pinned to an older SDK will not meet the requirement on its own",
    "POLICY — The spam and minimum functionality policy has been tightened around high-quality features and content experience, which puts thin, mass-produced apps squarely in scope",
    "PRIVACY — You are expected to explain in detail what data is collected, how it is used, and whether it is shared, including analytics SDKs and advertising identifiers a builder wires in for you",
    "RORK — Where the original Rork emits React Native and Expo, Rork Max generates SwiftUI. There is a free tier to start with, and paid plans begin at $25 per month",
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
