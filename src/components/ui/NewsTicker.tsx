"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — Google Play の Android 16（API レベル36）必須化まで残り4日です。8月31日以降、新規アプリも既存アプリの更新も対象となります",
    "RULES — 提出ルールと可視性ルールは別物です。更新を止めているアプリも、API 35 未満のままだと新しい端末で新規ユーザーに表示されなくなります",
    "EXTENSION — 延長を申請すれば11月1日まで全ユーザーへの配信を続けられます。フォームは Play Console から出るため、締切前に済ませておく必要があります",
    "EXPO — Expo SDK 57 は React Native を 0.85 から 0.86 へ引き上げ、React は 19.2 で据え置きです。0.86 は破壊的変更がない想定とされています",
    "HERMES — 57.0.9 が React Native 0.86.2 に更新し、SDK 56 の Hermes V1 メモリ退行を解消しました。reanimated や worklets を使うアプリで効きます",
    "PREBUILD — expo prebuild が native の android・ios ディレクトリを既定でクリアして再生成します。手を入れた native 変更は、事前に洗い出さないと静かに失われます",
  ],
  en: [
    "DEADLINE — Four days remain until Google Play requires Android 16 (API level 36). From August 31 it applies to new apps and to updates of existing ones alike",
    "RULES — The submission rule and the visibility rule are separate. An app you have stopped updating still disappears for new users on newer devices if it targets below API 35",
    "EXTENSION — An extension keeps you shipping to all users until November 1, but the form lives in Play Console and has to be filed before the deadline passes",
    "EXPO — Expo SDK 57 moves React Native from 0.85 to 0.86 while React stays at 19.2, and 0.86 is intended to land without breaking changes",
    "HERMES — 57.0.9 updates React Native to 0.86.2 and clears the Hermes V1 memory regression from SDK 56, which shows up in apps importing reanimated or worklets",
    "PREBUILD — expo prebuild now clears and regenerates the native android and ios directories by default, so hand-edited native changes vanish unless you audit for them first",
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
