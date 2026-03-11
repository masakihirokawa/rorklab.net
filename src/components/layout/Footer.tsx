"use client";

import { useTranslations, useLocale } from "next-intl";
import { localePrefix } from "@/lib/locale";

const SNS_LINKS = [
  { label: "X", href: "https://x.com/dolice" },
  { label: "Instagram", href: "https://www.instagram.com/dolice/" },
  { label: "Threads", href: "https://www.threads.net/@dolice" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dolice/" },
  { label: "Facebook", href: "https://www.facebook.com/masakihirokawa" },
  { label: "TikTok", href: "https://www.tiktok.com/@masaki.hirokawa" },
];

const SISTER_SITES = [
  { label: "Claude Lab", href: "https://claudelab.net" },
  { label: "Antigravity Lab", href: "https://antigravitylab.net" },
  { label: "Gemini Lab", href: "https://gemilab.net" },
];

const FOOTER_LINK = {
  fontSize: 12,
  color: "var(--text-faint)",
  textDecoration: "none" as const,
  fontFamily: "'DM Mono', monospace" as const,
  letterSpacing: "0.04em",
  transition: "color 0.3s",
};

function hoverFaint(e: React.MouseEvent<HTMLAnchorElement>) {
  if (e.type === "mouseenter") {
    e.currentTarget.style.color = "var(--text-muted)";
  } else {
    e.currentTarget.style.color = "var(--text-faint)";
  }
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = localePrefix(locale);

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
          href={`${prefix}/support`}
          className="support-btn"
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
            whiteSpace: "nowrap",
          }}
        >
          {t("footer.support")}
        </a>
      </div>

      {/* Footer body — 2-row layout matching Claude Lab */}
      <div className="footer-body" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Row 1: Copyright + Legal links */}
      <div
        className="footer-copyright"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
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
              style={FOOTER_LINK}
              onMouseEnter={hoverFaint}
              onMouseLeave={hoverFaint}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Row 2: SNS + Sister sites */}
      <div
        className="footer-sns"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {SNS_LINKS.map((sns) => (
            <a
              key={sns.label}
              href={sns.href}
              target="_blank"
              rel="noopener noreferrer"
              title={sns.label}
              style={{ ...FOOTER_LINK, fontSize: 11 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
            >
              {sns.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
            DOLICE LABS
          </span>
          {SISTER_SITES.map((site) => (
            <a
              key={site.label}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...FOOTER_LINK, fontSize: 11 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
            >
              ◉ {site.label}
            </a>
          ))}
        </div>
      </div>
      </div>
    </footer>
  );
}
