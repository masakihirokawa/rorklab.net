"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PUBLISH — Rork Maxはコード署名やプロビジョニングを肩代わりし、2クリックでApp Storeへ申請できます",
    "SIMULATOR — ブラウザ内のストリーミングシミュレータで実機に近い操作感を試せ、QRでTestFlightなしに実機インストールできます",
    "MAX — Rork MaxはネイティブSwiftアプリを生成し、Claude Code・Claude Opus 4.6で駆動します",
    "NATIVE — Rork MaxはAR/LiDAR・Metalの3D・ウィジェット・Live Activities・HealthKit・Core MLなどXcode相当の領域まで到達します",
    "FUNDING — Rorkが$15Mを調達し、App Store起業家世代の後押しを掲げています",
    "PRICE — 料金は無料から用意され、有料プランは月$25から、Rork Maxは月$200です",
  ],
  en: [
    "PUBLISH — Rork Max handles code signing and provisioning so you can submit to the App Store in two clicks",
    "SIMULATOR — A browser streaming simulator feels close to real hardware, and a QR code installs to your device without TestFlight",
    "MAX — Rork Max generates native Swift apps, powered by Claude Code and Claude Opus 4.6",
    "NATIVE — Rork Max reaches Xcode-class territory: AR/LiDAR, Metal 3D, widgets, Live Activities, HealthKit, and Core ML",
    "FUNDING — Rork raised $15M to power the next generation of App Store entrepreneurs",
    "PRICE — Plans start free, paid tiers from $25/month, and Rork Max at $200/month",
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
