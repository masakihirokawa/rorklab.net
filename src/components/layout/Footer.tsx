"use client";

import { useTranslations, useLocale } from "next-intl";

const SNS_LINKS = [
  { label: "X", href: "https://x.com/dolice" },
  { label: "IG", href: "https://www.instagram.com/dolice/" },
  { label: "TH", href: "https://www.threads.net/@dolice" },
  { label: "note", href: "https://note.com/dolice" },
  { label: "in", href: "https://www.linkedin.com/in/dolice/" },
  { label: "FB", href: "https://www.facebook.com/masakihirokawa" },
  { label: "TK", href: "https://www.tiktok.com/@masaki.hirokawa" },
];

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "ja" ? "" : `/${locale}`;

  const links = [
    { key: "privacy", label: t("footer.privacy"), href: `${prefix}/privacy` },
    { key: "terms", label: t("footer.terms"), href: `${prefix}/terms` },
    { key: "tokusho", label: t("footer.tokusho"), href: `${prefix}/tokusho` },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "40px 24px 32px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Support banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          padding: "16px 20px",
          marginBottom: 24,
          borderRadius: 8,
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
          {locale === "ja"
            ? "Rork Lab は無料で運営しています。応援いただけると励みになります。"
            : "Rork Lab is free to use. Your support helps us keep going."}
        </span>
        <a
          href={`${locale === "ja" ? "" : `/${locale}`}/support`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 20px",
            borderRadius: 6,
            border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
            background: "color-mix(in srgb, var(--accent-coral) 8%, transparent)",
            color: "var(--accent-coral)",
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "all 0.3s",
            whiteSpace: "nowrap",
          }}
        >
          {t("footer.support")}
        </a>
      </div>

      {/* Main row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            color: "var(--text-faint)",
            letterSpacing: "0.08em",
          }}
        >
          © 2026{" "}
          <a
            href="https://dolice.design"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-faint)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
          >
            Dolice
          </a>
          {" - "}
          <span style={{ color: "var(--text-faint)" }}>
            {locale === "ja" ? "廣川政樹" : "Masaki Hirokawa"}
          </span>
        </span>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {links.map(({ key, label, href }) => (
            <a
              key={key}
              href={href}
              style={{
                fontSize: 12,
                color: "var(--text-faint)",
                textDecoration: "none",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.04em",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* SNS row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {SNS_LINKS.map((sns) => (
          <a
            key={sns.label}
            href={sns.href}
            target="_blank"
            rel="noopener noreferrer"
            title={sns.label}
            style={{
              fontSize: 11,
              color: "var(--text-faint)",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.04em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
          >
            {sns.label}
          </a>
        ))}
      </div>

      {/* Sister Sites */}
      <div style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: 12,
      }}>
        <span style={{
          fontSize: 10,
          color: "var(--text-dim)",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          Sister Sites
        </span>
        {[
          { label: "Claude Lab", href: "https://claudelab.net" },
          { label: "Antigravity Lab", href: "https://antigravitylab.net" },
        ].map((site) => (
          <a
            key={site.label}
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: "var(--text-faint)",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.04em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
          >
            {site.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
