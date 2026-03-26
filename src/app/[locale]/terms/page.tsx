import type { Metadata } from "next";
import { localePrefix } from "@/lib/locale";

interface Props {
  params: Promise<{ locale: string }>;
}

const META = {
  ja: {
    title: "利用規約 — Rork Lab",
    description: "Rork Lab の利用規約。コンテンツの利用条件、著作権、メンバーシップ、免責事項について説明します。",
  },
  en: {
    title: "Terms of Use — Rork Lab",
    description: "Rork Lab Terms of Use. Content usage, copyright, membership terms, and disclaimers.",
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
      canonical: locale === "ja" ? "https://rorklab.net/terms" : "https://rorklab.net/en/terms",
      languages: {
        ja: "https://rorklab.net/terms",
        en: "https://rorklab.net/en/terms",
        "x-default": "https://rorklab.net/en/terms",
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
export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";
  const prefix = localePrefix(locale);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
          TERMS OF USE
        </span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
        {isJa ? "利用規約" : "Terms of Use"}
      </h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 36, lineHeight: 1.6 }}>
        {isJa
          ? "本規約は、Rork Lab（以下「当サイト」）のご利用にあたっての条件を定めるものです。当サイトをご利用いただいた時点で、本規約に同意いただいたものとみなします。"
          : "These terms govern your use of Rork Lab (\"this site\"). By accessing or using this site, you agree to be bound by these terms."}
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
      <h2>サイトの性質</h2>
      <p>
        Rork Lab は Rork Max に関する情報サイトです。当サイトのコンテンツは情報提供を目的としており、正確性・完全性を保証するものではありません。最新かつ正確な情報については、公式ドキュメントをご確認ください。
      </p>

      <h2>著作権と知的財産</h2>
      <p>
        当サイトに掲載されているオリジナルコンテンツ（記事、コード例、デザイン等）の著作権は、サイト運営者に帰属します。
      </p>
      <p>
        Rork 等の商標はそれぞれの権利者に帰属します。当サイトでのこれらの商標の使用は、情報提供の目的に限定されるものであり、権利者との提携・推奨関係を示すものではありません。
      </p>

      <h2>コンテンツの利用</h2>
      <p>
        当サイトのコンテンツを無断で複製・転載・再配布することを禁止します。引用する場合は、出典（サイト名およびURL）を明記してください。
      </p>
      <p>
        コード例については、学習・参考の目的で個人のプロジェクトに利用いただけます。ただし、コード例をそのまま商用製品に組み込む場合は、事前にご連絡ください。
      </p>

      <h2>メンバーシップと決済</h2>
      <p>
        当サイトでは、Stripe を通じた有料メンバーシップを提供しています。決済に関する詳細は<a href={`${prefix}/tokusho`} style={LINK}>特定商取引法に基づく表記</a>をご確認ください。
      </p>
      <p>
        <strong>Pro メンバーシップ（月額）</strong> — いつでもキャンセル可能です。キャンセル後も、その月の残りの期間はアクセスが維持されます。<br />
        <strong>Premium メンバーシップ（永久アクセス）</strong> — 一度のお支払いで、プレミアムコンテンツへの永続的なアクセス権を取得できます。<br />
        <strong>チップ（応援）</strong> — 任意のサポートであり、メンバーシップ権限は付与されません。
      </p>
      <p>
        デジタルコンテンツの性質上、購入後の返品・返金には原則として応じかねます。
      </p>

      <h2>免責事項</h2>
      <p>
        当サイトのコンテンツは情報提供を目的としており、正確性・完全性・最新性を保証するものではありません。コンテンツの利用によって生じた損害について、当サイトは一切の責任を負いません。
      </p>
      <p>
        AI技術は急速に進化しており、当サイトの情報が現在の仕様と異なる場合があります。重要な判断を行う際は、必ず公式ドキュメントや最新情報をご確認ください。
      </p>

      <h2>禁止事項</h2>
      <p>
        当サイトのコンテンツを無断で複製・再配布すること、当サイトに対する不正アクセスや妨害行為、当サイトの名称やコンテンツを利用した虚偽の表示、その他法令に違反する行為を禁止します。
      </p>

      <h2>リンクについて</h2>
      <p>
        当サイトへのリンクは原則として自由です。ただし、フレーム内表示など当サイトのコンテンツであることが不明確になる方法でのリンクはご遠慮ください。当サイトから外部サイトへのリンクについて、リンク先の内容を保証するものではありません。
      </p>

      <h2>準拠法と管轄</h2>
      <p>
        本規約は日本法に準拠し、解釈されます。本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
      </p>

      <h2>規約の変更</h2>
      <p>
        当サイトは、本規約を予告なく変更する場合があります。変更後の規約は、当ページに掲載した時点で効力を生じます。重要な変更がある場合は、当ページにて告知いたします。
      </p>

      <h2>お問い合わせ</h2>
      <p>
        利用規約に関するご質問がございましたら、<a href={`${prefix}/about`} style={LINK}>運営者情報</a>ページに記載の連絡先までお問い合わせください。
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
      <h2>Nature of This Site</h2>
      <p>
        Rork Lab is an information site about Rork Max. The content on this site is provided for informational purposes and does not guarantee accuracy or completeness. For the most up-to-date and accurate information, please refer to the official documentation.
      </p>

      <h2>Copyright and Intellectual Property</h2>
      <p>
        Copyright of original content on this site — including articles, code examples, and design — belongs to the site operator.
      </p>
      <p>
        Trademarks such as Rork belong to their respective owners. Use of these trademarks on this site is for informational purposes only and does not imply any affiliation or endorsement.
      </p>

      <h2>Content Usage</h2>
      <p>
        Unauthorized reproduction, reprinting, or redistribution of this site&apos;s content is prohibited. When quoting, please clearly attribute the source with the site name and URL.
      </p>
      <p>
        Code examples may be used in your personal projects for learning and reference purposes. However, if you wish to incorporate code examples directly into commercial products, please contact us in advance.
      </p>

      <h2>Membership and Payments</h2>
      <p>
        This site offers paid memberships through Stripe. For detailed payment information, please see our <a href={`${prefix}/tokusho`} style={LINK}>Legal Notice</a>.
      </p>
      <p>
        <strong>Pro Membership (monthly)</strong> — Can be cancelled at any time. Access is maintained through the end of the current billing period.<br />
        <strong>Premium Membership (lifetime)</strong> — A one-time payment grants permanent access to all premium content.<br />
        <strong>Tip</strong> — A voluntary show of support that does not grant membership privileges.
      </p>
      <p>
        Due to the nature of digital content, refunds are generally not available after purchase.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The content on this site is provided for informational purposes and does not guarantee accuracy, completeness, or timeliness. We are not liable for any damages arising from the use of this content.
      </p>
      <p>
        AI technology evolves rapidly, and information on this site may differ from current specifications. For critical decisions, always consult official documentation and the latest sources.
      </p>

      <h2>Prohibited Actions</h2>
      <p>
        The following are prohibited: unauthorized reproduction or redistribution of content, unauthorized access or interference with this site, misrepresentation using this site&apos;s name or content, and any other actions that violate applicable laws.
      </p>

      <h2>Linking</h2>
      <p>
        You are generally free to link to this site. However, please avoid linking in ways that obscure the origin of our content, such as embedding within frames. We do not guarantee the content of external sites linked from this site.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by and construed in accordance with the laws of Japan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the Tokyo District Court.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        This site may update these terms without prior notice. Updated terms become effective upon posting on this page. Any significant changes will be announced here.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about these terms, please reach out to us through the contact information listed on our <a href={`${prefix}/about`} style={LINK}>About</a> page.
      </p>
    </>
  );
}
