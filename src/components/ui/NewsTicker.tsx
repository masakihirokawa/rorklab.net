"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — Google Play の Android 16（API レベル36）必須化まで残り2日です。8月31日以降、新規アプリも既存アプリの更新も対象となります",
    "EXTENSION — 11月1日までの配信継続を求める延長申請は、期限を過ぎてからでは出せません。間に合わない見込みなら、今日明日が最後の判断点です",
    "CHECK — 確認すべきは targetSdkVersion の値そのものより、その値でビルドが通って提出まで到達するかどうかです。一度通しで試しておくほうが確実です",
    "EXPO — expo@57.0.17 が8月27日に公開され、React Native を 0.86.3 へ更新しました。Hermes V1 のメモリ退行と起動時間の退行が解消されています",
    "PREBUILD — expo prebuild は native の android・ios ディレクトリを既定でクリアして再生成します。手を入れた native 変更は config plugin へ寄せてから当ててください",
    "RORK MAX — ネイティブ Swift を生成する Rork Max は、AR/LiDAR・Dynamic Island・Live Activities・HealthKit・Core ML など React Native から触れにくい層に届きます",
  ],
  en: [
    "DEADLINE — Two days remain until Google Play requires Android 16 (API level 36). From August 31 it applies to new apps and to updates of existing ones alike",
    "EXTENSION — The extension that keeps you shipping to all users until November 1 cannot be filed after the deadline passes, so the decision point is effectively today",
    "CHECK — What matters is not the targetSdkVersion number itself but whether a build at that level still compiles and reaches submission. Run it end to end once",
    "EXPO — expo@57.0.17 shipped on August 27, moving React Native to 0.86.3 and clearing both the Hermes V1 memory regression and the startup time regression",
    "PREBUILD — expo prebuild clears and regenerates the native android and ios directories by default, so move hand-edited native changes into a config plugin first",
    "RORK MAX — Rork Max generates native Swift, reaching AR and LiDAR, Dynamic Island, Live Activities, HealthKit, and Core ML — layers React Native struggles to touch",
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
