import { localePrefix } from "@/lib/locale";
import type { ArticleMeta } from "@/lib/content";
import { CAMPAIGN, PLAN_LABELS } from "@/config/pricing";

interface MembershipCTAProps {
  locale: string;
  relatedPremiumArticles?: ArticleMeta[];
}

const proFeatureJa = CAMPAIGN.enabled ? CAMPAIGN.labels.ja.proFeature : PLAN_LABELS.ja.proFeature;
const proFeatureEn = CAMPAIGN.enabled ? CAMPAIGN.labels.en.proFeature : PLAN_LABELS.en.proFeature;

const CONTENT = {
  ja: {
    heading: "お読みいただきありがとうございます",
    description:
      "Rork Lab では、実装コード・ベンチマーク・本番設計パターンなど、実務ですぐにお役立ていただけるプレミアム記事をご用意しています。もしご興味がありましたら、ぜひご覧ください。",
    features: [
      "コピー&ペーストで使える実装コード付き",
      "毎週新しい上級ガイドを追加",
      proFeatureJa,
    ],
    link: "メンバーシップを見る →",
  },
  en: {
    heading: "Thank You for Reading",
    description:
      "Rork Lab offers premium articles with implementation code, benchmarks, and production-ready design patterns — practical content we hope you'll find useful.",
    features: [
      "Copy-paste ready implementation code",
      "New advanced guides published every week",
      proFeatureEn,
    ],
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
