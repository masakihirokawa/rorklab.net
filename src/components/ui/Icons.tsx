// 線画アイコン（2026-10-09・dolice.net／受託サイトの「絵文字でなく線画 SVG」に揃える）。
// 色は currentColor。文字グリフ（♥ ⌕ ☰ × ☀ ☾ ↑）は端末フォントで太さ・位置が揃わなかったので置き換えた。
type IconName = "heart" | "search" | "menu" | "close" | "sun" | "moon" | "arrowUp";

const PATHS: Record<IconName, React.ReactNode> = {
  heart: <path d="M12 20.5s-7.5-4.4-7.5-10.1A4.2 4.2 0 0 1 12 7.9a4.2 4.2 0 0 1 7.5 2.5c0 5.7-7.5 10.1-7.5 10.1z" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </>
  ),
  moon: <path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
};

export function Icon({ name, size = 16, strokeWidth = 1.6 }: { name: IconName; size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flexShrink: 0 }}
    >
      {PATHS[name]}
    </svg>
  );
}
