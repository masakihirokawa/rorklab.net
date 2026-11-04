import type { Metadata } from "next";
import { siteOgImage } from "@/lib/og";

interface Props {
  params: Promise<{ locale: string }>;
}

// 事実の正本: dolice.net とアーティストプロファイル（Dolice/_documents/Artist Documents/ARTIST_PROFILE_JA/EN.md）。2026-11-04 に同期
const META = {
  ja: {
    title: "運営者について — Rork Lab",
    description: "Rork Lab 運営者・廣川政樹のプロフィール。現代美術家・デジタルクリエイター・アプリデベロッパー。国際芸術賞17冠、欧州・アジア・米州で展示。",
  },
  en: {
    title: "About — Rork Lab",
    description: "About the founder of Rork Lab — Masaki Hirokawa. Contemporary artist, digital creator, and app developer. Recipient of 17 international art awards, exhibited across Europe, Asia, and the Americas.",
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
  { label: "Facebook", href: "https://www.facebook.com/dolice.masakihirokawa/" },
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
  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
  textDecoration: "none",
  letterSpacing: "0.03em",
  transition: "border-color 0.3s, color 0.3s",
};

const LEAD: React.CSSProperties = { color: "var(--text-muted)", fontSize: 13, marginBottom: 16 };

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isJa = locale === "ja";

  // 著者の実在性（E-E-A-T）: 記事の Article.author と同じ @id の Person をここで定義する（2026-11-01）
  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: isJa ? "https://rorklab.net/about" : "https://rorklab.net/en/about",
    inLanguage: isJa ? "ja" : "en",
    mainEntity: {
      "@type": "Person",
      "@id": "https://rorklab.net/about#person",
      name: "Masaki Hirokawa",
      alternateName: "廣川政樹",
      url: "https://dolice.net",
      jobTitle: isJa ? "現代美術家・デジタルクリエイター・アプリデベロッパー" : "Contemporary artist, digital creator, and app developer",
      sameAs: [
        ...SOCIAL_LINKS.map((l) => l.href),
        "https://dolice.net",
        "https://dolice.design",
        "https://linktr.ee/masakihirokawa",
        "https://designer.org/!315944",
      ],
    },
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 120px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: "color-mix(in srgb, var(--accent-coral) 40%, transparent)" }} />
        <span style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.15em" }}>
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
          <Ext href={isJa ? "https://dolice.net" : "https://dolice.net/en/"}>dolice.net</Ext>
          {isJa ? "（公式サイト）" : " (Official Website)"}
          <br />
          <Ext href="https://dolice.design">dolice.design</Ext>
          {isJa ? "（アート・ポートフォリオ）" : " (Art Portfolio)"}
          <br />
          <Ext href="https://dolice.base.shop">dolice.base.shop</Ext>
          {isJa ? "（アートショップ）" : " (Art Shop)"}
          <br />
          <Ext href="https://linktr.ee/masakihirokawa">linktr.ee/masakihirokawa</Ext>
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
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared data（受賞歴・リンクは日英で同じ順）                         */
/* ------------------------------------------------------------------ */
const AWARDS_JA = [
  "2025–2026年 DAC – Design Classifications「世界14位（World’s 14th Best Designer）」選出（A’ Design Award 主催）",
  "2026年 POPDES 世界ランキング #115 選出（A’ Design Award 主催）",
  "2025年 Award of Achievement（ギリシャ・ハニア 人道文化領事館 主催）",
  "2025年 The New Great Masters in New York（Fondazione Effetto Arte 主催）",
  "2025年 W* Recognition（A’ Design Award 主催）",
  "2021–2025年 Meritorious Service to the Arts Award（Luxembourg Art Prize 主催・5年連続受賞）",
  "2024年 Phoenix for the Arts（Fondazione Effetto Arte 主催）",
  "2024年 Global Art Virtuoso Award（Contemporary Art Collectors 主催）",
  "2023年 Harmony for Humanity Art Prize（Contemporary Art Collectors 主催）",
  "2023年 Career Art Award（Fondazione Effetto Arte 主催）",
  "2023年 The Genius of Italy – ミケランジェロ国際芸術賞（Fondazione Effetto Arte 主催）",
  "2023年 A’ Design Award Golden Award（写真・フォトマニピュレーション部門）",
  "2022年 第12回 ITSLIQUID International Contest 栄誉賞",
  "2022年 BEST COVER ARTIST AWARD（365 Art+ Business Magazine 主催）",
  "2022年 A’ Design Award Iron Award（グラフィックデザイン部門）",
  "2022年 第11回 ITSLIQUID International Contest 栄誉賞",
  "2021年 ARTIST OF THE YEAR（ITSLIQUID Group 主催）",
  "2006年 MTV SO-ZO Competition supported by AMD『Webスクリーンセーバー部門』優秀賞",
];

