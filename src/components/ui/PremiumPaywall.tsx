"use client";

import { useState } from "react";
import { getPriceIds, getLabels, getCampaign } from "@/config/pricing";

interface PremiumPaywallProps {
  locale: string;
  highlights?: string[];
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
    sectionLabel: "メンバーなのにプレミアム記事が全文読めない方（引き継ぎ）",
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
    sectionLabel: "Member but can't read full articles? (Access Transfer)",
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

export function PremiumPaywall({ locale, highlights }: PremiumPaywallProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [restoreResult, setRestoreResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const priceIds = getPriceIds(locale);
  const labels = getLabels(locale);
  const campaign = getCampaign(locale);
  const rt = RESTORE_TEXT[locale] || RESTORE_TEXT.en;

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

  const handleCheckout = async (priceId: string, mode: string, plan: string) => {
    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, priceId, mode, cancelUrl: window.location.href }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Checkout error handled silently
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: -200,
        paddingTop: 200,
        background:
          "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 65%)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "48px 24px",
          borderRadius: 12,
          border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
          background: "color-mix(in srgb, var(--accent-coral) 4%, var(--bg-surface))",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 12 }}>✦</div>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-dim)",
            lineHeight: 1.7,
            marginBottom: 12,
          }}
        >
          {locale === "ja"
            ? "ここまでお読みいただきありがとうございます。"
            : "Thank you for reading this far."}
        </p>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          {locale === "ja" ? "この記事の続きを読む" : "Continue Reading"}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: highlights && highlights.length > 0 ? 16 : 28,
          }}
        >
          {locale === "ja"
            ? "この先には、実装コードやベンチマーク結果など、実務でお役に立てる内容をご用意しています。もしよろしければ、メンバーシップでご覧いただけますと幸いです。"
            : "What follows includes implementation code, benchmarks, and practical content we hope you'll find useful. We'd be grateful if you'd consider joining our membership."}
        </p>
        {highlights && highlights.length > 0 && (
          <div style={{ textAlign: "left", marginBottom: 28, padding: "12px 16px", borderRadius: 8, background: "color-mix(in srgb, var(--accent-coral) 2%, var(--bg-primary))" }}>
            <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", color: "var(--accent-coral)", marginBottom: 8 }}>
              {locale === "ja" ? "この記事で得られること" : "WHAT YOU'LL LEARN"}
            </div>
            {highlights.map((h, i) => (
              <div key={i} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, paddingLeft: 16, position: "relative", marginBottom: i < highlights.length - 1 ? 4 : 0 }}>
                <span style={{ position: "absolute", left: 0, color: "var(--accent-coral)", fontSize: 11 }}>✦</span>
                {h}
              </div>
            ))}
          </div>
        )}

        {/* Premium — primary CTA */}
        <button
          onClick={() => handleCheckout(priceIds.premium, "payment", "premium")}
          disabled={!!loading}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 320,
            margin: "0 auto 10px",
            padding: "14px 24px",
            borderRadius: 8,
            border: campaign.enabled
              ? "1px solid color-mix(in srgb, #daa520 50%, transparent)"
              : "1px solid color-mix(in srgb, var(--accent-coral) 50%, transparent)",
            background: campaign.enabled
              ? "color-mix(in srgb, #daa520 12%, transparent)"
              : "color-mix(in srgb, var(--accent-coral) 12%, transparent)",
            color: campaign.enabled ? "#daa520" : "var(--accent-coral)",
            fontSize: 14,
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
            opacity: loading === "premium" ? 0.7 : 1,
            transition: "all 0.25s",
            letterSpacing: "-0.01em",
            position: "relative" as const,
            overflow: "visible",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              const c = campaign.enabled ? "#daa520" : "var(--accent-coral)";
              e.currentTarget.style.background = `color-mix(in srgb, ${c} 20%, transparent)`;
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            const c = campaign.enabled ? "#daa520" : "var(--accent-coral)";
            e.currentTarget.style.background = `color-mix(in srgb, ${c} 12%, transparent)`;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {campaign.enabled && (
            <span style={{
              position: "absolute" as const,
              top: -10,
              right: 12,
              padding: "3px 9px 1px",
              borderRadius: 4,
              background: "linear-gradient(135deg, #b8860b, #daa520, #f0c040)",
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
              fontWeight: 700,
              letterSpacing: locale === "ja" ? "0.1em" : "0.03em",
              color: "#fff",
              whiteSpace: "nowrap" as const,
            }}>
              {campaign.name}
            </span>
          )}
          {loading === "premium"
            ? locale === "ja" ? "処理中..." : "Loading..."
            : campaign.enabled
              ? <>
                  <span style={{ textDecoration: "line-through", opacity: 0.5, fontWeight: 400, marginRight: 6 }}>
                    {campaign.originalPrice}
                  </span>
                  {`Premium — ${campaign.price}`}
                </>
              : labels.premiumButton}
        </button>

        {/* Pro — secondary */}
        <button
          onClick={() => handleCheckout(priceIds.pro, "subscription", "pro")}
          disabled={!!loading}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 320,
            margin: "0 auto",
            padding: "14px 24px",
            borderRadius: 8,
            border: "1px solid color-mix(in srgb, var(--accent-coral) 30%, transparent)",
            background: "transparent",
            color: "var(--accent-coral)",
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? "wait" : "pointer",
            opacity: loading === "pro" ? 0.7 : 1,
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 8%, transparent)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {loading === "pro"
            ? locale === "ja" ? "処理中..." : "Loading..."
            : labels.proButton}
        </button>

        <div
          style={{
            marginTop: 16,
            fontSize: 11,
            color: "var(--text-faint)",
          }}
        >
          {locale === "ja"
            ? "Stripe による安全な決済 · いつでもキャンセル可能"
            : "Secure payment via Stripe · Cancel anytime"}
        </div>

        {/* Restore Access */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={() => setShowRestore((v) => !v)}
            style={{
              width: "100%",
              padding: "10px 16px",
              borderRadius: 8,
              border: "1px solid var(--border-subtle)",
              background: "transparent",
              color: "var(--text-muted)",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
            }}
          >
            <span>{rt.sectionLabel}</span>
            <span style={{ fontSize: 12, color: "var(--text-faint)", transition: "transform 0.2s", transform: showRestore ? "rotate(180deg)" : "none" }}>
              ▾
            </span>
          </button>

          {showRestore && (
            <div
              style={{
                marginTop: 8,
                padding: "16px",
                borderRadius: 8,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-primary)",
              }}
            >
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.7 }}>
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
                    minWidth: 180,
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleRestore}
                  disabled={restoreLoading}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 6,
                    border: "1px solid color-mix(in srgb, var(--accent-coral) 40%, transparent)",
                    background: "color-mix(in srgb, var(--accent-coral) 10%, transparent)",
                    color: "var(--accent-coral)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: restoreLoading ? "wait" : "pointer",
                    opacity: restoreLoading ? 0.7 : 1,
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!restoreLoading) {
                      e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 18%, transparent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "color-mix(in srgb, var(--accent-coral) 10%, transparent)";
                  }}
                >
                  {restoreLoading ? rt.loading : rt.button}
                </button>
              </div>
              {restoreResult && (
                <p
                  style={{
                    marginTop: 10,
                    fontSize: 12,
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
      </div>
    </div>
  );
}
