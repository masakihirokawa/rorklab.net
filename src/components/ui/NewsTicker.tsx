"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Max はネイティブ Swift を書き出し、クラウド上の Mac でビルドします。シミュレータの画面はブラウザにそのまま流れてきます",
    "ENGINE — Rork Max の生成は Claude Code と Opus 4.6 で動いていると説明されています",
    "SHIP — App Store への公開は2クリックで、Xcode も手元の Mac も要らない構成になっています",
    "NATIVE — ARKit や LiDAR、Metal と SceneKit、ウィジェット、Dynamic Island、Live Activities、Siri Intents、HealthKit、HomeKit、NFC、App Clips まで届きます",
    "PRICE — Max プランは月200ドルです。無料枠は週5プロンプト程度と案内されています",
    "TRACTION — 2026年2月の公開から3日で ARR 150万ドルに達したと報じられ、月間アクセスは74万を超えています",
  ],
  en: [
    "MAX — Rork Max emits native Swift and compiles it on a cloud Mac fleet, streaming the simulator straight into your browser",
    "ENGINE — Rork Max is described as running on Claude Code with Opus 4.6 behind the generation step",
    "SHIP — Publishing to the App Store takes two clicks, with no Xcode and no Mac of your own required",
    "NATIVE — It reaches ARKit and LiDAR, Metal and SceneKit, widgets, Dynamic Island, Live Activities, Siri Intents, HealthKit, HomeKit, NFC, and App Clips",
    "PRICE — The Max plan runs $200 per month, with a free tier documented at roughly five prompts per week",
    "TRACTION — Rork Max is reported to have hit $1.5M ARR within three days of its February 2026 launch, and traffic sits above 743,000 monthly visits",
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
