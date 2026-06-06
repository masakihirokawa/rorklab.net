"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "WWDC — WWDC 2026が6/8開幕、iOS 27でDynamic Island・Live Activities等のネイティブ機能が再注目、Rork Maxの守備範囲と直結",
    "RORK-MAX — Rork MaxはReact NativeでなくネイティブSwiftを生成、クラウドMac fleetでXcodeもMacも不要、ブラウザでビルド→QRで実機→App Store申請まで",
    "NATIVE-CAPS — Rork Maxの対応はAR/LiDAR・Metal 3D・ウィジェット・Dynamic Island・Live Activities・Siri Intents・HealthKit・NFC・Core MLなど",
    "NOCODE — Gartnerは2026年末までに新規アプリの75%がローコード/ノーコードで作られると予測（2020年は25%未満）",
    "BASE44 — Base44が2026年2月にApp Store/Google Play直接申請に対応、ReplitはAgent 4、FlutterFlowはAI生成とノーコード勢が加速",
    "PRICING — Rorkは無料プランあり・有料は月額$25〜、Rork Maxは月額$200",
  ],
  en: [
    "WWDC — WWDC 2026 opens Jun 8; iOS 27 puts native features like Dynamic Island and Live Activities back in focus, right in Rork Max's lane",
    "RORK-MAX — Rork Max generates native Swift (not React Native) on a cloud Mac fleet, so you build in the browser and ship to the App Store without Xcode or a Mac",
    "NATIVE-CAPS — It targets native Apple capabilities: AR/LiDAR, Metal 3D, widgets, Dynamic Island, Live Activities, Siri Intents, HealthKit, NFC, and Core ML",
    "NOCODE — Gartner expects 75% of new apps to be built with low-code/no-code by the end of 2026, up from under 25% in 2020",
    "BASE44 — Base44 added direct App Store and Google Play submission in Feb 2026, Replit shipped Agent 4, and FlutterFlow added AI generation",
    "PRICING — Rork has a free plan with paid tiers from $25/mo, while Rork Max is $200/mo",
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
