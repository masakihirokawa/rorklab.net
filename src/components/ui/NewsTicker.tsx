"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "CLOUD — Rork MaxはクラウドのMacファームでSwiftをコンパイルし、ブラウザへシミュレータを配信します。XcodeもMac本体も要りません",
    "SIM — シミュレータは60fpsで届き、ブラウザ上のタッチ操作がそのまま反映されます。手元に実機がなくても操作感を確かめられます",
    "NATIVE — AR／LiDARスキャン、Metalによる3D描画、Core MLのオンデバイス推論といったネイティブ機能を扱えます",
    "WIDGET — ホーム画面ウィジェット、Dynamic Island、Live Activities、Siri Intents、HealthKit、NFC、App Clipsにも対応します",
    "ARR — Rork Maxは2026年2月の公開から3日でARR150万ドルに達しました。ネイティブ生成への需要の大きさがうかがえます",
    "IOS27 — iOS 27のパブリックベータが7月中旬に公開されました。秋の正式リリースに向け、生成したアプリの動作確認を進める時期です",
  ],
  en: [
    "CLOUD — Rork Max compiles Swift on a cloud Mac fleet and streams the simulator to your browser, so no Xcode or Mac is required",
    "SIM — The streamed simulator runs at 60fps and accepts real touch input in the browser, letting you feel the app without a device",
    "NATIVE — You get native capabilities like AR and LiDAR scanning, Metal-backed 3D rendering, and on-device inference with Core ML",
    "WIDGET — Home Screen widgets, Dynamic Island, Live Activities, Siri Intents, HealthKit, NFC, and App Clips are all in reach",
    "ARR — Rork Max reached $1.5M ARR within three days of its February 2026 launch, a fair signal of demand for native generation",
    "IOS27 — The iOS 27 public beta arrived in mid-July, so now is the time to check generated apps ahead of the autumn release",
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
