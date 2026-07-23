"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Maxは全Appleプラットフォーム向けにネイティブSwiftアプリを生成します。iPhone・iPad・Apple Watch・Apple TV・Vision Proに対応します",
    "PUBLISH — Rork MaxはXcodeなしで2クリックのApp Store公開に対応します。ビルドから申請までの手数を大きく減らせます",
    "FUND — Rorkはa16zから280万ドルを調達しました。月間743,000訪問・成長率85%と、利用が広がっています",
    "NATIVE — Rorkは自然言語の指示からReact Native（Expo）のネイティブアプリを生成します。カメラや通知などデバイス機能も扱えます",
    "OWN — 生成されたコードは完全に自分のものになります。あとから手を入れて拡張していけます",
    "MVP — Rorkは動くMVPを数週間ではなく数時間で用意できます。アイデアの検証を素早く回せます",
  ],
  en: [
    "MAX — Rork Max generates native Swift apps for every Apple platform: iPhone, iPad, Apple Watch, Apple TV, and Vision Pro",
    "PUBLISH — Rork Max supports 2-click App Store publishing without Xcode, cutting the steps from build to submission",
    "FUND — Rork raised $2.8M from a16z, and the platform now draws over 743,000 monthly visits at an 85% growth rate",
    "NATIVE — Rork turns plain-language prompts into native React Native (Expo) apps that can use device features like the camera and notifications",
    "OWN — You keep full ownership of the generated code, free to refine and extend it later",
    "MVP — Rork can stand up a working MVP in hours rather than weeks, so you can validate an idea fast",
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
