"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — Google Play は2026年8月31日以降、新規アプリと既存アプリの更新の双方に対象 API レベル36（Android 16）以上を要求します。残り12日です",
    "EXTENSION — 期限に間に合わない場合は Play Console の期限延長フォームから申請することで11月1日まで配信を継続できます。延長は自動ではなく、申請自体を期限内に行う必要があります",
    "TARGET SDK — Rork が出力する Expo / React Native アプリでも targetSdkVersion は自分で確認が必要です。テンプレートが古い SDK に固定されていると、生成しただけでは要件を満たしません",
    "RORK MAX — 従来の Rork が React Native / Expo を出力するのに対し、Rork Max はネイティブ Swift を生成します。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage に対応します",
    "FUNDING — Left Lane Capital 主導の1,500万ドルのシードラウンドが4月9日に発表されました。あわせてアプリビルダーの Paperline を買収し、エンジニアリング人材の獲得を進めています",
    "iOS — iOS 27 は開発者向けベータ6が8月17日に配布され、秋の正式リリースが近づいています。ネイティブ Swift 出力を使うなら、新 OS への対応時期が配布計画に直接効いてきます",
  ],
  en: [
    "DEADLINE — From August 31, 2026, Google Play requires target API level 36 (Android 16) or higher for both new apps and updates to existing ones. Twelve days left",
    "EXTENSION — If you cannot make the date, the deadline extension form in Play Console buys you until November 1. The extension is not automatic, so the request itself has to land before August 31",
    "TARGET SDK — Even for the Expo and React Native apps Rork produces, the targetSdkVersion is yours to verify. A template pinned to an older SDK will not meet the requirement on its own",
    "RORK MAX — Where the original Rork emits React Native and Expo, Rork Max generates native Swift, covering iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "FUNDING — A $15M seed round led by Left Lane Capital was announced on April 9, alongside the acquisition of app builder Paperline to bring in engineering talent",
    "iOS — Developer beta 6 of iOS 27 arrived on August 17 with the autumn release drawing closer. If you ship native Swift output, the new OS timeline feeds straight into your release plan",
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
