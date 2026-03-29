/**
 * Pricing configuration — single source of truth for all Stripe prices and display labels.
 *
 * When changing prices:
 *   1. Update the priceId + display values here
 *   2. Update tokusho/page.tsx (legal requirement — prices are inline text)
 *   3. Update checkout/route.ts PRICE_NAMES if priceId changed
 *   4. Push to all 4 sites (priceIds differ per site)
 *
 * Campaign pricing:
 *   - Set CAMPAIGN.enabled = true to activate campaign pricing
 *   - Set CAMPAIGN.enabled = false to revert to normal pricing
 *   - Campaign affects Premium plan only (one-time purchase)
 *   - Components auto-detect campaign state via getCampaign()
 */

// ── Stripe Price IDs ──────────────────────────────────────────────

export const STRIPE_PRICE_IDS = {
  ja: {
    tip: "price_1TCQyPEGB5g6A54ofaB9e5to",
    pro: "price_1TGSqUEGB5g6A54oxdnDOxOU",
    premium: "price_1TCQyxEGB5g6A54oh8U6RHec",
  },
  en: {
    tip: "price_1TCQyXEGB5g6A54oVQirhunP",
    pro: "price_1TGSqWEGB5g6A54oTOwX2C6I",
    premium: "price_1TCQyyEGB5g6A54oUojdhfBa",
  },
} as const;

// ── Display Prices ────────────────────────────────────────────────

export const PRICES = {
  ja: {
    tip: "¥150",
    pro: "¥280/月",
    premium: "¥1,480",
  },
  en: {
    tip: "$1.50",
    pro: "$2/mo",
    premium: "$10",
  },
} as const;

// ── Labels (used in buttons and CTAs) ─────────────────────────────

export const PLAN_LABELS = {
  ja: {
    tipButton: "¥150 チップを送る",
    tipDescription: "もしお役に立ちましたら、チップ（¥150）で応援いただけると大変励みになります",
    proButton: "プロ — ¥280/月",
    proLong: "月額プラン — ¥280/月",
    premiumButton: "プレミアム — ¥1,480（おすすめ）",
    premiumLong: "永久アクセス — ¥1,480（おすすめ）",
    proFeature: "¥280/月 または ¥1,480 の永久アクセス",
  },
  en: {
    tipButton: "Send $1.50 Tip",
    tipDescription: "If you found this helpful, a small tip ($1.50) would mean a lot to us",
    proButton: "Pro — $2/mo",
    proLong: "Monthly — $2/mo",
    premiumButton: "Premium — $10 (Recommended)",
    premiumLong: "Lifetime Access — $10 (Recommended)",
    proFeature: "$2/mo or $10 for lifetime access",
  },
} as const;

// ── Campaign Pricing (感謝価格) ──────────────────────────────────

export const CAMPAIGN = {
  /** true にするとキャンペーン価格が有効になります */
  enabled: true,

  /** キャンペーン名（UIバッジに表示） */
  name: { ja: "感謝価格", en: "Thank You Price" },

  /** キャンペーン用 Stripe Price IDs (Premium のみ) */
  priceIds: {
    ja: "price_1TFRyLEGB5g6A54oCoY0I3Dc",  // ¥980
    en: "price_1TFRyLEGB5g6A54opRFYkqzY",  // $7
  },

  /** キャンペーン価格の表示テキスト */
  prices: {
    ja: "¥980",
    en: "$7",
  },

  /** 通常価格（取り消し線で表示） */
  originalPrices: {
    ja: "¥1,480",
    en: "$10",
  },

  /** ボタンラベル */
  labels: {
    ja: {
      premiumButton: "プレミアム — ¥980（感謝価格）",
      premiumLong: "永久アクセス — ¥980（感謝価格）",
      proFeature: "¥280/月 または ¥980 の永久アクセス",
    },
    en: {
      premiumButton: "Premium — $7 (Thank You Price)",
      premiumLong: "Lifetime Access — $7 (Thank You Price)",
      proFeature: "$2/mo or $7 for lifetime access",
    },
  },
} as const;

// ── Helper to get locale-safe values ──────────────────────────────

type Locale = "ja" | "en";

export function getPriceIds(locale: string) {
  const loc = (locale as Locale) in STRIPE_PRICE_IDS ? (locale as Locale) : "en";
  const base = STRIPE_PRICE_IDS[loc];
  if (CAMPAIGN.enabled) {
    return { ...base, premium: CAMPAIGN.priceIds[loc] };
  }
  return base;
}

export function getPrices(locale: string) {
  const loc = (locale as Locale) in PRICES ? (locale as Locale) : "en";
  const base = PRICES[loc];
  if (CAMPAIGN.enabled) {
    return { ...base, premium: CAMPAIGN.prices[loc] };
  }
  return base;
}

export function getLabels(locale: string) {
  const loc = (locale as Locale) in PLAN_LABELS ? (locale as Locale) : "en";
  const base = PLAN_LABELS[loc];
  if (CAMPAIGN.enabled) {
    return {
      ...base,
      premiumButton: CAMPAIGN.labels[loc].premiumButton,
      premiumLong: CAMPAIGN.labels[loc].premiumLong,
      proFeature: CAMPAIGN.labels[loc].proFeature,
    };
  }
  return base;
}

export function getCampaign(locale: string) {
  const loc = (locale as Locale) in CAMPAIGN.prices ? (locale as Locale) : "en";
  return {
    enabled: CAMPAIGN.enabled,
    name: CAMPAIGN.name[loc],
    price: CAMPAIGN.prices[loc],
    originalPrice: CAMPAIGN.originalPrices[loc],
    priceId: CAMPAIGN.priceIds[loc],
  };
}
