import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginTop: 48,
          marginBottom: 16,
          lineHeight: 1.3,
          letterSpacing: "-0.02em",
        }}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginTop: 40,
          marginBottom: 12,
          lineHeight: 1.4,
          paddingBottom: 8,
          borderBottom: "1px solid var(--border-subtle)",
        }}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        style={{
          fontSize: "clamp(17px, 2.5vw, 22px)",
          fontWeight: 500,
          color: "var(--text-primary)",
          marginTop: 32,
          marginBottom: 8,
          lineHeight: 1.5,
        }}
        {...props}
      />
    ),
    p: (props) => (
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.8,
          color: "var(--text-secondary)",
          margin: "16px 0",
        }}
        {...props}
      />
    ),
    a: (props) => (
      <a
        style={{
          color: "var(--accent-coral)",
          textDecoration: "underline",
          textUnderlineOffset: 3,
          transition: "opacity 0.2s",
        }}
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        style={{
          margin: "16px 0",
          paddingLeft: 24,
          color: "var(--text-secondary)",
          fontSize: 15,
          lineHeight: 1.8,
        }}
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        style={{
          margin: "16px 0",
          paddingLeft: 24,
          color: "var(--text-secondary)",
          fontSize: 15,
          lineHeight: 1.8,
        }}
        {...props}
      />
    ),
    li: (props) => (
      <li style={{ marginBottom: 4 }} {...props} />
    ),
    code: (props) => {
      const isInline = typeof props.children === "string" && !props.className;
      if (isInline) {
        return (
          <code
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.9em",
              padding: "2px 6px",
              borderRadius: 4,
              background: "color-mix(in srgb, var(--accent-coral) 8%, transparent)",
              color: "var(--accent-coral)",
            }}
            {...props}
          />
        );
      }
      return <code {...props} />;
    },
    pre: (props) => (
      <pre
        style={{
          margin: "24px 0",
          padding: "20px 24px",
          borderRadius: 8,
          background: "color-mix(in srgb, var(--bg-primary) 80%, #000)",
          border: "1px solid var(--border-subtle)",
          overflow: "auto",
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: "'DM Mono', monospace",
        }}
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        style={{
          margin: "24px 0",
          padding: "12px 20px",
          borderLeft: "3px solid var(--text-dim)",
          color: "var(--text-muted)",
          fontStyle: "italic",
          fontSize: 15,
          lineHeight: 1.7,
        }}
        {...props}
      />
    ),
    hr: () => (
      <hr
        style={{
          margin: "40px 0",
          border: "none",
          borderTop: "1px solid var(--border-subtle)",
        }}
      />
    ),
    table: (props) => (
      <div style={{ overflowX: "auto", margin: "24px 0" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
          {...props}
        />
      </div>
    ),
    th: (props) => (
      <th
        style={{
          textAlign: "left",
          padding: "10px 16px",
          borderBottom: "2px solid var(--border-subtle)",
          color: "var(--text-primary)",
          fontWeight: 500,
          fontSize: 13,
          fontFamily: "'DM Mono', monospace",
        }}
        {...props}
      />
    ),
    td: (props) => (
      <td
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--border-subtle)",
          color: "var(--text-secondary)",
        }}
        {...props}
      />
    ),
    Callout,
  };
}
