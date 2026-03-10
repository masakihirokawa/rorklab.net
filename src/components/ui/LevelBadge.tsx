"use client";

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  beginner: { bg: "color-mix(in srgb, var(--accent-green) 12%, transparent)", text: "var(--accent-green)" },
  intermediate: { bg: "color-mix(in srgb, var(--accent-gold) 12%, transparent)", text: "var(--accent-gold)" },
  advanced: { bg: "color-mix(in srgb, var(--accent-coral) 12%, transparent)", text: "var(--accent-coral)" },
  "intermediate-advanced": { bg: "color-mix(in srgb, var(--accent-gold) 12%, transparent)", text: "var(--accent-gold)" },
};

interface LevelBadgeProps {
  level: string;
  label: string;
}

export function LevelBadge({ level, label }: LevelBadgeProps) {
  const colors = LEVEL_COLORS[level] || LEVEL_COLORS.intermediate;
  return (
    <span
      style={{
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: 3,
        background: colors.bg,
        color: colors.text,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.03em",
      }}
    >
      {label}
    </span>
  );
}
