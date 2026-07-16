"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FREETRY — Rorkが「Rork Maxを期間限定で無料で試せるようにした」とXで告知しました。$200/月のプランに、費用を先に払わずに触れる機会です",
    "ONESHOT — Rork MaxはiPhone・Watch・iPad・TV・Vision Pro向けのアプリをほぼワンショットで生成すると謳い、ARと3Dを使うものまで対象に挙げています",
    "XCODE — 「Xcodeを置き換えるWebサイト」を掲げ、実機インストールは1クリック、App Store提出は2クリック。裏側はSwiftとClaude Code、Opusです",
    "PAPERLINE — Rorkはアプリビルダーの Paperline を買収し、エンジニアリング人材の獲得に向けて今後も買収を続ける方針を示しています",
    "SKILLS — GitHubのapp-store-connect-cli-skillsが7月9日に更新。提出まわりの開発者ツールに手が入り続けています",
    "MARKET — Gartnerは2026年末までに新規アプリの75%がローコードまたはノーコードで作られると見込んでいます。2020年は25%未満でした",
  ],
  en: [
    "FREETRY — Rork announced on X that Rork Max is free to try for a limited time, a chance to touch the $200/month tier without paying up front",
    "ONESHOT — Rork Max claims to one-shot almost any app for iPhone, Watch, iPad, TV, and Vision Pro, including builds that lean on AR and 3D",
    "XCODE — Positioned as a website that replaces Xcode: one click to install on device, two clicks to publish to the App Store, powered by Swift, Claude Code, and Opus",
    "PAPERLINE — Rork acquired the app builder Paperline and says it will stay acquisitive to bring in engineering talent",
    "SKILLS — Rork's app-store-connect-cli-skills repo was updated on July 9, a sign the submission tooling keeps getting attention",
    "MARKET — Gartner expects 75% of new applications to be built with low-code or no-code tools by the end of 2026, up from under 25% in 2020",
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
