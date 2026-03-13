"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { LevelBadge } from "@/components/ui/LevelBadge";
import type { ArticleMeta } from "@/lib/content";

const CATEGORIES = [
  { id: "rork-basics", icon: "◈", color: "var(--accent-coral)" },
  { id: "rork-dev", icon: "⬡", color: "var(--accent-blue)" },
  { id: "rork-ai", icon: "◉", color: "var(--accent-green)" },
  { id: "rork-business", icon: "⟐", color: "var(--accent-gold)" },
];

const GUIDES_DARK = {
  purple: "linear-gradient(135deg, #20223e 0%, #29236c 55%, #2f207c 100%)",
  green: "linear-gradient(135deg, #192c21 0%, #1f4431 55%, #244b34 100%)",
  red: "linear-gradient(135deg, #281c24 0%, #3a1f2e 55%, #492434 100%)",
};

const GUIDES_LIGHT = {
  purple: "linear-gradient(135deg, #eeedf8 0%, #e3dff5 55%, #d8d3ef 100%)",
  green: "linear-gradient(135deg, #eaf5ed 0%, #d8eedf 55%, #c9e6d1 100%)",
  red: "linear-gradient(135deg, #f7eef0 0%, #f0dde2 55%, #e8d0d7 100%)",
};

const GUIDES: Record<string, { title: string; desc: string; articles: number; level: string; colorKey: keyof typeof GUIDES_DARK; href: string }[]> = {
  ja: [
    { title: "Rork Max 完全入門ガイド", desc: "初めての方はここから", articles: 12, level: "beginner", colorKey: "purple", href: "/articles/rork-basics" },
    { title: "開発ツール連携マニュアル", desc: "外部ツールとの統合を完全解説", articles: 18, level: "intermediate", colorKey: "green", href: "/articles/rork-dev" },
    { title: "AI連携 × App Store 公開ハンドブック", desc: "AIを組み込んで本格アプリを公開", articles: 15, level: "intermediate", colorKey: "red", href: "/articles/rork-business" },
  ],
  en: [
    { title: "Getting Started with Rork Max", desc: "Start here if you're new", articles: 12, level: "beginner", colorKey: "purple", href: "/en/articles/rork-basics" },
    { title: "Developer Tools Integration", desc: "Complete guide to external tool integrations", articles: 18, level: "intermediate", colorKey: "green", href: "/en/articles/rork-dev" },
    { title: "AI to App Store Handbook", desc: "Integrate AI and publish professional apps", articles: 15, level: "intermediate", colorKey: "red", href: "/en/articles/rork-business" },
  ],
};

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
        {text}
      </span>
    </div>
  );
}

interface HomeClientProps {
  articles: ArticleMeta[];
  locale: string;
}

