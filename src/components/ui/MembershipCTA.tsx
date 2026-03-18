import { localePrefix } from "@/lib/locale";

interface MembershipCTAProps {
  locale: string;
}

const CONTENT = {
  ja: {
    heading: "さらに深く学びたい方へ",
    description:
      "この記事を気に入っていただけましたか？Rork Lab メンバーシップでは、プレミアム限定の上級ガイドやチュートリアルにアクセスできます。",
    features: [
      "すべてのプレミアム記事が読み放題",
      "毎週追加される限定コンテンツ",
      "上級テクニック・実践ガイド",
    ],
    pro: "Pro プラン — ¥380/月",
    premium: "Premium プラン — ¥1,480（永久アクセス）",
    link: "メンバーシップを見る →",
  },
  en: {
    heading: "Want to Go Deeper?",
    description:
      "Enjoyed this article? Rork Lab membership gives you access to exclusive premium guides and advanced tutorials.",
    features: [
      "Unlimited access to all premium articles",
      "New exclusive content added every week",
      "Advanced techniques & hands-on guides",
    ],
    pro: "Pro Plan — $3/mo",
    premium: "Premium Plan — $10 (lifetime access)",
    link: "View Membership →",
  },
};

export function MembershipCTA({ locale }: MembershipCTAProps) {
  const t = CONTENT[locale as keyof typeof CONTENT] || CONTENT.en;
  const prefix = localePrefix(locale);

  return (
    <section
      style={{
        marginTop: 48,
        marginBottom: 32,
        padding: "32px 28px",
        borderRadius: 12,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
      }}
    >
      <h3
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: 8,
        }}
      >
        {t.heading}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: 16,
        }}
      >
        {t.description}
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 20px 0",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {t.features.map((f) => (
          <li
            key={f}
            style={{
              fontSize: 13,
              color: "var(--text-dim)",
              paddingLeft: 20,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                color: "var(--accent-coral)",
              }}
            >
              ✦
            </span>
            {f}
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: 12,
          color: "var(--text-faint)",
          marginBottom: 16,
        }}
      >
        <span>{t.pro}</span>
        <span>{t.premium}</span>
      </div>
      <a
        href={`${prefix}/support`}
        style={{
          display: "inline-block",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--accent-coral)",
          textDecoration: "none",
          padding: "8px 20px",
          borderRadius: 6,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
          transition: "background 0.2s",
        }}
      >
        {t.link}
      </a>
    </section>
  );
}
