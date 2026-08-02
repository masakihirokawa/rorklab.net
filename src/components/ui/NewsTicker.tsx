"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
  ja: [
    "RAISE — Rork が1,500万ドルを調達しました。個人開発者がアプリを出すまでの距離を詰める方向に、資金が向かっている形です",
    "ENGINE — Rork Max は Claude Code と Opus 4.6 の組み合わせで動きます。複雑なアプリロジックや推論での差は、この構成に由来する部分が大きいと説明されています",
    "CLOUDMAC — 生成された Swift はクラウド上の Mac 群でコンパイルされます。手元に Xcode を置かないまま、実機テストから App Store 提出まで届く導線です",
    "AR — Rork Max は ARKit と LiDAR スキャンにネイティブ対応しています。3D オブジェクトの配置や空間コンピューティングを含むアプリが射程に入ります",
    "TRACTION — Rork Max の発表は X で800万表示を超え、2週間で年間収益が倍になったと報告されています",
    "TRAFFIC — Rork は月間743,000訪問・成長率85%と報告されています。ノーコードのアプリ生成が試作の入口として定着しつつある数字です",
  ],
  en: [
    "RAISE — Rork raised $15M. The money is pointed at shortening the distance between a solo developer and a shipped app",
    "ENGINE — Rork Max runs on Claude Code paired with Opus 4.6. Much of its edge on complex app logic and reasoning is attributed to that pairing",
    "CLOUDMAC — The Swift it generates is compiled on a cloud Mac fleet, so you can go from prompt to on-device testing to App Store submission without installing Xcode",
    "AR — Rork Max supports ARKit and LiDAR scanning natively, putting 3D object placement and spatial computing apps within reach",
    "TRACTION — The Rork Max announcement drew more than 8 million views on X, and the company reports its annual revenue doubled within two weeks",
    "TRAFFIC — Rork reports over 743,000 monthly visits with 85% growth, a sign that prompt-to-app tools are settling in as a prototyping entry point",
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
