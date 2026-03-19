import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rork Lab — Rork Max 日本語ナレッジベース",
    template: "%s | Rork Lab",
  },
  description:
    "Rork Max（AI モバイルアプリビルダー）の使い方・チュートリアル・開発ツール連携・AI モデル統合・App Store 公開・収益化まで。初心者〜上級者向け日英ナレッジベース。",
  metadataBase: new URL("https://rorklab.net"),
  keywords: [
    "Rork", "Rork Max", "Rork AI", "AI アプリ開発", "ノーコード",
    "React Native", "Expo", "モバイルアプリ", "App Store",
    "Rork tutorial", "Rork guide", "Rork Lab",
  ],
  authors: [{ name: "Masaki Hirokawa", url: "https://dolice.design" }],
  creator: "Masaki Hirokawa",
  publisher: "Rork Lab",
  openGraph: {
    siteName: "Rork Lab",
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    title: "Rork Lab — Rork Max 日本語ナレッジベース",
    description:
      "Rork Max の使い方・開発ツール連携・AI モデル統合・収益化まで。初心者〜上級者向け日英ナレッジベース。",
    url: "https://rorklab.net",
    images: [{ url: "https://rorklab.net/og/default.png", width: 1200, height: 630, alt: "Rork Lab", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dolice",
    creator: "@dolice",
  },
  alternates: {
    canonical: "https://rorklab.net",
    languages: {
      "ja": "https://rorklab.net",
      "en": "https://rorklab.net/en",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
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
      </head>
      {children}
    </html>
  );
}
