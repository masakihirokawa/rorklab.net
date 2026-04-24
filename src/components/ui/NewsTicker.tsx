"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "SEED15M — Rork が Left Lane Capital 主導で 1,500万ドルのシードラウンドを調達（4/9）",
    "RORKMAX — Rork Max 登場: Webで動作する初の Swift アプリビルダー、Xcodeを置き換える存在へ",
    "PAPERLINE — Rork が macOS AI アプリビルダー Paperline を買収、ネイティブ Swift 能力を強化",
    "REVENUE — Rork Max 発表後2週間で年間収益が2倍に、X上での閲覧数800万超を記録",
    "APPSTORE — App Store新規アプリが前年比84%増、AIビルダーがアプリルネサンスを牽引（4月）",
    "TRAFFIC — 1年未満でRorkが世界最大のモバイルAIビルダープラットフォームにWebトラフィックで到達",
  ],
  en: [
    "SEED15M — Rork raises \$15M Seed led by Left Lane Capital with Peak XV, True Ventures & a16z Speedrun (4/9)",
    "RORKMAX — Rork Max: the first web-based Swift app builder to replace Xcode — English to App Store",
    "PAPERLINE — Rork acquires Paperline macOS AI app builder to strengthen native Swift capabilities",
    "REVENUE — Rork Max announcement generated 8M+ views on X and doubled annual revenue in two weeks",
    "APPSTORE — App Store new app submissions up 84% YoY — AI builders like Rork Max driving the renaissance",
    "TRAFFIC — In under a year, Rork became the world's largest AI mobile app builder by web traffic",
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
