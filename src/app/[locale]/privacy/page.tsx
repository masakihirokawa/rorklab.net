import type { Metadata } from "next";
import { localePrefix } from "@/lib/locale";

interface Props {
  params: Promise<{ locale: string }>;
}

const META = {
  ja: {
    title: "プライバシーポリシー — Rork Lab",
    description: "Rork Lab のプライバシーポリシー。個人情報の取り扱い、Cookie・決済情報の管理、第三者サービスの利用について説明します。",
  },
  en: {
    title: "Privacy Policy — Rork Lab",
    description: "Rork Lab Privacy Policy. How we handle personal information, cookies, payment data, and third-party services.",
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
      canonical: locale === "ja" ? "https://rorklab.net/privacy" : "https://rorklab.net/en/privacy",
      languages: {
        ja: "https://rorklab.net/privacy",
        en: "https://rorklab.net/en/privacy",
        "x-default": "https://rorklab.net/en/privacy",
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Shared styles                                                     */
/* ------------------------------------------------------------------ */
const LINK: React.CSSProperties = {
  color: "var(--accent-coral)",
  textDecoration: "none",
  transition: "opacity 0.2s",
};

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";
  const prefix = localePrefix(locale);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
          PRIVACY POLICY
        </span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
        {isJa ? "プライバシーポリシー" : "Privacy Policy"}
      </h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 36, lineHeight: 1.6 }}>
        {isJa
          ? "Rork Lab（以下「当サイト」）は、ユーザーの皆さまのプライバシーを尊重し、個人情報の適切な保護に努めます。本ポリシーでは、当サイトにおける情報の収集・利用・管理について説明いたします。"
          : "Rork Lab (\"this site\") is committed to respecting your privacy and protecting personal information. This policy explains how we collect, use, and manage information on this site."}
      </p>

      <div className="article-content">
        {isJa ? <JaContent prefix={prefix} /> : <EnContent prefix={prefix} />}

        <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 48 }}>
          {isJa ? "最終更新日: 2026年3月" : "Last updated: March 2026"}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Japanese content                                                  */
