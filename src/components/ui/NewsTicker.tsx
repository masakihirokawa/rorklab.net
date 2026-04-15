"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが1500万ドルのシード調達完了、Left Lane Capital主導でPeak XV・True Ventures・Goodwater・a16z Speedrunが参加（4/9）",
    "PAPERLINE — RorkがアプリビルダーのPaperlineを買収、エンジニアリング人材獲得とプラットフォーム強化を加速（4月）",
    "LARGEST — Rorkがモバイルアプリ向けAIプラットフォームでWebトラフィック世界最大に、チーム9名でReplit・Boltを凌駕（4月）",
    "RORK MAX — ネイティブSwiftUIアプリを自然言語から生成、Vision Pro・Apple Watch・ARKitにも対応（2月〜）",
    "NO XCODE — クラウドMacフリートでネイティブSwiftをコンパイル、XcodeなしでApp Store公開まで完結（4月）",
    "RENAISSANCE — AIコーディングツールの台頭でApp Store新規アプリが前年比84%急増、「Great App Renaissance」が到来（Q1 2026）",
  ],
  en: [
    "FUNDING — Rork raises $15M Seed led by Left Lane Capital; participants: Peak XV, True Ventures, Goodwater, a16z Speedrun (4/9)",
    "PAPERLINE — Rork acquires app builder Paperline to accelerate engineering talent and platform expansion (Apr)",
    "LARGEST — Rork becomes world's largest AI platform for mobile apps by traffic; 9-person team surpasses Replit & Bolt (Apr)",
    "RORK MAX — Build native SwiftUI apps from natural language; supports Vision Pro, Apple Watch, ARKit, and more (Feb+)",
    "NO XCODE — Rork Max compiles native Swift via cloud Mac fleet — build and ship to App Store without Xcode (Apr)",
    "RENAISSANCE — AI coding tools spark 84% YoY surge in new App Store submissions — the Great App Renaissance is here (Q1 2026)",
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
