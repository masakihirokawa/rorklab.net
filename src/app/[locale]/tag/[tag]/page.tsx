import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, CATEGORIES } from "@/lib/content";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { ArticlePagination } from "@/components/ui/ArticlePagination";

/* ── Pagination ── */
const ARTICLES_PER_PAGE = 12;

/* ── Label maps ── */
const LEVEL_LABELS: Record<string, Record<string, string>> = {
  ja: { beginner: "初級", "beginner-intermediate": "初級", intermediate: "中級", "intermediate-advanced": "中〜上級", advanced: "上級" },
  en: { beginner: "Beginner", "beginner-intermediate": "Beginner", intermediate: "Intermediate", "intermediate-advanced": "Int-Adv", advanced: "Advanced" },
};

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  ja: { "rork-basics": "Rork 基礎", "rork-dev": "Rork 開発", "rork-ai": "Rork AI", "rork-business": "ビジネス", "app-dev": "アプリ開発" },
  en: { "rork-basics": "Rork Basics", "rork-dev": "Rork Dev", "rork-ai": "Rork AI", "rork-business": "Business", "app-dev": "App Dev" },
};

/* ── Props ── */
interface Props {
  params: Promise<{ locale: string; tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

/* ── Metadata ── */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  const sp = await searchParams;
  const currentPage = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const decoded = decodeURIComponent(tag);
  const title = locale === "ja" ? `「${decoded}」の記事一覧` : `Articles tagged "${decoded}"`;
  const description =
    locale === "ja"
      ? `Rork Lab の「${decoded}」タグが付いた記事を一覧で閲覧できます。`
      : `Browse all Rork Lab articles tagged with "${decoded}".`;

  const base = "https://rorklab.net";
  const encoded = encodeURIComponent(decoded);
  const metadata: Metadata = {
    title,
    description,
    openGraph: { title, description, images: [{ url: "https://rorklab.net/og/rorklab-og.png", width: 1200, height: 630, alt: "Rork Lab", type: "image/png" }] },
    alternates: {
      canonical: locale === "ja" ? `${base}/tag/${encoded}` : `${base}/en/tag/${encoded}`,
      languages: {
        ja: `${base}/tag/${encoded}`,
        en: `${base}/en/tag/${encoded}`,
        "x-default": `${base}/en/tag/${encoded}`,
      },
    },
  };

  if (currentPage > 1) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}

/* ── Page ── */
export default async function TagPage({ params, searchParams }: Props) {
  const { locale, tag } = await params;
  const sp = await searchParams;
  const decoded = decodeURIComponent(tag);
  const prefix = locale === "ja" ? "" : `/${locale}`;

  /* Filter articles by tag (case-insensitive match) */
  const allArticles = getArticles(locale);
  const articles = allArticles.filter((a) =>
    (a.tags || []).some((t) => t.toLowerCase() === decoded.toLowerCase())
  );

  /* Return proper 404 for unknown tags — prevents soft 404 (#84) */
  if (articles.length === 0) {
    notFound();
  }

  /* Pagination */
  const currentPage = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const startIdx = (safePage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = articles.slice(startIdx, startIdx + ARTICLES_PER_PAGE);

  const catColor = (id: string) => CATEGORIES.find((c) => c.id === id)?.color || "var(--text-muted)";
  const catIcon = (id: string) => CATEGORIES.find((c) => c.id === id)?.icon || "";

  /* Collect related tags (tags that co-occur with the current tag) */
  const relatedMap = new Map<string, number>();
  for (const a of articles) {
    for (const t of a.tags || []) {
      if (t.toLowerCase() !== decoded.toLowerCase()) {
        relatedMap.set(t, (relatedMap.get(t) || 0) + 1);
      }
    }
  }
  const relatedTags = Array.from(relatedMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            TAG
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {decoded}
          </h1>
          <span
            style={{
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 4,
              background: "color-mix(in srgb, var(--accent-coral) 10%, transparent)",
              color: "var(--accent-coral)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {articles.length} {locale === "ja" ? "記事" : "articles"}
          </span>
        </div>
        <a
          href={`${prefix}/tags`}
          style={{
            fontSize: 12,
            color: "var(--text-dim)",
            textDecoration: "none",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.06em",
            transition: "color 0.2s",
          }}
        >
          ← {locale === "ja" ? "タグ一覧に戻る" : "Back to all tags"}
        </a>
      </div>

      {/* Related Tags */}
      {relatedTags.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginRight: 12 }}>
            {locale === "ja" ? "関連タグ:" : "Related:"}
          </span>
          <div style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
            {relatedTags.map(([t, count]) => (
              <a
                key={t}
                href={`${prefix}/tag/${encodeURIComponent(t)}`}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
                <sup style={{ fontSize: 9, marginLeft: 2, color: "var(--text-faint)" }}>{count}</sup>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Articles List */}
      {paginatedArticles.length === 0 ? (
        <p style={{ color: "var(--text-dim)", fontSize: 15 }}>
          {locale === "ja" ? "このタグの記事はまだありません。" : "No articles with this tag yet."}
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
          basePath={`${prefix}/tag/${encodeURIComponent(decoded)}`}
          locale={locale}
        />
      )}
    </div>
  );
}
