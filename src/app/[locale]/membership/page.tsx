import type { Metadata } from "next";
import { getArticles, CATEGORIES } from "@/lib/content";
import { LevelBadge } from "@/components/ui/LevelBadge";

interface Props {
  params: Promise<{ locale: string }>;
}

const META = {
  ja: {
    title: "メンバーシップ",
    description:
      "Rork Lab メンバーシップで、プレミアム限定の上級ガイドやチュートリアルにアクセス。Pro プラン（¥380/月）と Premium プラン（¥1,480 永久アクセス）をご用意しています。",
  },
  en: {
    title: "Membership",
    description:
      "Access exclusive premium guides and advanced tutorials with Rork Lab Membership. Choose from Pro ($3/mo) or Premium ($10 lifetime).",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale as keyof typeof META] || META.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.title, description: m.description, images: [{ url: "https://rorklab.net/og/rorklab-og.png", width: 1200, height: 630, alt: "Rork Lab", type: "image/png" }] },
    alternates: {
      canonical:
        locale === "ja"
          ? "https://rorklab.net/membership"
          : "https://rorklab.net/en/membership",
      languages: {
        ja: "https://rorklab.net/membership",
        en: "https://rorklab.net/en/membership",
        "x-default": "https://rorklab.net/en/membership",
      },
    },
  };
}

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  ja: { beginner: "初級", intermediate: "中級", advanced: "上級" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  ja: { "rork-basics": "Rork 入門", "rork-dev": "開発ツール", "rork-ai": "AI モデル", "rork-business": "ビジネス", "app-dev": "アプリ開発" },
  en: { "rork-basics": "Getting Started", "rork-dev": "Dev Tools", "rork-ai": "AI Models", "rork-business": "Business", "app-dev": "App Dev" },
};

const PAGE_TEXT = {
  ja: {
    badge: "MEMBERSHIP",
    heading: "メンバーシップ",
    subheading: "プレミアム限定の上級ガイドとチュートリアル",
    description:
      "Rork Lab メンバーシップでは、毎週追加されるプレミアム記事にアクセスできます。Rork Max を使ったアプリ開発の上級テクニック、CI/CD、テスト、クラッシュ解析などの実践ガイドをお届けします。",
    features: [
      "すべてのプレミアム記事が読み放題",
      "毎週追加される限定コンテンツ",
      "上級テクニック・実践ガイド",
    ],
    pro: "Pro プラン",
    proPrice: "¥380/月",
    proDesc: "月額制で全プレミアム記事にアクセス",
    premium: "Premium プラン",
    premiumPrice: "¥1,480",
    premiumDesc: "一括払いで永久アクセス",
    recommended: "おすすめ",
    cta: "メンバーシップに登録する →",
    premiumArticles: "プレミアム記事",
    premiumCount: (n: number) => `${n} 本の限定記事`,
    noArticles: "プレミアム記事は準備中です。",
    locked: "PREMIUM",
  },
  en: {
    badge: "MEMBERSHIP",
    heading: "Membership",
    subheading: "Exclusive premium guides and tutorials",
    description:
      "Rork Lab Membership gives you access to premium articles added every week. Master advanced Rork Max techniques, CI/CD, testing, crash analytics, and more.",
    features: [
      "Unlimited access to all premium articles",
      "New exclusive content added every week",
      "Advanced techniques & hands-on guides",
    ],
    pro: "Pro Plan",
    proPrice: "$3/mo",
    proDesc: "Monthly access to all premium articles",
    premium: "Premium Plan",
    premiumPrice: "$10",
    premiumDesc: "One-time payment for lifetime access",
    recommended: "RECOMMENDED",
    cta: "Join Membership →",
    premiumArticles: "Premium Articles",
    premiumCount: (n: number) => `${n} exclusive article${n !== 1 ? "s" : ""}`,
    noArticles: "Premium articles coming soon.",
    locked: "PREMIUM",
  },
};

