"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";
import { Icon } from "@/components/ui/Icons";

let vtGen = 0;
let vtTimer = 0;

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
    // 連打の保険（Neo Vidro から移植・2026-10-27）: 前の遷移の終わりが次の遷移の途中で vt-theme を外す／
    // 遷移が飛ばされて finished が来ず vt-theme（= 全 transition 停止）が残る、の両方を世代番号と 1.4 秒の保険で防ぐ
    const g = ++vtGen;
    root.classList.add("vt-theme");
    window.clearTimeout(vtTimer);
    const end = () => {
      if (g !== vtGen) return;
      window.clearTimeout(vtTimer);
      root.classList.remove("vt-theme");
    };
    vtTimer = window.setTimeout(end, 1400);
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
      <Icon name={isDark ? "sun" : "moon"} size={15} />
    </button>
  );
}
