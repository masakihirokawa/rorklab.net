"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — Google Play の Android 16（API レベル36）必須化は明日8月31日です。残り1日で、新規アプリも既存アプリの更新も対象になります",
    "DECISION — 延長申請は期限を過ぎてからでは提出できません。間に合わせるのか申請へ切り替えるのか、その判断そのものの締切が今日という形になります",
    "VISIBILITY — 更新を止めているアプリも無関係ではありません。API レベル35 未満のままだと、新しい Android 端末の新規ユーザーには表示されなくなります",
    "PITFALL — 依存ライブラリ側が新しい API レベルに追随していない場合、ローカルのビルドは通ってもストアのプリチェックで止まることがあります。自分のコードだけを見ていても分かりません",
    "EXPO — expo@57.0.17 が React Native を 0.86.3 へ更新しました。大きな SDK リリースの合間に破壊的変更のないパッチを挟む流れが見えてきており、追随のコストが下がる方向です",
    "CHOICE — Android も出すなら React Native を生成する本家 Rork、Apple プラットフォーム固有の機能が要件の中心なら Swift を生成する Rork Max。優劣ではなく何を出すかで決まります",
  ],
  en: [
    "DEADLINE — Google Play's Android 16 (API level 36) requirement lands tomorrow, August 31. One day left, and it covers new apps and updates to existing ones alike",
    "DECISION — An extension cannot be filed once the deadline passes. So the real cutoff today is not the build itself but deciding whether to make it or to file instead",
    "VISIBILITY — Apps you no longer update are not exempt. Anything still below API level 35 stops appearing for new users on newer Android devices",
    "PITFALL — When a dependency has not caught up to the new API level, the local build can pass while the store pre-check stops you. Reading your own code will not surface that",
    "EXPO — expo@57.0.17 moved React Native to 0.86.3. A pattern is emerging of small non-breaking patches between major SDK releases, which lowers the cost of keeping current",
    "CHOICE — Shipping to Android too points at Rork proper and its React Native output; Apple-specific capabilities at the center of the spec point at Rork Max and Swift. It is a question of what you ship",
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
