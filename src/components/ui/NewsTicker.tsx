"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "BILLING — 残高は Build クレジットと Cloud クレジットの二本立てです。Cloud 側は完成したアプリが実行時に使う分で、プロジェクトのトグルが off のままだと AI 機能は従来の挙動に留まります",
    "11/01 — Google Play の target API 36 要件、延長申請の終点まで残り47日です。非準拠のまま越えると、新しい端末で見つけてもらえなくなります",
    "SDK56 — Android 版 Expo Go 56.0.1 が、素のテンプレートを含むすべての SDK 56 プロジェクトを互換性なしとして拒む報告が出ています。QR も EAS Update も開けません",
    "NEW — Rork の新規作成から Expo が消えました。手元のプロジェクトを残すか作り直すかを書きました",
    "DEVTOOLS — SDK 56 の Expo Go で DevTools の Console が式を評価せず、Sources も空のままになる報告があります。開発ビルドに切り替えると戻る例が挙がっています",
    "COMPANION — Companion は現在、Swift のアプリを USB で iPhone に入れるためのデスクトップアプリという位置づけです。以前の説明を前提にした手順書は見直しどきかもしれません",
  ],
  en: [
    "BILLING — Your balance is really two: Build credits and Cloud credits. Cloud credits cover what a finished app spends at runtime, and while the project toggle stays off, AI features keep their old behaviour",
    "NOV 1 — Forty-seven days until the extension deadline for Google Play's target API 36 requirement. Cross it non-compliant and your app stops reaching new devices",
    "SDK 56 — Expo Go 56.0.1 on Android is reported to reject every SDK 56 project as incompatible, including a bare template. Neither the QR code nor EAS Update will open",
    "NEW — Rork no longer creates Expo projects. How we thought through keeping the existing one versus rebuilding",
    "DEVTOOLS — On SDK 56, Expo Go leaves the DevTools console unable to evaluate anything and the Sources tab empty. Switching to a development build has restored it for some",
    "COMPANION — Companion is now positioned as a desktop app for loading Swift apps onto an iPhone over USB. If your notes describe something else, this is a good moment to revisit them",
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
