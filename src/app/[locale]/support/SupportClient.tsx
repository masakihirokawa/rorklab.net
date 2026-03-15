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

const RESTORE_TEXT: Record<string, {
  sectionLabel: string;
  description: string;
  placeholder: string;
  button: string;
  loading: string;
  successPro: string;
  successPremium: string;
  errorNotFound: string;
  errorExpired: string;
  errorEmpty: string;
  errorGeneric: string;
}> = {
  ja: {
    sectionLabel: "メンバーなのに広告が表示される方",
    description: "ブラウザを変えた・Cookie を削除した場合は、登録のメールアドレスを入力してください。",
    placeholder: "登録メールアドレス",
    button: "アクセスを復元する",
    loading: "確認中...",
    successPro: "✓ Pro メンバーとして認証しました。このページを再読み込みしてください。",
    successPremium: "✓ Premium メンバーとして認証しました。このページを再読み込みしてください。",
    errorNotFound: "このメールアドレスでの登録が見つかりません。",
    errorExpired: "メンバーシップの有効期限が切れています。サポートまでご連絡ください。",
    errorEmpty: "メールアドレスを入力してください。",
    errorGeneric: "エラーが発生しました。しばらくしてから再度お試しください。",
  },
  en: {
    sectionLabel: "Member but seeing ads?",
    description: "If you switched browsers or cleared cookies, enter your registration email to restore access.",
    placeholder: "Your registration email",
    button: "Restore Access",
    loading: "Checking...",
    successPro: "✓ Verified as Pro member. Please reload this page.",
    successPremium: "✓ Verified as Premium member. Please reload this page.",
    errorNotFound: "No membership found for this email address.",
    errorExpired: "Your membership has expired. Please contact support.",
    errorEmpty: "Please enter your email address.",
    errorGeneric: "An error occurred. Please try again later.",
  },
};

const FAQ_TEXT: Record<string, { heading: string; items: { q: string; a: string }[] }> = {
  ja: {
    heading: "よくある質問",
    items: [
      {
        q: "月額プランはいつでも解約できますか？",
        a: "はい、いつでもキャンセル可能です。Stripe のお客様ページから解約できます。",
      },
      {
        q: "スマホと PC の両方で使えますか？",
        a: "はい。ただしブラウザごとに認証が必要です。「メンバーなのに広告が表示される方」から復元できます。",
      },
      {
        q: "支払い方法は？",
        a: "クレジットカード・デビットカードに対応しています（Stripe 経由）。",
      },
      {
        q: "領収書は発行されますか？",
        a: "Stripe から自動的に領収書メールが届きます。",
      },
    ],
  },
  en: {
    heading: "FAQ",
    items: [
      {
        q: "Can I cancel my monthly plan anytime?",
        a: "Yes, you can cancel at any time from the Stripe customer portal.",
      },
      {
        q: "Can I use it on both mobile and PC?",
        a: "Yes. However, authentication is required per browser. You can restore access using the 'Member but seeing ads?' section above.",
      },
      {
        q: "What payment methods are accepted?",
        a: "Credit and debit cards are accepted via Stripe.",
      },
      {
        q: "Will I receive a receipt?",
        a: "Yes, Stripe automatically sends a receipt email after each payment.",
      },
    ],
  },
};

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

  // Restore access state
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreResult, setRestoreResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const rt = RESTORE_TEXT[locale] || RESTORE_TEXT.en;
  const faq = FAQ_TEXT[locale] || FAQ_TEXT.en;

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

  const handleRestore = async () => {
    if (!restoreEmail.trim()) {
      setRestoreResult({ type: "error", message: rt.errorEmpty });
      return;
    }
    setRestoreLoading(true);
    setRestoreResult(null);
    try {
      const res = await fetch("/api/restore-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: restoreEmail.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        const msg = data.type === "pro" ? rt.successPro : rt.successPremium;
        setRestoreResult({ type: "success", message: msg });
      } else {
        const msg =
          data.error === "not_found" ? rt.errorNotFound :
          data.error === "expired" ? rt.errorExpired :
          rt.errorGeneric;
        setRestoreResult({ type: "error", message: msg });
      }
    } catch {
      setRestoreResult({ type: "error", message: rt.errorGeneric });
    } finally {
      setRestoreLoading(false);
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
        id="membership"
        style={{
          marginBottom: 40,
          padding: 28,
          borderRadius: 12,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 6%, transparent)",
          scrollMarginTop: 64,
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
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 20%, transparent)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 12%, transparent)";
              e.currentTarget.style.transform = "translateY(0)";
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
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 20%, transparent)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 12%, transparent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading === "premium" ? "..." : `${plans.premium.label} — ${plans.premium.price}`}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ color: "#ef4444", fontSize: 13, textAlign: "center", marginBottom: 16 }}>{error}</p>
      )}

      {/* Restore Access */}
      <div style={{ marginBottom: 32 }}>
        <button
          onClick={() => setShowRestore((v) => !v)}
          style={{
            width: "100%",
            padding: "14px 20px",
            borderRadius: 10,
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-surface)",
            color: "var(--text-secondary)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s",
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
          <span>{rt.sectionLabel}</span>
          <span style={{ fontSize: 14, color: "var(--text-faint)", transition: "transform 0.2s", transform: showRestore ? "rotate(180deg)" : "none" }}>
            ▾
          </span>
        </button>

        {showRestore && (
          <div
            style={{
              marginTop: 8,
              padding: "20px 20px 16px",
              borderRadius: 10,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
            }}
          >
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14, lineHeight: 1.7 }}>
              {rt.description}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                type="email"
                value={restoreEmail}
                onChange={(e) => setRestoreEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRestore()}
                placeholder={rt.placeholder}
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <button
                onClick={handleRestore}
                disabled={restoreLoading}
                style={{
                  padding: "10px 18px",
                  borderRadius: 8,
                  border: "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
                  background: "color-mix(in srgb, var(--accent-coral) 10%, transparent)",
                  color: "var(--accent-coral)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: restoreLoading ? "wait" : "pointer",
                  opacity: restoreLoading ? 0.7 : 1,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!restoreLoading) {
                    e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 18%, transparent)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 10%, transparent)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {restoreLoading ? rt.loading : rt.button}
              </button>
            </div>
            {restoreResult && (
              <p
                style={{
                  marginTop: 12,
                  fontSize: 13,
                  color: restoreResult.type === "success" ? "var(--accent-coral)" : "#ef4444",
                  lineHeight: 1.6,
                }}
              >
                {restoreResult.message}
              </p>
            )}
          </div>
        )}
      </div>

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

      {/* FAQ */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 20, textAlign: "center" }}>
          {faq.heading}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faq.items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "16px 20px",
                borderRadius: 10,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.5 }}>
                {item.q}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--text-dim)", textAlign: "center", lineHeight: 1.7 }}>
        {content.note}
      </p>
    </main>
  );
}
