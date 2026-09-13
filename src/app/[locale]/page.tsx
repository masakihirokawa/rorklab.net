import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import HomeClient from "./HomeClient";

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<string, { title: string; description: string }> = {
  ja: {
    title: "Rork Lab — Rork Max 日本語ナレッジベース",
    description:
      "Rork と Rork Max の初心者から上級者までを対象にした日本語ナレッジベースです。基本機能の使い方、React Native や Expo との開発ツール連携、Gemini・Claude などの AI 統合、App Store 公開と収益化まで、実践的な記事を日々更新しています。",
  },
  en: {
    title: "Rork Lab — Rork Max Knowledge Base",
    description:
      "Comprehensive knowledge base for Rork Max, the AI-powered mobile app builder. From getting started to advanced topics — guides, tutorials, and integrations.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const prefix = locale === "ja" ? "" : `/${locale}`;
  const url = `https://rorklab.net${prefix}`;

  return {
    title: { absolute: m.title },
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      type: "website",
      siteName: "Rork Lab",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      images: [{ url: "https://rorklab.net/og/rorklab-og.png", width: 1200, height: 1200, alt: "Rork Lab", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      images: [{ url: "https://rorklab.net/og/rorklab-og.png", alt: "Rork Lab" }],
    },
    alternates: {
      canonical: url,
      languages: {
        ja: "https://rorklab.net",
        en: "https://rorklab.net/en",
        "x-default": "https://rorklab.net/en",
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  // トップで本文まで描画するのは最新 10 本。残りは件数計算にしか使わないので description / tags を落とし、
  // 全記事メタを丸ごと RSC ペイロードに載せていた旧実装（約 480KB）を解消する（2026-09-13）。
  const articles = getArticles(locale).map((a, i) => (i < 10 ? a : { ...a, description: "", tags: [] }));

  const prefix = locale === "ja" ? "" : `/${locale}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rork Lab",
    url: `https://rorklab.net${prefix}`,
    description: META[locale]?.description || META.en.description,
    inLanguage: locale === "ja" ? "ja" : "en",
    publisher: {
      "@type": "Organization",
      name: "Rork Lab",
      url: "https://rorklab.net",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient articles={articles} locale={locale} />
    </>
  );
}
