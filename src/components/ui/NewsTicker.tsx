"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PREBUILD — expo prebuild が既定でネイティブの android / ios を消してから再生成します。ネイティブに手を入れているプロジェクトは前提の組み直しが要ります",
    "SDK — Expo SDK 57 は React Native を 0.85 から 0.86 へ上げることが主目的です。React は SDK 56 と同じ 19.2 のままです",
    "RHYTHM — 年3回の大型リリースから、軽量で速いリズムへ移す試験という位置づけです。次の SDK は9月から10月ごろが見込まれています",
    "LAUNCHER — expo-dev-client の iOS ランチャーに、直近のプロジェクトを自動で開くかランチャーを表示するかを選べる設定が加わりました",
    "COMPANION — Rork Companion を使えば、有料の Apple Developer アカウントなしで、生成したアプリを実機の iPhone で試せます",
    "NATIVE — Rork Max はネイティブ Swift を生成し Xcode でコンパイルします。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage が対象です",
  ],
  en: [
    "PREBUILD — expo prebuild now wipes and regenerates the native android and ios directories by default, so hand-edited native code needs a different home",
    "SDK — Expo SDK 57 exists mainly to move apps from React Native 0.85 to 0.86. React stays at 19.2, unchanged from SDK 56",
    "RHYTHM — It is a trial run for a lighter, faster release cadence after years of three big SDKs a year. The next one is expected around September or October",
    "LAUNCHER — The iOS launcher in expo-dev-client gained a setting to either auto-open your most recent project or show the launcher",
    "COMPANION — With Rork Companion you can run a generated app on a real iPhone without paying for an Apple Developer account",
    "NATIVE — Rork Max generates native Swift and compiles it with Xcode, targeting iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
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
