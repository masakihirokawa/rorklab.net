"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork MaxはSwiftのネイティブアプリを生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageに対応します",
    "PUBLISH — Rork Maxは2クリックでApp Store公開まで進められます。料金は月$200です",
    "RN — 標準のRorkはReact Native（Expo）でiOS/Androidのネイティブアプリを生成。素早く形にするならこちらです",
    "PRICE — Rorkは無料で開始でき、有料プランは月$25からです",
    "FUND — Rorkはa16zから280万ドルを調達。月間訪問は74.3万を超え、成長率は85%とされています",
    "FLOW — 作りたいアプリを平易な言葉で説明すると、ストアに配信できる動くコードが生成され、カメラや通知など端末機能も使えます",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps for iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "PUBLISH — Rork Max ships 2-click App Store publishing and runs $200/month",
    "RN — The standard Rork builds native iOS/Android apps with React Native (Expo) — the quicker path to a working app",
    "PRICE — Rork is free to start, with paid plans from $25/month",
    "FUND — Rork raised $2.8M from a16z; the platform now sees 743k+ monthly visits with 85% growth",
    "FLOW — Describe your app in plain English and Rork generates deployable code that can use the camera, notifications, and more",
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
