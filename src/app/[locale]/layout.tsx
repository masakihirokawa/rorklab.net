import { NextIntlClientProvider, hasLocale } from "next-intl";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Motion } from "@/components/ui/Motion";
import { Footer } from "@/components/layout/Footer";
import { NewsTicker } from "@/components/ui/NewsTicker";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

import type { Metadata } from "next";

// Blocking script to prevent FOUC (Flash of Unstyled Content) on theme change
// Turbopack/esbuild keepNames helper: next-themes stringifies its init function into an inline
// <script>, and the compiled body calls __name(). Without a global __name the theme script throws
// "ReferenceError: __name is not defined" on every page (see STUMBLING_POINTS #122).
const nameShim = `if(typeof __name==="undefined"){window.__name=function(f,n){try{Object.defineProperty(f,"name",{value:n,configurable:true})}catch(e){}return f}};`;
const themeScript = `${nameShim}(function(){try{var t=localStorage.getItem('rorklab-theme');document.documentElement.setAttribute('data-theme',t||'dark')}catch(e){}})()`;

// フォント配信（2026-09-13 構造改修）:
// - 和文は Web フォントを配信しない。端末の Noto Sans JP / Hiragino Sans / Yu Gothic を使う（globals.css）。
//   Google Fonts の Noto Sans JP は CSS だけで 122KB、next/font で自己ホストしても 33KB(br) の描画ブロック CSS になり、
//   PSI モバイルの FCP 4〜7 秒の主因だった。
// - 欧文 DM Sans / DM Mono は next/font/local で自己ホスト（Latin サブセットのみ・数 KB・size-adjust 付き fallback）。
//   fonts.googleapis.com への外部接続と head 内スクリプトによる stylesheet 挿入は全廃。
// ビルド時に fonts.googleapis.com へ取得に行くと、Cloudflare ビルダーからの一時的な取得失敗でビルドが落ちる
// （2026-10-21 antigravitylab: next/font/google queries have exactly one entry）。claudelab と同じく Latin サブセットを同梱して配信する。
const dmSans = localFont({
  src: "../fonts/DMSans-latin-variable.woff2",
  weight: "300 500",
  style: "normal",
  display: "swap",
  variable: "--font-dm-sans",
});
const dmMono = localFont({
  src: "../fonts/DMMono-Regular-latin.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-dm-mono",
});

const LOCALE_TITLES: Record<string, string> = {
  ja: "Rork Lab — Rork Max 日本語ナレッジベース",
  en: "Rork Lab — Rork Max Knowledge Base",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      default: LOCALE_TITLES[locale] || LOCALE_TITLES.ja,
      template: "%s | Rork Lab",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rork Lab",
              url: "https://rorklab.net",
              logo: "https://rorklab.net/icon-512.png",
              description: "Rork / Rork Max の実践ガイド＆ナレッジベース",
              founder: { "@type": "Person", name: "Masaki Hirokawa", url: "https://dolice.design" },
              sameAs: ["https://dolice.design", "https://dolice.net"],
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* ファビコン・apple-touch-icon は app/layout.tsx の metadata.icons が出す（ここにも書くと二重になっていた・2026-10-17 整理） */}
        {/* Google Analytics — 計測の呼び出しはすぐ積み、gtag.js（約 150KB）の読み込みだけ load 後に回す（2026-10-17・初回描画と操作の応答を優先） */}
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-H9JTCV49KJ');(function(){function l(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-H9JTCV49KJ';document.head.appendChild(s)}if(document.readyState==='complete')setTimeout(l,0);else addEventListener('load',function(){setTimeout(l,0)},{once:true})})()` }} />
        <link rel="alternate" type="application/rss+xml" title="Rork Lab RSS" href={locale === "ja" ? "/feed.xml" : "/en/feed.xml"} />
      </head>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <NewsTicker />
            <main style={{ paddingTop: 99 }}>{children}</main>
            <Footer />
            <ScrollToTop />
            <Motion />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
