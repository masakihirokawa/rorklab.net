"use client";

import { useState, useEffect } from "react";

interface Book {
  title: string;
  author: string;
  url: string;
  tag: string;
}

const BOOKS: Record<string, Book[]> = {
  ja: [
    // LLM / AI 基礎
    {
      title: "大規模言語モデル入門",
      author: "山田育矢",
      url: "https://www.amazon.co.jp/dp/B0D1KLJPYJ?tag=pinocchio-22",
      tag: "LLM開発",
    },
    {
      title: "生成AIプロンプトエンジニアリング入門",
      author: "我妻幸長",
      url: "https://www.amazon.co.jp/s?k=%E7%94%9F%E6%88%90AI%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%83%AA%E3%83%B3%E3%82%B0%E5%85%A5%E9%96%80&tag=pinocchio-22",
      tag: "プロンプト",
    },
    {
      title: "AI・データサイエンスの全体像",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=AI+%E3%83%87%E3%83%BC%E3%82%BF%E3%82%B5%E3%82%A4%E3%82%A8%E3%83%B3%E3%82%B9+%E5%85%A5%E9%96%80+2025&tag=pinocchio-22",
      tag: "AI入門",
    },
    // プログラミング / 開発
    {
      title: "プロを目指す人のためのTypeScript入門",
      author: "鈴木僚太",
      url: "https://www.amazon.co.jp/s?k=%E3%83%97%E3%83%AD%E3%82%92%E7%9B%AE%E6%8C%87%E3%81%99%E4%BA%BA%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AETypeScript%E5%85%A5%E9%96%80&tag=pinocchio-22",
      tag: "TypeScript",
    },
    {
      title: "React実践入門",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=React+%E5%AE%9F%E8%B7%B5%E5%85%A5%E9%96%80+2025&tag=pinocchio-22",
      tag: "React",
    },
    {
      title: "実践Next.js — App Routerで進化するWebアプリ開発",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=%E5%AE%9F%E8%B7%B5Next.js+App+Router&tag=pinocchio-22",
      tag: "Next.js",
    },
    // API / バックエンド
    {
      title: "Web API設計実践入門",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=Web+API+%E8%A8%AD%E8%A8%88+%E5%AE%9F%E8%B7%B5+%E5%85%A5%E9%96%80&tag=pinocchio-22",
      tag: "API設計",
    },
    {
      title: "Python実践データ分析100本ノック",
      author: "下山輝昌",
      url: "https://www.amazon.co.jp/s?k=Python+%E5%AE%9F%E8%B7%B5%E3%83%87%E3%83%BC%E3%82%BF%E5%88%86%E6%9E%90+100%E6%9C%AC%E3%83%8E%E3%83%83%E3%82%AF&tag=pinocchio-22",
      tag: "Python",
    },
    // AI エージェント / 自動化
    {
      title: "AIエージェント入門 — 生成AIで変わるソフトウェア開発",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=AI%E3%82%A8%E3%83%BC%E3%82%B8%E3%82%A7%E3%83%B3%E3%83%88+%E5%85%A5%E9%96%80+%E7%94%9F%E6%88%90AI&tag=pinocchio-22",
      tag: "エージェント",
    },
    {
      title: "ChatGPT/Claudeで始めるAI活用術",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=ChatGPT+Claude+AI%E6%B4%BB%E7%94%A8&tag=pinocchio-22",
      tag: "AI活用",
    },
    // インフラ / DevOps
    {
      title: "Cloudflare Workers実践ガイド",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=Cloudflare+Workers+%E5%AE%9F%E8%B7%B5&tag=pinocchio-22",
      tag: "Cloudflare",
    },
    {
      title: "GitHub Actions実践入門",
      author: "各社刊行",
      url: "https://www.amazon.co.jp/s?k=GitHub+Actions+%E5%AE%9F%E8%B7%B5%E5%85%A5%E9%96%80&tag=pinocchio-22",
      tag: "CI/CD",
    },
  ],
  en: [
    // LLM / AI
    {
      title: "Build a Large Language Model (From Scratch)",
      author: "Sebastian Raschka",
      url: "https://www.amazon.co.jp/s?k=Build+Large+Language+Model+From+Scratch+Raschka&tag=pinocchio-22",
      tag: "LLM Dev",
    },
    {
      title: "Prompt Engineering for LLMs",
      author: "Berryman & Ziegler",
      url: "https://www.amazon.co.jp/s?k=Prompt+Engineering+for+LLMs+O%27Reilly&tag=pinocchio-22",
      tag: "Prompting",
    },
    {
      title: "Designing Multi-Agent Systems",
      author: "Victor Dibia",
      url: "https://www.amazon.co.jp/s?k=Designing+Multi-Agent+Systems+Dibia&tag=pinocchio-22",
      tag: "Agents",
    },
    // Development
    {
      title: "Effective TypeScript",
      author: "Dan Vanderkam",
      url: "https://www.amazon.co.jp/s?k=Effective+TypeScript+Vanderkam&tag=pinocchio-22",
      tag: "TypeScript",
    },
    {
      title: "Learning React: Modern Patterns",
      author: "Eve Porcello & Alex Banks",
      url: "https://www.amazon.co.jp/s?k=Learning+React+Modern+Patterns+O%27Reilly&tag=pinocchio-22",
      tag: "React",
    },
    {
      title: "The Art of Clean Code",
      author: "Christian Mayer",
      url: "https://www.amazon.co.jp/s?k=Art+of+Clean+Code+Mayer&tag=pinocchio-22",
      tag: "Clean Code",
    },
    // AI / ML
    {
      title: "AI Engineering",
      author: "Chip Huyen",
      url: "https://www.amazon.co.jp/s?k=AI+Engineering+Chip+Huyen&tag=pinocchio-22",
      tag: "AI Eng",
    },
    {
      title: "Hands-On Machine Learning (3rd ed.)",
      author: "Aurélien Géron",
      url: "https://www.amazon.co.jp/s?k=Hands+On+Machine+Learning+Geron+3rd&tag=pinocchio-22",
      tag: "ML",
    },
    // Infrastructure
    {
      title: "Web Development with Node and Express",
      author: "Ethan Brown",
      url: "https://www.amazon.co.jp/s?k=Web+Development+Node+Express+Brown&tag=pinocchio-22",
      tag: "Node.js",
    },
    {
      title: "System Design Interview",
      author: "Alex Xu",
      url: "https://www.amazon.co.jp/s?k=System+Design+Interview+Alex+Xu&tag=pinocchio-22",
      tag: "System Design",
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      url: "https://www.amazon.co.jp/s?k=Designing+Data+Intensive+Applications+Kleppmann&tag=pinocchio-22",
      tag: "Architecture",
    },
    {
      title: "The Pragmatic Programmer",
      author: "Hunt & Thomas",
      url: "https://www.amazon.co.jp/s?k=Pragmatic+Programmer+20th+Anniversary&tag=pinocchio-22",
      tag: "Classic",
    },
  ],
};

function shuffleAndPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

interface BookRecommendationProps {
  locale: string;
}

export function BookRecommendation({ locale }: BookRecommendationProps) {
  const allBooks = BOOKS[locale] || BOOKS.ja;
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(shuffleAndPick(allBooks, 3));
  }, []);

  // SSR fallback: show first 3
  const display = books.length > 0 ? books : allBooks.slice(0, 3);

  return (
    <div
      style={{
        marginTop: 60,
        padding: "24px 28px",
        borderRadius: 8,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 16 }}>📚</span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "var(--text-dim)",
            letterSpacing: "0.12em",
          }}
        >
          RECOMMENDED BOOKS
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {display.map((book) => (
          <a
            key={book.title}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-primary)",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {book.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{book.author}</div>
            </div>
            <span
              style={{
                flexShrink: 0,
                fontSize: 10,
                fontFamily: "'DM Mono', monospace",
                color: "var(--accent-coral)",
                padding: "2px 8px",
                borderRadius: 3,
                border: "1px solid color-mix(in srgb, var(--accent-coral) 20%, transparent)",
                letterSpacing: "0.04em",
              }}
            >
              {book.tag}
            </span>
          </a>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <div style={{ fontSize: 10, color: "var(--text-faint)", lineHeight: 1.5 }}>
          {locale === "ja"
            ? "※ アフィリエイトリンクを含みます"
            : "* Contains affiliate links"}
        </div>
        <a
          href={`/${locale === "en" ? "en/" : ""}articles/rork-ai`}
          style={{
            fontSize: 11,
            fontFamily: "'DM Mono', monospace",
            color: "var(--accent-coral)",
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "opacity 0.2s",
          }}
        >
          {locale === "ja" ? "もっと見る →" : "See all →"}
        </a>
      </div>
    </div>
  );
}
