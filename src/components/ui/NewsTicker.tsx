"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — Google Play の Android 16（API レベル36）必須化まで残り5日です。8月31日以降、新規アプリと更新はすべて対象となります",
    "EXTENSION — 条件を満たす場合は Play Console のフォームから11月1日までの延長を申請できます。申請そのものを締切前に済ませておく必要があります",
    "EXPO — Expo SDK 57 が 57.0.9 で React Native 0.86.2 に対応しました。SDK 57 は React Native を 0.85 から 0.86 へ引き上げるリリースです",
    "HERMES — SDK 56 にあった Hermes V1 のメモリ退行が修正されました。react-native-worklets や react-native-reanimated を使うアプリで効きます",
    "IOS — iOS 27 の7回目の開発者ベータが8月24日に配布されました。正式リリースは9月で、Android から届いた個別のメッセージへ返信できるようになります",
    "RORK — Rork Max はネイティブ Swift を生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage を対象にクラウド上の Mac でビルドされます",
  ],
  en: [
    "DEADLINE — Five days remain before Google Play requires Android 16 (API level 36). From August 31 it applies to new apps and updates alike",
    "EXTENSION — If you qualify, you can request an extension through November 1 via a Play Console form, but the request itself has to be filed before the deadline",
    "EXPO — Expo SDK 57 reached 57.0.9 with React Native 0.86.2. SDK 57 is primarily the jump from React Native 0.85 to 0.86",
    "HERMES — The Hermes V1 memory regression introduced in SDK 56 has been fixed, which matters most for apps pulling in react-native-worklets or react-native-reanimated",
    "IOS — The seventh iOS 27 developer beta shipped on August 24. The public release lands in September and finally lets you reply to an individual message from an Android sender",
    "RORK — Rork Max generates native Swift and compiles on a cloud Mac fleet, targeting iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
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
