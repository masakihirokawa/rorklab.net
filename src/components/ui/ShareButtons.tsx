"use client";

import { useLocale } from "next-intl";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const locale = useLocale();
  const label = locale === "ja" ? "シェア" : "Share";

  const links = [
    {
      name: "X",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=dolice`,
    },
    {
      name: "はてブ",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.47 2H3.53A1.45 1.45 0 002 3.38v17.24A1.45 1.45 0 003.53 22h16.94A1.45 1.45 0 0022 20.62V3.38A1.45 1.45 0 0020.47 2zM8.09 17.27a1.4 1.4 0 01-.56.22 3.21 3.21 0 01-.7.07H3.8V6.44h2.82a3.78 3.78 0 012.56.78 2.62 2.62 0 01.87 2.07 2.43 2.43 0 01-.41 1.42 2.31 2.31 0 01-1.18.89v.06a2.3 2.3 0 011.42.91 2.78 2.78 0 01.5 1.68 2.89 2.89 0 01-.37 1.47 2.6 2.6 0 01-.92 1.05zm5.83.42h-2.17V6.44h2.17zm6.28-1.19a2.66 2.66 0 01-1.11 1 3.89 3.89 0 01-1.73.37 3.84 3.84 0 01-1.72-.37 2.73 2.73 0 01-1.12-1 2.63 2.63 0 01-.39-1.42h2.17a.92.92 0 00.29.65 1.07 1.07 0 00.76.25 1 1 0 00.72-.24.86.86 0 00.27-.65.84.84 0 00-.27-.64 1 1 0 00-.72-.24h-.51v-1.55h.51a.83.83 0 00.63-.23.77.77 0 00.23-.59.74.74 0 00-.24-.57.87.87 0 00-.63-.22.94.94 0 00-.66.22.8.8 0 00-.25.57h-2.13a2.5 2.5 0 01.39-1.35 2.53 2.53 0 011.04-.93 3.47 3.47 0 011.54-.34 3.39 3.39 0 011.52.33 2.47 2.47 0 011 .89 2.23 2.23 0 01.36 1.22 1.94 1.94 0 01-.31 1.1 2.06 2.06 0 01-.87.72 2.13 2.13 0 01.97.78 2.16 2.16 0 01.35 1.22 2.54 2.54 0 01-.4 1.42z" />
        </svg>
      ),
      href: `https://b.hatena.ne.jp/entry/s/${url.replace("https://", "")}`,
    },
    {
      name: "LINE",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.864c.218 0 .396.176.396.395 0 .219-.178.395-.396.395h-1.448v.917h1.448c.218 0 .396.177.396.396s-.178.395-.396.395h-1.843a.396.396 0 01-.396-.395V8.949c0-.219.177-.396.396-.396h1.843c.218 0 .396.177.396.395s-.178.396-.396.396h-1.448v.52h1.448zm-3.088 2.103a.395.395 0 01-.555-.073l-1.97-2.696v2.374c0 .219-.177.396-.395.396a.396.396 0 01-.396-.396V8.949c0-.219.177-.395.396-.395.124 0 .234.058.308.147l1.966 2.686V8.949c0-.219.178-.396.396-.396.219 0 .396.177.396.396v3.018a.396.396 0 01-.146.304zm-4.267.073a.396.396 0 01-.396-.396V8.949c0-.219.177-.396.396-.396.218 0 .395.177.395.396v3.018a.395.395 0 01-.395.396zm-1.483 0h-1.843a.396.396 0 01-.396-.396V8.949c0-.219.177-.396.396-.396.218 0 .395.177.395.396v2.622h1.448c.218 0 .396.177.396.396s-.177.395-.396.395zM12 2C6.477 2 2 5.82 2 10.426c0 4.159 3.685 7.644 8.667 8.314.337.073.796.223.912.511.104.261.068.67.034.93l-.149.895c-.044.26-.208 1.021.896.557 1.103-.465 5.949-3.506 8.114-6.002C22.204 13.663 22 12.142 22 10.426 22 5.82 17.523 2 12 2" />
        </svg>
      ),
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 40,
        paddingTop: 24,
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "var(--text-dim)",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.name}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 6,
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.color = "var(--accent-coral)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
