// カテゴリカードのアイコン（線画 SVG・2026-10-15）。
// 以前は文字グリフ（◉ ⟐ ◈ ⬡ ✦ ⚡ ◆ ▣ ◇）を font-size で並べていたが、端末フォントごとに大きさ・太さが揃わず
// （⟐ だけ極端に小さい・⚡ は色付き絵文字になる等）、カードごとにばらついていた。同じ 24 グリッド・同じ線の太さで描き直した。色は currentColor。
const SHAPES: Record<string, React.ReactNode> = {
  "◉": (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" /></>),
  "⟐": (<><path d="M12 3l9 9-9 9-9-9z" /><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" /></>),
  "◈": (<><path d="M12 3l9 9-9 9-9-9z" /><path d="M12 8.2l3.8 3.8-3.8 3.8-3.8-3.8z" fill="currentColor" stroke="none" /></>),
  "⬡": <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z" />,
  "✦": <path d="M12 2.8c.7 5.4 3.8 8.5 9.2 9.2-5.4.7-8.5 3.8-9.2 9.2-.7-5.4-3.8-8.5-9.2-9.2 5.4-.7 8.5-3.8 9.2-9.2z" />,
  "⚡": <path d="M13.2 2.8L5.5 13.2h5.6l-1 8 7.7-10.5h-5.6z" />,
  "◆": <path d="M12 3l9 9-9 9-9-9z" fill="currentColor" fillOpacity="0.25" />,
  "▣": (<><rect x="3.8" y="3.8" width="16.4" height="16.4" rx="2.4" /><rect x="8.2" y="8.2" width="7.6" height="7.6" rx="1" fill="currentColor" stroke="none" /></>),
  "◇": <path d="M12 3l9 9-9 9-9-9z" />,
};

export function CategoryGlyph({ glyph, size = 30 }: { glyph: string; size?: number }) {
  const shape = SHAPES[glyph];
  if (!shape) return <span aria-hidden="true">{glyph}</span>;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {shape}
    </svg>
  );
}
