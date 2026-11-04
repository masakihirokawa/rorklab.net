import type { Metadata } from "next";
import { localePrefix } from "@/lib/locale";
import { PRICES, CAMPAIGN, ARTICLE_PRICES } from "@/config/pricing";
import { siteOgImage } from "@/lib/og";

interface Props {
  params: Promise<{ locale: string }>;
}

const META = {
  ja: {
    title: "特定商取引法に基づく表記 — Rork Lab",
    description: "Rork Lab の特定商取引法に基づく表記。販売事業者、所在地、連絡先、販売価格、支払方法・時期、無料体験期間、返品・キャンセルについて。",
  },
  en: {
    title: "Legal Notice (Tokushoho) — Rork Lab",
    description: "Legal notice for Rork Lab under the Japanese Act on Specified Commercial Transactions. Seller, contact, pricing, payment timing, free trial, and cancellation policy.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale as keyof typeof META] || META.en;
  return {
    // レイアウトの title.template が「| サイト名」を付けるので、ここでは外す（OG は template 非適用のため m.title のまま）
    title: m.title.replace(/ — [^—]+$/, ""),
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      images: [{ url: siteOgImage(locale), width: 1200, height: 630 }],
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
  width: "clamp(96px, 28%, 160px)",
  flexShrink: 0,
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-primary)",
  lineHeight: 1.7,
};

const TD_STYLE: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  overflowWrap: "anywhere",
  fontSize: 14,
  color: "var(--text-muted)",
  lineHeight: 1.7,
};

const LINK: React.CSSProperties = {
  color: "var(--accent-coral)",
  textDecoration: "none",
};

const NOTE: React.CSSProperties = { fontSize: 12, color: "var(--text-faint)" };

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
/*  事実の正本: dolice.net（所在地はプライバシーポリシーと同じ市まで・電話は Contact と同じ）*/
/*  Pro の無料体験は api/checkout/route.ts の trial_period_days と一致させる（2026-11-04 更新） */
/* ------------------------------------------------------------------ */
const TRIAL_DAYS = 30;

