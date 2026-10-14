"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * スクロール到達の演出とロールオーバーの起点追跡（2026-10-14・智加子／サユミ／Saya サイトの Reveal・Hover を Lab 向けに移植）。
 * 見た目は globals.css 末尾「モーション」節。4 サイト同一ファイル。
 *
 * 設計（SEO・収益導線を守るための前提）:
 *  - サーバー出力は常に「見える」状態。JS が動いてから、画面の外（下）にある要素だけに data-rv-h（隠す）を付ける。
 *    JS が止まっても本文・リンク・課金導線は消えない。DOM に本文は常にあるので Googlebot の読み取りにも影響しない。
 *  - React が管理する className/style は触らない（data 属性だけ）。transform ではなく translate を使うので、
 *    既存のホバー用 transform と干渉しない。演出は animation の from だけ指定（終点＝要素本来の状態）。
 *  - 課金導線（MembershipCTA／PremiumPaywall／SingleArticleCTA／Sticky バー）は対象に入れない。
 *  - 出現は 1 回きり。速く送っているとき（約 600px/s 超）は尺を縮めて遅延を外す。
 *  - prefers-reduced-motion では何もしない（CSS 側でも止める）。
 */
const RV_SEL = [
  "main a:has(> h3)", // 記事の行・ガイドカード・タグ／レベル一覧
  "main [style*='grid-template-columns'] > a", // トップのカテゴリカード
  ".related-card", // 関連記事
  "main > div > section:not(#membership-cta) > div:first-child:not([style*='grid'])", // トップ各節の見出しラベル
  "main h2",
  ".article-content > h2",
  ".article-content > :is(pre, table, blockquote, .callout, .table-scroll, figure, [data-rehype-pretty-code-figure])",
].join(",");

// ロールオーバーで「入った点から色が広がる」対象（見た目は CSS）
const FX_SEL = "main a:has(> h3), main [style*='grid-template-columns'] > a, .related-card";

export function Motion() {
  const pathname = usePathname();

  // ロールオーバー: カーソルが入った点（出た点）を --mx / --my に書くだけ（PC のみ）
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const put = (el: HTMLElement, e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    };
    const handle = (e: PointerEvent, rel: EventTarget | null) => {
      const el = (e.target as Element | null)?.closest?.(FX_SEL) as HTMLElement | null;
      if (!el) return;
      if (rel && el.contains(rel as Node)) return; // 中の要素どうしの移動は無視
      put(el, e);
    };
    const over = (e: PointerEvent) => handle(e, e.relatedTarget);
    const out = (e: PointerEvent) => handle(e, e.relatedTarget);
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  // スクロール到達: ページ遷移（pathname）のたびに張り直し、遅れて描画された要素は MutationObserver で拾う
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;

    let v = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let idle = 0;
    const seen = new WeakSet<Element>();

    const reveal = (el: HTMLElement, rd: number, fast: boolean) => {
      el.style.setProperty("--rd", `${rd}ms`);
      if (fast) el.setAttribute("data-rv-fast", "");
      el.removeAttribute("data-rv-h");
      el.setAttribute("data-rv-in", "");
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        const fast = v > 600;
        hits.forEach((e, i) => {
          // 同じ瞬間に入った要素は 70ms ずつずらして立ち上げる（最大 420ms）
          reveal(e.target as HTMLElement, fast ? 0 : Math.min(i * 70, 420), fast);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );

    const scan = () => {
      const vh = window.innerHeight;
      main.querySelectorAll<HTMLElement>(RV_SEL).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const b = el.getBoundingClientRect();
        // すでに画面内・通り過ぎた要素はそのまま（初回表示を遅らせない・LCP と CLS を悪化させない）
        if (b.top < vh * 0.94) return;
        el.setAttribute("data-rv-h", "");
        io.observe(el);
      });
    };

    const onScroll = () => {
      const t = performance.now();
      const y = window.scrollY;
      const dt = t - lastT;
      if (dt > 0) v = v * 0.5 + (Math.abs(y - lastY) / dt) * 1000 * 0.5;
      lastY = y;
      lastT = t;
      window.clearTimeout(idle);
      // 止まったとき、観測の取りこぼしで隠れたまま画面内にいるものを拾う
      idle = window.setTimeout(() => {
        v = 0;
        const vh = window.innerHeight;
        main.querySelectorAll<HTMLElement>("[data-rv-h]").forEach((el) => {
          const b = el.getBoundingClientRect();
          if (b.top < vh * 0.94 && b.bottom > 0) reveal(el, 0, false);
        });
      }, 150);
    };

    scan();
    let timer = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 80);
    });
    mo.observe(main, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
      window.clearTimeout(timer);
      mo.disconnect();
      io.disconnect();
      // 遷移後も隠れたまま残らないよう、監視中のものは表示状態へ戻す
      main.querySelectorAll("[data-rv-h]").forEach((el) => el.removeAttribute("data-rv-h"));
    };
  }, [pathname]);

  return null;
}
