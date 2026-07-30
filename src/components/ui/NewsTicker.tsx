"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "IOS27 — iOS 27 のパブリックベータが7月に公開されました。正式提供は9月ごろの見込みで、AI を組み込んだ Siri とアプリ起動の高速化が主な変更です（iPhone 11 以降）",
    "REQ — iOS 27 自体は iPhone 11 以降に届きますが、AI 機能の多くは iPhone 15 Pro 以降が要件です。最低対応バージョンと AI 前提機能の可否は別の判断になります",
    "BETA — 本番端末にベータを入れずに確かめるなら、Mac のクラウド環境と Xcode 26 の Simulator が現実的です。初期の互換確認はこれで足ります",
    "TWOCLICK — Rork Max は web 上で Xcode を置き換えることを狙う Swift アプリビルダーで、自然言語からの記述・実機テスト・2クリックの App Store 公開を一続きにしています",
    "REACH — Rork Max のローンチ投稿は X で800万表示を超え、2週間で年間収益が倍になったと報告されています",
    "EXPO — 通常の Rork は React Native (Expo) で iOS・Android・web を横断する構成を維持しています。Rork Max が純 Swift を出すのに対し、一つのコードベースで広げる道です",
  ],
  en: [
    "IOS27 — The iOS 27 public beta arrived in July ahead of a general release expected around September, led by an AI-driven Siri and faster app launches, on iPhone 11 and later",
    "REQ — iOS 27 itself reaches iPhone 11 and later, but most of its AI features require iPhone 15 Pro or newer, so your minimum OS target and your AI feature target are separate calls",
    "BETA — To check compatibility without putting a beta on your daily device, a cloud Mac plus the Xcode 26 Simulator covers the early pass — device-only bugs still need real hardware",
    "TWOCLICK — Rork Max is a Swift app builder aiming to replace Xcode on the web, running from plain-English prompts through on-device testing to a two-click App Store submission",
    "REACH — The Rork Max launch post reportedly passed 8 million views on X and the company says annual revenue doubled within two weeks",
    "EXPO — Standard Rork stays on React Native with Expo, spanning iOS, Android, and web from one codebase, while Rork Max emits pure Swift for the Apple platforms",
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
