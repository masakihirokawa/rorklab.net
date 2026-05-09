import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");


// 削除済み記事の 301 redirect（2026-05-09 品質監査により撤去 — _documents/_quality_audit/cross_site/2026-05-09_cross_site_report.md 参照）
// localePrefix: "as-needed" のため、ja は prefix なし、en は /en/ prefix
const REMOVED_ARTICLE_REDIRECTS_2026_05_09 = [
  { from: "/articles/rork-dev/rork-monetization-complete-guide", to: "/articles/rork-dev" },
  { from: "/articles/rork-ai/rork-max-ai-chatbot-gemini-streaming", to: "/articles/rork-ai" },
  { from: "/articles/rork-ai/rork-ai-design-doc-driven-development-guide", to: "/articles/rork-ai" },
  { from: "/articles/rork-dev/rork-advanced-state-management-patterns", to: "/articles/rork-dev" },
  { from: "/articles/rork-dev/rork-push-notification-expo-backend-complete-guide", to: "/articles/rork-dev" },
  { from: "/articles/rork-dev/rork-max-storekit-2-in-app-purchase", to: "/articles/rork-dev" },
  { from: "/articles/rork-ai/rork-multiplatform-ios-android-complete-guide", to: "/articles/rork-ai" },
];

const buildAuditRedirects = () => {
  const out: { source: string; destination: string; permanent: true }[] = [];
  for (const { from, to } of REMOVED_ARTICLE_REDIRECTS_2026_05_09) {
    out.push({ source: from, destination: to, permanent: true });
    out.push({ source: `/en${from}`, destination: `/en${to}`, permanent: true });
  }
  return out;
};

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return buildAuditRedirects();
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff2|woff|ttf|ico|png|jpg|jpeg|svg|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
