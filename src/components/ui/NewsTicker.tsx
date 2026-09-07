"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SPLIT — Rork は2本立てです。標準の Rork は React Native を生成し、2026年2月に出た Rork Max は別製品としてネイティブ Swift を生成します",
    "MAX — Rork Max は月額 $200 と報じられています。クラウド上の Mac でのコンパイルから App Store 公開まで含み、Vision Pro や iMessage にも届きます",
    "PLANS — 標準版は無料枠に加えて Junior $25、Middle $50、Senior $100、その上に Scale。数えるのはトークンではなくメッセージ数です",
    "COUNT — 1メッセージでどれだけ進むかは指示の書き方で大きく変わります。プランを比べるなら、実際に何メッセージ要ったかを測るのがいちばん確かです",
    "STORE — 2026年9月から、App Store への提出時と代替配布の公証申請時に新しい質問票への回答が必須になります。年齢レーティングと Time Allowances の挙動を決めるものです",
    "SCOPE — 審査要件の変更は、次に出すアプリだけでなく、すでに公開しているアプリすべてに降りてきます。公開手順の見直しは早めが安全です",
  ],
  en: [
    "SPLIT — Rork comes in two lines. The standard product generates React Native, while Rork Max, launched in February 2026, is a separate product that writes native Swift",
    "MAX — Rork Max is reported at $200 a month, covering compilation on cloud Macs through App Store publishing, and reaching Vision Pro and iMessage",
    "PLANS — The standard tiers run free, Junior at $25, Middle at $50, Senior at $100, with Scale above that. What gets counted is messages, not tokens",
    "COUNT — How far a single message takes you depends heavily on how you write the prompt. The honest way to compare plans is to measure the messages an actual build took",
    "STORE — From September 2026, App Store submissions and notarization requests require a new questionnaire that sets age ratings and Time Allowances behavior",
    "SCOPE — Review requirement changes land on everything you have already shipped, not just the next release. Revisiting your submission checklist early is the safer move",
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
