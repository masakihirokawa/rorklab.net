import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "@/lib/content";
import { getBlogPosts } from "@/lib/content";

export async function GET(request: NextRequest) {
  // Determine locale from Accept-Language or cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = cookieLocale === "en" ? "en" : "ja";

  const articles = getArticles(locale).map((a) => ({
    title: a.title,
    slug: a.slug,
    category: a.category,
    description: a.description,
    tags: a.tags,
    level: a.level,
  }));

  const blog = getBlogPosts(locale).map((b) => ({
    title: b.title,
    slug: b.slug,
    description: b.description,
    tags: b.tags,
  }));

  return NextResponse.json({ articles, blog });
}
