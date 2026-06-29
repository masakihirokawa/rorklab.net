"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — RorkがLeft Lane Capital主導で$15Mのシードを調達しました",
    "RORK MAX — Rork MaxはReact NativeではなくネイティブSwiftアプリを生成します",
    "PLATFORM — iPhone・iPad・Watch・Vision Proに対応し、Live ActivitiesやCore MLまで使えます",
    "GROWTH — 月間74.3万訪問・成長率85%と利用が伸び続けています",
    "TEST — Companionアプリで有料Apple Developerアカウント無しに実機テストができます",
    "STACK — 本体はReact NativeとExpoで、ウェブラッパーでない真のネイティブ体験を提供します",
  ],
  en: [
    "FUNDING — Rork raises a $15M seed led by Left Lane Capital",
    "RORK MAX — Rork Max generates native Swift apps instead of React Native",
    "PLATFORM — It targets iPhone, iPad, Watch, and Vision Pro, reaching Live Activities and Core ML",
    "GROWTH — Traffic keeps climbing at 743K monthly visits and 85% growth",
    "TEST — The Companion app lets you test on a real device without a paid Apple Developer account",
    "STACK — Built on React Native and Expo for true native experiences, not web wrappers",
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
