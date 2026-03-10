"use client";

interface PaymentMethod {
  name: string;
  icon: string;
  label: string;
  sub: string;
  url: string;
  color: string;
  global?: boolean;
  jp?: boolean;
}

interface SupportContent {
  heading: string;
  sub: string;
  note: string;
  methods: PaymentMethod[];
}

export function SupportClient({ content }: { content: SupportContent }) {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px 120px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>♥</div>
        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          {content.heading}
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          {content.sub}
        </p>
      </div>

      {/* Payment methods */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {content.methods.map((m) => (
          <a
            key={m.name}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "18px 24px",
              borderRadius: 10,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.background = "var(--bg-surface-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
              e.currentTarget.style.background = "var(--bg-surface)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: m.color + "18",
                border: `1px solid ${m.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {m.icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>
                  {m.label}
                </span>
                {m.jp && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: "1px 6px",
                      borderRadius: 3,
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-dim)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    JP only
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-dim)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {m.sub}
              </div>
            </div>

            {/* Arrow */}
            <span style={{ fontSize: 16, color: "var(--text-faint)" }}>↗</span>
          </a>
        ))}
      </div>

      {/* Note */}
      <p
        style={{
          marginTop: 32,
          fontSize: 12,
          color: "var(--text-dim)",
          textAlign: "center",
          lineHeight: 1.7,
        }}
      >
        {content.note}
      </p>
    </main>
  );
}
