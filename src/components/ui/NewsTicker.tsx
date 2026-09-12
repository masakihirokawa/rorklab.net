"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "iOS 27 — 配信は明日9月14日です。新しい OS が出た直後の数日は、AI が生成したアプリの足場がいちばん揺れる期間になります",
    "提出 — App Store Connect への iOS 27 / macOS 27 向け提出は9月10日から受付が始まっています。Xcode 27 は RC が配布中です",
    "2027年4月 — それ以降にアップロードするアプリは iOS 27 / iPadOS 27 SDK 以上でのビルドが必須になります。SDK の版を自分で選べない方ほど早めの確認を",
    "Swift 6 — Xcode 27 の新しいビルドシステムは既定が Swift 6 モードです。iOS 27 同梱は Swift 6.4。既存プロジェクトは並行性まわりの検査に注意してください",
    "年齢 — Time Allowances 等に伴う新しい年齢レーティングの設問への回答が必要です。提出そのものが止まる項目ですので、手順の早い段階で",
    "待ち方 — 標準 Rork は Expo と React Native の版を待ち、Rork Max は Xcode と SDK を待ちます。追随の速さは生成物の種類で決まります",
  ],
  en: [
    "iOS 27 — It ships tomorrow, September 14. The days right after a new OS lands are when AI-generated apps stand on the least stable ground",
    "SUBMISSIONS — App Store Connect has been accepting builds for iOS 27 and macOS 27 since September 10, and Xcode 27 is available as a release candidate",
    "APRIL 2027 — From then on, anything uploaded to App Store Connect must be built with the iOS 27 or iPadOS 27 SDK. Worth checking early if you cannot pick your own SDK version",
    "SWIFT 6 — Xcode 27's new build system defaults to Swift 6 mode, and iOS 27 ships with Swift 6.4. Existing projects may meet concurrency checks they have not met before",
    "AGE RATINGS — New age rating questions tied to features like Time Allowances now need answers. This one can hold up a submission, so handle it early",
    "WAITING — Standard Rork waits on Expo and React Native; Rork Max waits on Xcode and the SDK. What a tool waits for decides how fast it catches up",
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
