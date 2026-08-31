"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PLAY — Google Play の target API level 36 要件が昨日8月31日に発効しました。今日以降、新規アプリと既存アプリの更新は Android 16 対応が必須です",
    "VISIBILITY — API 35 のままのアプリは掲載こそ続きますが、新しい Android 版のユーザーには表示されなくなります。エラーが出ないまま新規インストールだけが減る点に注意が要ります",
    "EXTENSION — 間に合わなかった場合は、Play Console から2026年11月1日までの延長申請が出せます。恒久対応の計画とセットで進めるのが実務的です",
    "APPLE — Apple 側は9月9日にイベント、iOS 27 の正式リリースは9月14日と報じられています。生成したアプリの iOS 27 実機確認はリリース週の前に済ませておきたいところです",
    "EXPO — Expo が expo-paste-input を公開しました（8月28日）。React Native の TextInput に画像・GIF・ステッカーの貼り付けを追加するネイティブモジュールです",
    "EAS — EAS Observe が8月20日に GA になりました。クラッシュや性能の観測を、ビルドや配信と同じ EAS 上で持てるようになっています",
  ],
  en: [
    "PLAY — Google Play's target API level 36 requirement took effect yesterday, August 31. From today, new apps and updates must target Android 16",
    "VISIBILITY — Apps still on API 35 stay listed but disappear for users on newer Android versions. No error is raised; new installs simply fade, which makes the change easy to miss",
    "EXTENSION — If you missed the deadline, an extension through November 1, 2026 can be requested in Play Console — best filed alongside a concrete migration plan",
    "APPLE — On the Apple side, the event lands September 9 and iOS 27 is reported to ship September 14. Testing generated apps on iOS 27 hardware before release week is time well spent",
    "EXPO — Expo released expo-paste-input on August 28, a native module that brings image, GIF, and sticker paste to React Native TextInput",
    "EAS — EAS Observe reached general availability on August 20, putting crash and performance monitoring on the same EAS platform as builds and updates",
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
