import { notFound } from "next/navigation";
import { getArticlesByCategory, CATEGORIES } from "@/lib/content";
import { LevelBadge } from "@/components/ui/LevelBadge";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  ja: { beginner: "初級", intermediate: "中級", advanced: "上級", "intermediate-advanced": "中〜上級" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", "intermediate-advanced": "Int-Adv" },
};

const CATEGORY_NAMES: Record<string, Record<string, string>> = {
  "rork-basics": { ja: "Rork 入門", en: "Getting Started" },
  "rork-dev": { ja: "開発ツール", en: "Dev Tools" },
  "rork-ai": { ja: "AI モデル", en: "AI Models" },
  "rork-business": { ja: "ビジネス", en: "Business" },
  "app-dev": { ja: "アプリ開発", en: "App Dev" },
};

const CATEGORY_DESC: Record<string, Record<string, string>> = {
  "rork-basics": {
    ja: "RorkとRork Maxの始め方、プロンプトの基本的な書き方、Todoアプリや家計簿などの初心者向けチュートリアル、他のノーコードツールとの比較まで、AIでのアプリ開発をこれから始める方に向けた入門記事を集めています。",
    en: "Getting-started guides, prompt-writing basics, beginner tutorials, and comparisons with other no-code tools for anyone new to building apps with Rork.",
  },
  "rork-dev": {
    ja: "React NativeとExpoの実装テクニック、ビルドエラーやクラッシュのトラブルシューティング、認証・通知・課金などのAPI連携まで、Rorkで生成したコードを本番品質へ育てるための開発者向けの実践記事を集めています。",
    en: "React Native and Expo techniques, build-error and crash troubleshooting, and API integrations that help you take Rork-generated code to production quality.",
  },
  "rork-ai": {
    ja: "GeminiやClaude、GPTといったAIモデルの統合手順、プロンプト設計の実践、AIアプリビルダーの比較レビューまで、RorkのAI機能を深く使いこなすための記事をまとめています。ストリーミング応答や音声機能の実装例も扱います。",
    en: "Hands-on guides for integrating Gemini, Claude, and GPT into Rork apps, along with prompt design techniques and in-depth AI app builder comparisons.",
  },
  "rork-business": {
    ja: "App StoreとGoogle Playへの公開手順、審査リジェクト対策、AdMob広告やサブスクリプションによる収益化、料金プランの選び方まで、Rorkで作ったアプリをビジネスとして育てるための実務記事を集めています。",
    en: "Publishing to the App Store and Google Play, fixing review rejections, and growing revenue with ads, subscriptions, and smart pricing strategy.",
  },
  "app-dev": {
    ja: "React NativeとExpoを軸にしたアプリ設計の考え方、ストア用スクリーンショットなどの素材制作、パフォーマンス改善、リリース後の運用まで、個人開発でモバイルアプリを作り届けるための実践的な記事をまとめています。",
    en: "Mobile architecture with React Native and Expo, store asset production, performance tuning, and post-launch operations for indie developers shipping apps.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const catName = CATEGORY_NAMES[category]?.[locale] || category;
  const catDesc = CATEGORY_DESC[category]?.[locale] || "";
  const isJa = locale === "ja";

  return {
    title: catName,
    description: isJa
      ? `Rork Lab の「${catName}」カテゴリ記事一覧。${catDesc}`
      : `All articles in the "${catName}" category on Rork Lab. ${catDesc}`,
    openGraph: {
      title: catName,
      description: isJa
        ? `Rork Lab の「${catName}」カテゴリ記事一覧。${catDesc}`
        : `All articles in the "${catName}" category on Rork Lab. ${catDesc}`,
      images: [{ url: "https://rorklab.net/og/rorklab-og.png", width: 1200, height: 1200, alt: "Rork Lab", type: "image/png" }],
    },
    alternates: {
      canonical: locale === "ja" ? `https://rorklab.net/articles/${category}` : `https://rorklab.net/en/articles/${category}`,
      languages: {
        ja: `https://rorklab.net/articles/${category}`,
        en: `https://rorklab.net/en/articles/${category}`,
        "x-default": `https://rorklab.net/en/articles/${category}`,
      },
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;

  const validCategories: string[] = CATEGORIES.map((c) => c.id);
  if (!validCategories.includes(category)) {
    notFound();
  }

  const articles = getArticlesByCategory(locale, category);
  const cat = CATEGORIES.find((c) => c.id === category);
  const catName = CATEGORY_NAMES[category]?.[locale] || category;
  const catDesc = CATEGORY_DESC[category]?.[locale] || "";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 20, height: 1, background: `color-mix(in srgb, ${cat?.color || "var(--accent-coral)"} 40%, transparent)` }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
            {cat?.icon} {catName}
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 8 }}>
          {catName}
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
          {catDesc}
        </p>
      </div>

      {/* Articles List */}
      {articles.length === 0 ? (
        <p style={{ color: "var(--text-dim)", fontSize: 15 }}>
          {locale === "ja" ? "このカテゴリの記事はまだありません。" : "No articles in this category yet."}
        </p>
      ) : (
        <div>
          {articles.map((article) => (
            <a
              key={article.slug}
              href={`/${locale === "ja" ? "" : locale + "/"}articles/${article.category}/${article.slug}`}
              style={{
                display: "block",
                padding: "24px 0",
                borderBottom: "1px solid var(--border-subtle)",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
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

      {/* Back link */}
      <div style={{ marginTop: 40 }}>
        <a
          href={`/${locale === "ja" ? "" : locale + "/"}articles`}
          style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em" }}
        >
          ← {locale === "ja" ? "すべての記事" : "All Articles"}
        </a>
      </div>
    </div>
  );
}
