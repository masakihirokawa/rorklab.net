"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "GPT6.1 — Rork のモデルメニューに GPT-6.1 Sol が加わりました（9月29日）。GPT-6 Sol と同価格で、1M トークンの文脈を読みます",
    "SDK58 — Expo SDK 58 Beta が公開されました（React Native 0.88 RC 同梱）。安定版の日付はまだ確認できていません",
    "10/12 — React Native 0.88.x の正式リリース予定まで残り5日。Expo Go の更新で SDK 57 のサポートが落ちる流れです",
    "TESTFLIGHT — Mac なし・Windows だけで iPhone アプリを TestFlight に載せた手順と、つまずいた4か所が Zenn に出ています",
    "NEW — Sonnet 5.5・GPT-6.1 Sol・Opus 5.5 のどれに頼むかを修正の種類で決め、クレジットの行き先を1週間記録しました",
    "EXPO — Shopify がネイティブに戻る中で、1人開発では Expo に残る、という判断の記事が Zenn に出ています。確かめる人が1人という点が論点です",
  ],
  en: [
    "GPT6.1 — GPT-6.1 Sol joined Rork's model menu on Sep 29. It costs the same as GPT-6 Sol and reads a 1M-token context",
    "SDK58 — Expo SDK 58 Beta is out, bundling a React Native 0.88 release candidate. A stable date has not been confirmed yet",
    "10/12 — 5 days until the planned React Native 0.88.x release. The Expo Go update that follows drops SDK 57 support",
    "TESTFLIGHT — A Zenn post covers putting an iPhone app on TestFlight with no Mac, Windows only, and the four places it snagged",
    "NEW — I picked between Sonnet 5.5, GPT-6.1 Sol and Opus 5.5 by the kind of fix, and logged where my credits went for a week",
    "EXPO — As Shopify moves back to native, a Zenn post explains staying on Expo as a solo developer. The one person who verifies is the real point",
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