export default function HomeClient({ articles, locale }: HomeClientProps) {
  const t = useTranslations();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === "dark";

  const catColor = (id: string) => CATEGORIES.find((c) => c.id === id)?.color || "var(--text-muted)";

  const articleUrl = (a: ArticleMeta) =>
    `/${locale === "ja" ? "" : locale + "/"}articles/${a.category}/${a.slug}`;

  return (
    <div style={{ overflow: "hidden" }}>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          paddingTop: 100,
          paddingBottom: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          className="animate-hero-glow"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent-coral) 8%, transparent) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          className={mounted ? "animate-fade-up" : ""}
          style={{ position: "relative", zIndex: 1, padding: "0 24px", opacity: mounted ? 1 : 0 }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.2em", marginBottom: 24 }}>
            {t("site.poweredBy")}
          </div>

          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.3, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: 16 }}>
            {t("hero.title1")}
            <br />
            <span style={{ fontWeight: 700 }}>{t("hero.title2")}</span>
            {t("hero.title3")}
          </h1>

          <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "var(--text-muted)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.8, fontWeight: 300, whiteSpace: "pre-line" }}>
            {t("hero.description")}
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#guides"
              className="hero-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
                border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
                borderRadius: 6, background: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
                color: "var(--accent-coral)", fontSize: 14, cursor: "pointer",
                textDecoration: "none", letterSpacing: "0.04em",
              }}
            >
              {t("hero.ctaGuide")}
            </a>
            <a
              href="#articles"
              className="hero-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
                border: "1px solid var(--border-hover)", borderRadius: 6,
                background: "var(--bg-surface)", color: "var(--text-secondary)", fontSize: 14,
                cursor: "pointer", textDecoration: "none", letterSpacing: "0.04em",
              }}
            >
              {t("hero.ctaLatest")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <SectionLabel text={t("sections.categories")} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {CATEGORIES.map((cat, i) => {
            const prefix = locale === "ja" ? "" : `/${locale}`;
            return (
              <a
                key={cat.id}
                href={`${prefix}/articles/${cat.id}`}
                className={mounted ? "animate-fade-up" : ""}
                style={{
                  display: "block", padding: "28px 24px", textDecoration: "none",
                  border: `1px solid ${hoveredCat === cat.id ? "var(--border-hover)" : "var(--border-subtle)"}`,
                  borderRadius: 8, background: hoveredCat === cat.id ? "var(--bg-surface-hover)" : "var(--bg-surface)",
                  cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative", overflow: "hidden",
                  transform: hoveredCat === cat.id ? "translateY(-2px)" : "none",
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredCat(cat.id)}
                onMouseLeave={() => setHoveredCat(null)}
              >
                <div style={{ fontSize: 28, marginBottom: 16, color: cat.color, transition: "transform 0.3s", transform: hoveredCat === cat.id ? "translateX(4px)" : "translateX(0)" }}>
                  {cat.icon}
                </div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6, letterSpacing: "0.02em" }}>
                  {t(`categories.${cat.id}.label`)}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>
                  {t(`categories.${cat.id}.desc`)}
                </div>
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, width: "100%", height: 2,
                    background: cat.color,
                    transform: hoveredCat === cat.id ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Latest Articles ── */}
      <section id="articles" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <SectionLabel text={t("sections.latestArticles")} />
          <a
            href={`/${locale === "ja" ? "" : locale + "/"}articles`}
            style={{ fontSize: 12, color: "var(--text-dim)", textDecoration: "none", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            {t("sections.allArticles").replace(" →", "")} ({articles.length}) →
          </a>
        </div>

        <div>
          {articles.length === 0 ? (
            <p style={{ color: "var(--text-dim)", fontSize: 14, fontFamily: "'DM Mono', monospace" }}>
              {locale === "ja" ? "記事を準備中です..." : "Articles coming soon..."}
            </p>
          ) : (
            articles.slice(0, 5).map((article, i) => (
              <a
                key={`${article.category}/${article.slug}`}
                href={articleUrl(article)}
                className={mounted ? "animate-fade-up" : ""}
                style={{
                  display: "block", padding: "24px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                  cursor: "pointer", transition: "all 0.3s",
                  paddingLeft: hoveredArticle === i ? 12 : 0,
                  animationDelay: `${0.3 + i * 0.08}s`,
                  textDecoration: "none",
                }}
                onMouseEnter={() => setHoveredArticle(i)}
                onMouseLeave={() => setHoveredArticle(null)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: catColor(article.category), fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
                    {t(`categories.${article.category}.label`)}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-faint)" }}>/</span>
                  <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>{article.date?.split("T")[0]}</span>
                  <LevelBadge level={article.level} label={t(`levels.${article.level}`)} />
                </div>
                <h3 style={{ fontSize: "clamp(16px, 2.5vw, 19px)", fontWeight: 500, color: hoveredArticle === i ? "var(--text-primary)" : "var(--text-secondary)", transition: "color 0.3s", marginBottom: 6, lineHeight: 1.5 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 680 }}>
                  {article.description}
                </p>
              </a>
            ))
          )}
        </div>
      </section>

      {/* ── Guides ── */}
      <section id="guides" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ marginBottom: 32 }}>
          <SectionLabel text={t("sections.guides")} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {(GUIDES[locale] || GUIDES.ja).map((guide, i) => (
            <a
              key={i}
              href={guide.href}
              className={`guide-card${mounted ? " animate-fade-up" : ""}`}
              style={{
                display: "block", padding: "32px 28px", borderRadius: 8,
                background: isDark ? GUIDES_DARK[guide.colorKey] : GUIDES_LIGHT[guide.colorKey], border: "1px solid var(--border-subtle)",
                cursor: "pointer",
                animationDelay: `${0.5 + i * 0.1}s`,
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <LevelBadge level={guide.level} label={t(`levels.${guide.level}`)} />
                <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
                  {t("articles.count", { count: guide.articles })}
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "0.01em" }}>
                {guide.title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                {guide.desc}
              </p>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
