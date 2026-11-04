export default function GlobalNotFound() {
  return (
    <html lang="ja">
      <head>
        <title>404 — ページが見つかりません | Rork Lab</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="お探しのページは存在しないか、移動された可能性があります。" />
        {/* 2026-11-04: Web フォントは読まない（和文は端末のフォント・#128）。言語を判定できないので日英を併記 */}
        <style>{`
          :root {
            --bg-primary: #0c0c14;
            --text-primary: #fafafa;
            --text-muted: #9898a2;
            --accent-coral: #E8967D;
          }
          body {
            margin: 0;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif;
          }
        `}</style>
      </head>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
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
          <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 12 }}>
            ページが見つかりません
            <span style={{ display: "block", marginTop: 6, fontSize: 13, fontWeight: 400, letterSpacing: "0.08em", color: "var(--text-muted)" }}>Page Not Found</span>
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
            お探しのページは存在しないか、移動された可能性があります。
            <br />
            The page you are looking for does not exist or has been moved.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              padding: "10px 24px",
              fontSize: 13,
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              letterSpacing: "0.04em",
              color: "var(--accent-coral)",
              border: "1px solid rgba(232, 150, 125, 0.25)",
              background: "rgba(232, 150, 125, 0.06)",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            ホームに戻る
          </a>
          <a
            href="/en"
            style={{
              padding: "10px 24px",
              fontSize: 13,
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              letterSpacing: "0.04em",
              color: "var(--accent-coral)",
              border: "1px solid rgba(232, 150, 125, 0.25)",
              background: "rgba(232, 150, 125, 0.06)",
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            Back to Home
          </a>
          </div>
        </div>
      </body>
    </html>
  );
}
