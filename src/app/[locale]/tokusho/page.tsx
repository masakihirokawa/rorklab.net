import type { Metadata } from "next";
import { localePrefix } from "@/lib/locale";

interface Props {
  params: Promise<{ locale: string }>;
}

const META = {
  ja: {
    title: "特定商取引法に基づく表記 — Rork Lab",
    description: "Rork Lab の特定商取引法に基づく表記。販売事業者、販売価格、支払方法、返品・キャンセルポリシーについて。",
  },
  en: {
    title: "Legal Notice (Tokushoho) — Rork Lab",
    description: "Legal notice for Rork Lab under the Japanese Act on Specified Commercial Transactions. Operator information, pricing, and cancellation policy.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale as keyof typeof META] || META.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      images: [{ url: "https://rorklab.net/og/default.png", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: locale === "ja" ? "https://rorklab.net/tokusho" : "https://rorklab.net/en/tokusho",
      languages: {
        ja: "https://rorklab.net/tokusho",
        en: "https://rorklab.net/en/tokusho",
        "x-default": "https://rorklab.net/en/tokusho",
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Shared styles                                                     */
/* ------------------------------------------------------------------ */
const TABLE_ROW: React.CSSProperties = {
  display: "flex",
  borderBottom: "1px solid var(--border-subtle)",
  padding: "14px 0",
  gap: 8,
};

const TH_STYLE: React.CSSProperties = {
  width: 160,
  minWidth: 120,
  flexShrink: 0,
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-primary)",
  lineHeight: 1.7,
};

const TD_STYLE: React.CSSProperties = {
  flex: 1,
  fontSize: 14,
  color: "var(--text-muted)",
  lineHeight: 1.7,
};

const LINK: React.CSSProperties = {
  color: "var(--accent-coral)",
  textDecoration: "none",
};

/* ------------------------------------------------------------------ */
/*  Row component                                                     */
/* ------------------------------------------------------------------ */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={TABLE_ROW}>
      <div style={TH_STYLE}>{label}</div>
      <div style={TD_STYLE}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default async function TokushoPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";
  const prefix = localePrefix(locale);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
          LEGAL
        </span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
        {isJa ? "特定商取引法に基づく表記" : "Legal Notice"}
      </h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 36, lineHeight: 1.6 }}>
        {isJa
          ? "特定商取引法第11条に基づき、以下の事項を表示いたします。"
          : "The following information is disclosed in accordance with Article 11 of the Japanese Act on Specified Commercial Transactions."}
      </p>

      {/* Table-style rows */}
      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        {isJa ? (
          <>
            <Row label="販売事業者">Dolice — 廣川政樹</Row>
            <Row label="運営責任者">廣川政樹（ひろかわ まさき）</Row>
            <Row label="所在地">
              ご請求があった場合、遅滞なく開示いたします。
              <br />
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                ※ 個人事業のため住所の常時公開は省略しております
              </span>
            </Row>
            <Row label="電話番号">
              ご請求があった場合、遅滞なく開示いたします。
              <br />
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                ※ お問い合わせはメールにてお願いいたします
              </span>
            </Row>
            <Row label="メールアドレス">
              masakihirokawa@gmail.com
            </Row>
            <Row label="ウェブサイト">
              <a href="https://dolice.design" target="_blank" rel="noopener noreferrer" style={LINK}>dolice.design</a>
            </Row>
            <Row label="運営者プロフィール">
              <a href={`${prefix}/about`} style={LINK}>運営者について</a>
            </Row>
            <Row label="販売価格">
              Tip（応援）: ¥150（税込）<br />
              Pro メンバーシップ（月額）: ¥380（税込）<br />
              Premium メンバーシップ（永久アクセス）: ¥1,480（税込）
            </Row>
            <Row label="販売価格以外の必要料金">
              インターネット接続料金、通信料金等はお客様のご負担となります。
            </Row>
            <Row label="支払方法">
              クレジットカード決済（Stripe経由）<br />
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                対応ブランド: Visa, Mastercard, American Express, JCB, Diners Club
              </span>
            </Row>
            <Row label="支払時期">
              クレジットカード: ご注文時に即時決済<br />
              月額プラン: 毎月の更新日に自動決済
            </Row>
            <Row label="商品の引渡し時期">
              決済完了後、即時にプレミアムコンテンツへのアクセスが可能となります。
            </Row>
            <Row label="返品・キャンセル">
              デジタルコンテンツの性質上、購入後の返品・返金には原則として応じかねます。<br />
              月額プランはいつでもキャンセル可能です。キャンセル後も、その月の残りの期間はアクセスが維持されます。
            </Row>
            <Row label="動作環境">
              モダンブラウザ（Chrome, Safari, Firefox, Edge の最新版）を推奨いたします。
            </Row>
          </>
        ) : (
          <>
            <Row label="Seller">Dolice — Masaki Hirokawa</Row>
            <Row label="Responsible Person">Masaki Hirokawa</Row>
            <Row label="Address">
              Disclosed promptly upon request.
              <br />
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                * Address is withheld from public display as this is a sole proprietorship
              </span>
            </Row>
            <Row label="Phone">
              Disclosed promptly upon request.
              <br />
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                * Please use email for inquiries
              </span>
            </Row>
            <Row label="Email">
              masakihirokawa@gmail.com
            </Row>
            <Row label="Website">
              <a href="https://dolice.design" target="_blank" rel="noopener noreferrer" style={LINK}>dolice.design</a>
            </Row>
            <Row label="About the Founder">
              <a href={`${prefix}/about`} style={LINK}>About page</a>
            </Row>
            <Row label="Pricing">
              Tip: $1.50 (incl. tax)<br />
              Pro Membership (monthly): $3.00 (incl. tax)<br />
              Premium Membership (lifetime): $10.00 (incl. tax)
            </Row>
            <Row label="Additional Costs">
              Internet connection fees and data charges are borne by the customer.
            </Row>
            <Row label="Payment Methods">
              Credit card via Stripe<br />
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
                Accepted: Visa, Mastercard, American Express, JCB, Diners Club
              </span>
            </Row>
            <Row label="Payment Timing">
              Credit card: charged immediately at the time of purchase.<br />
              Monthly plan: automatically charged on each renewal date.
            </Row>
            <Row label="Delivery">
              Access to premium content is granted immediately upon successful payment.
            </Row>
            <Row label="Cancellation Policy">
              Due to the nature of digital content, refunds are generally not available after purchase.<br />
              Monthly plans can be cancelled at any time. Access is maintained through the end of the current billing period.
            </Row>
            <Row label="System Requirements">
              A modern browser (latest versions of Chrome, Safari, Firefox, or Edge) is recommended.
            </Row>
          </>
        )}
      </div>

      <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 48 }}>
        {isJa ? "最終更新日: 2026年3月" : "Last updated: March 2026"}
      </p>
    </div>
  );
}
