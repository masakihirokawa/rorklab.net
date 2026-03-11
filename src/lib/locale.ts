/**
 * Returns the URL path prefix for the given locale.
 * Japanese (default locale) has no prefix; others get "/{locale}".
 */
export function localePrefix(locale: string): string {
  return locale === "ja" ? "" : `/${locale}`;
}
