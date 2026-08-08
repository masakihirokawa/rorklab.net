"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "COMPARE — Expo が8月5日に、実際に Expo アプリを作らせる形で AI モデル3種を比較した記事を公開しました。コードと UI の品質では Fable 5 が最良という結果です",
    "SDK — Expo SDK 57 は React Native 0.86 への追随を主眼とした小規模なリリースです。アップグレードを一大プロジェクトにしない方針が示されています",
    "PREBUILD — expo prebuild が既定でネイティブの android / ios ディレクトリをクリアして再生成するようになりました。手を入れているプロジェクトは影響を受けます",
    "OTA — Hermes のバイトコード差分により、OTA 更新で JS バンドル全体ではなく差分だけを配信できます。規模が出るほど帯域と費用に効きます",
    "SIMULATOR — Rork はクラウド上の iOS シミュレータをブラウザへストリーミングします。Xcode も Mac 実機もなしに Apple 環境での確認ができます",
    "HARDWARE — Rork は HealthKit・ARKit / LiDAR・NFC・Dynamic Island・Metal 3D まで届き、ノーコードの通常の範囲を超えた機能に対応します",
  ],
  en: [
    "COMPARE — On August 5, Expo published a head-to-head of three AI models actually building Expo apps. Fable 5 came out ahead on code and UI quality",
    "SDK — Expo SDK 57 is a small, focused release centered on moving apps to React Native 0.86 without turning the upgrade into a project of its own",
    "PREBUILD — expo prebuild now clears and regenerates the native android and ios directories by default, which matters if you have hand-edited native code",
    "OTA — Hermes bytecode diffing means an OTA update ships only the delta rather than the whole JS bundle, saving bandwidth and cost at scale",
    "SIMULATOR — Rork streams a cloud iOS simulator to your browser, so you can test in a real Apple environment without Xcode or Mac hardware",
    "HARDWARE — Rork reaches HealthKit, ARKit and LiDAR, NFC, Dynamic Island, and Metal 3D, well past where no-code tooling usually stops",
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
