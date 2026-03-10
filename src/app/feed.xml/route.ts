import { getArticles, getBlogPosts } from "@/lib/content";

export async function GET() {
  const baseUrl = "https://rorklab.net";
  const siteName = "Rork Lab";
  const siteDescription = "Rork Max の完全ガイド＆ナレッジベース";

  const articles = getArticles("ja");
  const blogPosts = getBlogPosts("ja");

  // Combine and sort by date
  const items = [
    ...articles.map((a) => ({
      title: a.title,
      url: `${baseUrl}/articles/${a.category}/${a.slug}`,
      description: a.description,
      date: a.updated || a.date,
      category: a.category,
      tags: a.tags,
    })),
    ...blogPosts.map((b) => ({
      title: b.title,
      url: `${baseUrl}/blog/${b.slug}`,
      description: b.description,
      date: b.date,
      category: "blog",
      tags: b.tags,
    })),
  ].sort((a, b) => (a.date > b.date ? -1 : 1));

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const toRFC822 = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toUTCString();
  };

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>ja</language>
    <lastBuildDate>${toRFC822(items[0]?.date || new Date().toISOString())}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/icon-512.png</url>
      <title>${escapeXml(siteName)}</title>
      <link>${baseUrl}</link>
    </image>
${items
  .slice(0, 50)
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRFC822(item.date)}</pubDate>
      <category>${escapeXml(item.category)}</category>
${item.tags.map((tag) => `      <dc:subject>${escapeXml(tag)}</dc:subject>`).join("\n")}
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
