import { getArticles, CATEGORIES } from "@/lib/content";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { ArticlePagination } from "@/components/ui/ArticlePagination";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const isJa = locale === "ja";
  const page = parseInt(sp.page || "1", 10) || 1;

  return {
    title: isJa ? "すべての記事" : "All Articles",
    description: isJa
      ? "Rork Max の使い方・開発テクニック・AI連携・収益化まで、すべての記事を一覧できます。"
      : "Browse all articles covering Rork Max usage, development techniques, AI integrations, and monetization strategies.",
    openGraph: {
      title: isJa ? "すべての記事" : "All Articles",
      description: isJa
        ? "Rork Max の使い方・開発テクニック・AI連携・収益化まで、すべての記事を一覧できます。"
        : "Browse all articles covering Rork Max usage, development techniques, AI integrations, and monetization strategies.",
      images: [{ url: "https://rorklab.net/og/rorklab-og.png", width: 1200, height: 630, alt: "Rork Lab", type: "image/png" }],
    },
    alternates: {
      canonical: locale === "ja" ? "https://rorklab.net/articles" : "https://rorklab.net/en/articles",
      languages: {
        ja: "https://rorklab.net/articles",
        en: "https://rorklab.net/en/articles",
        "x-default": "https://rorklab.net/en/articles",
      },
    },
  };
}

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  ja: { beginner: "初級", intermediate: "中級", advanced: "上級" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};

const SECTION_TITLE: Record<string, string> = {
  ja: "すべての記事",
  en: "All Articles",
};

const ARTICLES_PER_PAGE = 12;

export default async function ArticlesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const currentPage = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const filterCategory = sp.category || "";

  let articles = getArticles(locale);

  // Category filter
  if (filterCategory && CATEGORIES.some((c) => c.id === filterCategory)) {
    articles = articles.filter((a) => a.category === filterCategory);
  }

  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const startIdx = (safePage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIdx, startIdx + ARTICLES_PER_PAGE);

  const catColor = (id: string) =>
    CATEGORIES.find((c) => c.id === id)?.color || "var(--text-muted)";
  const catIcon = (id: string) =>
    CATEGORIES.find((c) => c.id === id)?.icon || "";

  const CATEGORY_LABELS: Record<string, Record<string, string>> = {
    ja: {
      "rork-basics": "Rork入門",
      "rork-dev": "開発ツール",
      "rork-ai": "AIモデル",
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

  const prefix = locale === "ja" ? "" : `/${locale}`;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            ARTICLES
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          {SECTION_TITLE[locale] || SECTION_TITLE.en}
        </h1>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        <a
          href={`${prefix}/articles`}
          style={{
            fontSize: 12,
            fontFamily: "'DM Mono', monospace",
            padding: "6px 14px",
            borderRadius: 6,
            border: `1px solid ${!filterCategory ? "var(--accent)" : "var(--border)"}`,
            background: !filterCategory ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
            color: !filterCategory ? "var(--accent)" : "var(--text-muted)",
            textDecoration: "none",
            transition: "all 0.2s",
            letterSpacing: "0.04em",
          }}
        >
          {locale === "ja" ? "すべて" : "All"} ({getArticles(locale).length})
        </a>
        {CATEGORIES.map((cat) => {
          const count = getArticles(locale).filter((a) => a.category === cat.id).length;
          const isActive = filterCategory === cat.id;
          return (
            <a
              key={cat.id}
              href={`${prefix}/articles?category=${cat.id}`}
              style={{
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${isActive ? cat.color : "var(--border)"}`,
                background: isActive ? `color-mix(in srgb, ${cat.color} 10%, transparent)` : "transparent",
                color: isActive ? cat.color : "var(--text-muted)",
                textDecoration: "none",
                transition: "all 0.2s",
                letterSpacing: "0.04em",
              }}
            >
              {cat.icon} {CATEGORY_LABELS[locale]?.[cat.id] || cat.id} ({count})
            </a>
          );
        })}
      </div>

      {/* Articles List */}
      {paginatedArticles.length === 0 ? (
        <p style={{ color: "var(--text-dim)", fontSize: 15 }}>
          {locale === "ja" ? "記事はまだありません。" : "No articles yet."}
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
          basePath={`${prefix}/articles`}
          category={filterCategory}
          locale={locale}
        />
      )}
    </div>
  );
}