export default async function MembershipPage({ params }: Props) {
  const { locale } = await params;
  const t = PAGE_TEXT[locale as keyof typeof PAGE_TEXT] || PAGE_TEXT.en;
  const prefix = locale === "ja" ? "" : `/${locale}`;

  const allArticles = getArticles(locale);
  const premiumArticles = allArticles.filter((a) => a.premium);

  const catColor = (id: string) =>
    CATEGORIES.find((c) => c.id === id)?.color || "var(--text-muted)";
  const catIcon = (id: string) =>
    CATEGORIES.find((c) => c.id === id)?.icon || "";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Hero Section */}
      <section
        style={{
          marginBottom: 56,
          padding: "48px 36px",
          borderRadius: 16,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 20%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 3%, var(--bg-surface))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent-coral)", letterSpacing: "0.15em" }}>
            {t.badge}
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 8 }}>
          {t.heading}
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.7, maxWidth: 640 }}>
          {t.subheading}
        </p>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.8, marginBottom: 28, maxWidth: 640 }}>
          {t.description}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {t.features.map((f) => (
            <li key={f} style={{ fontSize: 13, color: "var(--text-muted)", paddingLeft: 20, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "var(--accent-coral)" }}>✦</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Plans */}
        <div style={{ display: "flex", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
          {/* Pro — Recommended */}
          <a
            href={`${prefix}/support#membership`}
            className="plan-card"
            style={{
              display: "block",
              padding: "16px 24px",
              borderRadius: 10,
              border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
              background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-primary))",
              minWidth: 200,
              textDecoration: "none",
              position: "relative",
              transition: "all 0.25s",
            }}
          >
            <span style={{
              position: "absolute", top: -9, right: 12,
              fontSize: 9, fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em",
              padding: "3px 8px 1px", borderRadius: 4,
              background: "var(--accent-coral)", color: "var(--bg-primary)",
              fontWeight: 700,
            }}>
              {t.recommended}
            </span>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{t.pro}</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: "var(--accent-coral)", marginBottom: 4 }}>{t.proPrice}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{t.proDesc}</div>
          </a>
          {/* Premium */}
          <a
            href={`${prefix}/support#membership`}
            className="plan-card"
            style={{
              display: "block",
              padding: "16px 24px",
              borderRadius: 10,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-primary)",
              minWidth: 200,
              textDecoration: "none",
              transition: "all 0.25s",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{t.premium}</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: "var(--accent-coral)", marginBottom: 4 }}>{t.premiumPrice}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{t.premiumDesc}</div>
          </a>
        </div>

        <a
          href={`${prefix}/support`}
          className="membership-cta"
          style={{
            display: "inline-block",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--accent-coral)",
            textDecoration: "none",
            padding: "12px 28px",
            borderRadius: 8,
            border: "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
            background: "color-mix(in srgb, var(--accent-coral) 8%, transparent)",
            transition: "all 0.25s",
          }}
        >
          {t.cta}
        </a>
      </section>

      {/* Premium Articles Section */}
      <section>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            PREMIUM ARTICLES
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {t.premiumArticles}
          </h2>
          <span style={{ fontSize: 13, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
            {t.premiumCount(premiumArticles.length)}
          </span>
        </div>

        {premiumArticles.length === 0 ? (
          <p style={{ color: "var(--text-dim)", fontSize: 15 }}>{t.noArticles}</p>
        ) : (
          <div>
            {premiumArticles.map((article) => (
              <a
                key={`${article.category}/${article.slug}`}
                href={`${prefix}/articles/${article.category}/${article.slug}`}
                style={{
                  display: "block",
                  padding: "24px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  transition: "padding-left 0.3s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "0.1em",
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "color-mix(in srgb, var(--accent-coral) 12%, transparent)",
                      color: "var(--accent-coral)",
                    }}
                  >
                    {t.locked}
                  </span>
                  <span style={{ fontSize: 11, color: catColor(article.category), fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
                    {catIcon(article.category)} {CATEGORY_LABELS[locale]?.[article.category] || article.category}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-faint)" }}>/</span>
                  <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
                    {article.date?.split("T")[0]}
                  </span>
                  <LevelBadge
                    level={article.level}
                    label={LEVEL_LABELS[locale]?.[article.level] || article.level}
                  />
                </div>
                <h3 style={{ fontSize: "clamp(16px, 2.5vw, 19px)", fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6, lineHeight: 1.5 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 680 }}>
                  {article.description}
                </p>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
