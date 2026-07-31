"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED — Rork は Left Lane Capital 主導で1,500万ドルのシードラウンドを調達しました。プロンプトからモバイルアプリを生成する領域に資金が集まっています",
    "PAPER — アプリビルダーの Paperline を買収しました。エンジニアリング人材の獲得を目的として、今後も買収を続ける方針が示されています",
    "MAXSWIFT — Rork Max は React Native ではなくネイティブ Swift を生成する別系統の製品です。iPhone・iPad・Apple Watch・Apple TV・Vision Pro・iMessage に対応します",
    "SCALE — Rork は月間743,000訪問、成長率85%と報告されています。ノーコードのアプリビルダーが実運用の選択肢として定着しつつある水準です",
    "EXPOAI — Expo は Claude Code・Expo Skills・Expo MCP・Argent と AI が読みやすいドキュメントを組み合わせ、エージェントにフレームワークの文脈を渡す開発体験を用意しています",
    "AGENT — Expo Agent はブラウザ上で動き、プロジェクトやリポジトリを直接触りながらプロンプトでアプリを生成・改変できます",
  ],
  en: [
    "SEED — Rork closed a $15M seed round led by Left Lane Capital, a sign of how much capital is flowing into prompt-to-mobile-app tooling",
    "PAPER — Rork acquired the app builder Paperline and says it will stay acquisitive, largely as a way to bring in engineering talent",
    "MAXSWIFT — Rork Max is a separate line that generates native Swift rather than React Native, covering iPhone, iPad, Apple Watch, Apple TV, Vision Pro, and iMessage",
    "SCALE — Rork reports roughly 743,000 monthly visits and 85% growth, putting no-code app builders squarely into production-tool territory",
    "EXPOAI — Expo pairs Claude Code, Expo Skills, Expo MCP, Argent, and AI-readable docs to hand agents the framework context that general-purpose models lack",
    "AGENT — Expo Agent runs in the browser, letting you generate and modify an app from prompts while working directly against a project or repository",
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
