"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Maxが全Appleプラットフォーム向けのネイティブSwiftを生成。iPhoneからVision Proまで対応します",
    "PUBLISH — Xcodeを使わず2クリックでApp Storeへ公開でき、Macのハードウェアを介さずiOS配布まで届きます",
    "NATIVE — 通常のRorkはReact Native（Expo）でネイティブiOS/Androidを生成し、モバイルに特化しています",
    "PROMPT — プレーンな英語でアプリの構想を書くと、ストアへ配布できる動くコードが生成されます",
    "FUND — Rorkはa16zから$2.8Mを調達し、月間743,000訪問・成長率85%と報じられています",
    "PRICE — 無料で開始でき、有料プランは月$25から。ただしクレジット消費が多いとの利用者の声もあります",
  ],
  en: [
    "MAX — Rork Max generates native Swift for every Apple platform, from iPhone to Vision Pro",
    "PUBLISH — Publish to the App Store in two clicks without Xcode, reaching iOS distribution without Mac hardware",
    "NATIVE — Standard Rork builds native iOS/Android via React Native (Expo), focused exclusively on mobile",
    "PROMPT — Describe your app idea in plain English and Rork generates deployable, store-ready code",
    "FUND — Rork raised $2.8M from a16z and reportedly sees 743,000 monthly visits at 85% growth",
    "PRICE — Free to start with paid plans from $25/month, though some users note heavy credit consumption",
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
