import { localePrefix } from "@/lib/locale";
import type { ArticleMeta } from "@/lib/content";

interface MembershipCTAProps {
  locale: string;
  relatedPremiumArticles?: ArticleMeta[];
}

const CONTENT = {
  ja: {
    heading: "さらに深く学びたい方へ",
    description:
      "Rork Lab では、この記事の内容をさらに掘り下げた上級ガイドをプレミアム記事として公開しています。実装コード・ベンチマーク・本番設計パターンなど、すぐに使える実践的な内容です。",
    features: [
      "コピー&ペーストで使える実装コード付き",
      "毎週新しい上級ガイドを追加",
      "¥380/月 または ¥1,480 の永久アクセス",
    ],
    link: "Premium 記事を見る →",
  },
  en: {
    heading: "Go Deeper",
    description:
      "Rork Lab publishes premium articles that go deeper into the topics covered here — with implementation code, benchmarks, and production-ready design patterns.",
    features: [
      "Copy-paste ready implementation code",
      "New advanced guides published every week",
      "$3/mo or $10 for lifetime access",
    ],
    link: "View Premium Articles →",
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
