"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO — Expo Agent がベータで公開されました。ブラウザ上でプロジェクトやリポジトリを直接扱いながら、プロンプトからアプリを生成・変更できます",
    "NATIVE — Expo Agent の出力は iOS・Android・web 向けの、実際に配布できるネイティブアプリです",
    "RN — React Native チームは新規プロジェクトについて Expo を公式に推奨しています。AI によるコード生成では、判断の余地を狭められる点が理由に挙げられます",
    "MAX — Rork Max は native Swift を出力し、Claude Code と Opus 4.6 の組み合わせで動作します。標準の Rork は React Native（Expo）でクロスプラットフォームのアプリを生成します",
    "CREDIT — Rork は無料で始められ、有料プランは月額 $25 からです。クレジットの消費は速いため、本格的に作る前提なら費用を見積もっておく必要があります",
    "SEPT — App Store の申請時回答と Android の開発者認証は、いずれも2026年9月からです。配布経路の棚卸しは早めに済ませておく類の変更です",
  ],
  en: [
    "EXPO — Expo Agent is out in beta. It runs in the browser and lets you generate and modify apps from prompts while working directly on a project or repository",
    "NATIVE — What Expo Agent produces are real, shippable native apps for iOS, Android, and the web",
    "RN — The React Native team now officially recommends Expo for new projects, citing how much it narrows the decision space AI code generation has to navigate",
    "MAX — Rork Max emits native Swift and runs on Claude Code paired with Opus 4.6, while standard Rork generates cross-platform apps with React Native (Expo)",
    "CREDIT — Rork is free to start and paid plans begin at $25/month, but credits burn quickly — worth budgeting for before you build seriously",
    "SEPT — App Store submission responses and Android developer verification both take effect in September 2026. Auditing your distribution paths early is the safer move",
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
