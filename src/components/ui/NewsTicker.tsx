"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PLAY — Google Play の対象 API レベル要件の期限が8月31日でした。ビルダーが生成するプロジェクトが追随しているかは、任せきりにせず確かめておきたいところです",
    "POLICY — Play が低価値アプリの線引きを明確にしました。既存アプリの焼き直しや、モデルを包むだけで固有の有用性がないものが該当するとされています",
    "DATA — サードパーティの AI 連携にもユーザーデータ要件が適用されます。外部モデルへ何を送っているかの開示責任は、アプリを公開する開発者の側にあります",
    "APPLE — ガイドライン 2.5.2 の運用が厳格になり、実行時のコード実行環境を持つアプリへの審査が厳しくなりました。ツールとアプリの境界が問われています",
    "BUILD — 一方で、サーバー側で署名済みのネイティブバイナリを再現可能なパイプラインで生成する方式は 2.5.2 の対象外です。技術的な違いは書き分けが要ります",
    "IOS — iOS 27 が9月に一般公開されます。対応は iPhone 11 以降です。新しい OS が来たときの実機確認は、毎年の恒例作業として組み込んでおくと安心です",
  ],
  en: [
    "PLAY — Google Play's target API level deadline passed on August 31. Whether the project your builder generates has kept pace is worth verifying yourself rather than assuming",
    "POLICY — Play has sharpened its definition of a low-value app: rehashes of existing apps, or thin wrappers around a third-party model with no useful function of their own",
    "DATA — User Data requirements apply to third-party AI integrations too. Disclosing what gets sent to an external model is the responsibility of whoever publishes the app",
    "APPLE — Enforcement of Guideline 2.5.2 has tightened around apps that execute arbitrary code at runtime, putting the line between a tool and an app under closer scrutiny",
    "BUILD — Compiling a signed native binary server-side through a reproducible pipeline sits outside 2.5.2, and the technical distinction is worth stating precisely",
    "IOS — iOS 27 reaches general release in September, supporting iPhone 11 and later. Building the device check into an annual routine takes the surprise out of it",
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
