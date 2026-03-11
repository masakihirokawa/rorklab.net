import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === "ja";
  return {
    title: isJa ? "プライバシーポリシー" : "Privacy Policy",
      alternates: {
      canonical: locale === "ja" ? "https://rorklab.net/privacy" : `https://rorklab.net/en/privacy`,
      languages: {
        ja: "https://rorklab.net/privacy",
        en: "https://rorklab.net/en/privacy",
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
          PRIVACY POLICY
        </span>
      </div>
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 32 }}>
        {isJa ? "プライバシーポリシー" : "Privacy Policy"}
      </h1>

      <div className="article-content">
        {isJa ? (
          <>
            <h2>個人情報の取り扱いについて</h2>
            <p>Rork Lab（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。</p>
            <h2>収集する情報</h2>
            <p>当サイトでは、アクセス解析のために Google Analytics を使用する場合があります。Google Analytics はCookie を使用して匿名のトラフィックデータを収集しますが、個人を特定する情報は収集しません。</p>
            <h2>Cookie について</h2>
            <p>当サイトでは、ユーザー体験の向上のために Cookie を使用する場合があります。ブラウザの設定により Cookie の受け入れを拒否することが可能ですが、一部の機能が制限される場合があります。</p>
            <h2>お問い合わせ</h2>
            <p>プライバシーポリシーに関するお問い合わせは、サイト運営者までご連絡ください。</p>
            <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 40 }}>最終更新日: 2026年3月</p>
          </>
        ) : (
          <>
            <h2>About Handling Personal Information</h2>
            <p>Rork Lab (&quot;this site&quot;) respects user privacy and is committed to protecting personal information.</p>
            <h2>Information We Collect</h2>
            <p>This site may use Google Analytics for access analysis. Google Analytics uses cookies to collect anonymous traffic data but does not collect personally identifiable information.</p>
            <h2>About Cookies</h2>
            <p>This site may use cookies to improve user experience. You can refuse cookies through your browser settings, but some features may be limited.</p>
            <h2>Contact</h2>
            <p>For inquiries about our privacy policy, please contact the site operator.</p>
            <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 40 }}>Last updated: March 2026</p>
          </>
        )}
      </div>
    </div>
  );
}
