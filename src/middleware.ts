import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { GONE_ARTICLE_SLUGS } from "./config/gone-slugs";

const intlMiddleware = createMiddleware(routing);
const GONE = new Set(GONE_ARTICLE_SLUGS);

export default function middleware(request: NextRequest) {
  // 410 Gone — 恒久削除した記事は Google に明示する（リダイレクトや404ではなく）
  const { pathname } = request.nextUrl;
  const m = pathname.match(/^\/(?:(?:en|ja)\/)?articles\/[^/]+\/([^/]+)\/?$/);
  if (m && GONE.has(decodeURIComponent(m[1]))) {
    return new Response("Gone", {
      status: 410,
      headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, etc.)
    "/((?!_next|_vercel|.*\\..*|api).*)",
    // Explicitly handle routes that might start with locale-like patterns
    "/:locale(en|ja)/:path*",
  ],
};
