"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RORKMAX — Rork MaxがネイティブSwiftアプリを生成、iPhone/iPad/Watch/TV/Vision Proに対応（2026年）",
    "SEED — Rorkが$15Mシードを調達、Left Lane CapitalがリードしApp Store開発の刷新を加速（2026年）",
    "PAPERLINE — Rorkがアプリビルダー Paperline を買収、エンジニア採用を加速（2026年）",
    "SIMULATOR — クラウドiOSシミュレータでXcodeやMac不要のテスト環境を提供（2026年）",
    "MIGRATION — Android StudioのMigration AssistantがiOS/React Native/Webアプリのネイティブ移行を支援（5月）",
    "AISTUDIO — Google AI Studioがネイティブvibe codingで数分でAndroidアプリを生成（5月）",
  ],
  en: [
    "RORKMAX — Rork Max generates native Swift apps for iPhone, iPad, Watch, TV and Vision Pro (2026)",
    "SEED — Rork raises a $15M seed led by Left Lane Capital to reinvent App Store development (2026)",
    "PAPERLINE — Rork acquires app builder Paperline to accelerate engineering hiring (2026)",
    "SIMULATOR — A cloud iOS simulator offers a real Apple test environment with no Xcode or Mac (2026)",
    "MIGRATION — Android Studio's Migration Assistant ports iOS, React Native and web apps to native (May)",
    "AISTUDIO — Google AI Studio builds native Android apps in minutes via vibe coding (May)",
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
