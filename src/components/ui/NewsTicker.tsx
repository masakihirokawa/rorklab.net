"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "FUNDING — Rorkが$15Mシード資金調達を完了、Left Lane Capital主導でPeak XV・True Ventures・Goodwater・a16zが参加（4/9）",
    "ACQUIRE — RorkがアプリビルダーPaperlineを買収、エンジニア人材の獲得と積極的なM&A方針を表明（4/9）",
    "RECORD — Rork MaxがX上で800万ビュー超え、年間売上を2倍に。世界最大のAIモバイルアプリプラットフォームに成長（4/9）",
    "SDK — Apple発表：4/28よりApp Store Connectへのアプリ提出にiOS 26・watchOS 26・visionOS 26 SDK必須（4/10）",
    "MARKET — モバイルアプリ市場が2,066億ドル（2026年）→6,164億ドル（2033年）へ、CAGR 16.9%で拡大予測",
    "TREND — Gartner：2026年に新規アプリ開発の75%がローコード・ノーコードツールで構築される時代へ",
  ],
  en: [
    "FUNDING — Rork closes $15M seed round led by Left Lane Capital, with Peak XV, True Ventures, Goodwater & a16z (4/9)",
    "ACQUIRE — Rork acquires app builder Paperline, signaling aggressive M&A strategy to attract engineering talent (4/9)",
    "RECORD — Rork Max hits 8M+ views on X, doubles annual revenue. Now the world's largest AI mobile app platform by traffic (4/9)",
    "SDK — Apple requires iOS 26, watchOS 26 & visionOS 26 SDK for all App Store Connect submissions starting 4/28 (4/10)",
    "MARKET — Global mobile app market reaches $206.6B in 2026, projected to grow to $616.4B by 2033 at 16.9% CAGR",
    "TREND — Gartner: 75% of new app development will use low-code/no-code platforms by 2026",
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
