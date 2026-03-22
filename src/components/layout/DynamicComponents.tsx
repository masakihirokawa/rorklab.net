"use client";

import dynamic from "next/dynamic";

const NewsTicker = dynamic(
  () => import("@/components/ui/NewsTicker").then((m) => ({ default: m.NewsTicker })),
  { ssr: false }
);
const ScrollToTop = dynamic(
  () => import("@/components/ui/ScrollToTop").then((m) => ({ default: m.ScrollToTop })),
  { ssr: false }
);
const CookieBanner = dynamic(
  () => import("@/components/layout/CookieBanner").then((m) => ({ default: m.CookieBanner })),
  { ssr: false }
);

export function DynamicNewsTicker() {
  return <NewsTicker />;
}

export function DynamicScrollToTop() {
  return <ScrollToTop />;
}

export function DynamicCookieBanner(props: {
  gaId: string;
  privacyHref: string;
  locale: string;
  storageKey: string;
}) {
  return <CookieBanner {...props} />;
}
