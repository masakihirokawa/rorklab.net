/**
 * Cache wrapper for OpenNext Cloudflare Worker
 * Uses Cloudflare Workers Cache API to cache HTML responses at the edge.
 * Reduces TTFB from ~3-5s (full SSR) to ~50ms (edge cache hit).
 */
import nextHandler from "./.open-next/worker";

const CACHE_TTL = 3600; // 1 hour

export default {
  async fetch(
    request: Request,
    env: Record<string, unknown>,
    ctx: ExecutionContext
  ): Promise<Response> {
    // Only cache GET requests
    if (request.method !== "GET") {
      return nextHandler.fetch(request, env, ctx);
    }

    const url = new URL(request.url);

    // Skip caching for API routes, feeds, and file-like paths (static assets)
    if (
      url.pathname.startsWith("/api/") ||
      url.pathname === "/feed.xml" ||
      url.pathname.startsWith("/_next/") ||
      (url.pathname.includes(".") && !url.pathname.endsWith("/"))
    ) {
      return nextHandler.fetch(request, env, ctx);
    }

    // Skip caching for RSC (React Server Component) prefetch requests
    const rscHeader = request.headers.get("rsc");
    if (rscHeader) {
      return nextHandler.fetch(request, env, ctx);
    }

    const cache = caches.default;
    const cacheKey = new Request(url.toString(), { method: "GET" });

    // Check edge cache
    const cached = await cache.match(cacheKey);
    if (cached) {
      const resp = new Response(cached.body, cached);
      resp.headers.set("X-Cache", "HIT");
      return resp;
    }

    // Cache miss — run SSR via OpenNext
    const response = await nextHandler.fetch(request, env, ctx);

    // Only cache successful HTML responses (not redirects, errors, etc.)
    if (response.status === 200) {
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/html")) {
        const body = await response.arrayBuffer();
        const headers = new Headers(response.headers);
        headers.set(
          "Cache-Control",
          `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=86400`
        );
        headers.set("X-Cache", "MISS");
        headers.delete("set-cookie");

        const toCache = new Response(body, { status: 200, headers });

        // Store in edge cache (non-blocking)
        ctx.waitUntil(cache.put(cacheKey, toCache.clone()));

        return toCache;
      }
    }

    return response;
  },
};
