"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SearchModal } from "@/components/ui/SearchModal";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchData, setSearchData] = useState<
    { title: string; slug: string; category?: string; description: string; type: "article" | "blog" }[]
  >([]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Load search data lazily
  useEffect(() => {
    if (!searchOpen || searchData.length > 0) return;
    Promise.all([
      fetch("/api/search-data").then((r) => r.json()).catch(() => ({ articles: [], blog: [] })),
    ]).then(([data]) => {
      const items: typeof searchData = [];
      for (const a of data.articles || []) {
        items.push({ title: a.title, slug: a.slug, category: a.category, description: a.description, type: "article" });
      }
      for (const b of data.blog || []) {
        items.push({ title: b.title, slug: b.slug, description: b.description, type: "blog" });
      }
      setSearchData(items);
    });
  }, [searchOpen, searchData.length]);

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const prefix = locale === "ja" ? "" : `/${locale}`;
  const scrolled = scrollY > 50;
  const navItems = [
    { key: "guides", label: t("nav.guides"), href: `${prefix}/guides` },
    { key: "blog", label: t("nav.blog"), href: `${prefix}/blog` },
    { key: "rorkBasics", label: t("nav.rorkBasics"), href: `${prefix}/articles/rork-basics` },
    { key: "rorkDev", label: t("nav.rorkDev"), href: `${prefix}/articles/rork-dev` },
    { key: "rorkAi", label: t("nav.rorkAi"), href: `${prefix}/articles/rork-ai` },
    { key: "rorkBusiness", label: t("nav.rorkBusiness"), href: `${prefix}/articles/rork-business` },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          padding: isMobile ? "0 16px" : "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "color-mix(in srgb, var(--bg-primary) 85%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
          transition: "all 0.4s",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <a href={prefix || "/"} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span className="logo-icon" style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "var(--accent-coral)", fontWeight: 400, position: "relative", top: isMobile ? 0 : 2 }}>
              ◉
            </span>
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "0.04em", color: "var(--text-primary)" }}>
              {t("site.name")}
            </span>
          </a>
          {!isMobile && <LocaleSwitcher />}
        </div>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {navItems.map(({ key, label, href }) => (
              <a
                key={key}
                href={href}
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {label}
              </a>
            ))}
            <a
              href={`${prefix}/support`}
              aria-label="Support us"
              style={{
                color: "var(--text-dim)",
                textDecoration: "none",
                fontSize: 14,
                transition: "color 0.3s, transform 0.3s",
                display: "inline-flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e8647c";
                e.currentTarget.style.transform = "scale(1.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-dim)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ♥
            </a>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="header-icon-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 4,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                color: "var(--text-muted)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              <span>{t("nav.search")}</span>
              <kbd style={{ fontSize: 10, color: "var(--text-dim)", marginLeft: 4 }}>⌘K</kbd>
            </button>
            <ThemeToggle />
          </nav>
        )}

        {/* Mobile controls — all icons 32×32 square, uniform styling */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <a
              href={`${prefix}/support`}
              aria-label="Support us"
              style={{
                width: 32,
                height: 32,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                color: "var(--text-dim)",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              ♥
            </a>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ⌕
            </button>
            <LocaleSwitcher mobile />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
                paddingBottom: 4,
              }}
            >
              ☰
            </button>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "color-mix(in srgb, var(--bg-primary) 97%, transparent)",
            backdropFilter: "blur(20px)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 100,
            gap: 28,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: 28,
              cursor: "pointer",
            }}
          >
            ×
          </button>
          {navItems.map(({ key, label, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: 18,
                letterSpacing: "0.08em",
                fontWeight: 300,
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={`${prefix}/support`}
            onClick={() => setMobileOpen(false)}
            style={{
              color: "var(--text-dim)",
              textDecoration: "none",
              fontSize: 22,
              marginTop: 8,
              transition: "color 0.3s",
            }}
          >
            ♥
          </a>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} articles={searchData} />
    </>
  );
}
