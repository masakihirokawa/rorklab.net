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
          <a href="https://dolice.net" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>dolice.net</a>
          {isJa ? "（公式サイト）" : " (Official)"}
          <br />
          <a href="https://dolice.design" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>dolice.design</a>
          {isJa ? "（アート・ポートフォリオ）" : " (Art Portfolio)"}
          <br />
          <a href="https://dolice.base.shop" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>dolice.base.shop</a>
          {isJa ? "（ストア）" : " (Store)"}
          <br />
          <a href="https://linktr.ee/masakihirokawa" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>linktr.ee/masakihirokawa</a>
          {isJa ? "（全てのリンク）" : " (All Links)"}
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
          {isJa ? "最終更新日: 2026年5月" : "Last updated: May 2026"}
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
        アートとテクノロジーの両領域を架橋し、デジタルと詩的感性の狭間に宿る表現を追求し続けています。その創作は、繊細な共感覚と静かな神秘性が共存する、静謐で超現実的な世界を立ち上げます。
      </p>

      {/* Bio */}
      <h2>略歴</h2>
      <p>
        1997年に独学でWebデザインとプログラミングを学び始め、1999年に株式会社国和システムへDTPオペレーターとして入社。2002年には株式会社NTT DATAにてプログラマー／システムエンジニアとして基幹システム開発に従事し、2005年よりフリーランスとして独立しました。以降、Webデザイン、プログラミング、グラフィック制作、インタラクティブムービー制作など、幅広い領域で活動を展開しています。
      </p>
      <p>
        2011年にはテクニカルアーティストとしてゲーム開発に参加し、2013年には独立系スマートフォンアプリ事業を開始。現在に至るまで累計5,000万ダウンロードを超え、月間アクティブユーザー300万人超のユーザーに支えられながら、開発・グローバルマーケティング・運営を継続しています。
      </p>
      <p>
        2019年よりグラフィックアート制作を本格的に再開し、欧州・アジア・米州を中心に国際展への出展を活発化。作品は、人間の意識、美、崩壊の狭間にある象徴的世界を描き出し、夢と現実の境界を詩的にたどります。
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
        <strong>テクニカルアーティスト</strong>（ゲーム開発）、2011年<br />
        制作統括。
      </p>
      <p>
        <strong>プログラマー／SE</strong>（株式会社 NTT データ）、2002年<br />
        基幹システムの設計、実装。
      </p>
      <p>
        <strong>DTP オペレーター</strong>（株式会社国和システム）、2000年<br />
        プリプレス、レイアウト、制作。
      </p>

      {/* Awards */}
      <h2>受賞歴</h2>
      <p>
        2025–2026年 DAC – Design Classifications「世界14位」選出（A&apos; Design Award 主催）<br />
        2025年 Award of Achievement（ギリシャ・ハニア 人道文化領事館 主催）<br />
        2025年 The New Great Masters in New York（Fondazione Effetto Arte 主催）<br />
        2025年 W* Recognition（A&apos; Design Award 主催）<br />
        2024年 Meritorious Service to the Arts Award（Luxembourg Art Prize 主催）<br />
        2024年 Phoenix for the Arts（Fondazione Effetto Arte 主催）<br />
        2024年 Global Art Virtuoso Award（Contemporary Art Collectors 主催）<br />
        2023年 Harmony for Humanity Art Prize（Contemporary Art Collectors 主催）<br />
        2023年 Career Art Award（Fondazione Effetto Arte 主催）<br />
        2023年 The Genius of Italy – ミケランジェロ国際芸術賞（Fondazione Effetto Arte 主催）<br />
        2023年 A&apos; Design Award Golden Award（写真・フォトマニピュレーション部門）<br />
        2022年 第12回 ITSLIQUID International Contest 栄誉賞<br />
        2022年 BEST COVER ARTIST AWARD（365 Art+ Business Magazine 主催）<br />
        2022年 A&apos; Design Award Iron Award（グラフィックデザイン部門）<br />
        2021年 第11回 ITSLIQUID International Contest 栄誉賞<br />
        2021年 ARTIST OF THE YEAR（ITSLIQUID Group 主催）<br />
        2006年 MTV SO-ZO Competition supported by AMD『Webスクリーンセーバー部門』優秀賞受賞
      </p>

      {/* Exhibitions */}
      <h2>主な展覧会</h2>
      <p>
        LA Art Show（ロサンゼルス）、Ansan International Photo Festival（韓国・安山）、RenovArt Project（イタリア・マテーラ）、Rome International Art Fair（ローマ）、Paris International Contemporary Art Fair（パリ）、CONTEMPORARY VENICE（ヴェネツィア）、LONDON CONTEMPORARY（ロンドン）、KINTSUGI／TRACES OF DREAMS（M.A.D.S. ART GALLERY／ミラノ）ほか多数。
      </p>

      {/* Publications */}
      <h2>掲載誌・書籍（抜粋）</h2>
      <p>
        Le Musee Plus Magazine、365 Art+ Magazine、The Best Contemporary Masters、Imago（Galleria Tilde）、ANTHOLOGY THE LAST DECADE 2015–2025、Digital Art Creators、The Luxury Collection of Contemporary Artistry、MacPeople、MdN 各誌ほか。
      </p>

      {/* Influences */}
      <h2>影響について</h2>
      <p>
        私が16歳だった1997年頃、当時まだ新しかったインターネットに強く心を惹かれ、それをきっかけに独学でウェブデザインを学び始めました。ネットという場を通して、国境を越えてデザイナー、プログラマー、アーティストの方々と出会えたことは、私の視野を大きく広げ、多分野を横断して物事を見る姿勢を形作って行きました。
      </p>
      <p>
        一方で、より静かな継承もありました。私の両祖父は共に宮大工として、社寺建築の建造や修復に携わっていました。そこから私は、形や空間は目に見えないものを受け止める器になり得ること、そして手を動かすことそのものが一つの信心であり得ることを、自然と受け取っていたのだと思います。この感覚は、私が一見アートとは無縁に見える分野で働いていた時期にも、ずっと根底に流れていました。
      </p>
      <p>
        その後、私の歩みは基幹システム開発、インタラクティブムービー制作、グラフィックデザイン書籍の執筆、ゲーム開発、アプリ開発へと広がり、2019年からは改めてグラフィックアートに舵を切りました。同年の晩秋、東京・吉祥寺駅の夜空の下で、私は不思議な光の輪を目にしました。それは言葉を伴わない指示であり、どこかラテン語で語りかけられているような感覚でもあり、今後は視覚表現に心血を注ぎなさいと告げられているかのようでした。その体験が、象徴的で夢幻的な作品を一気に制作していく大きな転機となりました。
      </p>
      <p>
        私は、自由で主権的な表現を貫いた画家レオノール・フィニに深い敬意を抱き、またエンジニア出身でありながら構造的で詩的な作品を作り上げたハンス・ベルメールの美意識にも強く惹かれています。これらの作家を最初に知ったのは澁澤龍彦氏の著作を通してでしたが、その世界観は若い頃の私に決定的な影響を与えました。なかでも最も大きな影響を与えてくれたのは、17歳の時にオンラインで出会った一人の指導者です。芸術とは高尚な特別のものではなく、本来は全ての人に開かれた自然な言語である——そのことを、彼は教えてくれました。
      </p>

      {/* Future Vision */}
      <h2>将来への展望</h2>
      <p>
        私の創作上の目標は、精神性と科学が接するところに立ち現れる「余剰次元」を視覚化することと深く結びついています。一般相対性理論や量子力学、因果集合論に触れながら、一方で最愛の祖父母が大切にしていた仏教の信仰にも改めて向き合うことで、この関心は少しずつ育まれてきました。
      </p>
      <p>
        作品を通じて、聖なるものと世俗的なものとの断絶を少しでも和らげ、人と自然との細やかな結びつきを回復させたいと考えています。自然の象徴、人間の哲学的な思考、そして現代科学のイメージを視覚的な物語として織り上げることで、内に潜む聖なる次元が、私たちが生きる広い世界と対話できるようにしたいのです。
      </p>
      <p>
        要するに、私の作品が、これら幾つもの領域のあいだに静かに立つ仲立ちとなり、作品を観てくださる方々が、自分自身と宇宙のより深い層に触れるきっかけになれば、それが私の創作の役割だと考えています。
      </p>

      {/* Children */}
      <h2>子どもたちに見せる世界</h2>
      <p>
        この願いは、同時にとても個人的なものでもあります。今は離れて暮らす子どもたちの父として、また転居や別離、様々な困難をくぐり抜けてきた者として、私は、芸術とは次の世代に温もりと強さ、そして美しさを託して行こうとする、一生を懸けた誓いの形なのだと感じています。言葉は時に不器用ですが、作品は、たとえ離れていても、世代と世代、言葉と言葉、内なる世界と外の世界を静かに結び直す架け橋になり得ます。
      </p>

      {/* Apps */}
      <h2>運営中のアプリ</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
        2013年の独立アプリ事業開始以降、現在も継続して運営しているアプリ群です。累計5,000万ダウンロードを超え、月間アクティブユーザー300万人超を維持しています。
      </p>
      <p>
        <strong>綺麗な壁紙 4K/HDR</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id706533906" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
        {" / "}
        <a href="https://play.google.com/store/apps/details?id=net.dolice.beautifulwallpapers" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Android</a>
        <br />
        <strong>浮世絵壁紙</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id835559799" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
        {" / "}
        <a href="https://play.google.com/store/apps/details?id=net.dolice.ukiyoe" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Android</a>
        <br />
        <strong>望みが叶う！引き寄せの法則アプリ</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id841157677" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
        <br />
        <strong>リラックス・ヒーリング</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id694492667" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
      </p>

      {/* Documents */}
      <h2>プロフィール資料</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>
        ご利用・ご参照用の PDF 資料です。展覧会・出版・取材等にお役立てください。
      </p>
      <p>
        <a href="https://dolice.net/pub/Artist_Profile_Masaki_Hirokawa_Japanese.pdf" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>アーティストプロフィール（日本語版）PDF</a>
        <br />
        <a href="https://dolice.net/pub/Artwork_Details_Masaki_Hirokawa.pdf" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>アートワーク・ドキュメンテーション PDF</a>
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
        Self-taught in web design and programming since 1997, Hirokawa joined Kokuwa System Co., Ltd. in 1999 as a DTP operator. In 2002, he worked at NTT DATA Corporation as a programmer and systems engineer, contributing to core system development. In 2005, he became an independent creator and expanded his activities across web design, programming, graphic production, and interactive movie projects.
      </p>
      <p>
        In 2011, he participated in game development as a technical artist, and in 2013 he launched an independent smartphone app business that has since surpassed 50 million cumulative downloads worldwide, with more than 3 million monthly active users. He continues to lead development, global marketing, and operations.
      </p>
      <p>
        Since 2019, Hirokawa has resumed full-scale production of graphic art and has actively exhibited in international shows across Europe, Asia, and the Americas. His works depict a symbolic world at the intersection of human consciousness, beauty, and decay, poetically tracing the boundary between dream and reality.
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
        <strong>Technical Artist</strong> (Game Development), 2011<br />
        Production oversight and supervision.
      </p>
      <p>
        <strong>Programmer / Systems Engineer</strong> (NTT DATA Corporation), 2002<br />
        Design and implementation of core enterprise systems.
      </p>
      <p>
        <strong>DTP Operator</strong> (Kokuwa System Co., Ltd.), 2000<br />
        Prepress, layout, and production.
      </p>

      {/* Awards */}
      <h2>Awards</h2>
      <p>
        2025–2026 – World&apos;s 14th Best Designer, DAC – Design Classifications (A&apos; Design Award)<br />
        2025 – Award of Achievement (The Consulate of Humanitarian &amp; Culture in Chania, Greece)<br />
        2025 – The New Great Masters in New York (Fondazione Effetto Arte)<br />
        2025 – W* Recognition (A&apos; Design Award)<br />
        2024 – Meritorious Service to the Arts Award (Luxembourg Art Prize)<br />
        2024 – Phoenix for the Arts (Fondazione Effetto Arte)<br />
        2024 – Global Art Virtuoso Award (Contemporary Art Collectors)<br />
        2023 – Harmony for Humanity Art Prize (Contemporary Art Collectors)<br />
        2023 – Career Art Award (Fondazione Effetto Arte)<br />
        2023 – The Genius of Italy – Michelangelo International Art Prize (Fondazione Effetto Arte)<br />
        2023 – A&apos; Design Award Golden Award (Photography &amp; Photo Manipulation)<br />
        2022 – ITSLIQUID International Contest – 12th Edition, Honorable Mention<br />
        2022 – BEST COVER ARTIST AWARD (365 Art+ 6 Stars AWARDS)<br />
        2022 – A&apos; Design Award Iron Award (Graphic Design)<br />
        2021 – ITSLIQUID International Contest – 11th Edition, Honorable Mention<br />
        2021 – ARTIST OF THE YEAR (ITSLIQUID Group)<br />
        2006 – Excellence Prize, Web Screensaver Category, MTV SO-ZO Competition supported by AMD
      </p>

      {/* Exhibitions */}
      <h2>Selected Exhibitions</h2>
      <p>
        LA Art Show (Los Angeles), Ansan International Photo Festival (Ansan, South Korea), RenovArt Project (Matera, Italy), Rome International Art Fair (Rome), Paris International Contemporary Art Fair (Paris), CONTEMPORARY VENICE (Venice), LONDON CONTEMPORARY (London), KINTSUGI / TRACES OF DREAMS (M.A.D.S. ART GALLERY, Milan), and many more.
      </p>

      {/* Publications */}
      <h2>Selected Publications</h2>
      <p>
        Le Musee Plus Magazine, 365 Art+ Magazine, The Best Contemporary Masters, Imago (Galleria Tilde), ANTHOLOGY THE LAST DECADE 2015–2025, Digital Art Creators, The Luxury Collection of Contemporary Artistry, MacPeople, MdN publications, and others.
      </p>

      {/* Influences */}
      <h2>Influences</h2>
      <p>
        Around 1997, when I was sixteen, I found myself deeply drawn to what was then the still-new world of the internet. That encounter led me to teach myself web design. Through this online space, I was able to connect across borders with designers, programmers, and artists, and those encounters greatly broadened my perspective. They nurtured in me a way of looking at things that naturally crosses disciplines and fields.
      </p>
      <p>
        At the same time, there was a quieter form of inheritance at work. Both of my grandfathers were miyadaiku — master carpenters involved in the construction and restoration of shrines and temples. From them, I seem to have absorbed the sense that form and space can become vessels for what cannot be seen, and that the act of working with one&apos;s hands can itself be a kind of devotion. Even during the years when I was working in fields that might appear, at first glance, to be far removed from art, this feeling continued to flow quietly at the foundation of my practice.
      </p>
      <p>
        My path later expanded into core system development, interactive movie production, authoring books on graphic design, game development, and app development, and from 2019 onward I decisively shifted my focus back to graphic art. In late autumn of that same year, under the night sky above Kichijōji Station in Tokyo, I witnessed a mysterious ring of light. It felt like a wordless directive, almost as though someone were speaking to me in Latin, telling me to devote my lifeblood from now on to visual expression. That experience became a major turning point, propelling me into the intense creation of symbolic and dreamlike works.
      </p>
      <p>
        I hold deep respect for the painter Leonor Fini, who maintained a free and sovereign mode of expression, and I am strongly drawn to the aesthetics of Hans Bellmer, who, despite his engineering background, created works that are both structural and poetic. I first encountered these artists through the writings of Tatsuhiko Shibusawa, whose worldview had a decisive impact on me when I was young. Among all these influences, the greatest came from a mentor I met online at the age of seventeen. He taught me that art is not something lofty or reserved for the few, but rather a natural language originally open to everyone.
      </p>

      {/* Future Vision */}
      <h2>Future Aspirations and Vision</h2>
      <p>
        My artistic aims are closely tied to the attempt to visualize the &ldquo;surplus dimensions&rdquo; that emerge where spirituality and science intersect. As I have engaged with general relativity, quantum mechanics, and causal set theory, while at the same time returning to the Buddhist faith cherished by my grandparents, this preoccupation has gradually taken shape within me.
      </p>
      <p>
        Through my work, I hope to soften the divide between the sacred and the secular, and to help restore the subtle bonds between human beings and nature. By weaving together natural symbolism, philosophical reflection, and images drawn from contemporary science into visual narratives, I seek to allow the sacred dimensions that lie within us to enter into dialogue with the wider world in which we live.
      </p>
      <p>
        In essence, I hope that my works can quietly stand as intermediaries between these multiple domains, and that encountering them may offer viewers an opportunity to touch deeper layers of both themselves and the cosmos. That, to me, is the role of my practice.
      </p>

      {/* Children */}
      <h2>The World I Hope to Show My Children</h2>
      <p>
        This aspiration is also deeply personal. As the father of children with whom I now live apart, and as someone who has passed through relocations, separation, and various hardships, I have come to feel that art is a lifelong vow to entrust warmth, strength, and beauty to the next generation. Words can be clumsy at times, but a work of art can quietly become a bridge — connecting generations and languages, and reconnecting the inner worlds we carry with the outer world, even when we are far from one another.
      </p>

      {/* Apps */}
      <h2>Mobile Apps in Production</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
        Apps actively maintained since the independent app business launched in 2013. Combined downloads exceed 50 million, with over 3 million monthly active users.
      </p>
      <p>
        <strong>Beautiful HD Wallpapers</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id706533906" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
        {" / "}
        <a href="https://play.google.com/store/apps/details?id=net.dolice.beautifulwallpapers" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Android</a>
        <br />
        <strong>Ukiyo-e Wallpapers</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id835559799" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
        {" / "}
        <a href="https://play.google.com/store/apps/details?id=net.dolice.ukiyoe" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Android</a>
        <br />
        <strong>Law of Attraction Everyday</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id841157677" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
        <br />
        <strong>Relaxing Healing</strong>
        {" — "}
        <a href="https://apps.apple.com/app/id694492667" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>iOS</a>
      </p>

      {/* Documents */}
      <h2>Press Kit</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>
        PDF documents available for press, exhibitions, publications, and interviews.
      </p>
      <p>
        <a href="https://dolice.net/pub/Artist_Profile_Masaki_Hirokawa.pdf" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Artist Profile (English) PDF</a>
        <br />
        <a href="https://dolice.net/pub/Artwork_Details_Masaki_Hirokawa.pdf" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Artwork Documentation PDF</a>
      </p>
    </>
  );
}
