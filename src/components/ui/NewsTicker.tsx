"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Max は Apple プラットフォーム横断の SwiftUI 出力、iPhone / iPad / Watch / TV / Vision Pro / iMessage を 1 プロジェクトで対応（5/27）",
    "SIM — ブラウザ内の iOS Simulator が Mac クラウド上の本物の Simulator を低遅延ストリーミング、60fps を維持（5/27）",
    "DEPLOY — App Store / TestFlight への直接サブミットに対応、証明書と Provisioning Profile は Rork が自動管理（5/27）",
    "COMPANION — Rork Companion で $99/年 の Apple Developer Program なしでも実機テスト可能（5月）",
    "SEED — Rork が Left Lane Capital リードで $15M シードラウンド調達（4月）、月間訪問は 743,000、成長率 85%（5月）",
    "AISTUDIO — Google AI Studio が Jetpack Compose + Kotlin の Android 生成を開始、iOS 側は Rork Max の独自ポジション（5/19）",
  ],
  en: [
    "MAX — Rork Max produces SwiftUI across Apple platforms, covering iPhone, iPad, Watch, TV, Vision Pro, and iMessage from one project (May 27)",
    "SIM — The in-browser iOS Simulator streams a real Simulator on a cloud Mac with low latency, holding 60fps (May 27)",
    "DEPLOY — Direct submission to App Store and TestFlight is built in; Rork manages certificates and provisioning profiles automatically (May 27)",
    "COMPANION — The Rork Companion app enables real-device testing without the $99/year Apple Developer Program (May)",
    "SEED — Rork raised a $15M seed led by Left Lane Capital (April); the platform reports 743K monthly visits and 85% growth (May)",
    "AISTUDIO — Google AI Studio begins generating Android apps in Jetpack Compose + Kotlin; on iOS, Rork Max holds its distinctive position (May 19)",
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
