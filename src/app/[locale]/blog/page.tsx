import { getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";
import { siteOgImage } from "@/lib/og";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === "ja";
  return {
    title: isJa ? "ブログ" : "Blog",
    description: isJa
      ? "Rork Lab ブログでは、Rork と Rork Max の最新ニュースや機能アップデート、資金調達などの企業動向、個人開発者のストーリーをお届けします。技術記事より少し柔らかい読み物として、開発の合間にお楽しみいただける内容です。"
      : "The Rork Lab blog covers the latest Rork and Rork Max news, feature updates, company milestones, and stories from indie developers building apps with AI.",
    openGraph: {
      title: isJa ? "ブログ" : "Blog",
      description: isJa
        ? "Rork Lab ブログでは、Rork と Rork Max の最新ニュースや機能アップデート、資金調達などの企業動向、個人開発者のストーリーをお届けします。技術記事より少し柔らかい読み物として、開発の合間にお楽しみいただける内容です。"
        : "The Rork Lab blog covers the latest Rork and Rork Max news, feature updates, company milestones, and stories from indie developers building apps with AI.",
      images: [{ url: siteOgImage(locale), width: 1200, height: 630, alt: "Rork Lab", type: "image/png" }],
    },
    alternates: {
      canonical: locale === "ja" ? "https://rorklab.net/blog" : "https://rorklab.net/en/blog",
      languages: {
        ja: "https://rorklab.net/blog",
        en: "https://rorklab.net/en/blog",
        "x-default": "https://rorklab.net/en/blog",
      },
    },
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
          <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
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
              className="bl"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div className="bl-row">
                <div className="bl-main">
                  <h2 className="bl-title">
                    {post.title}
                  </h2>
                  <p className="bl-desc">
                    {post.description}
                  </p>
                </div>
                <time
                  dateTime={post.date.split("T")[0]}
                  className="bl-date mono"
                >
                  {post.date.split("T")[0]}
                </time>
              </div>
              {post.tags.length > 0 && (
                <div className="bl-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bl-tag mono">
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
