import { getArticles, CATEGORIES } from "@/lib/content";
import type { Metadata } from "next";
import { BookRecommendation } from "@/components/ui/BookRecommendation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === "ja";
  return {
    title: isJa ? "学習ガイド" : "Learning Guides",
    description: isJa
      ? "目的別に整理した体系的な学習パスで Rork Max を使いこなせるようになるガイドページです。入門から React Native などの開発ツール連携、AI 活用、収益化まで、読む順番に迷わないようステップバイステップで案内します。"
      : "Master Rork Max with systematic, goal-oriented learning paths. Step-by-step guides from getting started to monetization.",
    openGraph: {
      title: isJa ? "学習ガイド" : "Learning Guides",
      description: isJa
        ? "目的別に整理した体系的な学習パスで Rork Max を使いこなせるようになるガイドページです。入門から React Native などの開発ツール連携、AI 活用、収益化まで、読む順番に迷わないようステップバイステップで案内します。"
        : "Master Rork Max with systematic, goal-oriented learning paths. Step-by-step guides from getting started to monetization.",
      images: [{ url: "https://rorklab.net/og/rorklab-og.png", width: 1200, height: 1200, alt: "Rork Lab", type: "image/png" }],
    },
    alternates: {
      canonical: locale === "ja" ? "https://rorklab.net/guides" : "https://rorklab.net/en/guides",
      languages: {
        ja: "https://rorklab.net/guides",
        en: "https://rorklab.net/en/guides",
        "x-default": "https://rorklab.net/en/guides",
      },
    },
  };
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
        ja: "Claude・Gemini などとの AI 連携と高度なプロンプト活用術",
        en: "AI integration with Claude, Gemini, and more, plus advanced prompting techniques",
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
          <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
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

      {/* Guide Tracks — 2026-10-09: 各トラックを「初級→中級→上級」の 3 段で各 4 本までに絞った（以前はカテゴリの全記事を並べ、1 ページ 1MB 超・リンク 900 本で、スマホでは横にはみ出していた）。
          残りはカテゴリ一覧（ページ送り）へ。剪定（noindex）記事より索引対象の記事を優先（#132） */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 24 }}>
        {tracks.map((track, i) => {
          const inTrack = articles.filter((a) => track.categories.includes(a.category));
          const byDate = (x: { date: string }, y: { date: string }) => (y.date || "").localeCompare(x.date || "");
          const pick = (level: string) => {
            const lv = inTrack.filter((a) => (level === "intermediate" ? a.level.startsWith("intermediate") : a.level === level));
            const indexable = lv.filter((a) => !a.noindex).sort(byDate);
            const rest = lv.filter((a) => a.noindex).sort(byDate);
            return [...indexable, ...rest].slice(0, 4);
          };
          const steps = [
            { level: "beginner", ja: "初級", en: "Beginner", color: "var(--accent-green)", icon: "◇" },
            { level: "intermediate", ja: "中級", en: "Intermediate", color: "var(--accent-gold)", icon: "◆" },
            { level: "advanced", ja: "上級", en: "Advanced", color: "var(--accent-coral)", icon: "◈" },
          ].map((s) => ({ ...s, items: pick(s.level) })).filter((s) => s.items.length > 0);
          const cat = CATEGORIES.find((c) => c.id === track.categories[0]);
          const catHref = `/${locale === "ja" ? "" : locale + "/"}articles/${track.categories[0]}`;
          let n = 0;

          return (
            <section
              key={i}
              className="guide-card"
              style={{
                minWidth: 0,
                padding: "clamp(20px, 4vw, 32px)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--bg-surface)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span aria-hidden="true" style={{ fontSize: 16, color: cat?.color || "var(--text-muted)" }}>
                  {cat?.icon}
                </span>
                <h2 style={{ fontSize: 18, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.5 }}>
                  {track.title[locale] || track.title.en}
                </h2>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
                {track.desc[locale] || track.desc.en}
              </p>

              {steps.length > 0 ? (
                <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 18 }}>
                  {steps.map((step, si) => (
                    <li key={step.level}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "var(--text-dim)" }}>
                        <span>STEP {si + 1}</span>
                        <span aria-hidden="true" style={{ color: step.color }}>{step.icon}</span>
                        <span style={{ color: step.color }}>{locale === "ja" ? step.ja : step.en}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {step.items.map((article) => {
                          n += 1;
                          return (
                            <a
                              key={article.slug}
                              href={`/${locale === "ja" ? "" : locale + "/"}articles/${article.category}/${article.slug}`}
                              className="guide-step-link"
                              style={{
                                display: "grid",
                                gridTemplateColumns: "auto minmax(0, 1fr)",
                                alignItems: "baseline",
                                gap: 12,
                                padding: "10px 14px",
                                borderRadius: 6,
                                border: "1px solid transparent",
                                background: "var(--bg-surface)",
                                textDecoration: "none",
                              }}
                            >
                              <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: 11, color: "var(--text-faint)", minWidth: 18 }}>
                                {String(n).padStart(2, "0")}
                              </span>
                              <span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", overflowWrap: "anywhere" }}>
                                {article.title}
                                {article.premium && (
                                  <span style={{ marginLeft: 8, fontSize: 10, fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", letterSpacing: "0.08em", color: "var(--accent-coral)", whiteSpace: "nowrap" }}>
                                    PREMIUM
                                  </span>
                                )}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p style={{ fontSize: 13, color: "var(--text-faint)", fontStyle: "italic" }}>
                  {locale === "ja" ? "コンテンツ準備中..." : "Content coming soon..."}
                </p>
              )}

              {inTrack.length > n && (
                <a
                  href={catHref}
                  style={{ marginTop: 20, alignSelf: "flex-start", fontSize: 13, color: "var(--accent-coral)", textDecoration: "none" }}
                >
                  {locale === "ja" ? `このテーマの記事をすべて見る（${inTrack.length} 本）→` : `See all ${inTrack.length} articles in this track →`}
                </a>
              )}
            </section>
          );
        })}
      </div>
      <BookRecommendation locale={locale} />
    </div>
  );
}
