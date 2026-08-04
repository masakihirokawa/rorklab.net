"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "NATIVE — Rork Max では AR / LiDAR スキャン、Metal を使った 3D、Dynamic Island、Siri Intents、HealthKit、NFC、App Clips、Core ML まで届きます",
    "IOS27 — iOS 27 Developer Beta 4 で Siri AI の対象が iPhone 15 Pro / 15 Pro Max・16 シリーズ・17 系へ広がり、応答が初期ベータより明確に速くなりました",
    "DESIGN — iOS・iPadOS・macOS 27 向けの Apple 純正デザインキットが Figma と Sketch 向けに公開されました。新 OS の UI を組む段階で参照できます",
    "CANARY — Android 17（Cinnamon Bun）は従来の Developer Preview を廃し、継続更新される Canary ビルドへ移行しました。検証のタイミング設計が変わります",
    "SPARK — Android 17 の Gemini Spark は、アプリを直接操作して配車の予約や注文といった複合的な作業を自動化します",
    "SCALE — Rork は a16z から $2.8M を調達し、月間訪問は74万件規模まで伸びています",
  ],
  en: [
    "NATIVE — Rork Max reaches AR and LiDAR scanning, Metal-backed 3D, Dynamic Island, Siri Intents, HealthKit, NFC, App Clips, and on-device Core ML",
    "IOS27 — iOS 27 Developer Beta 4 extends Siri AI to iPhone 15 Pro and 15 Pro Max plus the 16 and 17 lines, with noticeably faster responses than the first beta",
    "DESIGN — Apple's own design kits for iOS, iPadOS, and macOS 27 are now available for Figma and Sketch, ready for when you lay out UI for the new OS",
    "CANARY — Android 17, codenamed Cinnamon Bun, retires Developer Previews in favor of continuously updated Canary builds, which changes when you schedule testing",
    "SPARK — Gemini Spark in Android 17 drives apps directly to automate multi-step errands like booking a ride or placing an order",
    "SCALE — Rork raised $2.8M from a16z and now draws roughly 743,000 visits a month",
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
