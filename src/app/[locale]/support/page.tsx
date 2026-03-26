import type { Metadata } from "next";
import { SupportClient } from "./SupportClient";
import { getPremiumAccess } from "@/lib/premium";
import { STRIPE_PRICE_IDS, PLAN_LABELS, PRICES } from "@/config/pricing";

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<string, { title: string; description: string }> = {
  ja: {
    title: "メンバーシップ & サポート — Rork Lab",
    description: `Rork Lab Pro / Premium メンバーシップで全プレミアム記事にアクセス。月額 ${PRICES.ja.pro.replace("/月", "")} または永久アクセス ${PRICES.ja.premium}。`,
  },
  en: {
    title: "Membership & Support — Rork Lab",
    description: `Get full access to all premium articles with Rork Lab Pro / Premium. ${PRICES.en.pro.replace("/mo", "")}/month or ${PRICES.en.premium} lifetime.`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] || META.en;
  const prefix = locale === "ja" ? "" : `/${locale}`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://rorklab.net${prefix}/support`,
      languages: {
        ja: "https://rorklab.net/support",
        en: "https://rorklab.net/en/support",
        "x-default": "https://rorklab.net/en/support",
      },
    },
  };
}


const CONTENT: Record<string, {
  heading: string;
  sub: string;
  membershipHeading: string;
  membershipSub: string;
  features: string[];
  proLabel: string;
  premiumLabel: string;
  tipHeading: string;
  note: string;
  tipLabel: string;
  tipSub: string;
  methods: {
    name: string;
    icon: string;
    label: string;
    sub: string;
    url: string;
    color: string;
    global?: boolean;
    mobileOnly?: boolean;
  }[];
}> = {
  ja: {
    heading: "Premium & サポート",
    sub: "Rork Lab をご覧いただきありがとうございます。広告なし・無料で公開しており、皆さまのサポートがドメイン・サーバー代などの運営費を支えています。",
    membershipHeading: "Rork Lab Premium",
    membershipSub: "実装コード付きの上級ガイドが読み放題",
    features: [
      "コピー&ペーストで使える実装コード付き",
      "毎週追加される上級ガイド",
      "本番環境で使える設計パターン",
      "広告なしの快適な閲覧体験",
      "いつでもキャンセル可能",
    ],
    proLabel: `月額プラン — ${PRICES.ja.pro}`,
    premiumLabel: `永久アクセス — ${PRICES.ja.premium}（おすすめ）`,
    tipHeading: "チップで応援する",
    note: "※ いただいたご支援はサーバー費用・コンテンツ制作に使わせていただきます。",
    tipLabel: `${PRICES.ja.tip} チップを送る`,
    tipSub: "Stripe 決済（クレジットカード対応）",
    methods: [
      { name: "Ko-fi", icon: "☕", label: "Ko-fi でサポート", sub: "ko-fi.com/dolice", url: "https://ko-fi.com/dolice", color: "#29ABE0", global: true },
      { name: "PayPal", icon: "🅿", label: "PayPal で送金", sub: "paypal.me/masakihirokawa", url: "https://www.paypal.com/paypalme/masakihirokawa", color: "#003087", global: true },
      { name: "Wise", icon: "🌍", label: "Wise で送金", sub: "wise.com/pay/me/masakih65", url: "https://wise.com/pay/me/masakih65", color: "#9FE870", global: true },
      { name: "Revolut", icon: "⚡", label: "Revolut で送金", sub: "@masakihirokawa", url: "https://revolut.me/masakihirokawa", color: "#191C1F", global: true },
      { name: "PayPay", icon: "💴", label: "PayPay で送金", sub: "PayPay ID: dolice", url: "https://qr.paypay.ne.jp/p2p01_7DJRDSAMgMJfkjj9", color: "#E4007F", mobileOnly: true },
    ],
  },
  en: {
    heading: "Premium & Support",
    sub: "Thank you for visiting Rork Lab. Ad-free and free to read — your support covers hosting and domain costs.",
    membershipHeading: "Rork Lab Premium",
    membershipSub: "Advanced guides with production-ready code",
    features: [
      "Copy-paste ready implementation code",
      "New advanced guides published every week",
      "Production-ready design patterns",
      "Ad-free reading experience",
      "Cancel anytime",
    ],
    proLabel: `Monthly — ${PRICES.en.pro}`,
    premiumLabel: `Lifetime Access — ${PRICES.en.premium} (Recommended)`,
    tipHeading: "Leave a Tip",
    note: "* All contributions go toward server costs and content creation.",
    tipLabel: `Send ${PRICES.en.tip} Tip`,
    tipSub: "Stripe checkout (credit card)",
    methods: [
      { name: "Ko-fi", icon: "☕", label: "Support on Ko-fi", sub: "ko-fi.com/dolice", url: "https://ko-fi.com/dolice", color: "#29ABE0", global: true },
      { name: "PayPal", icon: "🅿", label: "Send via PayPal", sub: "paypal.me/masakihirokawa", url: "https://www.paypal.com/paypalme/masakihirokawa", color: "#003087", global: true },
      { name: "Wise", icon: "🌍", label: "Send via Wise", sub: "wise.com/pay/me/masakih65", url: "https://wise.com/pay/me/masakih65", color: "#9FE870", global: true },
      { name: "Revolut", icon: "⚡", label: "Send via Revolut", sub: "@masakihirokawa", url: "https://revolut.me/masakihirokawa", color: "#191C1F", global: true },
    ],
  },
};

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  const plans = {
    ja: {
      pro: { priceId: STRIPE_PRICE_IDS.ja.pro, label: `Pro — ${PLAN_LABELS.ja.pro}`, price: PRICES.ja.pro },
      premium: { priceId: STRIPE_PRICE_IDS.ja.premium, label: `Premium — ${PLAN_LABELS.ja.premium}`, price: PRICES.ja.premium },
    },
    en: {
      pro: { priceId: STRIPE_PRICE_IDS.en.pro, label: `Pro — ${PLAN_LABELS.en.pro}`, price: PRICES.en.pro },
      premium: { priceId: STRIPE_PRICE_IDS.en.premium, label: `Premium — ${PLAN_LABELS.en.premium}`, price: PRICES.en.premium },
    },
  };
  const stripeTip = {
    ja: { priceId: STRIPE_PRICE_IDS.ja.tip },
    en: { priceId: STRIPE_PRICE_IDS.en.tip },
  };
  const premiumAccess = await getPremiumAccess();

  return <SupportClient content={c} locale={locale} stripeTip={stripeTip[locale] || stripeTip.en} plans={plans[locale] || plans.en} premiumAccess={premiumAccess} />;
}
