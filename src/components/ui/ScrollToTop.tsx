"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icons";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2026-10-09: 見出しの #section-N を URL から落とす（再読込・共有で章へ飛ばない。dolice.net §36 と同じ）。
  // behavior は渡さず html{scroll-behavior:smooth} に任せる＝モーション低減の端末では即時になる
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
    if (location.hash) {
      try {
        history.replaceState(history.state, "", location.pathname + location.search);
      } catch {
        /* noop */
      }
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scroll-top-btn"
      tabIndex={visible ? 0 : -1}
      style={{
        position: "fixed",
        bottom: "var(--floating-bottom, 28px)",
        zIndex: 50,
        width: 44,
        height: 44,
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <Icon name="arrowUp" size={18} />
    </button>
  );
}