const AWARDS_EN = [
  "2025–2026 – World’s 14th Best Designer (DAC – Design Classifications, organized by A’ Design Award)",
  "2026 – POPDES World Ranking #115 (A’ Design Award)",
  "2025 – Award of Achievement (The Consulate of Humanitarian & Culture in Chania, Greece)",
  "2025 – The New Great Masters in New York (Fondazione Effetto Arte)",
  "2025 – W* Recognition (A’ Design Award)",
  "2021–2025 – Meritorious Service to the Arts Award (Luxembourg Art Prize, five consecutive years)",
  "2024 – Phoenix for the Arts (Fondazione Effetto Arte)",
  "2024 – Global Art Virtuoso Award (Contemporary Art Collectors)",
  "2023 – Harmony for Humanity Art Prize (Contemporary Art Collectors)",
  "2023 – Career Art Award (Fondazione Effetto Arte)",
  "2023 – The Genius of Italy – Michelangelo International Art Prize (Fondazione Effetto Arte)",
  "2023 – A’ Design Award Golden Award (Photography & Photo Manipulation)",
  "2022 – ITSLIQUID International Contest – 12th Edition, Honorable Mention",
  "2022 – BEST COVER ARTIST AWARD (365 Art+ 6 Stars AWARDS)",
  "2022 – A’ Design Award Iron Award (Graphic Design)",
  "2022 – ITSLIQUID International Contest – 11th Edition, Honorable Mention",
  "2021 – ARTIST OF THE YEAR (ITSLIQUID Group)",
  "2006 – Excellence Prize, Web Screensaver Category, MTV SO-ZO Competition supported by AMD",
];

const INTERVIEWS = [
  { label: "Featured Artist", href: "https://www.itsliquid.com/featuredartist-masakihirokawa.html" },
  { label: "Interview Ⅰ", href: "https://www.itsliquid.com/interview-masakihirokawa.html" },
  { label: "Ⅱ", href: "https://www.itsliquid.com/interview-masakihirokawa01.html" },
  { label: "Ⅲ", href: "https://www.itsliquid.com/interview-masakihirokawa-03.html" },
  { label: "Ⅳ", href: "https://www.itsliquid.com/interview-masakihirokawa-04.html" },
];

const APPS = [
  {
    ja: "綺麗な壁紙 4K/HDR", en: "Beautiful 4K/HDR Wallpapers", page: "beautiful-wallpapers",
    ios: "https://apps.apple.com/app/id706533906",
    android: "https://play.google.com/store/apps/details?id=net.dolice.beautifulwallpapers",
    noteJa: "人の目で選んだ10万枚以上の壁紙を4K・HDRで。2013年の公開から毎日更新",
    noteEn: "Over 100,000 hand-picked wallpapers in 4K/HDR, updated daily since 2013",
  },
  {
    ja: "浮世絵壁紙", en: "Ukiyo-e Wallpapers", page: "ukiyoe-wallpapers",
    ios: "https://apps.apple.com/app/id835559799",
    android: "https://play.google.com/store/apps/details?id=net.dolice.ukiyoe",
    noteJa: "北斎・広重・歌麿・写楽ほか2,000点以上。古紙の皺や染みを AI に頼らず手作業で修復",
    noteEn: "2,000+ masterpieces by Hokusai, Hiroshige, Utamaro, and Sharaku, restored by hand without AI",
  },
  {
    ja: "引き寄せの法則", en: "Law of Attraction", page: "law-of-attraction",
    ios: "https://apps.apple.com/app/id841157677", android: "",
    noteJa: "望みを言葉にし、毎日それに立ち返るための願望実現サポートアプリ",
    noteEn: "Put a wish into words and return to it every day",
  },
  {
    ja: "リラックス・ヒーリング", en: "Relaxing Healing", page: "relaxing-healing",
    ios: "https://apps.apple.com/app/id694492667", android: "",
    noteJa: "ヒーリング音楽と環境音。タイマーとともに音が少しずつ遠ざかる睡眠・リラックスアプリ",
    noteEn: "Healing music and ambient sounds that fade gently with a sleep timer",
  },
];

