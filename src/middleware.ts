import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { GONE_ARTICLE_SLUGS, GONE_BLOG_SLUGS } from "./config/gone-slugs";

const intlMiddleware = createMiddleware(routing);
const GONE = new Set(GONE_ARTICLE_SLUGS);
const GONE_BLOG = new Set(GONE_BLOG_SLUGS);

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
  // 410 Gone — 恒久削除した blog 記事
  const mb = pathname.match(/^\/(?:(?:en|ja)\/)?blog\/([^/]+)\/?$/);
  if (mb && GONE_BLOG.has(decodeURIComponent(mb[1]))) {
    return new Response("Gone", {
      status: 410,
      headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }
  // 旧 /ja プレフィックス URL は恒久移転として 308 を返す（2026-09-07・STUMBLING_POINTS #124）。
  // next-intl 既定の 307 は「一時的」扱いで、Google が旧 /ja/ URL を捨てずに保持し続ける。
  const mj = pathname.match(/^\/ja(?=\/|$)(.*)$/);
  if (mj) {
    const url = request.nextUrl.clone();
    url.pathname = mj[1] || "/";
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, etc.)
    "/((?!_next|_vercel|.*\\..*|api).*)",
    // Explicitly handle routes that might start with locale-like patterns
    "/:locale(en|ja)/:path*",
    // ピリオドを含むタグ・記事パス（/tag/Node.js, /tag/Gemini 2.5 Pro 等）。
    // 上の `.*\\..*` 除外は静的ファイル用だが、既定ロケール(ja)のタグ/記事 URL まで
    // ミドルウェアから外れて 404 になっていた（2026-09-07・STUMBLING_POINTS #124）。
    "/tag/:path*",
    "/articles/:path*",
    "/blog/:path*",
  ],
};
