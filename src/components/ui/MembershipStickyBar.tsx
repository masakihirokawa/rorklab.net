"use client";

/**
 * MembershipStickyBar — 画面下部に固定表示される控えめなメンバーシップ導線
 *
 * 全画面を覆わないため、Google の intrusive interstitial（煩わしいインタースティシャル）
 * 判定の対象になりません。GSC 回復期でも安全に運用できます。
 *
 * 表示条件（すべて満たしたときのみ表示）:
 *  - 無料記事の詳細ページ（呼び出し側で premium 記事を除外）
 *  - 非会員（呼び出し側で canViewPremium を判定 ＋ 本コンポーネントで購入 Cookie も確認）
 *  - デスクトップ幅のみ（769px 以上）
 *  - 直近 7 日以内に閉じられていない
 *  - ページを 50% 以上スクロールした
 *  - 記事末尾の MembershipCTA が視界に入っていない（二重訴求の回避）
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface Props {
  locale: string;
  siteName: string;
}

const LS_DISMISSED_UNTIL = "membershipBarDismissedUntil";
const DISMISS_DAYS = 7;
const SCROLL_THRESHOLD = 0.5;
const DESKTOP_QUERY = "(min-width: 769px)";
const CTA_ANCHOR_ID = "membership-cta";
const BAR_OFFSET = "96px";

function getCopy(locale: string, siteName: string) {
  if (locale === "en") {
    return {
      lead: `${siteName} is ad-free — membership support keeps it running.`,
      sub: "Premium articles, a monthly Pro plan, and one-off tips are all available.",
      membership: "View Membership",
      support: "Support",
      close: "Dismiss",
      region: "Membership information",
    };
  }
  return {
    lead: `${siteName} は広告を掲載せず、メンバーシップのご支援で運営しております。`,
    sub: "プレミアム記事の閲覧、月額の Pro プラン、応援チップをご用意しています。",
    membership: "メンバーシップを見る",
    support: "サポート",
    close: "閉じる",
    region: "メンバーシップのご案内",
  };
}

function hasPurchaseCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("article_purchases=");
}

function dismissedRecently(): boolean {
  try {
    const until = Number(localStorage.getItem(LS_DISMISSED_UNTIL) || 0);
    return Number.isFinite(until) && Date.now() < until;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(
      LS_DISMISSED_UNTIL,
      String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000)
    );
  } catch {}
}

function track(event: string) {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", event, { event_category: "membership" });
  } catch {}
}

function localePath(locale: string, path: string): string {
  return locale === "ja" ? path : `/${locale}${path}`;
}

export function MembershipStickyBar({ locale, siteName }: Props) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const eligibleRef = useRef(false);
  const ctaInViewRef = useRef(false);
  const trackedRef = useRef(false);

  // ScrollToTop ボタンがバーに重ならないよう、表示中だけ持ち上げる
  useEffect(() => {
    const root = document.documentElement;
    if (visible) {
      root.style.setProperty("--floating-bottom", BAR_OFFSET);
      if (!trackedRef.current) {
        trackedRef.current = true;
        track("membership_bar_view");
      }
    } else {
      root.style.removeProperty("--floating-bottom");
    }
    return () => {
      root.style.removeProperty("--floating-bottom");
    };
  }, [visible]);

  // 表示資格の判定（デスクトップ・非購入者・7日以内に閉じていない）
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(DESKTOP_QUERY);
    const evaluate = () => {
      eligibleRef.current =
        mq.matches && !hasPurchaseCookie() && !dismissedRecently();
      if (!eligibleRef.current) setVisible(false);
    };
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  // 記事末尾の MembershipCTA が見えている間はバーを出さない（二重訴求の回避）
  useEffect(() => {
    const target = document.getElementById(CTA_ANCHOR_ID);
    if (!target || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        ctaInViewRef.current = entries.some((e) => e.isIntersecting);
        if (ctaInViewRef.current) setVisible(false);
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [mounted]);

  // スクロール量による表示判定
  useEffect(() => {
    const onScroll = () => {
      if (!eligibleRef.current) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = window.scrollY / scrollable;
      setVisible(ratio >= SCROLL_THRESHOLD && !ctaInViewRef.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  const dismiss = useCallback(() => {
    markDismissed();
    eligibleRef.current = false;
    setVisible(false);
    track("membership_bar_dismiss");
  }, []);

  if (!mounted) return null;

  const copy = getCopy(locale, siteName);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      role="region"
      aria-label={copy.region}
      aria-hidden={!visible}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        boxShadow: "0 -6px 28px rgba(0, 0, 0, 0.22)",
        backdropFilter: "saturate(140%) blur(8px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: reduceMotion || visible ? "translateY(0)" : "translateY(100%)",
        transition: reduceMotion
          ? "opacity 0.2s ease"
          : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease",
        willChange: "transform",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "14px 96px 14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            {copy.lead}
          </p>
          <p
            style={{
              margin: "3px 0 0",
              fontSize: 12,
              lineHeight: 1.6,
              color: "var(--text-dim)",
            }}
          >
            {copy.sub}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Link
            href={localePath(locale, "/membership")}
            onClick={() => track("membership_bar_click")}
            tabIndex={visible ? 0 : -1}
            style={{
              padding: "9px 18px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              color: "var(--accent-coral)",
              border: "1px solid color-mix(in srgb, var(--accent-coral) 45%, transparent)",
              background: "color-mix(in srgb, var(--accent-coral) 10%, transparent)",
            }}
          >
            {copy.membership}
          </Link>
          <Link
            href={localePath(locale, "/support")}
            onClick={() => track("membership_bar_support_click")}
            tabIndex={visible ? 0 : -1}
            style={{
              padding: "9px 14px",
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
              color: "var(--text-muted)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {copy.support}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label={copy.close}
            tabIndex={visible ? 0 : -1}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid transparent",
              background: "transparent",
              color: "var(--text-faint)",
              fontSize: 16,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
