import { getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === "ja";
  return {
    title: isJa ? "ブログ" : "Blog",
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = getBlogPosts(locale);
  const isJa = locale === "ja";
  const prefix = locale === "ja" ? "" : `/${locale}`;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            BLOG
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 8 }}>
          {isJa ? "ブログ" : "Blog"}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
          {isJa
            ? "Rork Max に関する最新ニュース、アップデート情報、リリースノートをお届けします。"
            : "Latest news, updates, and release notes about Rork Max."}
        </p>
      </div>

      {/* Blog posts */}
      {posts.length === 0 ? (
        <div
          style={{
            padding: "60px 40px",
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            background: "var(--bg-surface)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.4 }}>✎</div>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: "var(--text-secondary)", marginBottom: 8 }}>
            {isJa ? "準備中" : "Coming Soon"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
            {isJa
              ? "ブログ記事を準備しています。"
              : "Blog posts are being prepared."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`${prefix}/blog/${post.slug}`}
              style={{
                display: "block",
                padding: "24px 0",
                borderBottom: "1px solid var(--border-subtle)",
                textDecoration: "none",
                color: "inherit",
                transition: "opacity 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h2 style={{
                    fontSize: 17,
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    marginBottom: 6,
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                  }}>
                    {post.title}
                  </h2>
                  <p style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {post.description}
                  </p>
                </div>
                <time
                  dateTime={post.date}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: "var(--text-faint)",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {post.date}
                </time>
              </div>
              {post.tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        fontFamily: "'DM Mono', monospace",
                        color: "var(--text-dim)",
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: 3,
                        padding: "2px 8px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