/* ------------------------------------------------------------------ */
function JaContent({ prefix }: { prefix: string }) {
  return (
    <>
      <h2>収集する情報</h2>
      <p>
        当サイトでは、サービス提供・改善のために以下の情報を取り扱う場合があります。
      </p>
      <p>
        <strong>アクセス解析データ</strong><br />
        Google Analytics を使用し、匿名のトラフィックデータ（ページビュー、参照元、端末情報など）を収集しています。これらのデータは個人を特定するものではなく、サイト改善の目的でのみ使用いたします。
      </p>
      <p>
        <strong>決済情報</strong><br />
        メンバーシップやチップのお支払いには Stripe を利用しています。クレジットカード番号などの決済情報は Stripe が直接処理し、当サイトのサーバーには保存されません。Stripe のプライバシーポリシーについては <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={LINK}>stripe.com/privacy</a> をご確認ください。
      </p>
      <p>
        <strong>メンバーシップ情報</strong><br />
        プレミアムコンテンツへのアクセス管理のため、決済完了時にブラウザの Cookie にメンバーシップトークンを保存します。メールアドレスその他の個人情報を当サイト側で保持することはありません。
      </p>

      <h2>Cookie について</h2>
      <p>
        当サイトでは、以下の目的で Cookie を使用しています。
      </p>
      <p>
        <strong>必須 Cookie</strong> — テーマ設定（ライト／ダーク）やメンバーシップのアクセストークンなど、サイトの基本機能に必要なもの。<br />
        <strong>分析 Cookie</strong> — Google Analytics によるアクセス解析のために使用。匿名データの収集に限定されます。
      </p>
      <p>
        ブラウザの設定により Cookie の受け入れを拒否することが可能ですが、一部の機能（メンバーシップのアクセス等）が制限される場合があります。
      </p>

      <h2>第三者サービス</h2>
      <p>
        当サイトでは以下の第三者サービスを利用しています。各サービスの情報取り扱いについては、それぞれのプライバシーポリシーをご参照ください。
      </p>
      <p>
        <strong>Google Analytics</strong> — アクセス解析（<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={LINK}>Google プライバシーポリシー</a>）<br />
        <strong>Stripe</strong> — 決済処理（<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={LINK}>Stripe プライバシーポリシー</a>）<br />
        <strong>Cloudflare</strong> — ホスティング・CDN（<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={LINK}>Cloudflare プライバシーポリシー</a>）
      </p>

      <h2>情報の管理と保護</h2>
      <p>
        当サイトが取り扱う情報は必要最小限にとどめ、適切な技術的措置により保護しています。通信はすべて SSL/TLS で暗号化され、決済情報は PCI DSS に準拠した Stripe のインフラストラクチャで処理されます。
      </p>

      <h2>お子様のプライバシー</h2>
      <p>
        当サイトは16歳未満のお子様から意図的に個人情報を収集することはありません。16歳未満の方がメンバーシップに登録される場合は、保護者の同意が必要です。
      </p>

      <h2>ポリシーの変更</h2>
      <p>
        本プライバシーポリシーは、法令の改正やサービス内容の変更に応じて更新される場合があります。重要な変更がある場合は、当ページにて告知いたします。
      </p>

      <h2>お問い合わせ</h2>
      <p>
        プライバシーに関するご質問やご要望がございましたら、<a href={`${prefix}/about`} style={LINK}>運営者情報</a>ページに記載の連絡先までお問い合わせください。
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  English content                                                   */
/* ------------------------------------------------------------------ */
function EnContent({ prefix }: { prefix: string }) {
  return (
    <>
      <h2>Information We Collect</h2>
      <p>
        We may collect the following types of information in order to provide and improve our services.
      </p>
      <p>
        <strong>Analytics Data</strong><br />
        We use Google Analytics to collect anonymous traffic data such as page views, referral sources, and device information. This data does not personally identify you and is used solely to improve the site.
      </p>
      <p>
        <strong>Payment Information</strong><br />
        Membership and tip payments are processed through Stripe. Credit card numbers and other payment details are handled directly by Stripe and are never stored on our servers. For more information, please see <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={LINK}>Stripe&apos;s Privacy Policy</a>.
      </p>
      <p>
        <strong>Membership Data</strong><br />
        To manage access to premium content, a membership token is stored in your browser&apos;s cookies upon successful payment. We do not store your email address or other personal information on our end.
      </p>

      <h2>Cookies</h2>
      <p>
        This site uses cookies for the following purposes:
      </p>
      <p>
        <strong>Essential Cookies</strong> — Required for core functionality such as theme preferences (light/dark) and membership access tokens.<br />
        <strong>Analytics Cookies</strong> — Used by Google Analytics for anonymous traffic analysis.
      </p>
      <p>
        You may configure your browser to reject cookies, though some features (such as membership access) may be limited as a result.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        This site uses the following third-party services. Please refer to each provider&apos;s privacy policy for details on how they handle your information.
      </p>
      <p>
        <strong>Google Analytics</strong> — Traffic analysis (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={LINK}>Google Privacy Policy</a>)<br />
        <strong>Stripe</strong> — Payment processing (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={LINK}>Stripe Privacy Policy</a>)<br />
        <strong>Cloudflare</strong> — Hosting &amp; CDN (<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={LINK}>Cloudflare Privacy Policy</a>)
      </p>

      <h2>Data Protection</h2>
      <p>
        We collect only the minimum information necessary and protect it with appropriate technical measures. All communications are encrypted via SSL/TLS, and payment information is processed on Stripe&apos;s PCI DSS-compliant infrastructure.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        We do not intentionally collect personal information from children under 16. If you are under 16 and wish to subscribe to a membership, parental consent is required.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated in response to changes in applicable laws or our services. Any significant changes will be announced on this page.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions or concerns regarding privacy, please reach out to us through the contact information listed on our <a href={`${prefix}/about`} style={LINK}>About</a> page.
      </p>
    </>
  );
}
