import { NextRequest, NextResponse } from "next/server";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const kv = (process.env as unknown as { PREMIUM_ACCESS: KVNamespace }).PREMIUM_ACCESS;
    if (!kv) {
      return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
    }

    const kvKey = `site:rorklab:email:${normalizedEmail}`;
    const data = await kv.get(kvKey);

    if (!data) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const record = JSON.parse(data);

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json({ error: "expired" }, { status: 403 });
    }

    const type = record.type as "pro" | "premium";
    const ttlSeconds = type === "premium" ? 365 * 24 * 3600 : 31 * 24 * 3600;

    try {
      await kv.put(kvKey, data, { expirationTtl: ttlSeconds });
    } catch {
      // Non-fatal
    }

    const token = btoa(`${normalizedEmail}:restored`);
    const response = NextResponse.json({ success: true, type });

    response.cookies.set("premium_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: ttlSeconds,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
