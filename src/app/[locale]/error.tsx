"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Auto-reload once on first error (covers ChunkLoadError after deploys,
  // hydration failures, and stale module references).
  useEffect(() => {
    // Log for debugging
    console.error("[error.tsx]", error?.name, error?.message);

    if (typeof window !== "undefined") {
      const key = "locale-error-reload-attempted";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return;
      }
      // Clear flag so future navigations can retry once again
      sessionStorage.removeItem(key);
    }
  }, [error]);

  return (
    <div
      data-error-boundary="true"
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
          fontSize: 64,
          fontWeight: 300,
          color: "var(--accent-blue)",
          lineHeight: 1,
          marginBottom: 16,
          opacity: 0.5,
        }}
      >
        ⟳
      </div>
      <h1
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 12,
        }}
      >
        読み込みエラーが発生しました
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
        ページの表示中に一時的なエラーが発生しました。再読み込みで解決する場合があります。
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("locale-error-reload-attempted");
            }
            window.location.reload();
          }}
          style={{
            padding: "10px 24px",
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.04em",
            color: "var(--accent-coral)",
            border: "1px solid color-mix(in srgb, var(--accent-coral) 25%, transparent)",
            background: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
            borderRadius: 4,
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          ページを再読み込み
        </button>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("locale-error-reload-attempted");
            }
            reset();
          }}
          style={{
            padding: "10px 24px",
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.04em",
            color: "var(--text-muted)",
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-surface)",
            borderRadius: 4,
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          もう一度試す
        </button>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 24px",
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.04em",
            color: "var(--text-muted)",
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-surface)",
            borderRadius: 4,
            textDecoration: "none",
            transition: "all 0.3s",
          }}
        >
          ホームに戻る
        </a>
      </div>
    </div>
  );
}
