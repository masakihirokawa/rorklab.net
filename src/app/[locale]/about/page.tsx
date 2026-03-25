import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

const META = {
  ja: {
    title: "運営者について — Rork Lab",
    description: "Rork Lab 運営者・廣川政樹のプロフィール。現代美術家・デジタルクリエイター・アプリデベロッパー。国際芸術賞17冠。",
  },
  en: {
    title: "About — Rork Lab",
    description: "About the founder of Rork Lab — Masaki Hirokawa. Contemporary artist, digital creator, and app developer. Recipient of 17 international art awards.",
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
      canonical: locale === "ja" ? "https://rorklab.net/about" : "https://rorklab.net/en/about",
      languages: {
        ja: "https://rorklab.net/about",
        en: "https://rorklab.net/en/about",
        "x-default": "https://rorklab.net/en/about",
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Social / external links                                           */
/* ------------------------------------------------------------------ */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/dolice/" },
  { label: "Threads", href: "https://www.threads.net/@dolice" },
  { label: "X", href: "https://x.com/dolice" },
  { label: "Facebook", href: "https://www.facebook.com/dolice.masakihirokawa" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dolice/" },
  { label: "TikTok", href: "https://www.tiktok.com/@masaki.hirokawa" },
  { label: "note", href: "https://note.com/dolice" },
  { label: "stand.fm", href: "https://stand.fm/channels/692fec268ddb67b39656f211" },
];

const LINK_STYLE: React.CSSProperties = {
  color: "var(--accent-coral)",
  textDecoration: "none",
  transition: "opacity 0.2s",
};

const SOCIAL_CHIP: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "5px 14px",
  borderRadius: 20,
  border: "1px solid var(--border-subtle)",
  background: "var(--bg-surface)",
  color: "var(--text-muted)",
  fontSize: 12,
  fontFamily: "'DM Mono', monospace",
  textDecoration: "none",
  letterSpacing: "0.03em",
  transition: "border-color 0.3s, color 0.3s",
};

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
          ABOUT
        </span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
        {isJa ? "運営者について" : "About the Founder"}
      </h1>

      <div className="article-content">
        {isJa ? <JaContent /> : <EnContent />}

        {/* ── Social Links ── */}
        <h2>{isJa ? "ソーシャルメディア" : "Social Media"}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={SOCIAL_CHIP}>
              {s.label}
            </a>
          ))}
        </div>

        {/* ── Websites ── */}
        <h2 style={{ marginTop: 40 }}>{isJa ? "ウェブサイト" : "Websites"}</h2>
        <p>
          <a href="https://dolice.design" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>dolice.design</a>
          {isJa ? "（公式サイト）" : " (Official)"}
          <br />
          <a href="https://dolice.net" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>dolice.net</a>
          {isJa ? "（ポートフォリオ）" : " (Portfolio)"}
          <br />
          <a href="https://dolice.base.shop" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>dolice.base.shop</a>
          {isJa ? "（ストア）" : " (Store)"}
          <br />
          <a href="https://linktr.ee/masakihirokawa" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>linktr.ee/masakihirokawa</a>
          {isJa ? "（リンクまとめ）" : " (Linktree)"}
        </p>

        {/* ── Dolice Labs ── */}
        <h2 style={{ marginTop: 40 }}>Dolice Labs</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
          {isJa
            ? "Dolice Labs は、AI技術の最新動向を日本語と英語で発信するナレッジベース群です。"
            : "Dolice Labs is a collection of bilingual knowledge bases covering the latest in AI technology."}
        </p>
        <p>
          <a href="https://claudelab.net" style={LINK_STYLE}>Claude Lab</a> — Claude AI
          <br />
          <a href="https://gemilab.net" style={LINK_STYLE}>Gemini Lab</a> — Google Gemini
          <br />
          <a href="https://antigravitylab.net" style={LINK_STYLE}>Antigravity Lab</a> — Google Antigravity
          <br />
          <a href="https://rorklab.net" style={LINK_STYLE}>Rork Lab</a> — Rork (App Development)
        </p>

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
function JaContent() {
  return (
    <>
      {/* Profile header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 20, fontWeight: 400, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.4 }}>
          廣川政樹
        </p>
        <p style={{ fontSize: 14, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em" }}>
          Masaki Hirokawa
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          現代美術家・デジタルクリエイター・アプリデベロッパー
        </p>
      </div>

      {/* Statement */}
      <p>
        国際芸術賞17冠のグラフィック／現代美術家・アプリデベロッパー。欧州・アジア・米州での展示や、美術書・学術誌への掲載を通じて、日本特有の祈りを背景に、集団心理と認知世界の構造、根源意識を主題として制作しています。
      </p>
      <p>
        アートとテクノロジーの両領域を架橋し、デジタルと詩的感性の狭間に宿る表現を追求し続けています。
      </p>

      {/* Bio */}
      <h2>略歴</h2>
      <p>
        1997年に独学でWebデザインとプログラミングを学び始め、株式会社NTT DATAでのシステムエンジニア、フリーランスクリエイターを経て、2013年に独立系スマートフォンアプリ事業を開始。現在に至るまで累計5,000万ダウンロードを超え、月間アクティブユーザー300万人超のサービスを運営しています。
      </p>
      <p>
        2019年よりグラフィックアート制作を本格的に再開し、欧州・アジア・米州を中心に国際展への出展を活発化。作品は人間の意識、美、崩壊の狭間にある象徴的世界を描き出し、夢と現実の境界を詩的にたどります。
      </p>

      {/* Career */}
      <h2>職歴</h2>
      <p>
        <strong>創業者／リードデベロッパー</strong>（独立アプリ事業）、2013年–現在<br />
        累計5,000万DL、月間300万人超。開発、グローバルASO、経営統括を担当。
      </p>
      <p>
        <strong>クリエイター</strong>（Web／UX、プログラミング、グラフィック）、2005年–現在<br />
        UX／UI設計から実装まで一貫して担当。2008年以降、デザイン書籍への寄稿多数。
      </p>
      <p>
        <strong>プログラマー／SE</strong>（株式会社NTT データ）、2002年<br />
        基幹システムの設計、実装。
      </p>

      {/* Awards */}
      <h2>主な受賞歴</h2>
      <p>
        2025–2026年 DAC – Design Classifications「世界14位」選出（A' Design Award 主催）<br />
        2025年 Award of Achievement（ギリシャ・ハニア 人道文化領事館）<br />
        2025年 The New Great Masters in New York（Fondazione Effetto Arte）<br />
        2024年 Meritorious Service to the Arts Award（Luxembourg Art Prize）<br />
        2024年 Phoenix for the Arts（Fondazione Effetto Arte）<br />
        2024年 Global Art Virtuoso Award（Contemporary Art Collectors）<br />
        2023年 ミケランジェロ国際芸術賞（Fondazione Effetto Arte）<br />
        2023年 A' Design Award Golden Award（写真・フォトマニピュレーション部門）<br />
        2021年 ARTIST OF THE YEAR（ITSLIQUID Group）<br />
        2006年 MTV SO-ZO Competition 優秀賞受賞
      </p>

      {/* Exhibitions */}
      <h2>主な展覧会</h2>
      <p>
        LA Art Show（ロサンゼルス）、Ansan International Photo Festival（韓国・安山）、RenovArt Project（イタリア・マテーラ）、Rome International Art Fair（ローマ）、Paris International Contemporary Art Fair（パリ）、CONTEMPORARY VENICE（ヴェネツィア）、LONDON CONTEMPORARY（ロンドン）ほか多数。
      </p>

      {/* Publications */}
      <h2>掲載誌・書籍（抜粋）</h2>
      <p>
        Le Musee Plus Magazine、365 Art+ Magazine、The Best Contemporary Masters、Imago（Galleria Tilde）、ANTHOLOGY THE LAST DECADE 2015–2025、MacPeople、MdN 各誌ほか。
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  English content                                                   */
/* ------------------------------------------------------------------ */
function EnContent() {
  return (
    <>
      {/* Profile header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 20, fontWeight: 400, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.4 }}>
          Masaki Hirokawa
        </p>
        <p style={{ fontSize: 14, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em" }}>
          廣川政樹
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          Contemporary Artist · Digital Creator · App Developer
        </p>
      </div>

      {/* Statement */}
      <p>
        Graphic and contemporary artist and app developer, recipient of 17 international art awards. Through exhibitions across Europe, Asia, and the Americas, as well as features in art books and academic journals, he creates work grounded in Japan&apos;s distinctive sense of prayer, exploring collective psychology, the cognitive world, and fundamental consciousness.
      </p>
      <p>
        Bridging art and technology, Hirokawa continues to pursue expressions that inhabit the space between the digital and the poetic. His practice evokes a serene yet surreal world in which subtle synesthetic sensibilities and a quietly mystical inspiration coexist.
      </p>

      {/* Bio */}
      <h2>Biography</h2>
      <p>
        Self-taught in web design and programming since 1997, Hirokawa worked as a systems engineer at NTT DATA Corporation before becoming an independent creator. In 2013, he launched an independent smartphone app business that has since surpassed 50 million cumulative downloads worldwide, with more than 3 million monthly active users.
      </p>
      <p>
        Since 2019, he has resumed full-scale production of graphic art and has actively exhibited in international shows across Europe, Asia, and the Americas. His works depict a symbolic world at the intersection of human consciousness, beauty, and decay, poetically tracing the boundary between dream and reality.
      </p>

      {/* Career */}
      <h2>Professional Experience</h2>
      <p>
        <strong>Founder / Lead Developer</strong> (Independent App Business), 2013–present<br />
        50M+ total downloads, 3M+ MAU. Leading development, global ASO, and business management.
      </p>
      <p>
        <strong>Creator</strong> (Web/UX, Programming, Graphic Design), 2005–present<br />
        End-to-end UX/UI design and implementation. Frequent contributor to design publications since 2008.
      </p>
      <p>
        <strong>Programmer / Systems Engineer</strong> (NTT DATA Corporation), 2002<br />
        Design and implementation of core enterprise systems.
      </p>

      {/* Awards */}
      <h2>Selected Awards</h2>
      <p>
        2025–2026 – World&apos;s 14th Best Designer, DAC – Design Classifications (A&apos; Design Award)<br />
        2025 – Award of Achievement (The Consulate of Humanitarian &amp; Culture, Greece)<br />
        2025 – The New Great Masters in New York (Fondazione Effetto Arte)<br />
        2024 – Meritorious Service to the Arts Award (Luxembourg Art Prize)<br />
        2024 – Phoenix for the Arts (Fondazione Effetto Arte)<br />
        2024 – Global Art Virtuoso Award (Contemporary Art Collectors)<br />
        2023 – Michelangelo International Art Prize (Fondazione Effetto Arte)<br />
        2023 – A&apos; Design Award Golden Award (Photography &amp; Photo Manipulation)<br />
        2021 – ARTIST OF THE YEAR (ITSLIQUID Group)<br />
        2006 – Excellence Prize, MTV SO-ZO Competition (AMD)
      </p>

      {/* Exhibitions */}
      <h2>Selected Exhibitions</h2>
      <p>
        LA Art Show (Los Angeles), Ansan International Photo Festival (South Korea), RenovArt Project (Matera, Italy), Rome International Art Fair (Rome), Paris International Contemporary Art Fair (Paris), CONTEMPORARY VENICE (Venice), LONDON CONTEMPORARY (London), and many more.
      </p>

      {/* Publications */}
      <h2>Selected Publications</h2>
      <p>
        Le Musee Plus Magazine, 365 Art+ Magazine, The Best Contemporary Masters, Imago (Galleria Tilde), ANTHOLOGY THE LAST DECADE 2015–2025, MacPeople, MdN publications, and others.
      </p>
    </>
  );
}
