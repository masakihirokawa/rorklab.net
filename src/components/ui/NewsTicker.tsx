"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが1500万ドルのシード調達完了、Left Lane Capitalがリード、Peak XV・True Ventures・Goodwater・a16z Speedrun参加（4/9）",
    "RORK MAX — Claude Code＋Claude Opus 4.6搭載のRork Maxが公開、Web上でXcodeを置き換える初のSwiftアプリビルダーに（4月）",
    "8M VIEWS — Rork Max発表のXポストが800万閲覧を突破、発表から2週間で年間売上が2倍に（4月）",
    "iOS 26 SDK — App Store Connectへのアップロードは4月28日からiOS 26 SDK以降でのビルドが必須に（4/28〜）",
    "AGENTS — Android 17 Beta 2が自律AIエージェント向けプラットフォームを本格強化、アプリ開発の常識が揺らぎ始める（4月）",
    "NO-CODE 70% — 2026年末までに新規業務アプリの70%がローコード／ノーコードで構築されるとGartnerが予測（4月）",
  ],
  en: [
    "FUNDING — Rork closes a $15M Seed led by Left Lane Capital with Peak XV, True Ventures, Goodwater, and a16z Speedrun (4/9)",
    "RORK MAX — Rork Max launches powered by Claude Code and Claude Opus 4.6 — the first Swift app builder on the web to replace Xcode (Apr)",
    "8M VIEWS — The Rork Max launch post drew 8M+ views on X and doubled annual revenue within two weeks (Apr)",
    "iOS 26 SDK — Starting April 28, App Store Connect uploads must be built with the iOS 26 SDK or later (4/28+)",
    "AGENTS — Android 17 Beta 2 lands with deeper platform hooks for autonomous AI agents, shifting what 'app development' means (Apr)",
    "NO-CODE 70% — Gartner projects 70% of new business apps will be built with low-code / no-code platforms by end of 2026 (Apr)",
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
