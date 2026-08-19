"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MEMORY — Expo SDK 57.0.9 が8月13日に React Native 0.86.2 へ更新され、SDK 56 で入った Hermes V1 のメモリ回帰が解消されました。reanimated や worklets を読み込むアプリが対象です",
    "PREBUILD — expo prebuild が既定でネイティブディレクトリを破棄して再生成するようになりました。ios や android に手を入れている場合、更新前に差分の棚卸しが必要です",
    "UPGRADE — SDK 57 は React Native 0.86 を含み React は 19.2 のままです。破壊的変更のない1コマンド更新として設計されており、大きな更新の合間に挟む位置づけです",
    "DEADLINE — Google Play は2026年8月31日以降、新規アプリと既存アプリの更新の双方に対象 API レベル36 以上を要求します。残り11日です",
    "TARGET SDK — Rork が出力する Expo / React Native アプリでも targetSdkVersion は自分で確認が必要です。テンプレートが古い SDK に固定されていると生成しただけでは要件を満たしません",
    "TESTFLIGHT — App Store Connect の TestFlight が Xcode 27 beta 5 でビルドしたアプリの内部・外部テストに対応しました。必須 SDK は現時点で iOS 26 のままです",
  ],
  en: [
    "MEMORY — Expo SDK 57.0.9 shipped React Native 0.86.2 on August 13, clearing the Hermes V1 memory regression from SDK 56 that hit apps importing reanimated or worklets",
    "PREBUILD — expo prebuild now clears and regenerates native directories by default. If you have hand-edited ios or android, take stock of those changes before upgrading",
    "UPGRADE — SDK 57 carries React Native 0.86 with React unchanged at 19.2, designed as a one-command upgrade with no breaking changes between the larger SDK releases",
    "DEADLINE — From August 31, 2026, Google Play requires target API level 36 or higher for both new apps and updates to existing ones. Eleven days left",
    "TARGET SDK — Even for the Expo and React Native apps Rork produces, the targetSdkVersion is yours to verify. A template pinned to an older SDK will not meet the requirement",
    "TESTFLIGHT — App Store Connect now accepts TestFlight builds made with Xcode 27 beta 5 for internal and external testing. The mandatory SDK floor stays at iOS 26 for now",
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
