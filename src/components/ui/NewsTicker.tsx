"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "IOS27 — iOS 27 と iPadOS 27 は9月14日に配信されます。ノーコードや AI で組み立てたアプリにとって、新しい OS が降りてくる週は足場がいちばん揺れます",
    "DUO — Apple 初の折りたたみ iPhone Duo が 1,999 ドルから。新しい画面形状は、生成されたレイアウトが最初に壊れる場所でもあります",
    "SPLIT — 標準 Rork は Expo 経由の React Native、Rork Max はネイティブ Swift の生成です。折りたたみへの追随の速さも壊れ方も、同じにはならないはずです",
    "SUBMIT — 提出の自動化は、Apple 側の仕様変更をそのまま受けます。便利さを語る記事ほど、この揺れに触れないと不誠実になってしまいます",
    "RATING — 9月から年齢レーティング質問票への回答が必須になりました。ノーコードで作ったアプリも例外ではありません",
    "SILICON — iPhone 18 Pro の A20 Pro は TSMC の 2nm ノードで作られる初の大量生産スマートフォン向けプロセッサだと報じられています",
  ],
  en: [
    "IOS27 — iOS 27 and iPadOS 27 land on September 14. For apps assembled with no-code or AI tooling, the week a new OS ships is when the ground moves most",
    "DUO — Apple's first foldable, the iPhone Duo, starts at $1,999. A new screen shape is also the first place a generated layout tends to break",
    "SPLIT — Standard Rork produces React Native through Expo. Rork Max generates native Swift. Neither will adapt to a folding screen at the same pace, or fail in the same way",
    "SUBMIT — Automated submission absorbs every change Apple makes to the process. An article praising the convenience owes its readers that caveat",
    "RATING — Answering the age rating questionnaire became mandatory in September. Apps built without code are no exception",
    "SILICON — The A20 Pro in the iPhone 18 Pro is reported to be the first high-volume smartphone processor built on TSMC's 2nm node",
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
