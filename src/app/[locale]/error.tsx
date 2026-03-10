"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          color: "var(--accent-blue)",
          lineHeight: 1,
          marginBottom: 16,
          opacity: 0.6,
        }}
      >
        500
      </div>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 12,
        }}
      >
        Internal Server Error
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
        予期しないエラーが発生しました。しばらくしてからもう一度お試しください。
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={reset}
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
          もう一度試す
        </button>
        <a
          href="/"
          style={{
            display: "inline-block",
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
