import type { Metadata } from "next";
import { SupportClient } from "./SupportClient";

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<string, { title: string; description: string }> = {
  ja: {
    title: "Rork Lab を応援する",
    description: "Rork Lab の活動を支援していただける方へ。Ko-fi、PayPal、Wise、Revolut でサポートできます。",
  },
  en: {
    title: "Support Rork Lab",
    description: "Support Rork Lab's work. You can contribute via Ko-fi, PayPal, Wise, or Revolut.",
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

const STRIPE_TIP = {
  priceId: "price_1T9XUaEGB5g6A54oKJAHSNWu",
};

const CONTENT: Record<string, {
  heading: string;
  sub: string;
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
    jp?: boolean;
  }[];
}> = {
  ja: {
    heading: "Rork Lab を応援する",
    sub: "このサイトは広告なし・完全無料で運営しています。もし役に立ったと感じていただけたら、コーヒー一杯分のサポートをいただけると嬉しいです ♥",
    note: "※ サポートは任意です。いただいたご支援はサーバー費用・コンテンツ制作に使わせていただきます。",
    tipLabel: "¥100 チップを送る",
    tipSub: "Stripe 決済（クレジットカード対応）",
    methods: [
      {
        name: "Ko-fi",
        icon: "☕",
        label: "Ko-fi でサポート",
        sub: "ko-fi.com/dolice",
        url: "https://ko-fi.com/dolice",
        color: "#29ABE0",
        global: true,
      },
      {
        name: "PayPal",
        icon: "🅿",
        label: "PayPal で送金",
        sub: "paypal.me/masakihirokawa",
        url: "https://www.paypal.com/paypalme/masakihirokawa",
        color: "#003087",
        global: true,
      },
      {
        name: "Wise",
        icon: "🌍",
        label: "Wise で送金",
        sub: "wise.com/pay/me/masakih65",
        url: "https://wise.com/pay/me/masakih65",
        color: "#9FE870",
        global: true,
      },
      {
        name: "Revolut",
        icon: "⚡",
        label: "Revolut で送金",
        sub: "@masakihirokawa",
        url: "https://revolut.me/masakihirokawa",
        color: "#191C1F",
        global: true,
      },
    ],
  },
  en: {
    heading: "Support Rork Lab",
    sub: "Rork Lab is free and ad-free. If you've found it helpful, a small contribution means a lot and helps keep the site running ♥",
    note: "* Support is entirely optional. All contributions go toward server costs and content creation.",
    tipLabel: "Send ¥100 Tip",
    tipSub: "Stripe checkout (credit card)",
    methods: [
      {
        name: "Ko-fi",
        icon: "☕",
        label: "Support on Ko-fi",
        sub: "ko-fi.com/dolice",
        url: "https://ko-fi.com/dolice",
        color: "#29ABE0",
        global: true,
      },
      {
        name: "PayPal",
        icon: "🅿",
        label: "Send via PayPal",
        sub: "paypal.me/masakihirokawa",
        url: "https://www.paypal.com/paypalme/masakihirokawa",
        color: "#003087",
        global: true,
      },
      {
        name: "Wise",
        icon: "🌍",
        label: "Send via Wise",
        sub: "wise.com/pay/me/masakih65",
        url: "https://wise.com/pay/me/masakih65",
        color: "#9FE870",
        global: true,
      },
      {
        name: "Revolut",
        icon: "⚡",
        label: "Send via Revolut",
        sub: "@masakihirokawa",
        url: "https://revolut.me/masakihirokawa",
        color: "#191C1F",
        global: true,
      },
    ],
  },
};

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;

  return <SupportClient content={c} locale={locale} stripeTip={STRIPE_TIP} />;
}
