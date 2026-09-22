"use client";

import { useLocale } from "next-intl";

const NEWS_ITEMS: Record<string, string[]> = {
ja: [
    "SDK58BETA — Expo SDK 58 はベータ期間の最中です。公式が言っているのは「3〜4週間」だけで、安定版の日付は一次情報に出ていません。日付を決め打ちしない方が安全です",
    "RN0.88RC1 — React Native 0.88 は9月16日の rc.1 まで来ました。正式リリース予定は10月12日で、SDK 58 の型まわりの変化はこれと対になっています",
    "11/01 — Google Play の対象 API レベル、延長申請組の配信期限は11月1日です。残り39日で、延長は Play Console のポリシー ステータスから一度だけ申請できます",
    "AUDIO — expo-audio が一定回数の再生のあと止まり、status.didJustFinish が来なくなるという報告です。例外は飛ばず、次が鳴らないだけですので気づきにくい形です",
    "NEW — 1つの Checkout に4種類の商品を載せたあとの分岐設計",
    "LSAQS — lsapplicationqueriesschemes は検索での表示が22件あってクリックが0です。このサイトで最も大きい実装系の需要が、まだ誰にも答えられていません",
  ],
  en: [
    "SDK58BETA — Expo SDK 58 is still in beta. The only thing stated officially is \"three to four weeks\", and no stable date appears in any primary source, so it is safer not to plan around one",
    "RN0.88RC1 — React Native 0.88 reached rc.1 on September 16, with the stable release expected October 12. The type-level changes arriving in SDK 58 are the other half of that story",
    "11/01 — For anyone who filed a Google Play target API level extension, the delivery deadline is November 1, thirty-nine days away. The extension can be requested once, from Policy status in Play Console",
    "AUDIO — expo-audio is reported to stop after a certain number of playbacks, with status.didJustFinish never arriving. Nothing throws; the next sound simply never starts, which makes it easy to miss",
    "NEW — Designing the branch after one Checkout carries four different products",
    "LSAQS — lsapplicationqueriesschemes shows up 22 times in search with zero clicks. The largest implementation-side demand this site sees still has no answer anywhere on it",
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
