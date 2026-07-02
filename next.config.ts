import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// 削除済み記事の 301 redirect（2026-05-09 品質監査により撤去 — _documents/_quality_audit/cross_site/2026-05-09_cross_site_report.md 参照）
// localePrefix: "as-needed" のため、ja は prefix なし、en は /en/ prefix
const REMOVED_ARTICLE_REDIRECTS_2026_05_09: { from: string; to: string }[] = [
  // 2026-06-27 premium-upgrade: slug rename (drop -complete-guide)
  { from: "/articles/rork-ai/rork-ai-monetization-strategy-complete-guide", to: "/articles/rork-ai/rork-app-monetization-ad-subscription-freemium-2026" },
  // 2026-07-01 premium-upgrade: slug rename (drop -guide)
  { from: "/articles/rork-dev/rork-max-cloud-compile-guide", to: "/articles/rork-dev/rork-max-cloud-compile-mac-free-native-build" },
  // 2026-07-02 premium-upgrade: slug rename (drop -complete-guide)
  { from: "/articles/rork-dev/rork-stripe-meter-billing-usage-based-pricing-complete-guide", to: "/articles/rork-dev/rork-stripe-meter-billing-usage-based-pricing" },
  // 2026-05-15 Tax-related article removal (YMYL compliance for GSC崩壊 recovery)

  // 2026-05-15 GSC崩壊対応: TMPL_TITLE違反+他違反の記事を一括削除（Helpful Content System対応）
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
