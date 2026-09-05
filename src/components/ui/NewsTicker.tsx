"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "PRICING — 通常 Rork の階層が具体化しました。Junior が月額 $25 で100クレジット、Middle が $50 で250、Senior が $100 で500 という並びです",
    "CREDITS — 課金はメッセージ単位です。AI へ送るプロンプト1回が1クレジットで、画面をまるごと作る指示もボタンの色を変える指示も同じ1つを消費します",
    "PRACTICE — ですので、細かい手直しを重ねるほどクレジットは早く減ります。要件をまとめて渡し、細部は手元のエディタで直す。この配分が実際のコストを大きく左右します",
    "STACK — 通常の Rork は Expo 経由の React Native を生成し、iOS と Android の両方に届きます。Rork Max は別製品で、ネイティブ Swift を書きます",
    "MAX — Max は月額 $200 から。クラウド上の Mac 群でコンパイルし、ブラウザにライブシミュレータを流し、2クリックで App Store へ公開します。Xcode は要りません",
    "FOUNDATION — 土台のモデル層では Gemini 3.8 Flash が9月2日に一般提供、9月3日には GitHub Copilot でも使えるようになりました。導入価格の失効は12月31日です",
  ],
  en: [
    "PRICING — Standard Rork's tiers are now clear: Junior at $25 a month for 100 credits, Middle at $50 for 250, and Senior at $100 for 500",
    "CREDITS — Billing is per message. One prompt to the AI costs one credit, whether you are asking it to build an entire screen or just to change a button color",
    "PRACTICE — Which means credits drain fastest when you iterate in small nudges. Bundle the requirements, then handle the fine details in your own editor. That split moves the real cost more than anything",
    "STACK — Standard Rork generates React Native through Expo and reaches both iOS and Android. Rork Max is a separate product that writes native Swift instead",
    "MAX — Max starts at $200 a month. It compiles on a cloud Mac fleet, streams a live simulator to your browser, and publishes to the App Store in two clicks, with no Xcode required",
    "FOUNDATION — In the model layer beneath it, Gemini 3.8 Flash went generally available on September 2 and reached GitHub Copilot on September 3. Its introductory pricing expires December 31",
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
