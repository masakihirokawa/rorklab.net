"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // ChunkLoadError → auto-reload once to get fresh assets
  if (
    typeof window !== "undefined" &&
    error?.message?.includes("ChunkLoadError")
  ) {
    const key = "chunk-reload-attempted";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      window.location.reload();
      return null;
    }
    sessionStorage.removeItem(key);
  }

  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0c14",
          color: "#fafafa",
          fontFamily: "'DM Sans', 'Noto Sans JP', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, padding: 24 }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>
            読み込みエラーが発生しました
          </h2>
          <p style={{ fontSize: 14, color: "#71717a", marginBottom: 24 }}>
            ページの読み込み中にエラーが発生しました。
            再読み込みで解決する場合があります。
          </p>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("chunk-reload-attempted");
              }
              reset();
            }}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "1px solid #27272a",
              background: "#18181b",
              color: "#fafafa",
              cursor: "pointer",
              fontSize: 14,
              marginRight: 8,
            }}
          >
            再試行
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "1px solid #27272a",
              background: "#18181b",
              color: "#fafafa",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ページを再読み込み
          </button>
        </div>
      </body>
    </html>
  );
}
