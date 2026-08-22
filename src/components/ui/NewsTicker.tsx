"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — 8月31日から、Google Play の新規アプリとアプリ更新はすべて Android 16（API レベル36）を対象にする必要があります。残り8日です",
    "EXTENSION — 条件を満たす開発者は Play Console のフォームから11月1日までの延長を申請できます。申請そのものは締切前に済ませておく必要があります",
    "EXISTING — 更新を出さない既存アプリも、新しい Android を載せた端末で新規ユーザーに見つけてもらうには最低 API レベル35 が必要です。静かに新規流入だけが止まる構造です",
    "EXPO — Expo SDK 57 は React Native 0.85 から 0.86 への更新で、破壊的変更なしの1コマンド移行を狙った小さなリリースです。React は SDK 56 と同じ 19.2 のままです",
    "MEMORY — expo@57.0.9 が React Native 0.86.2 へ更新し、reanimated や worklets を読み込むアプリでメモリが大きく増える Hermes V1 の回帰を解消しました",
    "PREBUILD — expo prebuild が既定でネイティブディレクトリを破棄して再生成するようになりました。API 36 対応で手を入れた設定と衝突しやすい部分です",
  ],
  en: [
    "DEADLINE — From August 31, every new app and app update on Google Play must target Android 16 (API level 36). Eight days to go",
    "EXTENSION — Eligible developers can request an extension through November 1 via a form in Play Console, but the request itself has to be filed before the deadline",
    "EXISTING — Even apps you leave alone need at least API level 35 to stay discoverable to new users on recent Android devices. Standing still quietly cuts off new installs",
    "EXPO — Expo SDK 57 moves React Native from 0.85 to 0.86 as a small, one-command upgrade with no breaking changes. React stays at 19.2, same as SDK 56",
    "MEMORY — expo@57.0.9 bumps React Native to 0.86.2 and clears the Hermes V1 memory regression that inflated usage in apps importing reanimated or worklets",
    "PREBUILD — expo prebuild now clears and regenerates the native directories by default, which collides easily with hand-edited config from your API 36 migration",
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
