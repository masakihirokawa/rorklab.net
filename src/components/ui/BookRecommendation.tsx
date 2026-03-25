"use client";

import { useState, useEffect } from "react";

interface Book {
  title: string;
  author: string;
  url: string;
  tag: string;
  topics: string[];
}

const BOOKS: Record<string, Book[]> = {
  ja: [
    // ── LLM / AI 基礎 ──
    {
      title: "大規模言語モデル入門",
      author: "山田育矢",
      url: "https://www.amazon.co.jp/dp/B0D1KLJPYJ/?tag=pinocchio-22",
      tag: "LLM開発",
      topics: ["ai", "llm", "api"],
    },
    {
      title: "生成AIプロンプトエンジニアリング入門",
      author: "我妻幸長",
      url: "https://www.amazon.co.jp/dp/4798181986/?tag=pinocchio-22",
      tag: "プロンプト",
      topics: ["ai", "prompt", "beginner"],
    },
    {
      title: "データサイエンス入門",
      author: "上田雅夫",
      url: "https://www.amazon.co.jp/dp/4641166110/?tag=pinocchio-22",
      tag: "AI入門",
      topics: ["ai", "data", "beginner"],
    },
    {
      title: "AIエージェント開発／運用入門",
      author: "御田稔・大坪悠・塚田真規",
      url: "https://www.amazon.co.jp/dp/4815636605/?tag=pinocchio-22",
      tag: "エージェント",
      topics: ["ai", "agent", "dev"],
    },
    {
      title: "生成AIプロンプトエンジニア検定 2026年度版",
      author: "生成AIプロンプト研究所",
      url: "https://www.amazon.co.jp/dp/4911384093/?tag=pinocchio-22",
      tag: "資格",
      topics: ["ai", "prompt", "beginner"],
    },
    {
      title: "実践Claude Code入門",
      author: "西見公宏・吉田真吾・大嶋勇樹",
      url: "https://www.amazon.co.jp/dp/4297153548/?tag=pinocchio-22",
      tag: "Claude Code",
      topics: ["ai", "dev", "agent"],
    },
    {
      title: "生成AIのプロンプトエンジニアリング",
      author: "James Phoenix・Mike Taylor（訳:田村広平）",
      url: "https://www.amazon.co.jp/dp/4814401248/?tag=pinocchio-22",
      tag: "プロンプト",
      topics: ["ai", "prompt", "dev"],
    },
    // ── プログラミング / 開発 ──
    {
      title: "プロを目指す人のためのTypeScript入門",
      author: "鈴木僚太",
      url: "https://www.amazon.co.jp/dp/4297127474/?tag=pinocchio-22",
      tag: "TypeScript",
      topics: ["dev", "typescript", "frontend"],
    },
    {
      title: "これからはじめるReact実践入門",
      author: "山田祥寛",
      url: "https://www.amazon.co.jp/dp/4815619484/?tag=pinocchio-22",
      tag: "React",
      topics: ["dev", "react", "frontend"],
    },
    {
      title: "実践Next.js — App Routerで進化するWebアプリ開発",
      author: "吉井健文",
      url: "https://www.amazon.co.jp/dp/4297140616/?tag=pinocchio-22",
      tag: "Next.js",
      topics: ["dev", "react", "frontend", "nextjs"],
    },
    {
      title: "Web API設計実践入門",
      author: "柴田芳樹",
      url: "https://www.amazon.co.jp/dp/4297142937/?tag=pinocchio-22",
      tag: "API設計",
      topics: ["dev", "api", "backend"],
    },
    {
      title: "Python実践データ分析100本ノック 第3版",
      author: "下山輝昌・松田雄馬・三木孝行",
      url: "https://www.amazon.co.jp/dp/4798075663/?tag=pinocchio-22",
      tag: "Python",
      topics: ["dev", "python", "data"],
    },
    // ── インフラ / DevOps ──
    {
      title: "Web開発者のための入門 Cloudflare Workers",
      author: "福岡秀一郎（syumai）他",
      url: "https://www.amazon.co.jp/dp/4297154382/?tag=pinocchio-22",
      tag: "Cloudflare",
      topics: ["dev", "infra", "cloudflare"],
    },
    {
      title: "GitHub Actions実践入門",
      author: "宮田淳平",
      url: "https://www.amazon.co.jp/dp/4844378716/?tag=pinocchio-22",
      tag: "CI/CD",
      topics: ["dev", "infra", "cicd"],
    },
    {
      title: "GitHub CI/CD実践ガイド",
      author: "野村友規",
      url: "https://www.amazon.co.jp/dp/4297141736/?tag=pinocchio-22",
      tag: "CI/CD",
      topics: ["dev", "infra", "cicd"],
    },
    // ── AI応用 / ビジネス ──
    {
      title: "コンテキストエンジニアリング",
      author: "蒲生弘郷",
      url: "https://www.amazon.co.jp/dp/4297154196/?tag=pinocchio-22",
      tag: "LLM応用",
      topics: ["ai", "llm", "agent", "dev"],
    },
    {
      title: "AWSではじめるMCP実践ガイド",
      author: "塚田真規・森田和明",
      url: "https://www.amazon.co.jp/dp/4297154587/?tag=pinocchio-22",
      tag: "MCP",
      topics: ["ai", "agent", "api", "dev"],
    },
    {
      title: "Amazon Bedrock 生成AIアプリ開発入門",
      author: "御田稔・熊田寛・森田和明",
      url: "https://www.amazon.co.jp/dp/4815626448/?tag=pinocchio-22",
      tag: "生成AI",
      topics: ["ai", "dev", "api"],
    },
  ],
  en: [
    // ── LLM / AI ──
    {
      title: "Build a Large Language Model (From Scratch)",
      author: "Sebastian Raschka",
      url: "https://www.amazon.co.jp/dp/1633437167/?tag=pinocchio-22",
      tag: "LLM Dev",
      topics: ["ai", "llm", "dev"],
    },
    {
      title: "Prompt Engineering for LLMs",
      author: "Berryman & Ziegler",
      url: "https://www.amazon.co.jp/dp/1098156153/?tag=pinocchio-22",
      tag: "Prompting",
      topics: ["ai", "prompt", "dev"],
    },
    {
      title: "AI Engineering",
      author: "Chip Huyen",
      url: "https://www.amazon.co.jp/dp/1098166302/?tag=pinocchio-22",
      tag: "AI Eng",
      topics: ["ai", "llm", "dev"],
    },
    {
      title: "Hands-On Machine Learning (3rd ed.)",
      author: "Aurélien Géron",
      url: "https://www.amazon.co.jp/dp/1098125975/?tag=pinocchio-22",
      tag: "ML",
      topics: ["ai", "data", "python"],
    },
    {
      title: "Designing Multi-Agent Systems",
      author: "Victor Dibia",
      url: "https://www.amazon.co.jp/s?k=Designing+Multi-Agent+Systems+Dibia&tag=pinocchio-22",
      tag: "Agents",
      topics: ["ai", "agent", "dev"],
    },
    {
      title: "Prompt Engineering for Generative AI",
      author: "James Phoenix & Mike Taylor",
      url: "https://www.amazon.co.jp/dp/109815343X/?tag=pinocchio-22",
      tag: "Prompting",
      topics: ["ai", "prompt", "beginner"],
    },
    // ── Development ──
    {
      title: "Effective TypeScript (2nd ed.)",
      author: "Dan Vanderkam",
      url: "https://www.amazon.co.jp/dp/1098155068/?tag=pinocchio-22",
      tag: "TypeScript",
      topics: ["dev", "typescript", "frontend"],
    },
    {
      title: "AI Agents and Applications",
      author: "Roberto Infante",
      url: "https://www.amazon.co.jp/dp/1633436543/?tag=pinocchio-22",
      tag: "AI Agents",
      topics: ["ai", "agent", "dev", "api"],
    },
    {
      title: "Building AI Agents with LLMs, RAG, and Knowledge Graphs",
      author: "Salvatore Raieli & Gabriele Iuculano",
      url: "https://www.amazon.co.jp/dp/183508706X/?tag=pinocchio-22",
      tag: "RAG/Agents",
      topics: ["ai", "agent", "llm", "data"],
    },
    {
      title: "Web Development with Node and Express (2nd ed.)",
      author: "Ethan Brown",
      url: "https://www.amazon.co.jp/dp/1492053511/?tag=pinocchio-22",
      tag: "Node.js",
      topics: ["dev", "backend", "frontend"],
    },
    // ── Architecture / System Design ──
    {
      title: "System Design Interview",
      author: "Alex Xu",
      url: "https://www.amazon.co.jp/dp/B08CMF2CQF/?tag=pinocchio-22",
      tag: "System Design",
      topics: ["dev", "infra", "backend"],
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      url: "https://www.amazon.co.jp/dp/1449373321/?tag=pinocchio-22",
      tag: "Architecture",
      topics: ["dev", "infra", "backend", "data"],
    },
    {
      title: "The Pragmatic Programmer (20th Anniversary)",
      author: "Hunt & Thomas",
      url: "https://www.amazon.co.jp/dp/0135957052/?tag=pinocchio-22",
      tag: "Classic",
      topics: ["dev", "beginner"],
    },
    // ── Additional titles ──
    {
      title: "Building AI-Powered Products",
      author: "Marily Nika",
      url: "https://www.amazon.co.jp/dp/B0DX84DPF8/?tag=pinocchio-22",
      tag: "AI Product",
      topics: ["ai", "business", "beginner"],
    },
    {
      title: "System Design Interview – Vol. 2",
      author: "Alex Xu & Sahn Lam",
      url: "https://www.amazon.co.jp/dp/1736049119/?tag=pinocchio-22",
      tag: "System Design",
      topics: ["dev", "infra", "backend"],
    },
  ],
};