export default async function TokushoPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";
  const prefix = localePrefix(locale);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
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
            <Row label="販売事業者">Dolice（屋号）— 廣川政樹</Row>
            <Row label="運営責任者">廣川政樹（ひろかわ・まさき）</Row>
            <Row label="所在地">
              富山県滑川市
              <br />
              <span style={NOTE}>※ 番地以下は、ご請求があった場合に遅滞なく開示いたします</span>
            </Row>
            <Row label="電話番号">
              090-8316-1981
              <br />
              <span style={NOTE}>※ お問い合わせは、内容が記録に残るメールにてお願いいたします</span>
            </Row>
            <Row label="メールアドレス">masakihirokawa@gmail.com</Row>
            <Row label="ウェブサイト">
              <a href="https://dolice.net" target="_blank" rel="noopener noreferrer" style={LINK}>dolice.net</a>
            </Row>
            <Row label="運営者プロフィール">
              <a href={`${prefix}/about`} style={LINK}>運営者について</a>
            </Row>
            <Row label="販売価格">
              Tip（応援）: {PRICES.ja.tip}（税込）<br />
              記事単体購入: {ARTICLE_PRICES.ja}（税込・1記事あたり）<br />
              Pro メンバーシップ（月額）: {PRICES.ja.pro.replace("/月", "")}（税込）
              <span style={NOTE}>（初回 {TRIAL_DAYS} 日間は無料）</span><br />
              Premium メンバーシップ（永久アクセス・買い切り）: {CAMPAIGN.enabled ? (
                <>{CAMPAIGN.prices.ja}（税込・{CAMPAIGN.name.ja}）<span style={NOTE}>（通常価格 {PRICES.ja.premium}）</span></>
              ) : (
                <>{PRICES.ja.premium}（税込）</>
              )}
            </Row>
            <Row label="販売価格以外の必要料金">
              インターネット接続料金、通信料金等はお客様のご負担となります。
            </Row>
            <Row label="支払方法">
              クレジットカード決済（Stripe 経由）<br />
              <span style={NOTE}>対応ブランド: Visa, Mastercard, American Express, JCB, Diners Club</span>
            </Row>
            <Row label="支払時期">
              Tip・記事単体購入・Premium: ご注文時に即時決済<br />
              Pro（月額）: お申し込みから {TRIAL_DAYS} 日間は無料体験期間です。期間の終了時に初回の決済が行われ、以降は毎月の更新日に自動で決済されます。
            </Row>
            <Row label="商品の引渡し時期">
              決済完了後（Pro は無料体験の開始時）、即時にプレミアムコンテンツをご覧いただけます。記事単体購入は、購入した記事が対象です。<br />
              <span style={NOTE}>※ Tip は運営への応援を目的とした任意のお支払いです</span>
            </Row>
            <Row label="返品・キャンセル">
              デジタルコンテンツの性質上、購入後の返品・返金には原則として応じかねます。<br />
              Pro（月額）はいつでも解約できます。無料体験期間中に解約された場合、料金は発生しません。解約後も、お支払い済みの期間の終了まで閲覧いただけます。解約は Stripe のお客様ページから行えます（<a href={`${prefix}/support`} style={LINK}>サポート</a>）。
            </Row>
            <Row label="動作環境">
              モダンブラウザ（Chrome, Safari, Firefox, Edge の最新版）を推奨いたします。
            </Row>
          </>
        ) : (
          <>
            <Row label="Seller">Dolice (trade name) — Masaki Hirokawa</Row>
            <Row label="Responsible Person">Masaki Hirokawa</Row>
            <Row label="Address">
              Namerikawa, Toyama, Japan
              <br />
              <span style={NOTE}>* The full street address will be disclosed promptly upon request</span>
            </Row>
            <Row label="Phone">
              +81-90-8316-1981
              <br />
              <span style={NOTE}>* For inquiries, please use email so that a record remains</span>
            </Row>
            <Row label="Email">masakihirokawa@gmail.com</Row>
            <Row label="Website">
              <a href="https://dolice.net/en/" target="_blank" rel="noopener noreferrer" style={LINK}>dolice.net</a>
            </Row>
            <Row label="About the Founder">
              <a href={`${prefix}/about`} style={LINK}>About page</a>
            </Row>
            <Row label="Pricing">
              Tip: {PRICES.en.tip} (incl. tax)<br />
              Single Article Purchase: {ARTICLE_PRICES.en} per article (incl. tax)<br />
              Pro Membership (monthly): {PRICES.en.pro.replace("/mo", ".00")} (incl. tax)
              <span style={NOTE}> (first {TRIAL_DAYS} days free)</span><br />
              Premium Membership (lifetime, one-time): {CAMPAIGN.enabled ? (
                <>{CAMPAIGN.prices.en} (incl. tax · {CAMPAIGN.name.en})<span style={NOTE}> (Regular price {PRICES.en.premium}.00)</span></>
              ) : (
                <>{PRICES.en.premium}.00 (incl. tax)</>
              )}
            </Row>
            <Row label="Additional Costs">
              Internet connection fees and data charges are borne by the customer.
            </Row>
            <Row label="Payment Methods">
              Credit card via Stripe<br />
              <span style={NOTE}>Accepted: Visa, Mastercard, American Express, JCB, Diners Club</span>
            </Row>
            <Row label="Payment Timing">
              Tip, single article, and Premium: charged immediately at the time of purchase.<br />
              Pro (monthly): the first {TRIAL_DAYS} days are a free trial. The first charge is made when the trial ends, and the plan then renews and is charged automatically each month.
            </Row>
            <Row label="Delivery">
              Access to premium content is granted immediately after payment (for Pro, from the start of the free trial). A single article purchase covers that article.<br />
              <span style={NOTE}>* A tip is an optional payment to support the site</span>
            </Row>
            <Row label="Cancellation Policy">
              Due to the nature of digital content, refunds are generally not available after purchase.<br />
              Pro (monthly) can be cancelled at any time. If you cancel during the free trial, you will not be charged. After cancelling, access continues until the end of the period already paid for. You can cancel from the Stripe customer page (see <a href={`${prefix}/support`} style={LINK}>Support</a>).
            </Row>
            <Row label="System Requirements">
              A modern browser (latest versions of Chrome, Safari, Firefox, or Edge) is recommended.
            </Row>
          </>
        )}
      </div>
    </div>
  );
}
