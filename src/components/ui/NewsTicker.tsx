"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはReact Nativeを介さず純粋なSwiftアプリを生成します。iPhoneからVision Proまで対応し、HealthKitやCore MLなどネイティブ機能にも届きます",
    "TRIAL — Rork Maxの期間限定無料トライアルが案内されています。月200ドルのプランに費用先払いなしで触れる機会ですので、題材を決めて試すのがおすすめです",
    "STYLE — 長期利用レビューでは、雛形はAIに生成させ状態管理とデータ層は自分で書く分担が語られています。機能が増えるほどコード構造の把握が効いてきます",
    "PLAN — 料金選びは「そのプランでリリースまで届くか」で考える視点が示されています。届くなら有料でも安く、届かないなら無料枠でも高くつきます",
    "REPO — 開発者向けリポジトリの更新が続いています。rork-xcodeやrork-deviceなど、提出と実機まわりの足回りが手入れされています",
    "MARKET — Gartnerは2026年末までに新規アプリの75%がローコード・ノーコードで作られると予測しています。2020年の25%未満から大きな伸びです",
  ],
  en: [
    "MAX — Rork Max generates pure Swift apps instead of React Native, covering iPhone through Vision Pro and reaching native features like HealthKit and Core ML",
    "TRIAL — Rork Max has a limited-time free trial, a chance to try the $200/month tier without paying upfront — best used with a concrete project in mind",
    "STYLE — Long-term reviews describe a split that works: let the AI generate scaffolding while you own state management and the data layer as features pile up",
    "PLAN — A useful lens for pricing: does this plan get you to a shipped release? If it does, even paid tiers are cheap; if not, even the free tier is expensive",
    "REPO — Rork's developer tooling repos keep moving, with rork-xcode and rork-device seeing recent updates around submission and device workflows",
    "MARKET — Gartner projects 75% of new apps will be built with low-code or no-code by the end of 2026, up from under 25% in 2020",
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
