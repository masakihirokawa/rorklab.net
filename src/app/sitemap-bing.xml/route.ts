import { getArticles } from "@/lib/content";

export const dynamic = "force-static";

// Full article sitemap for Bing Webmaster Tools (submitted manually in BWT).
// Not referenced in robots.txt: sitemap.xml (Google-facing) stays pruned,
// while this includes all articles — pruned ones are googlebot-noindex only.
export function GET() {
  const baseUrl = "https://rorklab.net";
  const urls: string[] = [];
  for (const a of getArticles("ja")) {
    const d = (a.updated || a.date || "2026-01-01").slice(0, 10);
    urls.push(`<url><loc>${baseUrl}/articles/${a.category}/${a.slug}</loc><lastmod>${d}</lastmod></url>`);
    urls.push(`<url><loc>${baseUrl}/en/articles/${a.category}/${a.slug}</loc><lastmod>${d}</lastmod></url>`);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("\n")}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
