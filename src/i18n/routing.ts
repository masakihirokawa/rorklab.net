import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
  // next-intl の自動 Link: hreflang ヘッダを無効化。
  // 既定の true では x-default が defaultLocale(ja) のルートを指し、
  // HTML 側の alternates（x-default = /en）と矛盾して hreflang クラスタが破棄される。
  // 宣言は generateMetadata 側の1系統に統一する（2026-07-28）。
  alternateLinks: false,
});
