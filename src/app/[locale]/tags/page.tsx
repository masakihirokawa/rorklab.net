import type { Metadata } from "next";
import { getArticles } from "@/lib/content";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ja" ? "タグ一覧" : "All Tags";
  const description =
    locale === "ja"
      ? "Rork Lab の全記事をタグで分類。気になるトピックから記事を探せます。"
      : "Browse all Rork Lab articles by tag. Find articles on the topics that interest you.";

  const base = "https://rorklab.net";
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical: locale === "ja" ? `${base}/tags` : `${base}/en/tags`,
      languages: { ja: `${base}/tags`, en: `${base}/en/tags` },
    },
  };
}

/** Collect all tags from articles and count occurrences. */
function getTagCounts(locale: string): { tag: string; count: number }[] {
  const articles = getArticles(locale);
  const map = new Map<string, number>();
  for (const a of articles) {
    for (const tag of a.tags || []) {
      const normalised = tag.trim();
      if (normalised) map.set(normalised, (map.get(normalised) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export default async function TagsPage({ params }: Props) {
  const { locale } = await params;
  const prefix = locale === "ja" ? "" : `/${locale}`;
  const tagCounts = getTagCounts(locale);

  /* Determine font size range for the cloud */
  const maxCount = Math.max(...tagCounts.map((t) => t.count), 1);
  const minSize = 12;
  const maxSize = 28;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            TAGS
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          {locale === "ja" ? "タグ一覧" : "All Tags"}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8, lineHeight: 1.6 }}>
          {locale === "ja"
            ? `${tagCounts.length} 個のタグ、${tagCounts.reduce((s, t) => s + t.count, 0)} 記事`
            : `${tagCounts.length} tags across ${tagCounts.reduce((s, t) => s + t.count, 0)} articles`}
        </p>
      </div>

      {/* Tag Cloud */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 14px",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          borderRadius: 12,
          border: "1px solid var(--border-subtle)",
          background: "color-mix(in srgb, var(--bg-surface) 60%, transparent)",
          marginBottom: 48,
        }}
      >
        {tagCounts.map(({ tag, count }) => {
          const size = minSize + ((count - 1) / Math.max(maxCount - 1, 1)) * (maxSize - minSize);
          const opacity = 0.5 + (count / maxCount) * 0.5;
          return (
            <a
              key={tag}
              href={`${prefix}/tag/${encodeURIComponent(tag)}`}
              style={{
                fontSize: size,
                color: "var(--text-secondary)",
                textDecoration: "none",
                opacity,
                transition: "all 0.2s",
                padding: "4px 8px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              {tag}
              <sup style={{ fontSize: 10, color: "var(--text-dim)", marginLeft: 2 }}>{count}</sup>
            </a>
          );
        })}
      </div>

      {/* Tag List (sorted) */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 20, letterSpacing: "0.04em" }}>
          {locale === "ja" ? "タグ索引" : "Tag Index"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
          {tagCounts.map(({ tag, count }) => (
            <a
              key={tag}
              href={`${prefix}/tag/${encodeURIComponent(tag)}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: 6,
                border: "1px solid var(--border-subtle)",
                textDecoration: "none",
                fontSize: 13,
                color: "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tag}</span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "'DM Mono', monospace",
                  color: "var(--text-dim)",
                  marginLeft: 8,
                  flexShrink: 0,
                }}
              >
                {count}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
