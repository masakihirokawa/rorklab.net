"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "NATIVE — Rork Max は純粋な Swift と SwiftUI を生成するため、AR や LiDAR、Metal を使った 3D、ウィジェット、Dynamic Island、Live Activities、HealthKit、NFC、Core ML まで手が届きます",
    "CHOICE — 逆にいえば、こうした Apple 固有の機能を使わないアプリならクロスプラットフォームの通常の Rork で足ります。Max を選ぶ理由はこの一点に集約されます",
    "PLAY — 8月31日から、Google Play の新規アプリと既存アプリの更新は対象 API レベル36（Android 16）が必要になります。残り9日です",
    "PLAY — 更新を出さない既存アプリでも、より新しい Android を載せた端末の新規ユーザーへ配信を続けるには対象 API レベル35 以上が要ります。見落とすと新規インストールだけが止まります",
    "GRACE — Play Console の延長フォームから申請すれば11月1日まで猶予されます。自動ではないため、8月31日までに申請そのものを済ませておく必要があります",
    "EXPO — expo prebuild がネイティブディレクトリを破棄して再生成するのが既定になりました。手を入れている場合は no-clean を渡します。API 36 対応の最中は事故になりやすい箇所です",
  ],
  en: [
    "NATIVE — Because Rork Max generates pure Swift and SwiftUI, it reaches AR and LiDAR, Metal-backed 3D, Home Screen widgets, Dynamic Island, Live Activities, HealthKit, NFC and Core ML",
    "CHOICE — Put the other way around, if your app touches none of those Apple-specific capabilities, the regular cross-platform Rork is enough. That single question decides whether Max is worth it",
    "PLAY — From August 31, new apps and app updates on Google Play must target API level 36, or Android 16. Nine days remain",
    "PLAY — Even an app you are not updating needs to target API level 35 or higher to keep reaching new users on newer Android devices. Miss it and only new installs quietly stop",
    "GRACE — An extension form in Play Console buys you until November 1, but it is not automatic. The request itself has to be filed before August 31",
    "EXPO — expo prebuild now clears and regenerates the native directories by default. Pass no-clean if you have edited them by hand, which is easy to trip over mid API 36 migration",
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
