"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SWIFTUI — Rork の新規プロジェクトは Expo ではなくなりました。iPhone は Swift と SwiftUI、Android は Kotlin と Jetpack Compose、Web は React です。既存の Expo プロジェクトはこれまでどおり動きます",
    "EXPOGO — iOS 版 Expo Go は、ターミナル側とアプリ側の両方で同じアカウントにログインしていないと QR から起動しなくなりました。Android と development build は対象外です",
    "11/01 — Google Play の target API 36 要件、延長申請の終点まで残り48日です。11月2日を越えると、非準拠のアプリは新しい端末で見つけてもらえなくなります",
    "SIGSEGV — expo-doctor が 20/20 で通っているのに、Samsung 端末で Expo Go が無言で落ちる報告があります。診断が全部緑のときは adb のログを見に行くところからです",
    "NEW — そのAPIキー、アプリの中に入っていませんか。Rork の環境変数と Supabase Edge Function の使い分けを書きました",
    "CREDITS — AI 側のエラーにはクレジットを使わない、という説明がどこまでを指すのか。同じ修正を三度頼んだ日の消費を記録すると、線が見えてきます",
  ],
  en: [
    "SWIFTUI — New Rork projects are no longer Expo. iPhone is Swift and SwiftUI, Android is Kotlin and Jetpack Compose, Web is React. Existing Expo projects still build and ship",
    "EXPO GO — On iOS, Expo Go now needs the same account signed in on both the terminal and the app before a QR code will launch anything. Android and development builds are unaffected",
    "NOV 1 — Forty-eight days until the extension deadline for Google Play's target API 36 requirement. After November 2, non-compliant apps stop reaching new devices",
    "SIGSEGV — Expo Go dies silently on some Samsung devices while expo-doctor reports a clean 20 out of 20. When every check is green, the adb log is where to look next",
    "NEW — Is that API key sitting inside your app? When to use Rork environment variables and when to reach for a Supabase Edge Function",
    "CREDITS — How far does it go, the promise that AI-side errors do not cost credits? Log what a day of asking for the same fix three times actually consumes, and the line starts to show",
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
