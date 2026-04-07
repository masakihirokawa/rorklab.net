import { cookies } from "next/headers";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export type PremiumType = "pro" | "premium" | null;

export async function getPremiumAccess(): Promise<PremiumType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("premium_token")?.value;
  if (!token) return null;

  try {
    const decoded = atob(token);
    const [email] = decoded.split(":");
    if (!email) return null;

    // Try Cloudflare KV lookup
    try {
      const kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
      if (kv) {
        const kvKey = `site:rorklab:email:${email}`;
        const data = await kv.get(kvKey);
        if (!data) return null;
        const record = JSON.parse(data);
        if (new Date(record.expires_at) < new Date()) return null;

        // Auto-extend: if Premium member's TTL is less than 5 years, extend to 10 years
        if (record.type === "premium") {
          const fiveYears = 5 * 365 * 24 * 3600 * 1000;
          const remaining = new Date(record.expires_at).getTime() - Date.now();
          if (remaining < fiveYears) {
            const newTtl = 10 * 365 * 24 * 3600;
            const newExpiry = new Date(Date.now() + newTtl * 1000);
            const updated = { ...record, expires_at: newExpiry.toISOString() };
            kv.put(kvKey, JSON.stringify(updated), { expirationTtl: newTtl }).catch(() => {});
          }
        }

        return record.type as PremiumType;
      }
    } catch {
      // KV not available — fallback to cookie-only
    }

    // Fallback: cookie exists = premium
    return "premium";
  } catch {
    return null;
  }
}

// ── Single Article Access ────────────────────────────────────────

/**
 * Check if the current user has purchased a specific article.
 *
 * Two-tier verification:
 *   1. KV lookup: `site:rorklab:article:{email}:{slug}` — most accurate
 *   2. Cookie fallback: `article_purchases` cookie contains JSON with slug list
 *
 * Cookie format (new): btoa(JSON.stringify({ email, slugs: ["slug1", "slug2"] }))
 * Cookie format (old): btoa("email:article") — no slug info, treated as no access
 */
export async function getArticleAccess(slug: string): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("article_purchases")?.value;
  if (!token) return false;

  try {
    const decoded = atob(token);

    // Parse cookie — support both new JSON format and old format
    let email: string | null = null;
    let slugsInCookie: string[] = [];

    if (decoded.startsWith("{")) {
      // New format: { email, slugs: [...] }
      const parsed = JSON.parse(decoded);
      email = parsed.email || null;
      slugsInCookie = Array.isArray(parsed.slugs) ? parsed.slugs : [];
    } else {
      // Old format: "email:article"
      const [e] = decoded.split(":");
      email = e || null;
    }

    if (!email) return false;

    // Tier 1: KV lookup (most accurate, per-slug with expiry check)
    try {
      const kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
      if (kv) {
        const kvKey = `site:rorklab:article:${email}:${slug}`;
        const data = await kv.get(kvKey);
        if (!data) return false;
        const record = JSON.parse(data);
        return new Date(record.expires_at) > new Date();
      }
    } catch {
      // KV not available — fall through to cookie check
    }

    // Tier 2: Cookie slug list (fallback when KV unavailable)
    return slugsInCookie.includes(slug);
  } catch {
    return false;
  }
}
