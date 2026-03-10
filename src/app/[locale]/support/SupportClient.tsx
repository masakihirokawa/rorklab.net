"use client";

import { useState } from "react";

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
  tipLabel: string;
  tipSub: string;
  methods: PaymentMethod[];
}

interface StripeTip {
  priceId: string;
}

export function SupportClient({
  content,
  locale,
  stripeTip,
}: {
  content: SupportContent;
  locale: string;
  stripeTip: StripeTip;
}) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleTip = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          priceId: stripeTip.priceId,
          mode: "payment",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Checkout session failed");
        setLoading(false);
      }
    } catch (e) {
      setError("Network error");
      setLoading(false);
    }
  };

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

      {/* Stripe Tip Button */}
      <button
        onClick={handleTip}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          width: "100%",
          padding: "18px 24px",
          borderRadius: 10,
          border: "1px solid var(--accent-coral)",
          background: "color-mix(in srgb, var(--accent-coral) 8%, transparent)",
          cursor: loading ? "wait" : "pointer",
          textAlign: "left",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.25s",
          marginBottom: 24,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 15%, transparent)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 8%, transparent)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "color-mix(in srgb, var(--accent-coral) 20%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          💳
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
            {loading ? "..." : content.tipLabel}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
            {content.tipSub}
          </div>
        </div>
        <span style={{ fontSize: 16, color: "var(--accent-coral)" }}>→</span>
      </button>

      {error && (
        <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", marginBottom: 16 }}>{error}</p>
      )}

      {/* Other payment methods */}
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
              <div style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
                {m.sub}
              </div>
            </div>
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
