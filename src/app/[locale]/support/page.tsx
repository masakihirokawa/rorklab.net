import type { Metadata } from "next";
import { SupportClient } from "./SupportClient";

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<string, { title: string; description: string }> = {
  ja: {
    title: "メンバーシップ & サポート — Rork Lab",
    description: "Rork Lab Pro / Premium メンバーシップで全プレミアム記事にアクセス。月額 ¥500 または永久アクセス ¥2,980。",
  },
  en: {
    title: "Membership & Support — Rork Lab",
    description: "Get full access to all premium articles with Rork Lab Pro / Premium. $5/month or $19 lifetime.",
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
    },
  };
}

const STRIPE_TIP: Record<string, { priceId: string }> = {
  ja: { priceId: "price_1TCQyPEGB5g6A54ofaB9e5to" },
  en: { priceId: "price_1TCQyXEGB5g6A54oVQirhunP" },
};

const STRIPE_PLANS: Record<string, { pro: { priceId: string; label: string; price: string }; premium: { priceId: string; label: string; price: string } }> = {
  ja: {
    pro: { priceId: "price_1TCQyjEGB5g6A54opYFArVOk", label: "Pro — 月額プラン", price: "¥380/月" },
    premium: { priceId: "price_1TCQyxEGB5g6A54oh8U6RHec", label: "Premium — 永久アクセス", price: "¥1,480" },
  },
  en: {
    pro: { priceId: "price_1TCQylEGB5g6A54oNYYQAjPX", label: "Pro — Monthly", price: "$3/mo" },
    premium: { priceId: "price_1TCQyyEGB5g6A54oUojdhfBa", label: "Premium — Lifetime", price: "$10" },
  },
};

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
    heading: "メンバーシップ & サポート",
    sub: "Rork Lab をご覧いただきありがとうございます。広告なし・無料で公開しており、皆さまのサポートがドメイン・サーバー代などの運営費を支えています。",
    membershipHeading: "Rork Lab Pro / Premium",
    membershipSub: "すべてのプレミアム記事にアクセス",
    features: [
      "初月無料（Proプランのみ）",
      "プレミアム記事が読み放題（週2本追加）",
      "深掘り技術チュートリアル & 実践コード",
      "広告なしの快適な閲覧体験",
      "いつでもキャンセル可能",
    ],
    proLabel: "月額プランで始める（初月無料）",
    premiumLabel: "永久アクセスを購入",
    tipHeading: "チップで応援する",
    note: "※ いただいたご支援はサーバー費用・コンテンツ制作に使わせていただきます。",
    tipLabel: "¥150 チップを送る",
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
    heading: "Membership & Support",
    sub: "Thank you for visiting Rork Lab. Ad-free and free to read — your support covers hosting and domain costs.",
    membershipHeading: "Rork Lab Pro / Premium",
    membershipSub: "Full access to all premium articles",
    features: [
      "First month free (Pro plan only)",
      "Unlimited access to premium articles (2 new per week)",
      "In-depth technical tutorials & working code",
      "Ad-free reading experience",
      "Cancel anytime",
    ],
    proLabel: "Start Monthly Plan (First Month Free)",
    premiumLabel: "Buy Lifetime Access",
    tipHeading: "Leave a Tip",
    note: "* All contributions go toward server costs and content creation.",
    tipLabel: "Send $1.50 Tip",
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
  const plans = STRIPE_PLANS[locale] || STRIPE_PLANS.en;

  return <SupportClient content={c} locale={locale} stripeTip={STRIPE_TIP[locale] || STRIPE_TIP.en} plans={plans} />;
}
