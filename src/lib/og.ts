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
