import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, CATEGORIES } from "@/lib/content";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { ArticlePagination } from "@/components/ui/ArticlePagination";

/* ── Valid levels ── */
const VALID_LEVELS = ["beginner", "intermediate", "advanced"] as const;
type ValidLevel = (typeof VALID_LEVELS)[number];

/**
 * Map from MDX frontmatter `level` values to which filter levels they belong to.
 * e.g. "beginner-intermediate" matches both beginner and intermediate.
 */
const LEVEL_MATCH: Record<string, ValidLevel[]> = {
  beginner: ["beginner"],
  "beginner-intermediate": ["beginner", "intermediate"],
  intermediate: ["intermediate"],
  "intermediate-advanced": ["intermediate", "advanced"],
  advanced: ["advanced"],
};

const LEVEL_META: Record<string, { ja: string; en: string; icon: string; color: string }> = {
  beginner: { ja: "初級", en: "Beginner", icon: "◇", color: "var(--accent-green)" },
  intermediate: { ja: "中級", en: "Intermediate", icon: "◆", color: "var(--accent-gold)" },
  advanced: { ja: "上級", en: "Advanced", icon: "◈", color: "var(--accent-coral)" },
};

/* ── Pagination ── */
const ARTICLES_PER_PAGE = 12;

/* ── Props ── */
interface Props {
  params: Promise<{ locale: string; level: string }>;
  searchParams: Promise<{ page?: string }>;
}

/* ── Static generation ── */
export async function generateStaticParams() {
  return VALID_LEVELS.flatMap((level) => [
    { locale: "ja", level },
    { locale: "en", level },
  ]);
}

/* ── Metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, level } = await params;
  if (!VALID_LEVELS.includes(level as ValidLevel)) return {};

  const meta = LEVEL_META[level];
  const label = locale === "ja" ? meta.ja : meta.en;
  const title = locale === "ja" ? `${label}の記事一覧` : `${label} Articles`;
  const description =
    locale === "ja"
      ? `Rork Lab の${label}向け記事を一覧で閲覧できます。`
      : `Browse all ${label.toLowerCase()}-level articles on Rork Lab.`;

  const base = "https://rorklab.net";
  const canonical = locale === "ja" ? `${base}/level/${level}` : `${base}/en/level/${level}`;

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical,
      languages: {
        ja: `${base}/level/${level}`,
        en: `${base}/en/level/${level}`,
      },
    },
  };
}

/* ── Label maps (kept inline to avoid dependency on client-only translation) ── */
const LEVEL_LABELS: Record<string, Record<string, string>> = {
  ja: { beginner: "初級", "beginner-intermediate": "初級", intermediate: "中級", "intermediate-advanced": "中〜上級", advanced: "上級" },
  en: { beginner: "Beginner", "beginner-intermediate": "Beginner", intermediate: "Intermediate", "intermediate-advanced": "Int-Adv", advanced: "Advanced" },
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  ja: {
    "rork-basics": "Rork 入門",
    "rork-dev": "開発ツール",
    "rork-ai": "AI モデル",
    "rork-business": "ビジネス",
    "app-dev": "アプリ開発",
  },
  en: {
    "rork-basics": "Getting Started",
    "rork-dev": "Dev Tools",
    "rork-ai": "AI Models",
    "rork-business": "Business",
    "app-dev": "App Dev",
  },
};

/* ── Page ── */
export default async function LevelPage({ params, searchParams }: Props) {
  const { locale, level } = await params;
  const sp = await searchParams;

  if (!VALID_LEVELS.includes(level as ValidLevel)) notFound();

  const meta = LEVEL_META[level];
  const label = locale === "ja" ? meta.ja : meta.en;

  /* Filter articles whose level matches this page */
  const allArticles = getArticles(locale);
  const articles = allArticles.filter((a) => {
    const matches = LEVEL_MATCH[a.level];
    return matches ? matches.includes(level as ValidLevel) : false;
  });

  /* Pagination */
  const currentPage = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const startIdx = (safePage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIdx, startIdx + ARTICLES_PER_PAGE);

  const catColor = (id: string) => CATEGORIES.find((c) => c.id === id)?.color || "var(--text-muted)";
  const catIcon = (id: string) => CATEGORIES.find((c) => c.id === id)?.icon || "";
  const prefix = locale === "ja" ? "" : `/${locale}`;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: `color-mix(in srgb, ${meta.color} 40%, transparent)` }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            LEVEL
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {label}
          </h1>
          <span
            style={{
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 4,
              background: `color-mix(in srgb, ${meta.color} 10%, transparent)`,
              color: meta.color,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.04em",
            }}
          >
            {articles.length} {locale === "ja" ? "記事" : "articles"}
          </span>
        </div>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 600 }}>
          {locale === "ja"
            ? level === "beginner"
              ? "はじめての方に最適な記事です。基本概念から丁寧に解説しています。"
              : level === "intermediate"
                ? "基礎を理解した方向けの記事です。実践的なテクニックを紹介しています。"
                : "上級者向けの深掘り記事です。高度な活用法やベストプラクティスを解説しています。"
            : level === "beginner"
              ? "Perfect for getting started. These articles cover fundamental concepts step by step."
              : level === "intermediate"
                ? "For those with a solid foundation. Practical techniques and real-world applications."
                : "Deep dives for power users. Advanced strategies and best practices."}
        </p>
      </div>

      {/* Level Switcher */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {VALID_LEVELS.map((lv) => {
          const lvMeta = LEVEL_META[lv];
          const lvLabel = locale === "ja" ? lvMeta.ja : lvMeta.en;
          const isActive = lv === level;
          const count = allArticles.filter((a) => {
            const matches = LEVEL_MATCH[a.level];
            return matches ? matches.includes(lv) : false;
          }).length;
          return (
            <a
              key={lv}
              href={`${prefix}/level/${lv}`}
              style={{
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${isActive ? lvMeta.color : "var(--border)"}`,
                background: isActive ? `color-mix(in srgb, ${lvMeta.color} 10%, transparent)` : "transparent",
                color: isActive ? lvMeta.color : "var(--text-muted)",
                textDecoration: "none",
                transition: "all 0.2s",
                letterSpacing: "0.04em",
              }}
            >
              {lvMeta.icon} {lvLabel} ({count})
            </a>
          );
        })}
      </div>

      {/* Articles List */}
      {paginatedArticles.length === 0 ? (
        <p style={{ color: "var(--text-dim)", fontSize: 15 }}>
          {locale === "ja" ? "この難易度の記事はまだありません。" : "No articles at this level yet."}
        </p>
      ) : (
        <div>
          {paginatedArticles.map((article) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <ArticlePagination
          currentPage={safePage}
          totalPages={totalPages}
          basePath={`${prefix}/level/${level}`}
          locale={locale}
        />
      )}
    </div>
  );
}
