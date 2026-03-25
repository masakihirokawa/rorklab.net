import { getBlogPost, getBlogContent, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      images: [{ url: "https://rorklab.net/og/default.png", width: 1200, height: 1200, alt: post.meta.title, type: "image/png" }],
    },
    alternates: {
      canonical: locale === "ja" ? `https://rorklab.net/blog/${slug}` : `https://rorklab.net/en/blog/${slug}`,
      languages: {
        ja: `https://rorklab.net/blog/${slug}`,
        en: `https://rorklab.net/en/blog/${slug}`,
        "x-default": `https://rorklab.net/en/blog/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const locales = ["ja", "en"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) notFound();

  const content = await getBlogContent(locale, slug);

  const isJa = locale === "ja";
  const prefix = locale === "ja" ? "" : `/${locale}`;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
        <a
          href={`${prefix}/blog`}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "var(--text-dim)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}
        >
          ← {isJa ? "ブログ一覧" : "Back to Blog"}
        </a>
      </div>

      {/* Meta */}
      <div style={{ marginBottom: 8 }}>
        <time
          dateTime={post.meta.date}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "var(--text-faint)",
            letterSpacing: "0.04em",
          }}
        >
          {post.meta.date}
        </time>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(22px, 4vw, 32px)",
          fontWeight: 300,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          lineHeight: 1.4,
          marginBottom: 16,
        }}
      >
        {post.meta.title}
      </h1>

      {/* Tags */}
      {post.meta.tags.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 32, flexWrap: "wrap" }}>
          {post.meta.tags.map((tag) => (
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

      {/* Content */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.meta.title,
            description: post.meta.description,
            datePublished: post.meta.date,
            author: {
              "@type": "Person",
              name: "Masaki Hirokawa",
              url: "https://dolice.design",
            },
            publisher: {
              "@type": "Organization",
              name: "Rork Lab",
              url: "https://rorklab.net",
            },
          }),
        }}
      />
    </div>
  );
}
