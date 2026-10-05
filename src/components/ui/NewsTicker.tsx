"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "GPT6.1 — Rork のモデルメニューに GPT-6.1 Sol が加わりました（9月29日）。GPT-6 Sol と同価格で、1M トークンの文脈を読みます",
    "10/12 — React Native 0.88.x の正式リリース予定まで残り6日。Expo SDK 58 安定版はその後で、Expo Go の更新で SDK 57 のサポートが落ちます",
    "CRYPTO — expo-crypto の digest() が、TypeScript 上は ArrayBuffer を受けるのに Android のネイティブ側は TypedArray を求める、という Issue が出ています（修正 PR あり）",
    "NEW — モデルメニューの入れ替わりを3種類に分けて、クレジットの行き先を台帳に残します",
    "SDK58 — SDK 58 の安定版の日付は、昨日の確認時点ではまだ出ていませんでした",
    "SHEET — expo-ui の BottomSheet で presentationBackground の素材が平らで不透明に描かれる、という報告が出ています",
  ],
  en: [
    "GPT6.1 — GPT-6.1 Sol joined Rork's model menu on Sep 29. It costs the same as GPT-6 Sol and reads a 1M-token context",
    "10/12 — 6 days until the planned React Native 0.88.x release. Expo SDK 58 stable comes after it, and the Expo Go update drops SDK 57 support",
    "CRYPTO — An issue says expo-crypto's digest() accepts ArrayBuffer in TypeScript but the Android native side wants a TypedArray. A fix PR is open",
    "NEW — Sorting model-menu changes into three types and keeping a ledger of where your credits go",
    "SDK58 — As of yesterday's check, no stable date for SDK 58 was out yet",
    "SHEET — A report says expo-ui's BottomSheet renders presentationBackground materials flat and opaque",
  ]
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
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
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
