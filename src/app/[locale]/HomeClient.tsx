"use client";

import type React from "react";
import { useTranslations } from "next-intl";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { CategoryGlyph } from "@/components/ui/CategoryGlyph";
import type { ArticleMeta } from "@/lib/content";

const CATEGORIES = [
  { id: "rork-basics", icon: "◈", color: "var(--accent-coral)" },
  { id: "rork-dev", icon: "⬡", color: "var(--accent-blue)" },
  { id: "rork-ai", icon: "◉", color: "var(--accent-green)" },
  { id: "rork-business", icon: "⟐", color: "var(--accent-gold)" },
  { id: "app-dev", icon: "◇", color: "var(--accent-purple)" },
];

const GUIDES: Record<string, { title: string; desc: string; categories: string[]; level: string; colorKey: "gold" | "silver" | "rose"; href: string }[]> = {
  ja: [
    { title: "Rork Max 完全入門ガイド", desc: "初めての方はここから", categories: ["rork-basics"], level: "beginner", colorKey: "gold", href: "/articles/rork-basics" },
    { title: "開発ツール連携マニュアル", desc: "外部ツールとの統合を完全解説", categories: ["rork-dev"], level: "intermediate", colorKey: "silver", href: "/articles/rork-dev" },
    { title: "AI連携 × App\u00A0Store 公開ハンドブック", desc: "AIを組み込んで本格アプリを公開", categories: ["rork-business"], level: "intermediate", colorKey: "rose", href: "/articles/rork-business" },
  ],
  en: [
    { title: "Getting Started with Rork Max", desc: "Start here if you're new", categories: ["rork-basics"], level: "beginner", colorKey: "gold", href: "/en/articles/rork-basics" },
    { title: "Developer Tools Integration", desc: "Complete guide to external tool integrations", categories: ["rork-dev"], level: "intermediate", colorKey: "silver", href: "/en/articles/rork-dev" },
    { title: "AI to App\u00A0Store Handbook", desc: "Integrate AI and publish professional apps", categories: ["rork-business"], level: "intermediate", colorKey: "rose", href: "/en/articles/rork-business" },
  ],
};

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
      <h2 className="sec-label mono">
        {text}
      </h2>
    </div>
  );
}

interface HomeClientProps {
  articles: ArticleMeta[]; // 最新 10 本
  counts: { total: number; byCategory: Record<string, number> };
  locale: string;
}

export default function HomeClient({ articles, counts, locale }: HomeClientProps) {
  const t = useTranslations();

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
          className="hero-seq"
          style={{ position: "relative", zIndex: 1, padding: "0 24px" }}
        >
          <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.2em", marginBottom: 24 }}>
            POWERED BY <a href="https://dolice.net" target="_blank" rel="noopener" style={{ color: "var(--text-dim)", textDecoration: "underline", textUnderlineOffset: "3px" }}>DOLICE</a>
          </div>

          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.3, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: 16 }}>
            {t("hero.title1")}
            <br />
            <span style={{ fontWeight: 700 }}>{t("hero.title2")}</span>
            {/* 日本語は「使いこなす。」の途中で折り返さない（375px で「す。」だけが 3 行目に落ちていた・2026-10-17） */}
            {locale === "ja" ? <span className="seg">{t("hero.title3")}</span> : t("hero.title3")}
          </h1>

          <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "var(--text-muted)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.8, fontWeight: 300, whiteSpace: "pre-line" }}>
            {t("hero.description").split("\n").map((line, li) => (
              <span key={li} style={{ display: "block" }}>
                {line.split("|").map((seg, si) => <span key={si} className="seg">{seg}</span>)}
              </span>
            ))}
          </p>

          <div className="hero-ctas">
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

        <div className="categories-grid home-cats" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {CATEGORIES.map((cat, i) => {
            const prefix = locale === "ja" ? "" : `/${locale}`;
            return (
              <a
                key={cat.id}
                href={`${prefix}/articles/${cat.id}`}
                className="cat-card"
                style={{
                  gridColumn: i < 3 ? "span 2" : "span 3",
                  display: "block", padding: "28px 24px", textDecoration: "none",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 8, background: "var(--bg-surface)",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div className="cat-icon" style={{ color: cat.color }}>
                  <CategoryGlyph glyph={cat.icon} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6, letterSpacing: "0.02em" }}>
                  {t(`categories.${cat.id}.label`)}
                </h3>
                <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>
                  {t(`categories.${cat.id}.desc`)}
                </div>
                <div className="cat-bar" aria-hidden="true" style={{ background: cat.color }} />
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
            className="home-all mono"
          >
            {t("sections.allArticles").replace(" →", "")} ({counts.total}) →
          </a>
        </div>

        <div>
          {articles.length === 0 ? (
            <p style={{ color: "var(--text-dim)", fontSize: 14, fontFamily: "var(--font-dm-mono), 'DM Mono', monospace" }}>
              {locale === "ja" ? "記事を準備中です..." : "Articles coming soon..."}
            </p>
          ) : (
            articles.map((article) => (
              <a
                key={`${article.category}/${article.slug}`}
                href={articleUrl(article)}
                className="ar"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div className="ar-meta">
                  <span className="ar-cat mono" style={{ color: catColor(article.category) }}>
                    {t(`categories.${article.category}.label`)}
                  </span>
                  <span className="ar-sep">/</span>
                  <span className="ar-sep mono">{article.date?.split("T")[0]}</span>
                  <LevelBadge level={article.level} label={t(`levels.${article.level}`)} />
                </div>
                <h3 className="ar-title">
                  {article.title}
                </h3>
                <p className="ar-desc">
                  {article.description}
                </p>
              </a>
            ))
          )}
          {counts.total > 10 && (
            <a
              href={`${locale === "ja" ? "" : `/${locale}`}/articles`}
              className="home-more" style={{ "--more": "var(--accent-coral)" } as React.CSSProperties}
            >
              {locale === "ja" ? `すべての記事を見る (${counts.total}) →` : `View All Articles (${counts.total}) →`}
            </a>
          )}
        </div>
      </section>

      {/* ── Guides ── */}
      <section id="guides" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ marginBottom: 32 }}>
          <SectionLabel text={t("sections.guides")} />
        </div>

        <div className="home-guides" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {(GUIDES[locale] || GUIDES.ja).map((guide, i) => {
            const count = guide.categories.length > 0
              ? guide.categories.reduce((n, c) => n + (counts.byCategory[c] || 0), 0)
              : counts.total;
            return (
              <a
                key={i}
                href={guide.href}
                className={`guide-card guide-${guide.colorKey}`}
                style={{
                  display: "block", padding: "32px 28px", borderRadius: 8,
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span className="guide-badge"><LevelBadge level={guide.level} label={t(`levels.${guide.level}`)} /></span>
                  <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace" }}>
                    {t("articles.count", { count })}
                  </span>
                </div>
                <span className="guide-rule" aria-hidden="true" />
                <h3 style={{ fontSize: 18, fontWeight: 500, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "0.01em" }}>
                  {guide.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {guide.desc}
                </p>
              </a>
            );
          })}
        </div>
      </section>

    </div>
  );
}
