import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === "ja";
  return {
    title: isJa ? "特定商取引法に基づく表記 | Rork Lab" : "Legal Notice | Rork Lab",
  };
}

export default async function TokushoPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
          {isJa ? "LEGAL" : "LEGAL"}
        </span>
      </div>
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 32 }}>
        {isJa ? "特定商取引法に基づく表記" : "Legal Notice"}
      </h1>

      <div className="article-content">
        {isJa ? (
          <>
            <h2>事業者情報</h2>
            <p>当サイトは個人が運営する非公式の情報サイトです。現時点で有料サービスの提供は行っておりません。</p>
            <h2>運営者</h2>
            <p>Dolice - 廣川政樹</p>
            <p>ウェブサイト: <a href="https://dolice.design" target="_blank" rel="noopener noreferrer">dolice.design</a></p>
            <h2>連絡先</h2>
            <p>お問い合わせは<a href="https://dolice.design/contact" target="_blank" rel="noopener noreferrer">コンタクトフォーム</a>よりお願いいたします。</p>
            <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 40 }}>最終更新日: 2026年3月</p>
          </>
        ) : (
          <>
            <h2>Business Information</h2>
            <p>This site is an unofficial information site operated by an individual. No paid services are currently offered.</p>
            <h2>Operator</h2>
            <p>Dolice - Masaki Hirokawa</p>
            <p>Website: <a href="https://dolice.design" target="_blank" rel="noopener noreferrer">dolice.design</a></p>
            <h2>Contact</h2>
            <p>Please use the <a href="https://dolice.design/contact" target="_blank" rel="noopener noreferrer">contact form</a> for inquiries.</p>
            <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 40 }}>Last updated: March 2026</p>
          </>
        )}
      </div>
    </div>
  );
}
