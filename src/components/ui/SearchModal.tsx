"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";

interface SearchItem {
  title: string;
  slug: string;
  category?: string;
  description: string;
  tags?: string[];
  level?: string;
  type: "article" | "blog";
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  articles: SearchItem[];
}

const LEVEL_COLORS: Record<string, string> = {
  beginner: "var(--accent-green)",
  intermediate: "var(--accent-blue)",
  advanced: "var(--accent-coral)",
};

const LEVEL_LABELS_JA: Record<string, string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
};

export function SearchModal({ open, onClose, articles }: SearchModalProps) {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const prefix = locale === "ja" ? "" : `/${locale}`;

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Score-based search with tag matching
  const results = query.trim().length > 0
    ? articles
        .map((item) => {
          const q = query.toLowerCase();
          let score = 0;

          // Title match (highest weight)
          if (item.title.toLowerCase().includes(q)) score += 10;

          // Tag match
          if (item.tags?.some((tag) => tag.toLowerCase().includes(q))) score += 8;

          // Description match
          if (item.description.toLowerCase().includes(q)) score += 5;

          // Category match
          if ((item.category || "").toLowerCase().includes(q)) score += 3;

          return { item, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12)
        .map(({ item }) => item)
    : [];

  // Reset selection when results change
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIdx]) {
        e.preventDefault();
        window.location.href = getHref(results[selectedIdx]);
      }
    },
    [results, selectedIdx]
  );

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selected = resultsRef.current.children[selectedIdx] as HTMLElement;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIdx]);

  const getHref = useCallback((item: SearchItem) => {
    if (item.type === "blog") return `${prefix}/blog/${item.slug}`;
    return `${prefix}/articles/${item.category}/${item.slug}`;
  }, [prefix]);

  // Highlight matched text
  const highlight = (text: string) => {
    if (!query.trim()) return text;
    const q = query.trim();
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: "color-mix(in srgb, var(--accent) 25%, transparent)", color: "inherit", borderRadius: 2, padding: "0 1px" }}>
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 10001,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "min(120px, 15vh)",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: 560,
          background: "var(--bg-primary)",
          border: "1px solid var(--border-hover)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
        }}
      >
        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
          <span style={{ color: "var(--text-dim)", fontSize: 16 }}>⌕</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={locale === "ja" ? "記事・タグを検索..." : "Search articles & tags..."}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />
          <kbd
            style={{
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
              color: "var(--text-dim)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 4,
              padding: "2px 6px",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={resultsRef} style={{ maxHeight: 420, overflowY: "auto", padding: "8px 0" }}>
          {query.trim().length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--text-dim)", fontSize: 13 }}>
              {locale === "ja" ? "キーワードやタグ名を入力してください" : "Type keywords or tag names to search"}
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--text-dim)", fontSize: 13 }}>
              {locale === "ja" ? "該当する記事が見つかりませんでした" : "No results found"}
            </div>
          ) : (
            results.map((item, i) => (
              <a
                key={`${item.type}-${item.slug}-${i}`}
                href={getHref(item)}
                style={{
                  display: "block",
                  padding: "12px 20px",
                  textDecoration: "none",
                  borderBottom: i < results.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  background: i === selectedIdx ? "var(--bg-surface-hover)" : "transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={() => setSelectedIdx(i)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "'DM Mono', monospace",
                      color: item.type === "blog" ? "var(--accent-green)" : "var(--accent-coral)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.type === "blog" ? "BLOG" : (item.category || "").replace("-", " ")}
                  </span>
                  {item.level && (
                    <span
                      style={{
                        fontSize: 9,
                        fontFamily: "'DM Mono', monospace",
                        color: LEVEL_COLORS[item.level] || "var(--text-dim)",
                        border: `1px solid ${LEVEL_COLORS[item.level] || "var(--border)"}`,
                        borderRadius: 3,
                        padding: "1px 5px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {locale === "ja" ? LEVEL_LABELS_JA[item.level] || item.level : item.level}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", marginBottom: 2, lineHeight: 1.4 }}>
                  {highlight(item.title)}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.description}
                </div>
                {/* Show matched tags */}
                {item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) && (
                  <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                    {item.tags
                      .filter((tag) => tag.toLowerCase().includes(query.toLowerCase()))
                      .slice(0, 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 10,
                            color: "var(--accent)",
                            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                            borderRadius: 3,
                            padding: "1px 6px",
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>
                )}
              </a>
            ))
          )}
        </div>

        {/* Footer with result count */}
        {query.trim().length > 0 && results.length > 0 && (
          <div
            style={{
              padding: "8px 20px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
              {results.length} {locale === "ja" ? "件" : results.length === 1 ? "result" : "results"}
            </span>
            <span style={{ fontSize: 10, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
              ↑↓ {locale === "ja" ? "移動" : "navigate"} · ↵ {locale === "ja" ? "開く" : "open"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
