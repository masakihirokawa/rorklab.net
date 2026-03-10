"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export function LocaleSwitcher({ mobile }: { mobile?: boolean } = {}) {
  const locale = useLocale();
  const pathname = usePathname();
  const switchTo = locale === "ja" ? "en" : "ja";

  let switchUrl: string;
  if (switchTo === "ja") {
    // en → ja: remove /en prefix
    const jaPath = pathname.replace(/^\/en(\/|$)/, "/");
    switchUrl = jaPath || "/";
  } else {
    // ja → en: add /en prefix
    const cleanPath = pathname.replace(/^\/ja(\/|$)/, "/");
    switchUrl = `/en${cleanPath === "/" ? "" : cleanPath}`;
  }

  const handleClick = () => {
    // Set NEXT_LOCALE cookie so next-intl middleware remembers the choice
    document.cookie = `NEXT_LOCALE=${switchTo};path=/;max-age=31536000;SameSite=Lax`;
  };

  if (mobile) {
    return (
      <a
        href={switchUrl}
        onClick={handleClick}
        className="header-icon-btn"
        style={{
          width: 32,
          height: 32,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          color: "var(--text-dim)",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.06em",
          borderRadius: 4,
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-surface)",
          cursor: "pointer",
          textDecoration: "none",
          paddingTop: 1,
        }}
      >
        {locale === "ja" ? "EN" : "JP"}
      </a>
    );
  }

  return (
    <a
      href={switchUrl}
      onClick={handleClick}
      className="header-icon-btn"
      style={{
        fontSize: 10,
        color: "var(--text-dim)",
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.06em",
        padding: "4px 8px",
        borderRadius: 3,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
        cursor: "pointer",
        transition: "all 0.3s",
        textDecoration: "none",
      }}
    >
      {locale === "ja" ? "EN" : "JP"}
    </a>
  );
}
