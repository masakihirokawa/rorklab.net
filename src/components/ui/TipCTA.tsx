import { localePrefix } from "@/lib/locale";

interface TipCTAProps {
  locale: string;
}

const CONTENT = {
  ja: {
    message:
      "この記事がお役に立ちましたら、チップ（¥150）で応援いただけると今後の執筆の励みになります。",
    link: "チップで応援する →",
  },
  en: {
    message:
      "If you found this article helpful, a small tip ($1.50) would really encourage us to keep writing.",
    link: "Leave a Tip →",
  },
};

export function TipCTA({ locale }: TipCTAProps) {
  const t = CONTENT[locale as keyof typeof CONTENT] || CONTENT.en;
  const prefix = localePrefix(locale);

  return (
    <div
      style={{
        marginTop: 32,
        marginBottom: 8,
        padding: "20px 24px",
        borderRadius: 10,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          lineHeight: 1.7,
          margin: 0,
          flex: "1 1 280px",
        }}
      >
        {t.message}
      </p>
      <a
        href={`${prefix}/support#tip`}
        style={{
          display: "inline-block",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--accent-coral)",
          textDecoration: "none",
          padding: "8px 20px",
          borderRadius: 6,
          border:
            "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
          background:
            "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
          transition: "background 0.2s",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {t.link}
      </a>
    </div>
  );
}
