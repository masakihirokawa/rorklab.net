"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "Rork Max — Claude Opus 4.6 搭載、ネイティブ SwiftUI アプリをブラウザだけで開発（a16z 出資）",
    "Growth — 月間 74.3 万訪問・前年比 85% 成長、AI ノーコードアプリビルダー首位を独走",
    "NEW — Rork Max、Dynamic Island・Live Activities・Siri Intents・Core ML にネイティブ対応",
    "3D/AR — Metal + SceneKit で 3D ゲーム、ARKit + LiDAR で空間コンピューティングまで対応",
    "Apple — iPhone/iPad/Apple Watch/Vision Pro/Apple TV/iMessage の全デバイスに 2 タップ申請",
    "Tutorial — スマホからでもアプリ開発できる Vibe Coding 体験記が Zenn で話題に",
  ],
  en: [
    "Rork Max — Powered by Claude Opus 4.6, build native SwiftUI apps entirely in browser (a16z backed)",
    "Growth — 743K monthly visits, 85% YoY growth; leading no-code AI app builder",
    "NEW — Rork Max adds Dynamic Island, Live Activities, Siri Intents & Core ML native support",
    "3D/AR — Full 3D games with Metal + SceneKit, spatial computing with ARKit + LiDAR",
    "Apple — 2-tap App Store publish for iPhone, iPad, Apple Watch, Vision Pro, Apple TV & iMessage",
    "Tutorial — Mobile-first Vibe Coding experience reports trending on Zenn",
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
