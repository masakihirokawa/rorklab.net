import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DynamicNewsTicker, DynamicScrollToTop, DynamicCookieBanner } from "@/components/layout/DynamicComponents";

import type { Metadata } from "next";

// Polyfill for esbuild's __name helper (required by next-themes ThemeProvider inline script in Turbopack builds)
const namePolyfill = `if(typeof __name==="undefined"){var __name=function(fn,name){Object.defineProperty(fn,"name",{value:name,configurable:true});return fn}}`;

// Blocking script to prevent FOUC (Flash of Unstyled Content) on theme change
const themeScript = `(function(){try{var t=localStorage.getItem('rorklab-theme');document.documentElement.setAttribute('data-theme',t||'dark')}catch(e){}})()`;

// Non-blocking Google Fonts loader
const fontUrl = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=DM+Sans:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;500;700&display=swap";
const fontScript = `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${fontUrl}';document.head.appendChild(l)})()`;

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
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Polyfill: esbuild __name helper for next-themes Turbopack compatibility */}
        <script dangerouslySetInnerHTML={{ __html: namePolyfill }} />
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
        {/* Favicon — PNG/ICO for search engine compatibility (not SVG) */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Google Analytics is loaded via CookieBanner after consent */}
        <link rel="alternate" type="application/rss+xml" title="Rork Lab RSS" href={locale === "ja" ? "/feed.xml" : "/en/feed.xml"} />
        {/* Font loading: preconnect + async load (non-render-blocking) */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href={fontUrl} />
        <script dangerouslySetInnerHTML={{ __html: fontScript }} />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link href={fontUrl} rel="stylesheet" />
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* GrainOverlay moved to CSS (see globals.css ::after on body) */}
            <Header />
            <DynamicNewsTicker />
            <main style={{ paddingTop: 99 }}>{children}</main>
            <Footer />
            <DynamicScrollToTop />
            <DynamicCookieBanner
              gaId="G-H9JTCV49KJ"
              privacyHref={locale === "ja" ? "/privacy" : "/en/privacy"}
              locale={locale}
              storageKey="rorklab-cookie-consent"
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
