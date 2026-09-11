"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "iOS 27 — 9月14日配信まであと2日です。新しい OS が出た直後は、AI が生成したアプリの足場がいちばん揺れます",
    "待ち方 — 標準 Rork は Expo と React Native の版が上がるのを待ちます。追随の速さを自分で短くできない、という性質があります",
    "MAX — Rork Max はネイティブ Swift を生成しますので、Xcode と SDK が対応すれば追随できます。待ち行列がひとつ短いわけです",
    "新 API — ただし新しい API を生成に使えるかは、モデルが新 SDK を知っているかに依存します。ここは Max でも即座には解決しません",
    "折りたたみ — iPhone Duo のような新しい画面形状は、生成されたレイアウトが最初に壊れる場所です。固定幅とセーフエリアからご確認ください",
    "数値 — 資金調達額は二次情報で割れたままです。$15M のシードと Paperline 買収の発表は2026年4月9日。裏が取れない数字には触れないのが安全です",
  ],
  en: [
    "iOS 27 — Two days out from the September 14 release. The days right after a new OS are when AI-generated apps wobble most",
    "WAITING — Standard Rork waits on Expo and React Native to ship their updates, and that wait is not something you can shorten yourself",
    "MAX — Rork Max writes native Swift, so it can follow along as soon as Xcode and the SDK are ready. One fewer queue to stand in",
    "NEW APIS — Whether a new API can actually be generated still depends on whether the model has seen the new SDK. Max does not solve that overnight",
    "FOLDABLE — A new screen shape like iPhone Duo is where generated layouts break first. Start with fixed widths and safe areas",
    "NUMBERS — Funding figures still disagree across secondary sources. The $15M seed and the Paperline acquisition were announced on April 9, 2026",
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