// Category → topic mapping for relevance scoring
const CATEGORY_TOPICS: Record<string, string[]> = {
  // Claude Lab
  "claude-ai": ["ai", "llm", "prompt"],
  "claude-code": ["dev", "typescript", "frontend", "infra"],
  cowork: ["ai", "agent", "prompt"],
  "api-sdk": ["api", "dev", "llm", "backend"],
  // Rork Lab
  "app-dev": ["dev", "react", "frontend", "typescript"],
  "rork-ai": ["ai", "agent", "prompt"],
  "rork-basics": ["dev", "beginner", "react"],
  "rork-business": ["business", "ai", "beginner"],
  "rork-dev": ["dev", "typescript", "api", "backend"],
  // Gemini Lab
  "gemini-basics": ["ai", "prompt", "beginner"],
  "gemini-advanced": ["ai", "llm", "dev"],
  "gemini-api": ["api", "dev", "ai", "llm"],
  "gemini-dev": ["dev", "typescript", "api"],
  "gemini-updates": ["ai", "llm"],
  "gemini-workspace": ["ai", "business", "beginner"],
  // Antigravity Lab
  antigravity: ["ai", "llm", "agent"],
  agents: ["agent", "ai", "dev"],
  "ai-tools": ["ai", "prompt", "beginner"],
  editor: ["dev", "typescript", "frontend"],
  integrations: ["api", "dev", "infra"],
  tips: ["dev", "beginner"],
};

