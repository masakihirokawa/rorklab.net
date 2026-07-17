"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "TOOLING — Rorkの開発者向けリポジトリが動き続けています。rork-xcodeが7月16日、rork-deviceが7月15日、rork-plistが7月13日に更新されました",
    "OPUS46 — RorkでClaude Opus 4.6が稼働しています。Rork MaxはClaude Codeを土台にアプリを組み立てる設計です",
    "SIM — ブラウザ上で動くクラウドのiOSシミュレータを備え、実機へのインストールは1クリック、App Storeへの提出は2クリックと案内されています",
    "MAX — Rork MaxはReact Nativeではなく純粋なSwiftを出力します。iPhone・iPad・Apple Watch・Apple TV・Vision Pro、そしてiMessageまでが射程です",
    "NATIVE — HealthKit、ARKitとLiDAR、NFC、Dynamic Island、Live Activities、Metalによる3D、Core MLのオンデバイス推論まで扱えます",
    "SEED — RorkはLeft Lane Capitalが主導する1,500万ドルのシードラウンドを実施し、Peak XVとa16z Speedrunが参加しました",
  ],
  en: [
    "TOOLING — Rork's developer repos keep moving: rork-xcode was updated on July 16, rork-device on July 15, and rork-plist on July 13",
    "OPUS46 — Claude Opus 4.6 is live in Rork, and Rork Max is built to assemble apps on top of Claude Code",
    "SIM — A cloud iOS simulator runs in the browser, with one click to install on a device and two clicks to publish to the App Store",
    "MAX — Rork Max emits pure Swift rather than React Native, reaching iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and even iMessage",
    "NATIVE — That opens up HealthKit, ARKit and LiDAR, NFC, Dynamic Island, Live Activities, 3D through Metal, and on-device inference with Core ML",
    "SEED — Rork raised a $15M seed led by Left Lane Capital, with Peak XV and a16z Speedrun joining the round",
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
