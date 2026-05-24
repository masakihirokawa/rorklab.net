"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15M — Rork が $15M シードラウンド調達、Left Lane Capital リード・a16z 継続出資（4月）",
    "RORKMAX — Rork Max が native Swift アプリ生成、iPhone/iPad/Watch/TV/Vision Pro/iMessage を全網羅（2月〜）",
    "NATIVEAPI — Rork Max が AR/LiDAR・Dynamic Island・Live Activities・HealthKit・HomeKit・Core ML を解禁、RN では不可だった機能に到達（2026）",
    "COMPANION — Rork Companion アプリで Apple Developer 未契約でも実機テスト可、2クリックで App Store 配信（2026）",
    "GROWTH743K — Rork 月間 743,000 訪問・成長率 85%、Paperline 買収で人材取り込みも加速（4月）",
    "AISTUDIOAND — Google AI Studio が native Android 生成に参入、ノーコード AI 競争が一段加速（5/19）",
  ],
  en: [
    "SEED15M — Rork closes $15M seed led by Left Lane Capital, with continued backing from a16z (Apr)",
    "RORKMAX — Rork Max generates native Swift apps across iPhone, iPad, Watch, TV, Vision Pro, and iMessage (Feb onward)",
    "NATIVEAPI — Rork Max unlocks AR/LiDAR, Dynamic Island, Live Activities, HealthKit, HomeKit, and Core ML — capabilities React Native could not reach (2026)",
    "COMPANION — Rork Companion app lets builders test on real iPhones without a paid Apple Developer account, two-click App Store publish supported (2026)",
    "GROWTH743K — Rork hits 743K monthly visits at 85% growth, accelerated by the Paperline acquisition for talent (Apr)",
    "AISTUDIOAND — Google AI Studio enters native Android generation, raising the no-code AI competition another notch (5/19)",
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