function AppList({ isJa }: { isJa: boolean }) {
  return (
    <p>
      {APPS.map((a, i) => (
        <span key={a.page}>
          {i > 0 && <br />}
          <strong>{isJa ? a.ja : a.en}</strong>
          {" — "}
          <Ext href={a.ios}>iOS</Ext>
          {a.android && (
            <>
              {" / "}
              <Ext href={a.android}>Android</Ext>
            </>
          )}
          {" / "}
          <Ext href={`https://dolice.net/${isJa ? "" : "en/"}apps/${a.page}/`}>{isJa ? "詳細" : "Details"}</Ext>
          <br />
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{isJa ? a.noteJa : a.noteEn}</span>
        </span>
      ))}
    </p>
  );
}

function Lines({ items }: { items: string[] }) {
  return (
    <p>
      {items.map((t, i) => (
        <span key={t}>
          {i > 0 && <br />}
          {t}
        </span>
      ))}
    </p>
  );
}

function InterviewLinks() {
  return (
    <>
      ITSLIQUID Group:{" "}
      {INTERVIEWS.map((v, i) => (
        <span key={v.href}>
          {i > 0 && "・"}
          <Ext href={v.href}>{v.label}</Ext>
        </span>
      ))}
    </>
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
        <p style={{ fontSize: 14, color: "var(--text-dim)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", letterSpacing: "0.04em" }}>
          Masaki Hirokawa
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          現代美術家・デジタルクリエイター・アプリデベロッパー
        </p>
      </div>

      {/* Statement（dolice.net「廣川政樹について」と同文） */}
      <p>
        国際芸術賞17冠のグラフィック／現代美術家・アプリデベロッパーとして、欧州・アジア・米州での展示や、美術書・国際誌への掲載を通じて、日本特有の祈りを背景に、集団心理と認知世界の構造、根源意識を主題として制作しています。
      </p>
      <p>
        自然のシンボリズム、哲学的考察、そして現代科学に着想を得たイメージを織り交ぜながら、聖なるものと世俗的なものとの隔たりをやわらげ、人間と自然界との間にある微細な絆を回復させることを試みています。制作の全体には、繊細な共感覚的感受性と、静かで神秘的なインスピレーションが共存しています。
      </p>
      <p>
        1997年、独学のWebデザインから歩みを始め、基幹システム開発、グラフィック専門誌への執筆、ゲーム開発を経て、2013年に独立系アプリ事業を創業。2019年よりグラフィックアート制作を本格的に再開し、以来、アートとテクノロジーの両領域を架橋しながら、デジタルと詩的感性の狭間に宿る表現を追求しています。
      </p>

      {/* Fields */}
      <h2>活動の領域</h2>
      <p>
        <strong>制作</strong> — 現代美術・グラフィックアート（フォトコラージュ／フォトレタッチ、デジタルメディア）。作品はすべて AI を使わず自身の手で制作しています。<br />
        <strong>展示</strong> — 欧州・アジア・米州（ミラノ、マテーラ、ローマ、ヴェネツィア、マドリード、バルセロナ、パリ、ロンドン、ロサンゼルス、安山、東京ほか）<br />
        <strong>アプリ</strong> — iPhone／Android アプリの個人開発13年。企画・開発からグローバル ASO・多言語展開まで一貫して担当。<br />
        <strong>技術</strong> — C／Java／Python／Kotlin／Swift ほか。ネイティブアプリ、基幹システム、シェーダ・映像処理。<br />
        <strong>受託</strong> — ランディングページ・WordPress・ウェブサイト制作、運用・保守、フォトレタッチ、ストアセット制作・グローバル ASO（<Ext href="https://dolice.net/#brand">Branding &amp; Craft</Ext>）
      </p>

      {/* Bio */}
      <h2>略歴</h2>
      <p>
        1997年に独学でWebデザインとプログラミングを学び始め、1999年に株式会社国和システムへDTPオペレーターとして入社。2002年には株式会社NTT DATAにてプログラマー／システムエンジニアとして基幹システム開発に従事し、2005年よりフリーランスとして独立しました。以降、Webデザイン、プログラミング、グラフィック制作、インタラクティブムービー制作など、幅広い領域で活動を展開しています。
      </p>
      <p>
        2006年、MTV SO-ZO コンペティション（AMD 協賛）にてWebスクリーンセーバー部門優秀賞を受賞し、同年より国内外での展示を開始。2008年以降は、グラフィック専門誌やデザイン書籍への寄稿・執筆を多数手がけてきました。
      </p>
      <p>
        2011年にはテクニカルアーティストとしてゲーム開発に参加し、2013年には独立系スマートフォンアプリ事業を開始。現在に至るまで累計5,000万ダウンロードを超え、月間アクティブユーザー300万人超のユーザーに支えられながら、開発・グローバルマーケティング・運営を継続しています。
      </p>
      <p>
        2019年よりグラフィックアート制作を本格的に再開し、欧州・アジア・米州を中心に国際展への出展を活発化。作品は、人間の意識、美、崩壊の狭間にある象徴的世界を描き出し、夢と現実の境界を詩的にたどります。
      </p>
      <p>
        2021年以降、A’ Design Award、Fondazione Effetto Arte、Contemporary Art Collectors、ITSLIQUID Group など、世界各国の芸術機関から受賞を重ねています。近年では、ギリシャの The Consulate of Humanitarian &amp; Culture による Award of Achievement や、Luxembourg Art Prize における Meritorious Service to the Arts Award などを受けています。
      </p>

      {/* Career */}
      <h2>職歴</h2>
      <p>
        <strong>創業者／リードデベロッパー</strong>（独立アプリ事業）、2013年–現在<br />
        累計5,000万DL、月間300万人超。開発、グローバルASO、経営統括を担当。
      </p>
      <p>
        <strong>テクニカルアーティスト</strong>（ゲーム開発）、2011年<br />
        制作統括。
      </p>
      <p>
        <strong>クリエイター</strong>（Web／UX、プログラミング、グラフィック）、2005年–現在<br />
        UX／UI設計から実装まで一貫して担当。2008年以降、寄稿多数。
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
      <Lines items={AWARDS_JA} />

      {/* Exhibitions */}
      <h2>主な展覧会</h2>
      <p>
        2026年 Rewrite（JAPONICA-JAPONICA／東京芸術劇場 ギャラリー2／東京）<br />
        2026年 A Beautiful Horizon（European Museum of Modern Art〔MEAM〕／スペイン・バルセロナ）<br />
        2025年 Ansan International Photo Festival（Ansan Culture &amp; Arts Center／韓国・安山）<br />
        2025年 KINTSUGI／TRACES OF DREAMS（M.A.D.S. ART GALLERY／イタリア・ミラノ）<br />
        2024年 LA ART SHOW – Los Angeles Art Market（Fondazione Effetto Arte／アメリカ・ロサンゼルス）<br />
        2023年 International Good Design Exhibition（A’ Design Award／イタリア・ローマ）<br />
        2023年 RenovArt（ApuliaAste／イタリア・マテーラ）<br />
        2023年 FROM THE DISTANCE（VAN GOGH Art Gallery／スペイン・マドリード）<br />
        2023年 Paris 2023 International Contemporary Art Fair（VAN GOGH Art Gallery／フランス・パリ）<br />
        2022年 BRAIN CAKE 2022（M.A.D.S. ART GALLERY／スペイン・バルセロナ／カサ・ミラ）<br />
        2022年 LONDON CONTEMPORARY 2022（ITSLIQUID Group／イギリス・ロンドン）<br />
        2022年 CONTEMPORARY VENICE 2022（ITSLIQUID Group／イタリア・ヴェネツィア）<br />
        2022年 ROME INTERNATIONAL ART FAIR 2022（ITSLIQUID Group／イタリア・ローマ）<br />
        ほか多数（全展覧会歴はアーティストプロファイル PDF に掲載）
      </p>

      {/* Publications */}
      <h2>掲載誌・書籍（抜粋）</h2>
      <p>
        Le Musée Plus Magazine Vol. 1〜3、365 Art+ Magazine、365 Art+ Mars City Project Vol. 1、ANTHOLOGY THE LAST DECADE 2015–2025、Imago／Imago 2（Galleria Tilde）、Digital Art Creators、The Best Contemporary Masters 2024、The Luxury Collection of Contemporary Artistry、AATONAU 特集記事、MacPeople、MdN 各誌ほか。
      </p>

      {/* Interviews */}
      <h2>インタビュー・掲載</h2>
      <p>
        <InterviewLinks />
        <br />
        A’ Design Award メンバープロフィール: <Ext href="https://designer.org/!315944">Designer.org</Ext>
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
      <p style={LEAD}>
        2013年の独立アプリ事業開始以降、継続して運営しているアプリです。累計5,000万ダウンロードを超え、月間300万人を超える方々にご利用いただいています。
      </p>
      <AppList isJa />
      <p style={{ fontSize: 13 }}>
        <Ext href="https://apps.apple.com/developer/masaki-hirokawa/id617664044">App Store デベロッパーページ</Ext>
        {" / "}
        <Ext href="https://play.google.com/store/apps/dev?id=4986905301241236390">Google Play デベロッパーページ</Ext>
      </p>

      {/* Documents */}
      <h2>プロフィール資料</h2>
      <p style={LEAD}>ご利用・ご参照用の PDF 資料です。展覧会・出版・取材等にお役立てください。</p>
      <p>
        <Ext href="https://dolice.net/pub/Artist_Profile_Masaki_Hirokawa_Japanese.pdf">アーティストプロファイル（日本語版）PDF</Ext>
        <br />
        <Ext href="https://dolice.net/pub/Artist_Profile_Masaki_Hirokawa.pdf">アーティストプロファイル（英語版）PDF</Ext>
        <br />
        <Ext href="https://dolice.net/pub/Artwork_Details_Masaki_Hirokawa.pdf">作品資料 Artwork Documentation（日英併記）PDF</Ext>
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
        <p style={{ fontSize: 14, color: "var(--text-dim)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", letterSpacing: "0.04em" }}>
          廣川政樹
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          Contemporary Artist · Digital Creator · App Developer
        </p>
      </div>

      {/* Statement (same text as dolice.net “About Masaki Hirokawa”) */}
      <p>
        A graphic and contemporary artist and app developer, recipient of 17 international art awards. Through exhibitions across Europe, Asia, and the Americas, and features in art books and international magazines, he creates work grounded in Japan’s distinctive sense of prayer — exploring collective psychology, the cognitive world, and fundamental consciousness.
      </p>
      <p>
        Drawing on natural symbolism, philosophical reflection, and imagery inspired by contemporary science, he seeks to soften the divide between the sacred and the secular, and to restore the subtle bonds between human beings and the natural world. Across his practice, subtle synesthetic sensibilities and a quietly mystical inspiration coexist.
      </p>
      <p>
        Beginning with self-taught web design in 1997, his path led through systems engineering, writing for design publications, and game development to founding an independent app business in 2013. Since 2019 he has resumed full-scale art production — bridging art and technology, pursuing expressions that inhabit the space between the digital and the poetic.
      </p>

      {/* Fields */}
      <h2>Areas of Work</h2>
      <p>
        <strong>Practice</strong> — Contemporary and graphic art (photo collage / photo retouching, digital media). Every work is made by his own hand, without AI.<br />
        <strong>Exhibitions</strong> — Europe, Asia, and the Americas (Milan, Matera, Rome, Venice, Madrid, Barcelona, Paris, London, Los Angeles, Ansan, Tokyo, and more)<br />
        <strong>Apps</strong> — 13 years of independent iOS and Android development, from planning and development to global ASO and multilingual releases.<br />
        <strong>Engineering</strong> — C, Java, Python, Kotlin, Swift, and more: native apps, enterprise systems, shaders and video processing.<br />
        <strong>Client Work</strong> — Landing pages, WordPress and website development, maintenance, photo retouching, app store assets and global ASO (<Ext href="https://dolice.net/en/#brand">Branding &amp; Craft</Ext>)
      </p>

      {/* Bio */}
      <h2>Biography</h2>
      <p>
        Masaki Hirokawa is a Japanese multidisciplinary artist, UI/UX designer, and app developer whose practice bridges visual art, digital media, and interactive technology.
      </p>
      <p>
        He began self-studying web design and programming in 1997, and joined Kokuwa System Co., Ltd. in 1999 as a DTP operator. In 2002, he worked at NTT DATA Corporation as a programmer and systems engineer, contributing to core system development. In 2005, he became an independent creator and expanded his activities across web design, programming, graphic production, and interactive movie projects.
      </p>
      <p>
        In 2006, he received the Excellence Prize in the Web Screensaver category at the MTV SO-ZO Competition (supported by AMD), marking the beginning of exhibitions in Japan and abroad. From 2008 onward, he contributed to and authored numerous graphic design magazines and books.
      </p>
      <p>
        In 2011, he participated in game development as a technical artist, and in 2013 he launched an independent smartphone app business. To date, his apps have surpassed 50 million cumulative downloads worldwide, with more than 3 million monthly active users. He continues to lead development, global marketing, and operations.
      </p>
      <p>
        Since 2019, Hirokawa has resumed full-scale production of graphic art and has actively exhibited in international shows across Europe, Asia, and the Americas. His works depict a symbolic world at the intersection of human consciousness, beauty, and decay, poetically tracing the boundary between dream and reality.
      </p>
      <p>
        Since 2021, he has received numerous honors from institutions including the A’ Design Award, Fondazione Effetto Arte, Contemporary Art Collectors, and ITSLIQUID Group. In recent years, he has further consolidated international recognition with distinctions such as the Award of Achievement (The Consulate of Humanitarian &amp; Culture, Greece) and the Meritorious Service to the Arts Award (Luxembourg Art Prize).
      </p>

      {/* Career */}
      <h2>Professional Experience</h2>
      <p>
        <strong>Founder / Lead Developer</strong> (Independent App Business), 2013–present<br />
        50M+ total downloads and 3M+ monthly active users worldwide; leading development, global ASO, and overall business management.
      </p>
      <p>
        <strong>Technical Artist</strong> (Game Development), 2011<br />
        Production oversight and supervision.
      </p>
      <p>
        <strong>Creator</strong> (Web/UX, Programming, Graphic Design), 2005–present<br />
        End-to-end UX/UI design and implementation; frequent contributor to design publications since 2008.
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
      <Lines items={AWARDS_EN} />

      {/* Exhibitions */}
      <h2>Selected Exhibitions</h2>
      <p>
        2026 – Rewrite (JAPONICA-JAPONICA, Tokyo Metropolitan Theatre Gallery 2, Tokyo, Japan)<br />
        2026 – A Beautiful Horizon (European Museum of Modern Art (MEAM), Barcelona, Spain)<br />
        2025 – Ansan International Photo Festival (Ansan Culture &amp; Arts Center, Ansan, South Korea)<br />
        2025 – KINTSUGI / TRACES OF DREAMS (M.A.D.S. ART GALLERY, Milan, Italy)<br />
        2024 – LA ART SHOW – Los Angeles Art Market (Fondazione Effetto Arte, Los Angeles, USA)<br />
        2023 – International Good Design Exhibition (A’ Design Award, Rome, Italy)<br />
        2023 – RenovArt (ApuliaAste, Matera, Italy)<br />
        2023 – FROM THE DISTANCE (VAN GOGH Art Gallery, Madrid, Spain)<br />
        2023 – Paris 2023 International Contemporary Art Fair (VAN GOGH Art Gallery, Paris, France)<br />
        2022 – BRAIN CAKE 2022 (M.A.D.S. ART GALLERY, Casa Milà, Barcelona, Spain)<br />
        2022 – LONDON CONTEMPORARY 2022 (ITSLIQUID Group, London, UK)<br />
        2022 – CONTEMPORARY VENICE 2022 (ITSLIQUID Group, Venice, Italy)<br />
        2022 – ROME INTERNATIONAL ART FAIR 2022 (ITSLIQUID Group, Rome, Italy)<br />
        and many more (the full list is in the Artist Profile PDF)
      </p>

      {/* Publications */}
      <h2>Selected Publications</h2>
      <p>
        Le Musée Plus Magazine Vol. 1–3, 365 Art+ Magazine, 365 Art+ Mars City Project Vol. 1, ANTHOLOGY THE LAST DECADE 2015–2025, Imago / Imago 2 (Galleria Tilde), Digital Art Creators, The Best Contemporary Masters 2024, The Luxury Collection of Contemporary Artistry, AATONAU feature article, MacPeople, MdN publications, and others.
      </p>

      {/* Interviews */}
      <h2>Interviews &amp; Features</h2>
      <p>
        <InterviewLinks />
        <br />
        A’ Design Award member profile: <Ext href="https://designer.org/!315944">Designer.org</Ext>
      </p>

      {/* Influences */}
      <h2>Influences</h2>
      <p>
        Around 1997, when I was sixteen, I found myself deeply drawn to what was then the still-new world of the internet. That encounter led me to teach myself web design. Through this online space, I was able to connect across borders with designers, programmers, and artists, and those encounters greatly broadened my perspective. They nurtured in me a way of looking at things that naturally crosses disciplines and fields.
      </p>
      <p>
        At the same time, there was a quieter form of inheritance at work. Both of my grandfathers were miyadaiku — master carpenters involved in the construction and restoration of shrines and temples. From them, I seem to have absorbed the sense that form and space can become vessels for what cannot be seen, and that the act of working with one’s hands can itself be a kind of devotion. Even during the years when I was working in fields that might appear, at first glance, to be far removed from art, this feeling continued to flow quietly at the foundation of my practice.
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
      <p style={LEAD}>
        Apps actively maintained since the independent app business launched in 2013. Together they have passed 50 million downloads, with more than 3 million people using them every month.
      </p>
      <AppList isJa={false} />
      <p style={{ fontSize: 13 }}>
        <Ext href="https://apps.apple.com/developer/masaki-hirokawa/id617664044">App Store Developer Page</Ext>
        {" / "}
        <Ext href="https://play.google.com/store/apps/dev?id=4986905301241236390">Google Play Developer Page</Ext>
      </p>

      {/* Documents */}
      <h2>Press Kit</h2>
      <p style={LEAD}>PDF documents available for press, exhibitions, publications, and interviews.</p>
      <p>
        <Ext href="https://dolice.net/pub/Artist_Profile_Masaki_Hirokawa.pdf">Artist Profile (English) PDF</Ext>
        <br />
        <Ext href="https://dolice.net/pub/Artist_Profile_Masaki_Hirokawa_Japanese.pdf">Artist Profile (Japanese) PDF</Ext>
        <br />
        <Ext href="https://dolice.net/pub/Artwork_Details_Masaki_Hirokawa.pdf">Artwork Documentation (Bilingual) PDF</Ext>
      </p>
    </>
  );
}
