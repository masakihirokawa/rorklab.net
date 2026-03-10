const CALLOUT_STYLES: Record<string, { border: string; bg: string; icon: string }> = {
  info: {
    border: "var(--accent-blue)",
    bg: "color-mix(in srgb, var(--accent-blue) 6%, transparent)",
    icon: "ℹ",
  },
  warning: {
    border: "var(--accent-gold)",
    bg: "color-mix(in srgb, var(--accent-gold) 6%, transparent)",
    icon: "⚠",
  },
  tip: {
    border: "var(--accent-green)",
    bg: "color-mix(in srgb, var(--accent-green) 6%, transparent)",
    icon: "💡",
  },
  danger: {
    border: "var(--accent-coral)",
    bg: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
    icon: "⛔",
  },
};

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  children: React.ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const style = CALLOUT_STYLES[type] || CALLOUT_STYLES.info;

  return (
    <div
      style={{
        margin: "24px 0",
        padding: "16px 20px",
        borderLeft: `3px solid ${style.border}`,
        background: style.bg,
        borderRadius: "0 6px 6px 0",
        fontSize: 14,
        lineHeight: 1.7,
        color: "var(--text-secondary)",
      }}
    >
      <span style={{ marginRight: 8 }}>{style.icon}</span>
      {children}
    </div>
  );
}
