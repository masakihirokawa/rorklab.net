"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SDK57 — Expo SDK 57 が公開され、React Native が 0.85 から 0.86 に上がりました。React 19.2 は据え置きで、破壊的変更はない想定です",
    "CADENCE — 大きな更新の合間に、壊れない小さな更新を挟む新しいリリース間隔への移行がうかがえます。追従の負担が読みやすくなります",
    "RN086 — React Native 0.86 では Android の edge-to-edge 対応の修正、DevTools のライト/ダーク切り替え、描画・レイアウト・アニメーションの改善が入りました",
    "PREBUILD — expo prebuild にネイティブディレクトリの消去と再生成の改善が入り、expo-dev-client も iOS 側が強化されています",
    "IOS27 — iOS 27 は 7月20日に beta 4、7月22日からパブリックベータが配信されています。秋の正式版に向けて生成したアプリの動作確認を進める時期です",
    "AND17 — Android 17 から従来の Developer Preview が廃止され、継続更新される Canary ビルドに一本化されました",
  ],
  en: [
    "SDK57 — Expo SDK 57 landed, moving React Native from 0.85 to 0.86 while React stays at 19.2, and it is meant to ship no breaking changes",
    "CADENCE — The release hints at a new cadence: small, non-breaking upgrades slotted between the larger SDK releases, which makes keeping up easier to plan",
    "RN086 — React Native 0.86 highlights include edge-to-edge fixes on Android, light and dark mode emulation in React Native DevTools, and rendering, layout, and animation fixes",
    "PREBUILD — expo prebuild improved how it clears and regenerates native directories, and expo-dev-client picked up iOS enhancements",
    "IOS27 — iOS 27 reached beta 4 on July 20 and opened to public beta testers on July 22, so it is time to check generated apps ahead of the autumn release",
    "AND17 — Starting with Android 17, traditional Developer Previews are gone, replaced by continuously updated Canary builds",
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
