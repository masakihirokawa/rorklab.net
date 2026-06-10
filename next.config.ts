import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// 削除済み記事の 301 redirect（2026-05-09 品質監査により撤去 — _documents/_quality_audit/cross_site/2026-05-09_cross_site_report.md 参照）
// localePrefix: "as-needed" のため、ja は prefix なし、en は /en/ prefix
const REMOVED_ARTICLE_REDIRECTS_2026_05_09 = [
  { from: "/articles/rork-dev/rork-monetization-complete-guide", to: "/articles/rork-dev" },
  { from: "/articles/rork-ai/rork-max-ai-chatbot-gemini-streaming", to: "/articles/rork-ai" },
  { from: "/articles/rork-dev/rork-advanced-state-management-patterns", to: "/articles/rork-dev" },
  { from: "/articles/rork-dev/rork-push-notification-expo-backend-complete-guide", to: "/articles/rork-dev" },
  { from: "/articles/rork-dev/rork-max-storekit-2-in-app-purchase", to: "/articles/rork-dev" },
  { from: "/articles/rork-ai/rork-multiplatform-ios-android-complete-guide", to: "/articles/rork-ai" },
  { from: "/blog/ai-tax-filing-and-fighting-injustice", to: "/blog" },
  { from: "/blog/tax-battle-complete-chronicle", to: "/blog" },
  { from: "/blog/toyama-darkness-uozu-tax-office-kura-ai-reform", to: "/blog" },
  { from: "/blog/toyama-tax-office-darkness-systemic-injustice", to: "/blog" },
  { from: "/blog/toyama-tax-office-kura-recording-refusal-health-crisis", to: "/blog" },
  { from: "/blog/uozu-tax-office-update-fighting-systemic-injustice", to: "/blog" },
  // 2026-05-15 Tax-related article removal (YMYL compliance for GSC崩壊 recovery)
  { from: "/articles/rork-business/indie-app-developer-revenue-economics-blueprint", to: "/articles/rork-business" },
  { from: "/articles/rork-business/rork-kindle-app-dev-book-publishing", to: "/articles/rork-business" },
  { from: "/articles/rork-business/rork-app-monetization-implementation-complete-guide", to: "/articles/rork-business" },

  // 2026-05-15 GSC崩壊対応: TMPL_TITLE違反+他違反の記事を一括削除（Helpful Content System対応）
  { from: "/articles/rork-ai/rork-companion-feature-guide", to: "/articles/rork-ai" },
  { from: "/articles/rork-ai/rork-max-ai-capabilities-complete-guide", to: "/articles/rork-ai" },
  { from: "/articles/rork-basics/fix-now-auto-debug", to: "/articles/rork-basics" },
  { from: "/articles/rork-basics/rork-max-app-publishing-complete-guide", to: "/articles/rork-basics" },
  { from: "/articles/rork-business/ai-side-business-rork-app-monetization-guide", to: "/articles/rork-business" },
  { from: "/articles/rork-business/rork-max-funding-launch-guide-2026", to: "/articles/rork-business" },
  { from: "/articles/rork-business/rork-stripe-monetization-complete-guide", to: "/articles/rork-business" },
  { from: "/articles/rork-dev/rork-max-accessibility", to: "/articles/rork-dev" },
  { from: "/articles/rork-dev/rork-max-marketplace-app-tutorial", to: "/articles/rork-dev" },
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