function pickBooks(allBooks: Book[], category?: string, count = 3): Book[] {
  const topics = category ? CATEGORY_TOPICS[category] || [] : [];

  if (topics.length === 0) {
    return shuffleAndPick(allBooks, count);
  }

  // Score each book by topic overlap
  const scored = allBooks.map((book) => ({
    book,
    score: book.topics.filter((t) => topics.includes(t)).length,
  }));

  // Split into relevant (score > 0) and others
  const relevant = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  const others = scored.filter((s) => s.score === 0);

  // Pick 2 relevant (shuffled among top matches) + 1 random from others
  const topScore = relevant.length > 0 ? relevant[0].score : 0;
  const topMatches = relevant.filter((s) => s.score >= topScore - 1);
  const picked = shuffleAndPick(topMatches, Math.min(2, topMatches.length)).map((s) => s.book);

  if (picked.length < count) {
    const remaining = [...shuffleAndPick(relevant.filter((s) => !picked.includes(s.book)), count - picked.length - 1).map((s) => s.book), ...shuffleAndPick(others, count - picked.length).map((s) => s.book)];
    picked.push(...remaining.slice(0, count - picked.length));
  }

  return picked.slice(0, count);
}

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
  category?: string;
}

export function BookRecommendation({ locale, category }: BookRecommendationProps) {
  const allBooks = BOOKS[locale] || BOOKS.ja;
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(pickBooks(allBooks, category, 3));
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
          href={`/${locale === "en" ? "en/" : ""}articles/rork-ai/recommended-books`}
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
