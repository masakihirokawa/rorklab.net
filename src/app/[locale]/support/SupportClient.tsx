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
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>♥</div>
        <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
          {content.heading}
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
          {content.sub}
        </p>
      </div>

      {/* Membership Section */}
      <div style={{ borderRadius: 14, border: "1px solid var(--accent-coral)", background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-surface))", padding: "36px 28px", marginBottom: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{content.membershipHeading}</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>{content.membershipSub}</p>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          {content.features.map((f, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-coral)", fontSize: 16, flexShrink: 0 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => handleCheckout(plans.pro.priceId, "subscription", "pro")}
            disabled={loading === "pro"}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px 24px", borderRadius: 10, border: "none", background: "var(--accent-coral)", color: "#0a2618", fontSize: 15, fontWeight: 600, cursor: loading === "pro" ? "wait" : "pointer", opacity: loading === "pro" ? 0.7 : 1, transition: "opacity 0.2s, transform 0.15s" }}
            onMouseEnter={(e) => { if (loading !== "pro") e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading === "pro" ? "..." : `${content.proLabel} — ${plans.pro.price}`}
          </button>

          <button
            onClick={() => handleCheckout(plans.premium.priceId, "payment", "premium")}
            disabled={loading === "premium"}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px 24px", borderRadius: 10, border: "1px solid var(--accent-coral)", background: "transparent", color: "var(--accent-coral)", fontSize: 15, fontWeight: 600, cursor: loading === "premium" ? "wait" : "pointer", opacity: loading === "premium" ? 0.7 : 1, transition: "opacity 0.2s, transform 0.15s" }}
            onMouseEnter={(e) => { if (loading !== "premium") { e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 10%, transparent)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading === "premium" ? "..." : `${content.premiumLabel} — ${plans.premium.price}`}
          </button>
        </div>

        <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-faint)", textAlign: "center" }}>
          {locale === "ja" ? "Stripe による安全な決済 · いつでもキャンセル可能" : "Secure payment via Stripe · Cancel anytime"}
        </div>
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", marginBottom: 16 }}>{error}</p>}

      {/* Tip Section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 16, textAlign: "center" }}>{content.tipHeading}</h2>

        <button
          onClick={() => handleCheckout(stripeTip.priceId, "payment", "tip")}
          disabled={loading === "tip"}
          style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", padding: "18px 24px", borderRadius: 10, border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", cursor: loading === "tip" ? "wait" : "pointer", textAlign: "left", opacity: loading === "tip" ? 0.7 : 1, transition: "all 0.25s", marginBottom: 12 }}
          onMouseEnter={(e) => { if (loading !== "tip") { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "color-mix(in srgb, var(--accent-coral) 15%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>💳</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{loading === "tip" ? "..." : content.tipLabel}</div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>{content.tipSub}</div>
          </div>
          <span style={{ fontSize: 16, color: "var(--text-faint)" }}>→</span>
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {content.methods.map((m) => (
            <a key={m.name} href={m.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderRadius: 10, border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", textDecoration: "none", transition: "all 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: m.color + "18", border: `1px solid ${m.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace" }}>{m.sub}</div>
              </div>
              <span style={{ fontSize: 16, color: "var(--text-faint)" }}>↗</span>
            </a>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--text-dim)", textAlign: "center", lineHeight: 1.7 }}>{content.note}</p>
    </main>
  );
}
