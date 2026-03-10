"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  category?: string;
  locale: string;
}

export function ArticlePagination({ currentPage, totalPages, basePath, category, locale }: Props) {
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (category) params.set("category", category);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  // Generate page numbers to show
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 36,
    height: 36,
    borderRadius: 6,
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--text-muted)",
    fontSize: 13,
    fontFamily: "'DM Mono', monospace",
    textDecoration: "none",
    transition: "all 0.2s",
    cursor: "pointer",
  };

  const activeBtnStyle: React.CSSProperties = {
    ...btnBase,
    border: "1px solid var(--accent)",
    background: "color-mix(in srgb, var(--accent) 12%, transparent)",
    color: "var(--accent)",
    fontWeight: 600,
  };

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 48,
        padding: "24px 0",
      }}
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <a href={buildHref(currentPage - 1)} style={btnBase} aria-label={locale === "ja" ? "前のページ" : "Previous page"}>
          ←
        </a>
      ) : (
        <span style={{ ...btnBase, opacity: 0.3, cursor: "default" }}>←</span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} style={{ ...btnBase, border: "none", cursor: "default" }}>
            ···
          </span>
        ) : p === currentPage ? (
          <span key={p} style={activeBtnStyle} aria-current="page">
            {p}
          </span>
        ) : (
          <a key={p} href={buildHref(p)} style={btnBase}>
            {p}
          </a>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <a href={buildHref(currentPage + 1)} style={btnBase} aria-label={locale === "ja" ? "次のページ" : "Next page"}>
          →
        </a>
      ) : (
        <span style={{ ...btnBase, opacity: 0.3, cursor: "default" }}>→</span>
      )}
    </nav>
  );
}
