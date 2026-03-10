import { getArticles, CATEGORIES, type ArticleMeta } from "@/lib/content";

interface RelatedArticlesProps {
  locale: string;
  currentSlug: string;
  currentCategory: string;
  currentTags: string[];
}

export function RelatedArticles({
  locale,
  currentSlug,
  currentCategory,
  currentTags,
}: RelatedArticlesProps) {
  const all = getArticles(locale);
  const label = locale === "ja" ? "関連記事" : "Related Articles";
  const catInfo = CATEGORIES.find((c) => c.id === currentCategory);
  const prefix = locale === "ja" ? "" : `/${locale}`;

  // Score-based matching: same category + shared tags
  const scored = all
    .filter((a) => a.slug !== currentSlug)
    .map((a) => {
      let score = 0;
      if (a.category === currentCategory) score += 3;
      const shared = a.tags.filter((t) => currentTags.includes(t)).length;
      score += shared * 2;
      return { article: a, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) return null;

  return (
    <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border-subtle)" }}>
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--text-primary)",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.04em",
          marginBottom: 20,
        }}
      >
        {label}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {scored.map(({ article }) => {
          const aCat = CATEGORIES.find((c) => c.id === article.category);
          return (
            <a
              key={article.slug}
              href={`${prefix}/articles/${article.category}/${article.slug}`}
              style={{
                display: "block",
                padding: "16px 20px",
                borderRadius: 8,
                border: "1px solid var(--border-subtle)",
                textDecoration: "none",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: aCat?.color || "var(--text-dim)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {aCat?.icon} {article.category}
                </span>
                <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{article.date}</span>
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.5,
                  marginBottom: 4,
                }}
              >
                {article.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {article.description}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
