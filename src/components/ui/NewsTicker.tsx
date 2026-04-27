"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "MAX — Rork Max がローンチ後3日で $1.5M ARR 達成、ネイティブ Swift 生成への需要が爆発（2026年）",
    "ECOSYSTEM — iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage まで Apple 全プラットフォームに対応",
    "INTEGRATION — Widgets・ARKit・HealthKit を統合、Apple ネイティブ機能をフル活用したアプリを生成可能",
    "CLOUDMAC — Cloud Mac Fleet でビルド、Xcode 不要・Mac 不要で2クリック App Store 公開を実現",
    "BUBBLE — Bubble がネイティブモバイル機能をローンチ、Web・iOS・Android を単一エディタで構築可能に",
    "CURSOR3 — Cursor 3 が Agents Window 搭載、ローカル・worktree・SSH・クラウドで複数AIエージェント並列実行（4/2）",
  ],
  en: [
    "MAX — Rork Max hits $1.5M ARR within 3 days of launch, demand for native Swift generation is surging (2026)",
    "ECOSYSTEM — Build for the entire Apple lineup: iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "INTEGRATION — Native Widgets, ARKit, and HealthKit integration unlocks the full Apple platform feature set",
    "CLOUDMAC — Cloud Mac fleet builds your apps, no Xcode and no Mac required, with two-click App Store submission",
    "BUBBLE — Bubble ships native mobile, build web, iOS, and Android from a single no-code editor",
    "CURSOR3 — Cursor 3 launches Agents Window, run multiple AI agents in parallel across local, worktrees, SSH, and cloud (4/2)",
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
