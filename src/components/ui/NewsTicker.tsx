"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "DEADLINE — 8月31日から、Google Play の新規アプリと更新はすべて Android 16（API レベル36）を対象にする必要があります。残り7日です",
    "EXTENSION — 条件を満たす場合は Play Console のフォームで11月1日までの延長を申請できますが、申請そのものを締切前に済ませる必要があります",
    "MAX — Rork Max は React Native ではなくネイティブ Swift を生成し、クラウド上の Mac 群でビルドします。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage が対象です",
    "COMPANION — Rork Companion アプリを使えば、有料の Apple Developer アカウントなしに実機の iPhone で動作を確認できます。設計・実装・テストをブラウザだけで回せる構成です",
    "DEVTOOLS — Expo SDK 57 の React Native DevTools でライトモードとダークモードのエミュレーションが可能になりました。端末設定を切り替えずに両方の見え方を確認できます",
    "IOS27 — iOS 27 は9月に出ます。ベータ6が8月17日に配布され、RCS Universal Profile 3.0 対応で Android から届いたメッセージへの個別返信ができるようになりました",
  ],
  en: [
    "DEADLINE — From August 31, every new app and update on Google Play must target Android 16 (API level 36). Seven days to go",
    "EXTENSION — If you qualify, you can request an extension through November 1 using a form in Play Console, but the request itself has to be filed before the deadline",
    "MAX — Rork Max generates native Swift rather than React Native and compiles on a cloud Mac fleet, covering iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "COMPANION — The Rork Companion app lets you test on a real iPhone without a paid Apple Developer account, so design, build, and test can all happen in a browser",
    "DEVTOOLS — React Native DevTools in Expo SDK 57 can emulate light and dark mode, letting you check both appearances without touching device settings",
    "IOS27 — iOS 27 ships next month. Beta 6 landed on August 17, and RCS Universal Profile 3.0 support means you can finally reply to a specific message received from Android",
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
