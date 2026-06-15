"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが$15Mを調達。「次世代のApp Store起業家を支える」ラウンドで、1年足らずでWebトラフィック上モバイルアプリ構築AIとして世界最大規模に成長しました",
    "MAX — Rork MaxはClaude CodeとOpus 4.6を動力に、React NativeではなくネイティブSwiftアプリを生成。Appleエコシステム全体をネイティブ性能で狙います",
    "APPLE — iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応。Live Activities・Dynamic Island・HealthKit・HomeKit・NFC・Core MLなども解放されます",
    "AR — Rork MaxはAR/LiDARスキャンやMetalによる3Dゲームなど、React Nativeでは届きにくいネイティブ領域までカバーします",
    "TRACTION — Rork Maxの発表はXで800万回超のインプレッションを集め、2週間で年間収益が倍増したと報じられています",
    "SWIFT — AIがどこまで実用水準のネイティブSwiftを出力できるか、小さなアプリで実際に検証する価値が高まっています",
  ],
  en: [
    "FUNDING — Rork raised $15M to power the next generation of App Store entrepreneurs, having grown in under a year into the largest AI mobile-app builder by web traffic",
    "MAX — Rork Max, powered by Claude Code and Opus 4.6, generates native Swift apps instead of React Native, targeting the full Apple ecosystem at native performance",
    "APPLE — It supports iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage, unlocking Live Activities, Dynamic Island, HealthKit, HomeKit, NFC, and Core ML",
    "AR — Rork Max reaches native territory React Native struggles with, including AR/LiDAR scanning and 3D games rendered with Metal",
    "TRACTION — The Rork Max launch drew over 8M impressions on X and reportedly doubled annual revenue within two weeks",
    "SWIFT — How far AI can produce production-grade native Swift is worth testing firsthand on a small app",
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
