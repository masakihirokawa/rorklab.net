"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "APPLE — Apple のイベントは9月9日、同日に iOS 27 の RC が公開されます。正式リリースは9月14日、予約は9月12日、店頭は9月18日の見込みです",
    "TESTING — 実質的な検証期間は RC 公開から正式リリースまでの5日間です。React Native / Expo 製アプリは、この間に Xcode 27 と iOS 27 SDK で一通り動かしておきたいところです",
    "SIRI — iOS 27 は Siri が全面刷新されます。Siri Intents や音声まわりを使っているアプリは、優先して確認する対象になります",
    "PLAY — Google Play の target API level 36 要件は8月31日に発効済みです。間に合わなかった場合も、Play Console から11月1日までの延長申請がまだ出せます",
    "EXPO — expo@57.0.17 が React Native 0.86.3 へ更新し、react-native-worklets や reanimated を使うアプリで出ていた Hermes V1 のメモリ退行が解消されました",
    "RORK — 同じ Rork でも成果物が違います。本家 Rork は React Native（Expo）を生成し、Rork Max は Swift を生成してクラウドの Mac ファームでコンパイルします",
  ],
  en: [
    "APPLE — Apple's event is September 9, with the iOS 27 release candidate landing the same day. General release is September 14, preorders September 12, and retail September 18",
    "TESTING — That leaves five working days between the RC and the public release. For React Native and Expo apps, it is the last clean window to run everything against Xcode 27 and the iOS 27 SDK",
    "SIRI — iOS 27 rebuilds Siri from the ground up, which puts anything using Siri Intents or voice input at the top of the list to verify",
    "PLAY — Google Play's target API level 36 requirement took effect on August 31. If you did not make it, an extension request through November 1 is still available in Play Console",
    "EXPO — expo@57.0.17 moves React Native to 0.86.3 and clears the Hermes V1 memory regression that hit apps importing react-native-worklets or reanimated",
    "RORK — The two Rork products build different things: the original generates React Native via Expo, while Rork Max generates Swift and compiles it on a cloud Mac fleet",
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
