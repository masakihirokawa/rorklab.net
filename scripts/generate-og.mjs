/**
 * generate-og.mjs — 記事別の OGP 画像（1200×630 JPEG・日英）をビルド時に作る（2026-10-23）
 * ────────────────────────────────────────────────────────────────
 * prebuild で generate-content.mjs の後に走る（1 枚 約 15ms・500 枚で 10 秒前後）。
 * 対象は noindex でない記事だけ（剪定記事は Google に出さないので作らない）。出力:
 *   public/og/a/{locale}/{category}/{slug}.jpg   … git には入れない（.gitignore）
 *   src/generated/og-articles.json               … { ja: { "category/slug": "版" }, en: {...} }
 * 記事ページの og:image / twitter:image / JSON-LD image は og-articles.json に載っている記事だけ
 * 記事別画像（?v=版）を使い、載っていなければサイト共通の /og/site-{ja,en}.png（src/lib/og.ts）。
 * 失敗してもビルドは止めない（その記事・全体ともサイト共通画像に戻るだけ）。
 * 意匠: 背景 public/og/article-bg.png（生成元 Dolice Labs/_material/og/gen_site_og.py）に
 *       サイト名・カテゴリ・記事タイトルを重ねる。フォントは scripts/og-fonts/。
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = process.cwd();
const SITE = { name: "RORK LAB", domain: "rorklab.net", accent: "#64EBCD" };
const DESIGN_VERSION = "1"; // 意匠を変えたら上げる（URL の ?v= が変わり SNS 側のキャッシュも更新される）
const W = 1200, H = 630, PAD_X = 80, MAX_W = 1040;
const OUT_DIR = path.join(ROOT, "public", "og", "a");
const MAP_PATH = path.join(ROOT, "src", "generated", "og-articles.json");
const FONT_DIR = path.join(ROOT, "scripts", "og-fonts");

// 行頭に来てはいけない字・行末に来てはいけない字（簡易禁則）
const NO_START = new Set([..."、。，．,.・：:；;？?！!ー－）)」』】〕〉》〟’”ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ々〜…‥%％"]);
const NO_END = new Set([..."（(「『【〔〈《“‘"]);

function writeMap(map) {
  fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
  fs.writeFileSync(MAP_PATH, JSON.stringify(map) + "\n", "utf-8");
}

/** 欧文は単語（空白区切り）単位、和文は 1 字単位のトークンに分ける */
function tokenize(text) {
  const out = [];
  let buf = "";
  for (const ch of text) {
    if (/[A-Za-z0-9_\-./:#+'&@%$]/.test(ch)) { buf += ch; continue; }
    if (buf) { out.push(buf); buf = ""; }
    out.push(ch);
  }
  if (buf) out.push(buf);
  return out;
}

function wrap(ctx, text, maxW) {
  const toks = tokenize(text);
  const lines = [];
  let line = "";
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (line === "" && t === " ") continue;
    const cand = line + t;
    if (ctx.measureText(cand).width <= maxW || line === "") {
      line = cand;
      continue;
    }
    // 禁則: 行頭禁止の字は前の行に追い込む／行末禁止の字は次の行へ送る
    if (NO_START.has(t)) { line = cand; continue; }
    let carry = "";
    const last = [...line].pop();
    if (last && NO_END.has(last)) { carry = last; line = line.slice(0, -last.length); }
    lines.push(line.replace(/\s+$/, ""));
    line = (carry + (t === " " ? "" : t));
  }
  if (line.trim()) lines.push(line.replace(/\s+$/, ""));
  return lines;
}

function drawSpaced(ctx, text, x, y, spacing) {
  for (const ch of text) {
    ctx.fillText(ch, x, y);
    x += ctx.measureText(ch).width + spacing;
  }
  return x;
}

function render(canvasMod, bg, title, label) {
  const { createCanvas } = canvasMod;
  const c = createCanvas(W, H);
  const ctx = c.getContext("2d");
  ctx.drawImage(bg, 0, 0, W, H);
  ctx.textBaseline = "alphabetic";

  // 見出し行: サイト名 / カテゴリ
  ctx.font = "400 21px OGMono, OGJP";
  ctx.fillStyle = SITE.accent;
  let x = drawSpaced(ctx, SITE.name, PAD_X, 92, 7);
  ctx.fillStyle = "#8a8a96";
  ctx.font = "400 18px OGMono";
  x = drawSpaced(ctx, "/", x + 14, 92, 0);
  ctx.fillStyle = "#c4c4cc";
  ctx.font = "400 20px OGMono, OGJP";
  drawSpaced(ctx, label, x + 18, 92, 2);

  // タイトル: 3 行に収まる最大の大きさ（64→42px）。収まらなければ 3 行目末を「…」
  let size = 64, lines;
  for (; size >= 42; size -= 2) {
    ctx.font = `700 ${size}px OGSans, OGJP`;
    lines = wrap(ctx, title, MAX_W);
    if (lines.length <= 3) break;
  }
  if (lines.length > 3) {
    lines = lines.slice(0, 3);
    let l = lines[2];
    while (l.length && ctx.measureText(l + "…").width > MAX_W) l = l.slice(0, -1);
    lines[2] = l + "…";
  }
  const lh = Math.round(size * 1.42);
  const blockH = lh * (lines.length - 1) + size;
  const top = 128, bottom = 528;
  let y = Math.round(top + (bottom - top - blockH) / 2 + size * 0.88);
  ctx.fillStyle = "#ffffff";
  for (const ln of lines) { ctx.fillText(ln, PAD_X, y); y += lh; }

  // 下: POWERED BY DOLICE · ドメイン
  ctx.font = "400 16px OGMono";
  ctx.fillStyle = "#a6a6b0";
  x = drawSpaced(ctx, "POWERED BY DOLICE", PAD_X, 574, 5);
  x = drawSpaced(ctx, "·", x + 10, 574, 0);
  drawSpaced(ctx, SITE.domain, x + 14, 574, 3);

  return c.toBuffer("image/jpeg", 84);
}

async function main() {
  const canvasMod = await import("@napi-rs/canvas");
  const { GlobalFonts, loadImage } = canvasMod;
  GlobalFonts.registerFromPath(path.join(FONT_DIR, "NotoSansJP-Bold-og.otf"), "OGJP");
  GlobalFonts.registerFromPath(path.join(FONT_DIR, "dm-sans-latin-700-normal.woff"), "OGSans");
  GlobalFonts.registerFromPath(path.join(FONT_DIR, "dm-mono-latin-400-normal.woff"), "OGMono");
  const bg = await loadImage(fs.readFileSync(path.join(ROOT, "public", "og", "article-bg.png")));
  const articles = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "generated", "articles.json"), "utf-8"));
  const map = { ja: {}, en: {} };
  let made = 0, failed = 0;
  const t0 = Date.now();
  for (const locale of ["ja", "en"]) {
    const labels = {};
    try {
      const msgs = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "i18n", "messages", `${locale}.json`), "utf-8"));
      for (const [k, v] of Object.entries(msgs.categories || {})) if (v && v.label) labels[k] = v.label;
    } catch { /* ラベルが無ければカテゴリ ID */ }
    for (const a of articles[locale] || []) {
      if (a.noindex || !a.title || !a.slug || !a.category) continue;
      const label = labels[a.category] || a.category;
      const ver = crypto.createHash("sha1").update(`${DESIGN_VERSION}|${a.title}|${label}`).digest("hex").slice(0, 8);
      try {
        const out = path.join(OUT_DIR, locale, a.category, `${a.slug}.jpg`);
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, render(canvasMod, bg, a.title, label));
        map[locale][`${a.category}/${a.slug}`] = ver;
        made++;
      } catch (e) {
        failed++;
        console.warn(`[og] ${locale}/${a.category}/${a.slug}: ${e.message}`);
      }
    }
  }
  writeMap(map);
  console.log(`[og] ${made} images (${failed} failed) in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((e) => {
  console.warn("[og] skipped (site-wide image is used):", e && e.message);
  try { writeMap({ ja: {}, en: {} }); } catch { /* noop */ }
  process.exit(0);
});
