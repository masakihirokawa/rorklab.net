"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — 本日8月31日から、Google Play への新規アプリ提出と既存アプリの更新は Android 16（API レベル36）以上をターゲットにする必要があります",
    "SCOPE — 既存アプリは削除されません。ただし要件を下回ったままだと、新しい Android バージョンのユーザーには表示されなくなります。消えないが届かなくなる、という形の影響です",
    "EXTENSION — 間に合わない場合、11月1日までの延長を申請できます。申請という選択肢があること自体を知らずに当日を迎える例が毎年出ています",
    "MIGRATION — Rork の生成物は React Native と Expo が土台です。targetSdkVersion を上げる作業は、Expo SDK とネイティブ依存の更新を必ず伴います",
    "TESTING — 本当に時間を取られるのはビルドが通った後です。バックグラウンド実行制限、権限モデル、フォアグラウンドサービスの型指定が一斉に効きます",
    "ORDER — 現実的な順序は、延長申請の可否を確認し、Expo SDK のアップグレード計画を立て、最後に最小構成で実機の回帰テストを行うことです。当日に全部やると原因が追えません",
  ],
  en: [
    "DEADLINE — From today, August 31, new submissions to Google Play and updates to existing apps must target Android 16, API level 36 or higher",
    "SCOPE — Existing apps are not removed. But anything below the requirement stops appearing for users on newer Android versions, so it does not vanish, it just stops reaching people",
    "EXTENSION — If you cannot make it, an extension can be requested through November 1. Every year some developers reach the deadline without knowing that option existed",
    "MIGRATION — What Rork generates sits on React Native and Expo, so raising targetSdkVersion always drags the Expo SDK and its native dependencies along with it",
    "TESTING — The time really goes after the build passes. Background execution limits, the permission model, and foreground service type declarations all take effect at once",
    "ORDER — A workable sequence: check whether an extension applies, plan the Expo SDK upgrade, then run device regression tests on a minimal build. Doing all three at once hides the cause",
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
