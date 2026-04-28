import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
    const [rawEmail] = decoded.split(":");
    if (!rawEmail) return null;
    const email = rawEmail.trim().toLowerCase();

    try {
      const kv = (() => { try { const { env } = getCloudflareContext(); return (env as Record<string, unknown>).PREMIUM_ACCESS as KVNamespace; } catch { return null; } })();
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

        return (record.type || record.plan) as PremiumType;
      }
    } catch {
      // KV not available
    }

    return "premium";
  } catch {
    return null;
  }
}
