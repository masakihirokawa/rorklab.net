"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "PLANS — 公式のプラン表は Free が Design mode のみ、Rork Pro が月20ドルで100クレジット、Rork Max が200ドルからという構成です",
    "EXPOGO — Expo Go で開発中のプロジェクトを動かすには、CLI とアプリの両方で同じアカウントにログインすることが必要になりました。現時点では iOS 版のみです",
    "11/01 — Google Play の target API 36 要件は、延長を申請していても11月1日で終わります。残り46日です",
    "APKENV — JS のソースを変えずに EXPO_PUBLIC_ の値だけ変えると、Gradle が最新と判定して前回のバンドルを使い回す報告があります。本番の向き先がずれる形です",
    "NEW — 思ったより早く残高が減る前に、Build クレジットと Cloud クレジットを分けて見る。2本立ての残高を切り分けた記録です",
    "PLIST — lsapplicationqueriesschemes は Apple の現行ドキュメントでは404になります。正本はアーカイブ側の Launch Services Keys です",
  ],
  en: [
    "PLANS — The official table lists Free as Design mode only, Rork Pro at $20 a month for 100 credits, and Rork Max starting at $200",
    "EXPOGO — Running a project in Expo Go during development now requires signing in to the same account from both the CLI and the app. For the moment this applies to iOS only",
    "11/01 — Google Play's target API 36 requirement ends on November 1 even for apps granted an extension. Forty-six days remain",
    "APKENV — Change only an EXPO_PUBLIC_ value without touching the JS and Gradle may call the bundle up to date, reusing the previous one. The shipped build can point somewhere unintended",
    "NEW — Before the balance drains faster than expected, read build credits and cloud credits separately. Notes on telling the two apart",
    "PLIST — lsapplicationqueriesschemes now returns a 404 in Apple's current documentation. The authoritative page is the archived Launch Services Keys reference",
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
