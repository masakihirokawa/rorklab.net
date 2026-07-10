"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Maxはコード署名やプロビジョニングを肩代わりし、2クリックでApp Storeへ申請できます。公開にローカルMacは不要です",
    "SIMULATOR — ブラウザ内のストリーミングシミュレータで操作感を試せ、QRを読めばTestFlightなしで実機に直接インストールできます",
    "NATIVE — SwiftUI・ARKit・HealthKit・HomeKit・Core ML・Metalなど、React Nativeでは届かない領域までカバーします",
    "SEED — Rorkは2026年4月にLeft Lane Capital主導で$15Mのシードを調達し、Peak XVやa16z Speedrunが参加しました",
    "GROWTH — 月間743,000訪問・成長率85%と報じられ、AIモバイルアプリ構築の裾野が広がっています",
    "NOCODE — Gartnerは2026年末までに新規アプリの75%がローコード／ノーコードで作られると予測しています",
  ],
  en: [
    "MAX — Rork Max handles code signing and provisioning so you can submit to the App Store in two clicks, with no local Mac required",
    "SIMULATOR — Try your app in an in-browser streaming simulator, then scan a QR code to install straight to your device without TestFlight",
    "NATIVE — Coverage reaches SwiftUI, ARKit, HealthKit, HomeKit, Core ML, and Metal, going where React Native cannot",
    "SEED — Rork raised a $15M seed led by Left Lane Capital in April 2026, joined by Peak XV and a16z Speedrun",
    "GROWTH — Reported at 743,000 monthly visits with 85% growth, widening access to AI-built mobile apps",
    "NOCODE — Gartner expects 75% of new applications to be built with low-code or no-code tools by the end of 2026",
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
