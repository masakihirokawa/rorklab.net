"use client";

import { useEffect, useRef } from "react";
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
  "footer > *", // フッターの各段
].join(",");

// 各ページの本文ブロック（段落・リスト・表・フォーム）。親がすでに演出対象のもの・カード/ボタン/記事本文の中は除く
const GEN_SEL = "main :is(p, ul, ol, dl, table, form, details):not(.article-content *)";
const GEN_SKIP = "a, button, nav, [data-rv-h], [data-rv-in], .article-content, [role='dialog']";

// ロールオーバーで「入った点から色が広がる」対象（見た目は CSS）
const FX_SEL = "main a:has(> h3), main [style*='grid-template-columns'] > a, .related-card, [data-fx]";

export function Motion() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  // 画面遷移の演出は 2 回目以降のページ移動から（初回表示の LCP を遅らせない）
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.setAttribute("data-nav", "");
  }, [pathname]);

  // カーソルの金の光（PC のみ）と、後から現れるメニュー・モーダル・バーの登場演出
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    let x = 0;
    let y = 0;
    // 光は専用の固定要素（見た目は globals.css の .cursor-glow）。transform だけを書くので再描画も全体のスタイル再計算も起きない
    let glow: HTMLDivElement | null = null; // 最初にカーソルが動いたときに作る（タッチ端末では作らない）
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!glow) {
          glow = document.createElement("div");
          glow.className = "cursor-glow";
          glow.setAttribute("aria-hidden", "true");
          document.body.appendChild(glow);
        }
        glow.style.transform = `translate3d(${x - 380}px, ${y - 380}px, 0)`;
        root.setAttribute("data-glow", "");
      });
    };
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) document.addEventListener("pointermove", move, { passive: true });

    const pop = (n: Node) => {
      if (!(n instanceof HTMLElement) || n.hasAttribute("data-pop")) return;
      const cs = getComputedStyle(n);
      if ((cs.position === "fixed" || cs.position === "absolute") && parseInt(cs.zIndex, 10) >= 50) {
        const full = n.offsetWidth >= window.innerWidth * 0.95 && n.offsetHeight >= window.innerHeight * 0.9;
        n.setAttribute("data-pop", full ? "fade" : "pop");
      }
    };
    const mo = new MutationObserver((recs) =>
      recs.forEach((r) =>
        r.addedNodes.forEach((n) => {
          pop(n);
          if (n instanceof HTMLElement) Array.from(n.children).forEach(pop);
        })
      )
    );
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      if (fine) document.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
      glow?.remove();
      mo.disconnect();
    };
  }, []);

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
      const cands: HTMLElement[] = [];
      document.querySelectorAll<HTMLElement>(`${RV_SEL},${GEN_SEL}`).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.matches(GEN_SEL) && !el.matches(RV_SEL) && el.parentElement?.closest(GEN_SKIP)) return;
        cands.push(el);
      });
      // 読み取り（位置）を先にまとめ、そのあと書き込む。交互にすると要素ごとにスタイル再計算が走る（一覧が数百件の /membership 等で重い）
      const tops = cands.map((el) => el.getBoundingClientRect().top);
      cands.forEach((el, i) => {
        // すでに画面内・通り過ぎた要素はそのまま（初回表示を遅らせない・LCP と CLS を悪化させない）
        if (tops[i] < vh * 0.94) return;
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
        document.querySelectorAll<HTMLElement>("[data-rv-h]").forEach((el) => {
          const b = el.getBoundingClientRect();
          if (b.top < vh * 0.94) reveal(el, 0, b.bottom <= 0);
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
      document.querySelectorAll("[data-rv-h]").forEach((el) => el.removeAttribute("data-rv-h"));
    };
  }, [pathname]);

  // 先頭の節（ヒーロー）が画面から外れているあいだは常時アニメを止める（見た目は変えず、読んでいる間の無駄な再描画を無くす）
  useEffect(() => {
    const top = document.querySelector("main > div > section:first-child");
    const root = document.documentElement;
    root.removeAttribute("data-top-off");
    if (!top) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) root.removeAttribute("data-top-off");
      else root.setAttribute("data-top-off", "");
    });
    io.observe(top);
    return () => io.disconnect();
  }, [pathname]);

  // 全リンク・全ボタンを実際の見た目で分類し、data-fx を付ける（見た目は CSS 側。React の className/style には触れない）
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const alpha = (c: string) => {
      if (!c || c === "transparent" || c === "rgba(0, 0, 0, 0)") return 0;
      const m = c.match(/\/\s*([\d.]+%?)\s*\)/) || c.match(/rgba\([^)]*,\s*([\d.]+)\)/);
      if (!m) return 1;
      return m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
    };
    const classify = (el: HTMLElement) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.matches(FX_SEL.replace(", [data-fx]", ""))) return; // 行・カードは専用の演出
      if (el.closest(".article-content") && el.tagName === "A") return; // 本文リンクは専用
      const cs = getComputedStyle(el);
      if (cs.display === "none") return;
      const bgA = alpha(cs.backgroundColor);
      const hasBg = cs.backgroundImage !== "none" || bgA > 0.02;
      const hasBorder = ["Top", "Right", "Bottom", "Left"].some(
        (s) => parseFloat(cs.getPropertyValue(`border-${s.toLowerCase()}-width`)) > 0 && cs.getPropertyValue(`border-${s.toLowerCase()}-style`) !== "none"
      );
      const iconOnly = !!el.querySelector("svg") && !(el.textContent || "").trim();
      const href = el.getAttribute("href") || "";
      const brand = !!el.closest("header") && (href === "/" || href === "/en" || href === "/en/");
      const kind = brand ? "brand" : iconOnly ? "icon" : hasBg || hasBorder ? "btn" : cs.textDecorationLine.includes("underline") ? "ul" : "text";
      el.setAttribute("data-fx", kind);
      if (kind === "btn" && bgA > 0.6) el.setAttribute("data-fx-solid", "");
      if (cs.position === "fixed" || cs.position === "absolute") el.setAttribute("data-fx-abs", "");
    };
    // 画面（の 240px 手前）に入ったものだけ分類する。全件を一度に getComputedStyle しない（一覧が数百件のページで重い）
    const watched = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          classify(e.target as HTMLElement);
          io.unobserve(e.target);
        }),
      { rootMargin: "240px" }
    );
    const scan = () =>
      document.querySelectorAll<HTMLElement>("a[href], button").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    // 取りこぼし対策: まだ分類されていないものに触れた・押した瞬間にも分類する
    const lazy = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.("a[href], button") as HTMLElement | null;
      if (el) classify(el);
    };
    document.addEventListener("pointerover", lazy, { passive: true });
    document.addEventListener("pointerdown", lazy, { passive: true });
    scan();
    let t = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(scan, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      io.disconnect();
      document.removeEventListener("pointerover", lazy);
      document.removeEventListener("pointerdown", lazy);
    };
  }, [pathname]);

  return null;
}
