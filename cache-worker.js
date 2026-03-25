/**
 * Cache wrapper for OpenNext Cloudflare Worker
 * Uses Cloudflare Workers Cache API to cache HTML responses at the edge.
 * Reduces TTFB from ~3-5s (full SSR) to ~50ms (edge cache hit).
 *
 * This file is bundled by wrangler (esbuild) at deploy time,
 * NOT by Next.js, so it must stay outside the TS compilation.
 */
import nextHandler from "./.open-next/worker";

// ── Deploy version ──────────────────────────────────────────────
// Increment on every deploy to auto-invalidate stale edge cache.
const DEPLOY_VERSION = "2026-03-25-v1";

const CACHE_TTL = 14400; // 4 hours (edge only; browser always revalidates)

// ── __name polyfill ─────────────────────────────────────────────
// Injected before any Next.js scripts to prevent
// "ReferenceError: __name is not defined" caused by esbuild helpers
// in next-themes ThemeProvider during SSR streaming.
const NAME_POLYFILL =
  '<script>if(typeof __name==="undefined"){var __name=function(fn,name){Object.defineProperty(fn,"name",{value:name,configurable:true});return fn}}</script>';

class HeadHandler {
  element(element) {
    element.prepend(NAME_POLYFILL, { html: true });
  }
}

function injectPolyfill(response) {
  return new HTMLRewriter().on("head", new HeadHandler()).transform(response);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Manual cache purge endpoint ───────────────────────────
    if (url.pathname === "/api/purge-cache") {
      const cache = caches.default;
      // Purge common pages
      const paths = ["/", "/ja", "/en", "/ja/articles", "/en/articles"];
      const purged = [];
      for (const p of paths) {
        const key = new Request(new URL(p, url.origin).toString(), { method: "GET" });
        const deleted = await cache.delete(key);
        if (deleted) purged.push(p);
      }
      return new Response(
        JSON.stringify({ ok: true, version: DEPLOY_VERSION, purged }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Only cache GET requests
    if (request.method !== "GET") {
      const resp = await nextHandler.fetch(request, env, ctx);
      const ct = resp.headers.get("content-type") || "";
      return ct.includes("text/html") ? injectPolyfill(resp) : resp;
    }

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
      // Version check — if stale, skip cache and re-render
      const cachedVersion = cached.headers.get("X-Deploy-Version");
      if (cachedVersion === DEPLOY_VERSION) {
        const resp = new Response(cached.body, cached);
        resp.headers.set("X-Cache", "HIT");
        // Browser must revalidate; edge cache is authoritative
        resp.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        return injectPolyfill(resp);
      }
      // Stale version — delete and fall through to SSR
      ctx.waitUntil(cache.delete(cacheKey));
    }

    // Cache miss (or stale) — run SSR via OpenNext
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
        headers.set("X-Deploy-Version", DEPLOY_VERSION);
        headers.delete("set-cookie");

        const toCache = new Response(body, { status: 200, headers });

        // Store in edge cache (non-blocking)
        ctx.waitUntil(cache.put(cacheKey, toCache.clone()));

        // Browser-facing: no caching
        const browserHeaders = new Headers(headers);
        browserHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");
        const toReturn = new Response(body, { status: 200, headers: browserHeaders });
        return injectPolyfill(toReturn);
      }
    }

    return response;
  },
};
