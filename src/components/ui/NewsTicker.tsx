"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FLOOD — App Store には2026年上半期だけで約56万本の新規アプリが並びました。2025年の年間総数に迫る勢いで、年内100万件超のペースです",
    "REVIEW — 提出の急増で審査が長引いています。数週間待たされたという開発者の声も出ており、公開スケジュールには余裕を見ておきたいところです",
    "RULE — Apple はガイドライン 2.5.2 を根拠に Replit と Vibecode の更新を止めた経緯があります。生成物を外部ブラウザで開く設計が求められました",
    "MAX — Rork Max は React Native ではなく Swift を生成します。iPhone・iPad・Apple Watch・Apple TV・Vision Pro、そして iMessage まで対象です",
    "SIM — クラウド上の Mac 群でビルドし、60fps のシミュレータをブラウザへ配信します。タッチ入力もそのまま届きます",
    "FUNDING — 4月9日発表のシードで Left Lane Capital 主導の1,500万ドルを調達し、アプリビルダーの Paperline を買収しています",
  ],
  en: [
    "FLOOD — The App Store took in roughly 560,000 new apps in the first half of 2026 alone, close to all of 2025, on pace to pass a million submissions this year",
    "REVIEW — That surge is stretching review times, with some developers reporting waits of several weeks, so it is worth leaving slack in a launch schedule",
    "RULE — Apple has previously halted updates from Replit and Vibecode under Guideline 2.5.2, requiring generated content to open in an external browser rather than an in-app web view",
    "MAX — Rork Max generates Swift rather than React Native, reaching iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "SIM — Builds run on a cloud Mac fleet and stream a 60fps simulator back to your browser, touch input included",
    "FUNDING — Rork raised a $15M seed led by Left Lane Capital, announced April 9, 2026, and acquired app builder Paperline",
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
