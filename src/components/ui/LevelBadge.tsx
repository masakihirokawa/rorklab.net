"use client";

// 色は globals.css の .lvl 系クラス（2026-10-17: 一覧で数百個並ぶため、インライン style をやめて HTML と RSC を軽く）
const LEVEL_CLASS: Record<string, string> = {
  beginner: "lvl-b",
  intermediate: "lvl-i",
  advanced: "lvl-a",
  "intermediate-advanced": "lvl-i",
};

interface LevelBadgeProps {
  level: string;
  label: string;
}

export function LevelBadge({ level, label }: LevelBadgeProps) {
  return <span className={`lvl mono ${LEVEL_CLASS[level] || "lvl-i"}`}>{label}</span>;
}
