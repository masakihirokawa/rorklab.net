"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "BUILD — Rork Max はクラウド上の実機 Mac に Xcode と iOS SDK を載せ、SwiftUI を書き、ビルドし、エラーを読んで直す反復を回します。コードを吐いて終わりではない点が生成物の質に効いています",
    "NATIVE — 生成されるのは React Native ではなく純粋な Swift / SwiftUI です。AR や Metal、ウィジェットなど React Native からは届かない機能に手が届くことが、他ビルダーとの実質的な差になります",
    "PLATFORMS — 対応は iPhone・iPad・Apple Watch・Apple TV・Vision Pro に加えて iMessage まで含みます。ウォッチや拡張から入る設計を試すのに向いています",
    "COMPANION — Rork Companion により、有料の Apple Developer アカウントなしで生成したアプリを実機の iPhone で確認できます。最初の一本を試す段階の障壁が一段下がりました",
    "PRICING — 無料で開始でき有料プランは月額25ドルから、Rork Max は月額200ドルの Max プランです。回収できる本数と規模を先に見積もっておく価値があります",
    "DEADLINE — Google Play は2026年8月31日以降、新規アプリと更新の双方に対象 API レベル36 以上を要求します。残り10日で、生成物の targetSdkVersion は自分で確認が必要です",
  ],
  en: [
    "BUILD — Rork Max runs real Macs in the cloud loaded with Xcode and the iOS SDK, writing SwiftUI, compiling, reading the errors and building again. That loop, not the code generation, is what lifts the output",
    "NATIVE — What comes out is pure Swift and SwiftUI, not React Native. Reaching AR, Metal graphics and widgets that React Native cannot touch is the real gap between this and other builders",
    "PLATFORMS — Coverage spans iPhone, iPad, Apple Watch, Apple TV and Vision Pro, plus iMessage. Worth a look if you want to start from a watch app or an extension rather than a phone screen",
    "COMPANION — The Rork Companion app lets you check a generated build on a real iPhone without a paid Apple Developer account, lowering the bar for trying a first project end to end",
    "PRICING — Free to start, paid plans from $25 a month, and Rork Max on the $200 Max plan. Worth working out up front how many projects it takes to earn that back",
    "DEADLINE — From August 31, 2026, Google Play requires target API level 36 or higher for new apps and updates alike. Ten days out, and the targetSdkVersion of what you generate is yours to verify",
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
