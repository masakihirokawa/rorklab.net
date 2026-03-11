import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === "ja";
  return {
    title: isJa ? "利用規約" : "Terms of Use",
      alternates: {
      canonical: locale === "ja" ? "https://rorklab.net/terms" : `https://rorklab.net/en/terms`,
      languages: {
        ja: "https://rorklab.net/terms",
        en: "https://rorklab.net/en/terms",
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
          TERMS OF USE
        </span>
      </div>
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 32 }}>
        {isJa ? "利用規約" : "Terms of Use"}
      </h1>

      <div className="article-content">
        {isJa ? (
          <>
            <h2>免責事項</h2>
            <p>Rork Lab は Rork Max に関する情報サイトです。当サイトのコンテンツは情報提供を目的としており、正確性・完全性を保証するものではありません。</p>
            <h2>著作権</h2>
            <p>当サイトに掲載されているオリジナルコンテンツの著作権は、サイト運営者に帰属します。Rork 等の商標はそれぞれの権利者に帰属します。</p>
            <h2>禁止事項</h2>
            <p>当サイトのコンテンツを無断で複製・転載・再配布することを禁止します。引用する場合は出典を明記してください。</p>
            <h2>変更について</h2>
            <p>当サイトは、利用規約を予告なく変更する場合があります。変更後の利用規約は、当サイトに掲載した時点で効力を生じます。</p>
            <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 40 }}>最終更新日: 2026年3月</p>
          </>
        ) : (
          <>
            <h2>Disclaimer</h2>
            <p>Rork Lab is an information site about Rork Max. The content on this site is for informational purposes and does not guarantee accuracy or completeness.</p>
            <h2>Copyright</h2>
            <p>Copyright of original content on this site belongs to the site operator. Trademarks such as Claude and Anthropic belong to their respective owners.</p>
            <h2>Prohibited Actions</h2>
            <p>Unauthorized reproduction, reprinting, or redistribution of this site&apos;s content is prohibited. Please cite the source when quoting.</p>
            <h2>Changes</h2>
            <p>This site may change the terms of use without prior notice. Changed terms become effective upon posting on this site.</p>
            <p style={{ color: "var(--text-faint)", fontSize: 13, marginTop: 40 }}>Last updated: March 2026</p>
          </>
        )}
      </div>
    </div>
  );
}
