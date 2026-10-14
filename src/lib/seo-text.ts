/**
 * <title> / <meta description> を検索結果で切れにくい長さに整える（2026-10-14・4サイト共通）。
 * 記事の h1・OGP・JSON-LD は元のタイトル／説明をそのまま使い、ここでは <title> と meta description だけを短くする。
 */
const SEPARATORS = [" — ", " – ", " - ", "｜", " | ", "：", ": "];

function balanceBrackets(text: string): string {
  // 「」『』（）が閉じていないときは、開き括弧の手前で切る
  for (const [open, close] of [["「", "」"], ["『", "』"], ["（", "）"], ["(", ")"]]) {
    const o = text.split(open).length - 1;
    const c = text.split(close).length - 1;
    if (o > c) {
      const idx = text.lastIndexOf(open);
      if (idx >= 8) return text.slice(0, idx).replace(/[\s、,，・:：—–-]+$/, "");
    }
  }
  return text;
}

export function seoTitle(title: string, locale: string): string {
  const t = (title || "").trim();
  const ja = locale === "ja";
  const max = ja ? 34 : 58;
  if (t.length <= max) return t;

  // 1) 区切り（— など）の手前までを使う。主題は多くの場合ここまでに入っている
  let cut = -1;
  for (const sep of SEPARATORS) {
    const i = t.indexOf(sep);
    if (i > 0 && (cut === -1 || i < cut)) cut = i;
  }
  const minHead = ja ? 12 : 24;
  if (cut >= minHead) {
    const head = balanceBrackets(t.slice(0, cut).trim());
    if (head.length <= Math.round(max * 1.25)) return head;
  }

  // 2) 句読点で切る
  const window = t.slice(0, max + 1);
  const marks = ja ? ["、", "，", "。", " "] : [", ", " – ", " ", ":"];
  let best = -1;
  for (const m of marks) best = Math.max(best, window.lastIndexOf(m));
  const floor = Math.round(max * 0.55);
  if (best >= floor) return balanceBrackets(t.slice(0, best).replace(/[\s、,，。:：]+$/, ""));

  // 3) 切れ目が無ければ末尾を省略
  return balanceBrackets(t.slice(0, max - 1)) + "…";
}

export function seoDescription(description: string, locale: string): string {
  const d = (description || "").replace(/\s+/g, " ").trim();
  const ja = locale === "ja";
  const max = ja ? 110 : 155;
  if (d.length <= max) return d;
  const window = d.slice(0, max);
  const enders = ja ? ["。", "！", "？"] : [". ", "! ", "? "];
  let best = -1;
  for (const e of enders) best = Math.max(best, window.lastIndexOf(e) + (ja ? 1 : 1));
  if (best >= Math.round(max * 0.45)) return d.slice(0, best).trim();
  const soft = ja ? ["、"] : [", ", "; "];
  let sb = -1;
  for (const e of soft) sb = Math.max(sb, window.lastIndexOf(e));
  if (sb >= Math.round(max * 0.6)) return d.slice(0, sb).trim() + "…";
  return balanceBrackets(d.slice(0, max - 1)).trim() + "…";
}

// 同じ言語内で短縮後のタイトルが他記事と重なる場合は、重複タイトルを作らないよう元のタイトルをそのまま使う
const shortCounts = new Map<string, Map<string, number>>();
export function seoTitleFor(title: string, locale: string, allTitles: string[]): string {
  const short = seoTitle(title, locale);
  if (short === title) return title;
  const key = `${locale}:${allTitles.length}`;
  let counts = shortCounts.get(key);
  if (!counts) {
    counts = new Map();
    for (const t of allTitles) {
      const s = seoTitle(t, locale);
      counts.set(s, (counts.get(s) || 0) + 1);
    }
    shortCounts.clear();
    shortCounts.set(key, counts);
  }
  return (counts.get(short) || 0) > 1 ? title : short;
}
