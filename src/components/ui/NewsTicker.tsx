"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "EXPO 58 — 週末の新規はなく、expo パッケージは 58.0.25（11/12）が最新です",
    "GEMINI 2.5 — gemini-2.5-flash は 12/1 に API で停止、残り15日。アプリ内のモデル名を確かめてください",
    "CAMERA — cameraPermission を false にすると iOS のカメラ説明文まで消える、という報告が出ています",
    "SONNET 4.5 — Claude API の Sonnet 4.5 は 11/30 に提供終了、AI 連携を足したアプリは移行先の確認を",
    "PLIST — 公開前に、アプリが使う権限と説明文の対応を一覧で確かめると審査で戻されにくくなります",
    "NEW — Rork への依頼、日本語と英語で比べて分かったこと",
  ],
  en: [
    "EXPO 58 — Nothing new over the weekend; the expo package is still at 58.0.25 (11/12)",
    "GEMINI 2.5 — gemini-2.5-flash shuts down on the API on 12/1, 15 days left. Check the model names inside your app",
    "CAMERA — Setting cameraPermission to false reportedly strips the iOS camera usage description too",
    "SONNET 4.5 — Sonnet 4.5 retires on the Claude API on 11/30. Apps with an AI feature should confirm their replacement",
    "PLIST — Listing every permission your app uses next to its usage text before release helps avoid review rejections",
    "NEW — Prompting Rork in Japanese vs English: What We Learned",
  ]
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
        background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-primary))", // 2026-10-09: 不透明に（固定バーの下を流れる本文が透けて重なっていた）
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
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
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
