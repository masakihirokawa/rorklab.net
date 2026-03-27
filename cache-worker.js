/**
 * Cache wrapper for OpenNext Cloudflare Worker
 * ─────────────────────────────────────────────
 * - HTMLRewriter: injects __name polyfill before any Next.js script
 * - Edge cache:   caches 200 HTML for CACHE_TTL (Workers Cache API)
 * - Version gate:  DEPLOY_VERSION invalidates stale cache entries
 * - Browser:       max-age=0, must-revalidate (edge is authoritative)
 * - Error safety:  never caches non-200; try-catch around all cache ops
 */
import nextHandler from "./.open-next/worker";

// ── Config ──────────────────────────────────────────────────────
const DEPLOY_VERSION = "2026-03-27-campaign";
const CACHE_TTL = 14400; // 4 hours (edge only)

// ── __name polyfill (Turbopack / esbuild compat) ────────────────
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

// ── Helpers ─────────────────────────────────────────────────────
function shouldSkipCache(url, request) {
  if (request.method !== "GET") return true;
  const p = url.pathname;
  if (p.startsWith("/api/") || p === "/feed.xml" || p.startsWith("/_next/")) return true;
  if (p.includes(".") && !p.endsWith("/")) return true;
  if (request.headers.get("rsc")) return true;
  return false;
}

function makeBrowserHeaders(srcHeaders) {
  const h = new Headers(srcHeaders);
  h.set("Cache-Control", "public, max-age=0, must-revalidate");
  h.delete("set-cookie");
  return h;
}

// ── Main handler ────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Manual cache purge ────────────────────────────────────
    if (url.pathname === "/api/purge-cache") {
      const cache = caches.default;
      const paths = ["/", "/ja", "/en",
                     "/articles", "/ja/articles", "/en/articles",
                     "/membership", "/ja/membership", "/en/membership",
                     "/blog", "/ja/blog", "/en/blog",
                     "/tags", "/ja/tags", "/en/tags",
                     "/guides", "/ja/guides", "/en/guides",
                     "/support", "/ja/support", "/en/support",
                     "/level/beginner", "/level/intermediate", "/level/advanced",
                     "/ja/level/beginner", "/ja/level/intermediate", "/ja/level/advanced",
                     "/en/level/beginner", "/en/level/intermediate", "/en/level/advanced"];
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

    // ── Diagnostic endpoint ───────────────────────────────────
    if (url.pathname === "/api/cache-status") {
      return new Response(
        JSON.stringify({ version: DEPLOY_VERSION, cacheTTL: CACHE_TTL, ts: new Date().toISOString() }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // ── Non-cacheable requests: pass through ──────────────────
    if (shouldSkipCache(url, request)) {
      const resp = await nextHandler.fetch(request, env, ctx);
      const ct = resp.headers.get("content-type") || "";
      return ct.includes("text/html") ? injectPolyfill(resp) : resp;
    }

    // ── Edge cache lookup ─────────────────────────────────────
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), { method: "GET" });

    try {
      const cached = await cache.match(cacheKey);
      if (cached) {
        const ver = cached.headers.get("X-Deploy-Version");
        if (ver === DEPLOY_VERSION) {
          const hit = new Response(cached.body, cached);
          hit.headers.set("X-Cache", "HIT");
          hit.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
          return injectPolyfill(hit);
        }
        // Stale version — purge and fall through
        ctx.waitUntil(cache.delete(cacheKey));
      }
    } catch (_) {
      // Cache read failure — fall through to SSR
    }

    // ── SSR via OpenNext ──────────────────────────────────────
    const response = await nextHandler.fetch(request, env, ctx);

    if (response.status === 200) {
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("text/html")) {
        try {
          // Clone BEFORE consuming body to guarantee fallback
          const forCache = response.clone();

          // Browser response — return immediately
          const browserHeaders = makeBrowserHeaders(response.headers);
          browserHeaders.set("X-Cache", "MISS");
          browserHeaders.set("X-Deploy-Version", DEPLOY_VERSION);
          const browserResp = new Response(response.body, {
            status: 200,
            headers: browserHeaders,
          });

          // Edge cache storage — async, non-blocking
          ctx.waitUntil(
            (async () => {
              try {
                const body = await forCache.arrayBuffer();
                const h = new Headers(forCache.headers);
                h.set("Cache-Control", `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=86400`);
                h.set("X-Cache", "MISS");
                h.set("X-Deploy-Version", DEPLOY_VERSION);
                h.delete("set-cookie");
                await cache.put(cacheKey, new Response(body, { status: 200, headers: h }));
              } catch (_) {
                // Cache write failure — silently ignore
              }
            })()
          );

          return injectPolyfill(browserResp);
        } catch (_) {
          // Body handling failure — return original with polyfill
          return injectPolyfill(response);
        }
      }
    }

    // ── Non-200 / non-HTML passthrough ────────────────────────
    const ct = response.headers.get("content-type") || "";
    if (ct.includes("text/html")) {
      return injectPolyfill(response);
    }
    return response;
  },
};
