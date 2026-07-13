"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork MaxはReact Nativeではなく純粋なSwiftコードを生成し、iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessageまで見据えた真のネイティブアプリを作れます",
    "APPLE — 2026年のRorkはAppleエコシステムのネイティブ強化が明確なテーマになっています",
    "EXPO — 通常の生成はReact NativeとExpoが土台。作業後には本物のプロジェクト構造とコードが残り、そのまま手で育てられます",
    "FUNDING — Rorkは直近で1,500万ドルを調達し、月間743,000訪問・85%成長という新たなバイラルを得ています",
    "PRICING — 無料で始められ、有料プランは月額25ドルから。Rork Maxは月額200ドルです",
    "CROSS — iOS・Android・Webを単一のプロンプトから生成し、フォローアップの微調整で仕上げられます",
  ],
  en: [
    "RORKMAX — Rork Max generates pure Swift instead of React Native, enabling true native apps across iPhone, iPad, Watch, TV, Vision Pro, and iMessage",
    "APPLE — Rork's 2026 direction has a clear theme of native empowerment across the Apple ecosystem",
    "EXPO — Standard builds run on React Native and Expo, so you're left with a real project structure and code you can keep working on",
    "FUNDING — Rork recently raised $15M and now sees over 743,000 monthly visits with 85% growth",
    "PRICING — Rork is free to start, with paid plans from $25/month and Rork Max at $200/month",
    "CROSS — Rork builds iOS, Android, and web from a single prompt, finished off with a bit of follow-up tweaking",
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
