/**
 * Pricing configuration — single source of truth for all Stripe prices and display labels.
 *
 * When changing prices:
 *   1. Update the priceId + display values here
 *   2. Update tokusho/page.tsx (legal requirement — prices are inline text)
 *   3. Update checkout/route.ts PRICE_NAMES if priceId changed
 *   4. Push to all 4 sites (priceIds differ per site)
 */

// ── Stripe Price IDs ──────────────────────────────────────────────

export const STRIPE_PRICE_IDS = {
  ja: {
    tip: "price_1TCQyPEGB5g6A54ofaB9e5to",
    pro: "price_1TCQyjEGB5g6A54opYFArVOk",
    premium: "price_1TCQyxEGB5g6A54oh8U6RHec",
  },
  en: {
    tip: "price_1TCQyXEGB5g6A54oVQirhunP",
    pro: "price_1TCQylEGB5g6A54oNYYQAjPX",
    premium: "price_1TCQyyEGB5g6A54oUojdhfBa",
  },
} as const;

// ── Display Prices ────────────────────────────────────────────────

export const PRICES = {
  ja: {
    tip: "¥150",
    pro: "¥380/月",
    premium: "¥1,480",
  },
  en: {
    tip: "$1.50",
    pro: "$3/mo",
    premium: "$10",
  },
} as const;

// ── Labels (used in buttons and CTAs) ─────────────────────────────

export const PLAN_LABELS = {
  ja: {
    tipButton: "¥150 チップを送る",
    tipDescription: "チップ（¥150）で応援いただけると今後の執筆の励みになります",
    proButton: "Pro — ¥380/月",
    proLong: "月額プラン — ¥380/月",
    premiumButton: "Premium — ¥1,480（おすすめ）",
    premiumLong: "永久アクセス — ¥1,480（おすすめ）",
    proFeature: "¥380/月 または ¥1,480 の永久アクセス",
  },
  en: {
    tipButton: "Send $1.50 Tip",
    tipDescription: "A small tip ($1.50) would really encourage us to keep writing",
    proButton: "Pro — $3/mo",
    proLong: "Monthly — $3/mo",
    premiumButton: "Premium — $10 (Recommended)",
    premiumLong: "Lifetime Access — $10 (Recommended)",
    proFeature: "$3/mo or $10 for lifetime access",
  },
} as const;

// ── Helper to get locale-safe values ──────────────────────────────

type Locale = "ja" | "en";

export function getPriceIds(locale: string) {
  return STRIPE_PRICE_IDS[(locale as Locale) in STRIPE_PRICE_IDS ? (locale as Locale) : "en"];
}

export function getPrices(locale: string) {
  return PRICES[(locale as Locale) in PRICES ? (locale as Locale) : "en"];
}

export function getLabels(locale: string) {
  return PLAN_LABELS[(locale as Locale) in PLAN_LABELS ? (locale as Locale) : "en"];
}
