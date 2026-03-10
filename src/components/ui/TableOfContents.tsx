"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ locale }: { locale: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const label = locale === "ja" ? "目次" : "Contents";

  useEffect(() => {
    const container = document.querySelector(".article-content");
    if (!container) return;

    const headings = container.querySelectorAll("h2, h3");
    const tocItems: TocItem[] = [];

    headings.forEach((heading, i) => {
      const el = heading as HTMLElement;
      if (!el.id) {
        el.id = `section-${i}`;
      }
      tocItems.push({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setItems(tocItems);

    // Intersection observer for active tracking
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 3) return null;

  return (
    <nav
      style={{
        marginBottom: 40,
        padding: "20px 24px",
        borderRadius: 8,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--text-dim)",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(item.id);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 110;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            style={{
              display: "block",
              fontSize: 13,
              lineHeight: 1.6,
              padding: "4px 0",
              paddingLeft: item.level === 3 ? 16 : 0,
              color: activeId === item.id ? "var(--accent-coral)" : "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.15s ease",
              borderLeft: item.level === 3 ? "1px solid var(--border-subtle)" : "none",
            }}
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
