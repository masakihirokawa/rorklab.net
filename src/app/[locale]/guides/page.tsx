import { getArticles, CATEGORIES } from "@/lib/content";

interface Props {
  params: Promise<{ locale: string }>;
}

const GUIDE_TRACKS: Record<string, { title: Record<string, string>; desc: Record<string, string>; categories: string[] }[]> = {
  default: [
    {
      title: { ja: "Claude.ai をはじめよう", en: "Getting Started with Claude.ai" },
      desc: {
        ja: "Web・モバイルアプリの基本操作から活用テクニックまで",
        en: "From basic operations to advanced techniques for the web and mobile apps",
      },
      categories: ["claude-ai"],
    },
    {
      title: { ja: "Claude Code で開発を加速する", en: "Accelerate Development with Claude Code" },
      desc: {
        ja: "CLI ツールのセットアップからプラグイン開発まで",
        en: "From CLI tool setup to plugin development",
      },
      categories: ["claude-code"],
    },
    {
      title: { ja: "Cowork でデスクトップ作業を自動化", en: "Automate Desktop Tasks with Cowork" },
      desc: {
        ja: "タスク管理とファイル操作の自動化ガイド",
        en: "Guide to task management and file operation automation",
      },
      categories: ["cowork"],
    },
    {
      title: { ja: "API / SDK で Claude を組み込む", en: "Integrate Claude with API / SDK" },
      desc: {
        ja: "開発者向け API 連携クイックスタート",
        en: "API integration quickstart for developers",
      },
      categories: ["api-sdk"],
    },
  ],
};

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  const articles = getArticles(locale);
  const tracks = GUIDE_TRACKS.default;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            SYSTEMATIC GUIDES
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 8 }}>
          {locale === "ja" ? "学習ガイド" : "Learning Guides"}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
          {locale === "ja"
            ? "目的に合わせた体系的な学習パスで Claude を使いこなしましょう。"
            : "Master Claude with systematic learning paths tailored to your goals."}
        </p>
      </div>

      {/* Guide Tracks */}
      <div style={{ display: "grid", gap: 24 }}>
        {tracks.map((track, i) => {
          const trackArticles = articles.filter((a) => track.categories.includes(a.category));
          const cat = CATEGORIES.find((c) => c.id === track.categories[0]);

          return (
            <div
              key={i}
              style={{
                padding: "32px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--bg-surface)",
                transition: "border-color 0.3s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: cat?.color || "var(--text-muted)" }}>
                  {cat?.icon}
                </span>
                <h2 style={{ fontSize: 18, fontWeight: 500, color: "var(--text-primary)" }}>
                  {track.title[locale] || track.title.en}
                </h2>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
                {track.desc[locale] || track.desc.en}
              </p>

              {trackArticles.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {trackArticles.map((article, j) => (
                    <a
                      key={article.slug}
                      href={`/${locale === "ja" ? "" : locale + "/"}articles/${article.category}/${article.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 16px",
                        borderRadius: 6,
                        background: "var(--bg-surface-hover)",
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                    >
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-faint)", minWidth: 20 }}>
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                        {article.title}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: "var(--text-faint)", fontStyle: "italic" }}>
                  {locale === "ja" ? "コンテンツ準備中..." : "Content coming soon..."}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
