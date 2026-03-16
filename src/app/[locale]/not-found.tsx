import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "404 — ページが見つかりません | Rork Lab",
  description: "お探しのページは存在しないか、移動された可能性があります。",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: {
    title: "404 — ページが見つかりません",
    description: "お探しのページは存在しないか、移動された可能性があります。",
  },
};

export default async function NotFound() {
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") || "";
  const isEn = acceptLang.startsWith("en");

  const title = isEn ? "Page Not Found" : "ページが見つかりません";
  const description = isEn
    ? "The page you're looking for doesn't exist or has been moved."
    : "お探しのページは存在しないか、移動された可能性があります。";
  const backLabel = isEn ? "Back to Home" : "ホームに戻る";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 80,
          fontWeight: 300,
          color: "var(--accent-coral)",
          lineHeight: 1,
          marginBottom: 16,
          opacity: 0.6,
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 12,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-muted)",
          maxWidth: 400,
          lineHeight: 1.7,
          marginBottom: 32,
        }}
      >
        {description}
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "10px 24px",
          fontSize: 13,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.04em",
          color: "var(--accent-coral)",
          border: "1px solid color-mix(in srgb, var(--accent-coral) 25%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
          borderRadius: 4,
          textDecoration: "none",
          transition: "all 0.3s",
        }}
      >
        {backLabel}
      </a>
    </div>
  );
}
