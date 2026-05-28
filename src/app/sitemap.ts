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
    { path: "/articles/app-dev", priority: 0.8, freq: "daily" as const },
    { path: "/privacy", priority: 0.3, freq: "monthly" as const },
    { path: "/terms", priority: 0.3, freq: "monthly" as const },
    { path: "/tokusho", priority: 0.3, freq: "monthly" as const },
  ];

  // === Dynamic lastmod helpers (best practice: reflect newest article date) ===
  const SITE_LAUNCHED_FALLBACK = new Date("2026-01-01");
  const _jaArts = getArticles("ja");
  const _jaBlog = getBlogPosts("ja");
  function _latestDate(items: ReadonlyArray<{ updated?: string; date?: string }>): Date {
    const dates = items
      .map(a => new Date(a.updated || a.date || 0))
      .filter(d => !isNaN(d.getTime()) && d.getTime() > 0);
    return dates.length > 0
      ? new Date(Math.max(...dates.map(d => d.getTime())))
      : SITE_LAUNCHED_FALLBACK;
  }
  const latestArticleDate = _latestDate(_jaArts);
  const latestBlogDate = _latestDate(_jaBlog);
  const categoryLastmod: Record<string, Date> = {};
  for (const a of _jaArts) {
    const d = new Date(a.updated || a.date || 0);
    if (!isNaN(d.getTime()) && d.getTime() > 0) {
      const cur = categoryLastmod[a.category];
      if (!cur || d.getTime() > cur.getTime()) categoryLastmod[a.category] = d;
    }
  }
  function lastmodFor(path: string): Date {
    if (path === "" || path === "/articles" || path === "/guides") return latestArticleDate;
    if (path === "/blog") return latestBlogDate;
    if (path.startsWith("/articles/")) {
      const cat = path.replace("/articles/", "");
      return categoryLastmod[cat] || latestArticleDate;
    }
    return SITE_LAUNCHED_FALLBACK;
  }

  const entries: MetadataRoute.Sitemap = [];
  // Static pages with alternates
  for (const page of staticPages) {
    const jaUrl = `${baseUrl}${page.path || ""}`;
    const enUrl = `${baseUrl}/en${page.path || ""}`;

    entries.push({
      url: jaUrl,
      lastModified: lastmodFor(page.path),
      changeFrequency: page.freq,
      priority: page.priority,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: lastmodFor(page.path),
      changeFrequency: page.freq,
      priority: Number(Math.max(page.priority - 0.1, 0.3).toFixed(1)),
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
  }

  // Article pages with actual dates and alternates
  const jaArticles = _jaArts;

  for (const article of jaArticles) {
    const jaUrl = `${baseUrl}/articles/${article.category}/${article.slug}`;
    const enUrl = `${baseUrl}/en/articles/${article.category}/${article.slug}`;
    const date = article.updated || article.date;

    entries.push({
      url: jaUrl,
      lastModified: date ? new Date(date) : SITE_LAUNCHED_FALLBACK,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: date ? new Date(date) : SITE_LAUNCHED_FALLBACK,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
  }

  // Blog posts
  const jaBlog = _jaBlog;

  for (const post of jaBlog) {
    const jaUrl = `${baseUrl}/blog/${post.slug}`;
    const enUrl = `${baseUrl}/en/blog/${post.slug}`;

    entries.push({
      url: jaUrl,
      lastModified: post.date ? new Date(post.date) : SITE_LAUNCHED_FALLBACK,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: post.date ? new Date(post.date) : SITE_LAUNCHED_FALLBACK,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
  }

  return entries;
}
