"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 32, height: 32 }} />;

  const isDark = theme === "dark";

  // テーマ切替: 押したボタンから新しいテーマが円く広がる（View Transitions・2026-10-02 dolice.net ほかと揃える）。
  // next-themes は属性の反映が次の描画になるので、切り出しの前に data-theme を自分で書いてから setTheme で保存させる。
  // 非対応ブラウザ・モーション低減では即時。見た目は globals.css「テーマ切替」
  function switchTheme(next: string, e: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const apply = () => {
      root.setAttribute("data-theme", next);
      setTheme(next);
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const far = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${far}px`);
    root.classList.add("vt-theme");
    const end = () => root.classList.remove("vt-theme");
    try {
      doc.startViewTransition(apply).finished.then(end, end);
    } catch {
      end();
      apply();
    }
  }

  return (
    <button
      onClick={(e) => switchTheme(isDark ? "light" : "dark", e)}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="header-icon-btn"
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
        color: "var(--text-muted)",
        cursor: "pointer",
        transition: "all 0.3s",
        fontSize: 14,
      }}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
