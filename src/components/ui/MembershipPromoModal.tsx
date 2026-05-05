"use client";

/**
 * MembershipPromoModal — 画面下スライドインのメンバーシップ誘導モーダル
 *
 * 表示条件:
 *  - 1日1回まで（localStorage で日付管理）
 *  - メンバー（premium_token Cookie）と記事購入者（article_purchases Cookie）には表示しない
 *  - 「閉じる」ボタン or 背景タップで閉じられる
 *
 * 3つのトリガー:
 *  (A) 記事から戻った時（記事ページ→一覧系ページ遷移を sessionStorage で検知）
 *  (B) 離脱意図（デスクトップ: マウスがビューポート上端へ / モバイル: 高速スクロールアップ）
 *  (C) 累積3記事閲覧（同日内に3記事以上開いたユーザー）
 *
 * 既存CTAとの役割分担:
 *  - 既存（MembershipCTA / TipCTA）: 記事内に直接埋め込まれる「お願い型」誘導
 *  - 本モーダル: 「メンバーシップやサポートページの存在認知」に寄せた控えめな案内
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  locale: string;
  siteName: string; // "Claude Lab" / "Gemini Lab" / etc.
}

const LS_LAST_SHOWN = "promoModalLastShown";
const LS_VIEW_LOG = "promoArticleViewLog";
const SS_LAST_ARTICLE = "promoLastArticleView";
const RETURN_WINDOW_MS = 60_000; // 記事閲覧から60秒以内に一覧ページへ来たら「戻り」とみなす
const ARTICLE_THRESHOLD = 3; // 同日内 3 記事閲覧でトリガー

function getCopy(locale: string, siteName: string) {
  if (locale === "en") {
    return {
      headline: "Thank you for reading.",
      body: `${siteName} is ad-free — server costs are covered by the operator. If our articles have been useful, exploring membership or the support page would be a meaningful help.`,
      note: "Premium articles, monthly Pro plan, and tip options are all available.",
      membership: "View Membership",
      support: "Support Page",
      close: "Close",
      ariaLabel: "Membership promotion",
    };
  }
  return {
    headline: "お読みいただきありがとうございます",
    body: `${siteName} は広告を一切表示せず、サーバー費用などは運営者が個人で負担しています。記事が少しでもお役に立ちましたら、メンバーシップやサポートページもご覧いただけると励みになります。`,
    note: "プレミアム記事の閲覧、月額のProプラン、応援チップなどをご用意しています。",
    membership: "メンバーシップを見る",
    support: "サポートページへ",
    close: "閉じる",
    ariaLabel: "メンバーシップのご案内",
  };
}

function isMember(): boolean {
  if (typeof document === "undefined") return false;
  const c = document.cookie;
  return c.includes("premium_token=") || c.includes("article_purchases=");
}

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function shownToday(): boolean {
  try {
    return localStorage.getItem(LS_LAST_SHOWN) === todayKey();
  } catch {
    return false;
  }
}

function markShownToday() {
  try {
    localStorage.setItem(LS_LAST_SHOWN, todayKey());
  } catch {}
}

function localePath(locale: string, path: string): string {
  return locale === "ja" ? path : `/${locale}${path}`;
}

export function MembershipPromoModal({ locale, siteName }: Props) {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const triggeredRef = useRef(false); // セッション内で既にトリガー判定が走ったか

  // 記事ページ判定: /[locale]/articles/{category}/{slug} 形式
  // 一覧系ページ: /articles, /articles/{category}, /tags, /tag/*, /level/*, /blog, /guides, ホーム など
  const segments = pathname.split("/").filter(Boolean);
  const articlesIdx = segments.indexOf("articles");
  const isArticleDetail =
    articlesIdx !== -1 && segments.length - articlesIdx === 3;
  // メンバーシップ系ページではモーダルを出さない（自己言及になる）
  const isMembershipRelated =
    pathname.includes("/membership") ||
    pathname.includes("/support") ||
    pathname.includes("/tokusho") ||
    pathname.includes("/privacy") ||
    pathname.includes("/terms");

  const tryShow = useCallback(() => {
    if (open || closing) return;
    if (typeof window === "undefined") return;
    if (isMember()) return;
    if (shownToday()) return;
    if (isMembershipRelated) return;
    setOpen(true);
    markShownToday();
  }, [open, closing, isMembershipRelated]);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 280);
  }, []);

  // 記事ページに来たら sessionStorage に「最後の記事閲覧時刻」を記録
  // また localStorage に「今日の閲覧記事スラッグ」を蓄積
  useEffect(() => {
    if (!isArticleDetail) return;
    try {
      sessionStorage.setItem(
        SS_LAST_ARTICLE,
        JSON.stringify({ timestamp: Date.now(), pathname })
      );
    } catch {}

    try {
      const today = todayKey();
      const raw = localStorage.getItem(LS_VIEW_LOG);
      const data: { date?: string; slugs?: string[] } = raw ? JSON.parse(raw) : {};
      if (data.date !== today) {
        data.date = today;
        data.slugs = [];
      }
      if (!data.slugs!.includes(pathname)) {
        data.slugs!.push(pathname);
      }
      localStorage.setItem(LS_VIEW_LOG, JSON.stringify(data));
    } catch {}
  }, [pathname, isArticleDetail]);

  // トリガー(A): 記事ページから戻ったとき
  useEffect(() => {
    if (isArticleDetail) return;
    if (triggeredRef.current) return;
    try {
      const raw = sessionStorage.getItem(SS_LAST_ARTICLE);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { timestamp: number };
      if (Date.now() - parsed.timestamp < RETURN_WINDOW_MS) {
        sessionStorage.removeItem(SS_LAST_ARTICLE);
        triggeredRef.current = true;
        const t = setTimeout(tryShow, 1500);
        return () => clearTimeout(t);
      }
    } catch {}
  }, [pathname, isArticleDetail, tryShow]);

  // トリガー(C): 累積3記事閲覧したユーザー（一覧系ページに来たタイミングで判定）
  useEffect(() => {
    if (isArticleDetail) return;
    if (triggeredRef.current) return;
    try {
      const raw = localStorage.getItem(LS_VIEW_LOG);
      if (!raw) return;
      const data = JSON.parse(raw) as { date?: string; slugs?: string[] };
      if (data.date === todayKey() && (data.slugs?.length ?? 0) >= ARTICLE_THRESHOLD) {
        triggeredRef.current = true;
        const t = setTimeout(tryShow, 2000);
        return () => clearTimeout(t);
      }
    } catch {}
  }, [pathname, isArticleDetail, tryShow]);

  // トリガー(B): 離脱意図
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
      // デスクトップ: マウスが画面上端を超えたら
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !triggeredRef.current) {
          triggeredRef.current = true;
          tryShow();
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }

    // モバイル: 高速スクロールアップ（戻ろうとする動作）を検知
    let lastY = window.scrollY;
    let lastTime = Date.now();
    const handleScroll = () => {
      const now = Date.now();
      const dy = lastY - window.scrollY;
      const dt = now - lastTime;
      if (dy > 180 && dt < 250 && window.scrollY < 200 && !triggeredRef.current) {
        triggeredRef.current = true;
        tryShow();
      }
      lastY = window.scrollY;
      lastTime = now;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tryShow]);

  // ESCキーで閉じる
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close]);

  if (!open) return null;

  const copy = getCopy(locale, siteName);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={copy.ariaLabel}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
      }}
    >
      <div
        onClick={close}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.45)",
          opacity: closing ? 0 : 1,
          transition: "opacity 280ms ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          borderTop: "1px solid var(--border-subtle)",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: "16px 22px 28px",
          boxShadow: "0 -10px 50px rgba(0, 0, 0, 0.35)",
          transform: closing ? "translateY(100%)" : "translateY(0)",
          transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          maxHeight: "85vh",
          overflowY: "auto",
          maxWidth: 560,
          margin: "0 auto",
          willChange: "transform",
        }}
      >
        {/* グラブハンドル（モバイル感） */}
        <div
          aria-hidden="true"
          style={{
            width: 38,
            height: 4,
            background: "var(--border-hover)",
            borderRadius: 2,
            margin: "0 auto 18px",
            opacity: 0.6,
          }}
        />
        <h2
          style={{
            fontSize: 17,
            fontWeight: 600,
            margin: "0 0 12px",
            color: "var(--text-primary)",
            letterSpacing: "0.01em",
          }}
        >
          {copy.headline}
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.75,
            margin: "0 0 12px",
            color: "var(--text-muted)",
          }}
        >
          {copy.body}
        </p>
        <p
          style={{
            fontSize: 12,
            lineHeight: 1.65,
            margin: "0 0 20px",
            color: "var(--text-dim)",
          }}
        >
          {copy.note}
        </p>
        <div
          style={{
            display: "grid",
            gap: 10,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Link
            href={localePath(locale, "/membership")}
            onClick={close}
            style={{
              padding: "12px 14px",
              background: "var(--accent-coral)",
              color: "var(--bg-primary)",
              borderRadius: 10,
              textAlign: "center",
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            {copy.membership}
          </Link>
          <Link
            href={localePath(locale, "/support")}
            onClick={close}
            style={{
              padding: "12px 14px",
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 10,
              textAlign: "center",
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            {copy.support}
          </Link>
        </div>
        <button
          onClick={close}
          aria-label={copy.close}
          style={{
            width: "100%",
            marginTop: 14,
            padding: "10px",
            background: "transparent",
            border: "none",
            fontSize: 12,
            color: "var(--text-faint)",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          {copy.close}
        </button>
      </div>
    </div>
  );
}
