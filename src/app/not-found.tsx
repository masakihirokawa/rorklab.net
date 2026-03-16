export default function GlobalNotFound() {
  return (
    <html lang="ja">
      <head>
        <title>404 — ページが見つかりません | Rork Lab</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="お探しのページは存在しないか、移動された可能性があります。" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --bg-primary: #0c0c14;
            --text-primary: #fafafa;
            --text-muted: #71717a;
            --accent-coral: #E8967D;
          }
          body {
            margin: 0;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: 'DM Sans', system-ui, sans-serif;
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
          <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 12 }}>
            Page Not Found
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
          </p>
          <a
            href="/"
            style={{
              padding: "10px 24px",
              fontSize: 13,
              fontFamily: "'DM Mono', monospace",
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
        </div>
      </body>
    </html>
  );
}
