import ogArticles from "@/generated/og-articles.json";

/**
 * OGP 画像（1200×630）。日英で別の画像を返す。
 * 旧 /og/default.png（1200×1200 正方形）は横長カードで下部の文字が切れるため 2026-10-23 に置き換え。
 * 画像は public/og/site-ja.png・site-en.png（生成元: Dolice Labs/_material/og/gen_site_og.py）。
 */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export function siteOgImage(locale: string): string {
  return `https://rorklab.net/og/site-${locale === "ja" ? "ja" : "en"}.png`;
}

/**
 * 記事別 OGP（ビルド時に scripts/generate-og.mjs が作る・noindex でない記事だけ）。
 * 対応表に無い記事（剪定記事・生成に失敗した記事）はサイト共通画像。
 */
export function articleOgImage(locale: string, category: string, slug: string): string {
  const loc = locale === "ja" ? "ja" : "en";
  const ver = (ogArticles as Record<string, Record<string, string>>)[loc]?.[`${category}/${slug}`];
  if (!ver) return siteOgImage(locale);
  return `https://rorklab.net/og/a/${loc}/${category}/${slug}.jpg?v=${ver}`;
}

export function articleOgImageType(url: string): string {
  return url.includes("/og/a/") ? "image/jpeg" : "image/png";
}
