import { localePrefix } from "@/lib/locale";
import type { ArticleMeta } from "@/lib/content";

interface MembershipCTAProps {
  locale: string;
  relatedPremiumArticles?: ArticleMeta[];
}

const CONTENT = {
  ja: {
    heading: "お読みいただきありがとうございます",
    description:
      "最後までお読みくださり、ありがとうございます。Claude Lab では、この記事の続きとなる上級実装ガイドや、完全なコード例を含むプレミアム記事もご用意しています。",
    features: [
      "実践的なコード例・ベンチマーク付き上級ガイド",
      "毎週追加される限定コンテンツ",
      "無料記事の「続き」をすべて読める",
    ],
    pro: "Pro プラン — ¥380/月（初月無料）",
    premium: "Premium プラン — ¥1,480（永久アクセス）",
    link: "メンバーシップを見る →",
  },
  en: {
    heading: "Thank You for Reading",
    description:
      "Thank you for reading to the end. Claude Lab offers premium articles with advanced implementation guides, complete code examples, and benchmarks that go deeper into the topics covered here.",
    features: [
      "Advanced guides with working code & benchmarks",
      "New exclusive content added every week",
      "Full access to all premium \"deep dive\" articles",
    ],
    pro: "Pro Plan — $3/mo (first month free)",
    premium: "Premium Plan — $10 (lifetime access)",
    link: "View Membership →",
  },
};

export function MembershipCTA({ locale, relatedPremiumArticles }: MembershipCTAProps) {
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
      {relatedPremiumArticles && relatedPremiumArticles.length > 0 && (
        <div style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {relatedPremiumArticles.map((a) => (
            <a
              key={`${a.category}/${a.slug}`}
              href={`${prefix}/articles/${a.category}/${a.slug}`}
              style={{
                display: "block",
                fontSize: 13,
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-primary)",
                transition: "border-color 0.2s",
                lineHeight: 1.5,
              }}
            >
              <span style={{ fontSize: 10, color: "var(--accent-coral)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", marginRight: 8 }}>
                PREMIUM
              </span>
              {a.title}
            </a>
          ))}
        </div>
      )}
      <a
        href={`${prefix}/membership`}
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
