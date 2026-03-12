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
      "Rork Max の初心者から上級者までを対象にした日本語ナレッジベース。基本機能、開発ツール連携、AI 統合、ビジネス活用まで網羅。",
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
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      locale: locale === "ja" ? "ja_JP" : "en_US",
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
  const articles = getArticles(locale);

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
    potentialAction: {
      "@type": "SearchAction",
      target: `https://rorklab.net${prefix}/articles?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const FAQ_DATA: Record<string, { q: string; a: string }[]> = {
    ja: [
      { q: "Rork Maxとは何ですか？", a: "Rork Maxは、ノーコード・ローコード技術を活用したAI駆動の mobile app builder です。プログラミング知識がなくても、高機能なモバイルアプリケーションを迅速に開発・公開できます。" },
      { q: "対応プラットフォームは？", a: "Rork Maxでは、iOS・Android の両プラットフォームに対応したアプリを同時に開発できます。開発ツール連携により、複雑な機能もシンプルに実装可能です。" },
      { q: "料金は？", a: "Rork Maxは複数の料金プランをご用意しています。個人開発者向けの無料プランから、エンタープライズ向けのカスタムプランまで、幅広い選択肢があります。詳細はお問い合わせください。" },
      { q: "AI連携はできますか？", a: "はい。Rork MaxはAI技術との連携を得意とします。ChatGPT・Claude などの最新LLMを組み込むことで、スマートな UI/UX を実現できます。" },
      { q: "App Storeへの公開はサポートされますか？", a: "もちろんです。Rork Maxで開発したアプリは、iOS App Store・Google Play Store への公開プロセスを完全サポートしています。" },
    ],
    en: [
      { q: "What is Rork Max?", a: "Rork Max is an AI-powered, no-code/low-code mobile app builder. You can rapidly develop and publish high-quality mobile applications for iOS and Android without programming knowledge." },
      { q: "What platforms does it support?", a: "Rork Max supports both iOS and Android platforms, allowing you to develop for both simultaneously. Developer tool integrations enable complex features to be implemented simply." },
      { q: "What are the pricing options?", a: "Rork Max offers multiple pricing plans from a free tier for individual developers to custom enterprise plans. Please contact us for detailed pricing information." },
      { q: "Can it integrate with AI services?", a: "Yes. Rork Max excels at integrating with AI technologies. You can embed the latest LLMs like ChatGPT and Claude to create smart, intelligent user experiences." },
      { q: "Does it support App Store publishing?", a: "Absolutely. Rork Max fully supports the publishing process to iOS App Store and Google Play Store, making app distribution straightforward." },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (FAQ_DATA[locale] || FAQ_DATA.en).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <HomeClient articles={articles} locale={locale} />
    </>
  );
}
