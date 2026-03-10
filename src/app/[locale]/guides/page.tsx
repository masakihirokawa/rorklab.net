import { getArticles, CATEGORIES } from "@/lib/content";

interface Props {
  params: Promise<{ locale: string }>;
}

const GUIDE_TRACKS: Record<string, { title: Record<string, string>; desc: Record<string, string>; categories: string[] }[]> = {
  default: [
    {
      title: { ja: "Rork Max をはじめよう", en: "Getting Started with Rork Max" },
      desc: {
        ja: "初めてのアプリ生成から基本操作まで、Rork Max の使い方を学ぶ",
        en: "Learn the basics of Rork Max, from your first app generation to core features",
      },
      categories: ["rork-basics"],
    },
    {
      title: { ja: "開発ツールと連携する", en: "Developer Tools & Integrations" },
      desc: {
        ja: "Xcode 連携・GitHub 統合・CI/CD パイプラインの構築ガイド",
        en: "Guide to Xcode integration, GitHub workflows, and CI/CD pipelines",
      },
      categories: ["rork-dev"],
    },
    {
      title: { ja: "AI モデルを活用する", en: "Leverage AI Models" },
      desc: {
        ja: "Claude Opus 4.6 を中心とした AI 連携と高度なプロンプト活用術",
        en: "AI integration with Claude Opus 4.6 and advanced prompting techniques",
      },
      categories: ["rork-ai"],
    },
    {
      title: { ja: "収益化と App Store 公開", en: "Monetization & App Store Publishing" },
      desc: {
        ja: "App Store 審査対策からサブスクリプション設計・収益化戦略まで",
        en: "From App Store review guidelines to subscription design and monetization",
      },
      categories: ["rork-business"],
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
            ? "目的に合わせた体系的な学習パスで Rork Max を使いこなしましょう。"
            : "Master Rork Max with systematic learning paths tailored to your goals."}
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
              className="guide-card"
              style={{
                padding: "32px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--bg-surface)",
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
