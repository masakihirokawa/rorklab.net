"use client";

import { useState, useEffect } from "react";

interface PaymentMethod {
  name: string;
  icon: string;
  label: string;
  sub: string;
  url: string;
  color: string;
  global?: boolean;
  mobileOnly?: boolean;
}

interface Plan {
  priceId: string;
  label: string;
  price: string;
}

interface SupportContent {
  heading: string;
  sub: string;
  membershipHeading: string;
  membershipSub: string;
  features: string[];
  proLabel: string;
  premiumLabel: string;
  tipHeading: string;
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
  plans,
}: {
  content: SupportContent;
  locale: string;
  stripeTip: StripeTip;
  plans: { pro: Plan; premium: Plan };
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleCheckout = async (priceId: string, mode: "payment" | "subscription", key: string) => {
    setLoading(key);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, priceId, mode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Checkout session failed");
        setLoading(null);
      }
    } catch {
      setError("Network error");
      setLoading(null);
    }
  };

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px 120px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
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

      {/* Membership */}
      <div
        style={{
          marginBottom: 40,
          padding: 28,
          borderRadius: 12,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, textAlign: "center" }}>
          {content.membershipHeading}
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", marginBottom: 20, lineHeight: 1.7 }}>
          {content.membershipSub}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          {content.features.map((f, i) => (
            <li key={i} style={{ fontSize: 14, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--accent-coral)", fontSize: 12 }}>✓</span> {f}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <button
            onClick={() => handleCheckout(plans.pro.priceId, "subscription", "pro")}
            disabled={!!loading}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 8,
              border: "1px solid color-mix(in srgb, var(--accent-coral) 50%, transparent)",
              background: "color-mix(in srgb, var(--accent-coral) 12%, transparent)",
              color: "var(--accent-coral)",
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.25s",
            }}
          >
            {loading === "pro" ? "..." : `${plans.pro.label} — ${plans.pro.price}`}
          </button>
          <button
            onClick={() => handleCheckout(plans.premium.priceId, "payment", "premium")}
            disabled={!!loading}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 8,
              border: "1px solid color-mix(in srgb, var(--accent-coral) 50%, transparent)",
              background: "color-mix(in srgb, var(--accent-coral) 12%, transparent)",
              color: "var(--accent-coral)",
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.25s",
            }}
          >
            {loading === "premium" ? "..." : `${plans.premium.label} — ${plans.premium.price}`}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", marginBottom: 16 }}>{error}</p>
      )}

      {/* Tip Section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 16, textAlign: "center" }}>
          {content.tipHeading}
        </h2>

        <button
          onClick={() => handleCheckout(stripeTip.priceId, "payment", "tip")}
          disabled={loading === "tip"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            width: "100%",
            padding: "18px 24px",
            borderRadius: 10,
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-surface)",
            cursor: loading === "tip" ? "wait" : "pointer",
            textAlign: "left",
            opacity: loading === "tip" ? 0.7 : 1,
            transition: "all 0.25s",
            marginBottom: 12,
          }}
          onMouseEnter={(e) => {
            if (loading !== "tip") {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "color-mix(in srgb, var(--accent-coral) 15%, transparent)",
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
              {loading === "tip" ? "..." : content.tipLabel}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
              {content.tipSub}
            </div>
          </div>
          <span style={{ fontSize: 16, color: "var(--text-faint)" }}>→</span>
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {content.methods.filter((m) => !m.mobileOnly || isMobile).map((m) => (
            <a
              key={m.name}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 24px",
                borderRadius: 10,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                textDecoration: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
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
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 2 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>
                  {m.sub}
                </div>
              </div>
              <span style={{ fontSize: 16, color: "var(--text-faint)" }}>↗</span>
            </a>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--text-dim)", textAlign: "center", lineHeight: 1.7 }}>
        {content.note}
      </p>
    </main>
  );
}
