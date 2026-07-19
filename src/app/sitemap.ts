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
  const jaArticles = _jaArts.filter((a) => !a.noindex);

  // --- Deduplicate article lastmod (prevent batch-generation signal) ---
  // Articles sharing the same frontmatter date get incremental minute offsets
  // so no two different articles share the same <lastmod> in the sitemap.
  const _artDateSlugs = new Map<string, string[]>();
  for (const _a of jaArticles) {
    const _dk = _a.updated || _a.date || "";
    if (!_artDateSlugs.has(_dk)) _artDateSlugs.set(_dk, []);
    _artDateSlugs.get(_dk)!.push(_a.slug);
  }
  for (const [, _sl] of _artDateSlugs) _sl.sort();
  const _artSlugOffset = new Map<string, number>();
  for (const [, _sl] of _artDateSlugs) {
    if (_sl.length <= 1) continue;
    _sl.forEach((_s, _i) => { if (_i > 0) _artSlugOffset.set(_s, _i); });
  }

  for (const article of jaArticles) {
    const jaUrl = `${baseUrl}/articles/${article.category}/${article.slug}`;
    const enUrl = `${baseUrl}/en/articles/${article.category}/${article.slug}`;
    const date = article.updated || article.date;
    const _artBase = date ? new Date(date) : SITE_LAUNCHED_FALLBACK;
    const _artOff = _artSlugOffset.get(article.slug) || 0;
    const _artLastMod = _artOff > 0 ? new Date(_artBase.getTime() + _artOff * 60000) : _artBase;

    entries.push({
      url: jaUrl,
      lastModified: _artLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: _artLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
  }

  // Blog posts
  const jaBlog = _jaBlog;

  // --- Deduplicate blog lastmod ---
  const _blogDateSlugs = new Map<string, string[]>();
  for (const _b of jaBlog) {
    const _bk = _b.date || "";
    if (!_blogDateSlugs.has(_bk)) _blogDateSlugs.set(_bk, []);
    _blogDateSlugs.get(_bk)!.push(_b.slug);
  }
  for (const [, _sl] of _blogDateSlugs) _sl.sort();
  const _blogSlugOffset = new Map<string, number>();
  for (const [, _sl] of _blogDateSlugs) {
    if (_sl.length <= 1) continue;
    _sl.forEach((_s, _i) => { if (_i > 0) _blogSlugOffset.set(_s, _i); });
  }

  for (const post of jaBlog) {
    const jaUrl = `${baseUrl}/blog/${post.slug}`;
    const enUrl = `${baseUrl}/en/blog/${post.slug}`;

    const _blogBase = post.date ? new Date(post.date) : SITE_LAUNCHED_FALLBACK;
    const _blogOff = _blogSlugOffset.get(post.slug) || 0;
    const _blogLastMod = _blogOff > 0 ? new Date(_blogBase.getTime() + _blogOff * 60000) : _blogBase;

    entries.push({
      url: jaUrl,
      lastModified: _blogLastMod,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
    entries.push({
      url: enUrl,
      lastModified: _blogLastMod,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: { ja: jaUrl, en: enUrl, "x-default": enUrl },
      },
    });
  }

  return entries;
}
