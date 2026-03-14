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

    try {
      const kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
      if (kv) {
        const data = await kv.get(`site:rorklab:email:${email}`);
        if (!data) return null;
        const record = JSON.parse(data);
        if (new Date(record.expires_at) < new Date()) return null;
        return record.type as PremiumType;
      }
    } catch {
      // KV not available
    }

    return "premium";
  } catch {
    return null;
  }
}
