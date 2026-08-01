"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAXPRICE — Rork Max は月額 $200 です。無料枠は週5プロンプト程度で、App Store へ出すには別途 Apple Developer Program の年 $99 が要ります",
    "ARR — 2026年2月に登場した Rork Max は、3日で ARR 150万ドルに達したと報告されています。ネイティブアプリ生成への需要の厚さがうかがえます",
    "NATIVEAPI — Rork Max は SwiftUI・ARKit・HealthKit・HomeKit・Core ML・Metal といったネイティブ API に直接届くため、React Native では回り道になる領域が射程に入ります",
    "SHIP — Xcode を開かずに2クリックで App Store へ提出できる導線が用意されています。署名とプロビジョニングでつまずく段階を飛ばせます",
    "COST — 従来のネイティブ iOS 開発は5,000〜50,000ドル超という見積もりが一般的で、月額 $200 はその比較軸の上で評価されています",
    "SDK55 — Expo SDK 55 は React Native 0.83 と React 19.2 を採用し、レガシーアーキテクチャのサポートを打ち切りました。New Architecture が唯一の選択肢になります",
  ],
  en: [
    "MAXPRICE — Rork Max runs $200 per month. The free tier gives you roughly five prompts a week, and shipping to the App Store still requires the $99/year Apple Developer Program",
    "ARR — Rork Max, which launched in February 2026, reportedly reached $1.5M ARR within three days. That says something about the appetite for generated native apps",
    "NATIVEAPI — Rork Max reaches native APIs directly, including SwiftUI, ARKit, HealthKit, HomeKit, Core ML, and Metal, putting territory that is awkward in React Native within reach",
    "SHIP — Two-click App Store submission is built in, with no need to open Xcode. That skips the signing and provisioning step where many first-time shippers get stuck",
    "COST — Traditional native iOS development is commonly quoted at $5,000 to $50,000 and up, and the $200/month figure is being judged against that baseline",
    "SDK55 — Expo SDK 55 ships React Native 0.83 and React 19.2, and drops Legacy Architecture support entirely. The New Architecture is now the only option",
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
