"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SONNET5.5 — Rork のモデルメニューに Claude Sonnet 5.5 が追加（9月28日）。effort は Low〜Max の5段階、Sonnet 5 より30%以上速く、1M トークンを読みます",
    "10/12 — React Native 0.88.x の正式リリース予定まで残り12日。Expo SDK 58 安定版はその後で、Expo Go の更新で SDK 57 のサポートが落ちます",
    "HERMES — 「iOS 26.3.1 で起動直後に Hermes が落ちる」という Issue が未解決のまま。ObjCTurboModule の例外がヒープを壊す症状です",
    "NEW — 起動のたびに一瞬ログイン画面が出る expo-router アプリを、三状態で組み直す",
    "SEARCH — GSC で押されたのは「rorkmax」、表示だけ残るのは bgtaskscheduler.shared.submit と migrateFromAsyncStorage。具体的な API 名が入口です",
    "SDK58 — expo.dev の changelog は 9月15日の SDK 58 Beta が最新のまま。安定版の日付はまだ出ていません",
  ],
  en: [
    "SONNET5.5 — Claude Sonnet 5.5 joined Rork's model menu on Sep 28: five effort levels from Low to Max, 30%+ faster than Sonnet 5, and a 1M-token context",
    "10/12 — 12 days until the planned React Native 0.88.x release. Expo SDK 58 stable comes after it, and the Expo Go update drops SDK 57 support",
    "HERMES — An open Issue: Hermes crashes right at launch on iOS 26.3.1, with an ObjCTurboModule exception corrupting the heap",
    "NEW — Rebuilding an expo-router app that flashes the sign-in screen on every launch, with a three-state model",
    "SEARCH — In GSC the only click was rorkmax; impressions cluster on bgtaskscheduler.shared.submit and migrateFromAsyncStorage. Concrete API names are the front door",
    "SDK58 — expo.dev's changelog still tops out at the Sep 15 SDK 58 Beta. No stable date yet",
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
