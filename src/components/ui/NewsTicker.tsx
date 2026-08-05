"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED — Rork が Left Lane Capital 主導で $15M のシードラウンドを調達しました。Peak XV・True Ventures・Goodwater・a16z Speedrun が参加しています",
    "PAPERLINE — シード直後に Paperline を買収しました。AI で native Swift アプリを組み立てる macOS アプリで、ネイティブ Swift への移行が一段進みます",
    "XCODE — 買収の狙いは「Xcode を置き換えられる web プラットフォーム」です。ブラウザ側で完結するネイティブ開発が現実的な射程に入ってきました",
    "MAX — Rork Max は React Native ではなく native Swift を出力し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage までを対象にします",
    "REVIEW — 9月から、App Store への新規申請・アップデート申請と、代替配信向けの notarization で回答の提出が必須になります",
    "ADAPTIVE — Android 17 は adaptive-first を必須の開発標準にした最初のバージョンです。大画面でのリサイズと向き変更への対応が前提になります",
  ],
  en: [
    "SEED — Rork closed a $15M seed round led by Left Lane Capital, with Peak XV, True Ventures, Goodwater, and existing backer a16z Speedrun joining in",
    "PAPERLINE — Right after the seed, Rork acquired Paperline, a macOS app that builds native Swift applications with AI, pushing its native Swift shift further along",
    "XCODE — The stated aim behind the acquisition is a web platform capable of replacing Xcode, putting browser-side native development within reach",
    "MAX — Rork Max emits native Swift rather than React Native, covering iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "REVIEW — From September, responses are required when submitting new apps or updates to the App Store, and when notarizing for alternative distribution",
    "ADAPTIVE — Android 17 is the first release to make adaptive-first a mandatory standard, so large-screen resizing and orientation changes are now table stakes",
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
