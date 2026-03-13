import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllArticleSlugs, CATEGORIES } from "@/lib/content";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { BookRecommendation } from "@/components/ui/BookRecommendation";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { RelatedArticles } from "@/components/ui/RelatedArticles";
import { TableOfContents } from "@/components/ui/TableOfContents";

interface Props {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const article = getArticle(locale, category, slug);

  if (!article) return {};

  const prefix = locale === "ja" ? "" : `/${locale}`;
  const url = `https://rorklab.net${prefix}/articles/${category}/${slug}`;

  return {
    title: article.meta.title,
    description: article.meta.description,
    keywords: article.meta.tags,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      url,
      type: "article",
      publishedTime: article.meta.date,
      modifiedTime: article.meta.updated || article.meta.date,
      authors: [article.meta.author],
      tags: article.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.description,
    },
    alternates: {
      canonical: url,
      languages: {
        ja: `https://rorklab.net/articles/${category}/${slug}`,
        en: `https://rorklab.net/en/articles/${category}/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const locales = ["ja", "en"];
  const params: { locale: string; category: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllArticleSlugs(locale);
    for (const { category, slug } of slugs) {
      params.push({ locale, category, slug });
    }
  }

  return params;
}

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  ja: { beginner: "初級", intermediate: "中級", advanced: "上級" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  ja: {
    "rork-basics": "Rork入門",
    "rork-dev": "開発ツール",
    "rork-ai": "AIモデル",
    "rork-business": "ビジネス",
  },
  en: {
    "rork-basics": "Getting Started",
    "rork-dev": "Dev Tools",
    "rork-ai": "AI Models",
    "rork-business": "Business",
  },
};


// Extract headings from compiled HTML for SSR-safe TableOfContents (no CLS)
function extractTocItems(html: string): { id: string; text: string; level: number }[] {
  const items: { id: string; text: string; level: number }[] = [];
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let i = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    items.push({
      id: `section-${i++}`,
      text: match[2].replace(/<[^>]+>/g, "").trim(),
      level: parseInt(match[1]),
    });
  }
  return items;
}
export default async function ArticlePage({ params }: Props) {
  const { locale, category, slug } = await params;
  const article = getArticle(locale, category, slug);

  if (!article) {
    notFound();
  }

  const catInfo = CATEGORIES.find((c) => c.id === category);
  const prefix = locale === "ja" ? "" : `/${locale}`;

  const articleUrl = `https://rorklab.net${prefix}/articles/${category}/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta.title,
    description: article.meta.description,
    author: { "@type": "Person", name: article.meta.author },
    datePublished: article.meta.date,
    dateModified: article.meta.updated || article.meta.date,
    publisher: { "@type": "Organization", name: "Rork Lab", url: "https://rorklab.net" },
    url: articleUrl,
    inLanguage: locale === "ja" ? "ja" : "en",
    keywords: article.meta.tags.join(", "),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".article-content h2", ".article-content p:first-of-type"],
    },
  };

  // BreadcrumbList for AI crawlers & Google rich results
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://rorklab.net${prefix || "/"}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: CATEGORY_LABELS[locale]?.[category] || category,
        item: `https://rorklab.net${prefix}/articles/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.meta.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
    <article style={{ maxWidth: 740, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
        <a
          href={`/${locale === "ja" ? "" : locale + "/"}articles`}
          style={{
            fontSize: 12,
            color: "var(--text-dim)",
            textDecoration: "none",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.06em",
          }}
        >
          {locale === "ja" ? "記事一覧" : "Articles"}
        </a>
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>/</span>
        <span
          style={{
            fontSize: 12,
            color: catInfo?.color || "var(--text-dim)",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.06em",
          }}
        >
          {CATEGORY_LABELS[locale]?.[category] || category}
        </span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 12,
              color: catInfo?.color || "var(--text-muted)",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.06em",
            }}
          >
            {catInfo?.icon} {CATEGORY_LABELS[locale]?.[category] || category}
          </span>
          <span style={{ fontSize: 11, color: "var(--text-faint)" }}>/</span>
          <span style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
            {article.meta.date?.split("T")[0]}
          </span>
          <LevelBadge
            level={article.meta.level}
            label={LEVEL_LABELS[locale]?.[article.meta.level] || article.meta.level}
          />
        </div>

        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          {article.meta.title}
        </h1>

        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7 }}>
          {article.meta.description}
        </p>

        {article.meta.tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {article.meta.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  padding: "2px 10px",
                  borderRadius: 3,
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-dim)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid var(--border-subtle)", marginBottom: 40 }} />

      {/* Table of Contents */}
      <TableOfContents locale={locale} initialItems={extractTocItems(article.content)} />

      {/* Article Content — paywall temporarily disabled; full content shown */}
      {article.meta.premium && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 4, border: "1px solid var(--border-subtle)", fontSize: 11, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace", marginBottom: 24 }}>
          ✦ {locale === "ja" ? "プレミアム記事" : "Premium Article"}
        </div>
      )}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Share Buttons */}
      <ShareButtons
        title={article.meta.title}
        url={`https://rorklab.net${prefix}/articles/${category}/${slug}`}
      />

      {/* Related Articles */}
      <RelatedArticles
        locale={locale}
        currentSlug={slug}
        currentCategory={category}
        currentTags={article.meta.tags}
      />

      {/* Book Recommendations */}
      <BookRecommendation locale={locale} />
    </article>
    </>
  );
}
