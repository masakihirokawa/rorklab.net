import type { MetadataRoute } from "next";
import { getAllArticleSlugs, getArticles, getBlogPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rorklab.net";

  // Static pages
  const staticPages = [
    { path: "", priority: 1.0, freq: "daily" as const },
    { path: "/articles", priority: 0.9, freq: "daily" as const },
    { path: "/blog", priority: 0.8, freq: "weekly" as const },
    { path: "/guides", priority: 0.7, freq: "weekly" as const },
    { path: "/articles/rork-basics", priority: 0.8, freq: "daily" as const },
    { path: "/articles/rork-dev", priority: 0.8, freq: "daily" as const },
    { path: "/articles/rork-ai", priority: 0.8, freq: "daily" as const },
    { path: "/articles/rork-business", priority: 0.8, freq: "daily" as const },
    { path: "/privacy", priority: 0.3, freq: "monthly" as const },
    { path: "/terms", priority: 0.3, freq: "monthly" as const },
    { path: "/tokusho", priority: 0.3, freq: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // ⚠ Keep SITE_LAUNCHED fixed — never use new Date() for static pages (causes SEO churn)
  const SITE_LAUNCHED = new Date("2026-01-01");
  // Static pages with alternates
  for (const page of staticPages) {
    const jaUrl = `${baseUrl}${page.path || ""}`;
    const enUrl = `${baseUrl}/en${page.path || ""}`;

    entries.push({
      url: jaUrl,
      lastModified: SITE_LAUNCHED,
      changeFrequency: page.freq,
      priority: page.priority,
      alternates: {
        languages: { ja: jaUrl, en: enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: SITE_LAUNCHED,
      changeFrequency: page.freq,
      priority: Math.max(page.priority - 0.1, 0.3),
      alternates: {
        languages: { ja: jaUrl, en: enUrl },
      },
    });
  }

  // Article pages with actual dates and alternates
  const jaArticles = getArticles("ja");

  for (const article of jaArticles) {
    const jaUrl = `${baseUrl}/articles/${article.category}/${article.slug}`;
    const enUrl = `${baseUrl}/en/articles/${article.category}/${article.slug}`;
    const date = article.updated || article.date;

    entries.push({
      url: jaUrl,
      lastModified: date ? new Date(date) : SITE_LAUNCHED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: { ja: jaUrl, en: enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: date ? new Date(date) : SITE_LAUNCHED,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: { ja: jaUrl, en: enUrl },
      },
    });
  }

  // Blog posts
  const jaBlog = getBlogPosts("ja");

  for (const post of jaBlog) {
    const jaUrl = `${baseUrl}/blog/${post.slug}`;
    const enUrl = `${baseUrl}/en/blog/${post.slug}`;

    entries.push({
      url: jaUrl,
      lastModified: post.date ? new Date(post.date) : SITE_LAUNCHED,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: { ja: jaUrl, en: enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: post.date ? new Date(post.date) : SITE_LAUNCHED,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: { ja: jaUrl, en: enUrl },
      },
    });
  }

  return entries;
}
