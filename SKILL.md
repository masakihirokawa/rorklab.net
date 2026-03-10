# Claude Lab サイト構築テンプレート — SKILL.md

このスキルファイルは claudelab.net の構築手順・アーキテクチャ・運用方法をまとめたものです。
同じ雛形で新しいナレッジベースサイト（例: Antigravity Lab）を立ち上げる際のリファレンスとして使えます。

---

## アーキテクチャ概要

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router, Turbopack) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS 4 + CSS Variables (ダーク/ライト対応) |
| i18n | next-intl v4（ja / en） |
| コンテンツ | MDX → ビルド時にJSONへプリコンパイル |
| ホスティング | Cloudflare Pages（OpenNext アダプター） |
| 決済 | Stripe Checkout Sessions（サブスクリプション） |
| 分析 | Google Analytics (gtag.js) |
| OGP | Next.js ImageResponse — favicon ベースで全ページ共通 |
| 検索 | クライアントサイド検索（タグ・タイトル・説明文のスコアベースランキング） |
| RSS | /feed.xml (ja), /en/feed.xml (en) — 最新50件 |
| サイトマップ | 動的生成（hreflang付き、記事・ブログ・静的ページ） |

---

## サイト規模（2026-03-09 現在）

- 記事: 45本 × 2言語 = 90エントリ
- ブログ: 3本 × 2言語 = 6エントリ
- カテゴリ: claude-ai (11), claude-code (14), cowork (13), api-sdk (7)

---

## ディレクトリ構成

```
├── content/
│   ├── articles/
│   │   ├── ja/{category}/{slug}.mdx    # 日本語記事
│   │   └── en/{category}/{slug}.mdx    # 英語記事
│   └── blog/
│       ├── ja/{slug}.mdx
│       └── en/{slug}.mdx
├── public/
│   ├── icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png
│   ├── favicon-16.png, favicon-32.png, favicon-48.png
│   ├── robots.txt                      # Sitemap + RSS 参照、AI クローラー許可
│   └── llms.txt                        # LLM アクセス情報
├── scripts/
│   └── generate-content.mjs           # MDX → JSON プリコンパイル
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # ルートレイアウト（メタデータ基盤）
│   │   ├── globals.css                 # テーマ変数 + 記事スタイル
│   │   ├── sitemap.ts                  # 動的サイトマップ（hreflang付き）
│   │   ├── not-found.tsx
│   │   ├── feed.xml/route.ts           # RSS フィード（日本語）
│   │   ├── en/feed.xml/route.ts        # RSS フィード（英語）
│   │   ├── [locale]/
│   │   │   ├── layout.tsx              # ロケール別レイアウト（GA, フォント, テーマ, RSS link）
│   │   │   ├── page.tsx                # ホームページ（JSON-LD WebSite schema）
│   │   │   ├── HomeClient.tsx          # ホームページUI（クライアント）
│   │   │   ├── opengraph-image.tsx     # 全ページ共通 OGP 画像（favicon ベース）
│   │   │   ├── articles/
│   │   │   │   ├── page.tsx            # 記事一覧（ページネーション + カテゴリフィルター）
│   │   │   │   └── [category]/
│   │   │   │       ├── page.tsx        # カテゴリ別一覧
│   │   │   │       └── [slug]/
│   │   │   │           └── page.tsx    # 記事詳細（TOC, シェア, 関連記事）
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── guides/page.tsx
│   │   │   ├── support/page.tsx        # サポートページ（Ko-fi, PayPal, Wise, Revolut）
│   │   │   ├── privacy/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   └── tokusho/page.tsx
│   │   └── api/
│   │       ├── checkout/route.ts       # Stripe Checkout Session 作成
│   │       ├── customer-portal/route.ts # Stripe Customer Portal
│   │       └── search-data/route.ts    # 検索用 JSON API（タグ・レベル含む）
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # 固定ヘッダー（検索, テーマ, 言語, ♥サポート）
│   │   │   ├── Footer.tsx
│   │   │   ├── LocaleSwitcher.tsx      # 言語切り替え
│   │   │   ├── ThemeProvider.tsx        # ダーク/ライトモード
│   │   │   └── ThemeToggle.tsx
│   │   ├── mdx/
│   │   │   ├── Callout.tsx             # info/warning/tip/danger
│   │   │   └── mdx-components.tsx
│   │   └── ui/
│   │       ├── ArticlePagination.tsx   # ページネーション（← 1 2 3 ... →）
│   │       ├── BookRecommendation.tsx  # Amazon アソシエイト書籍
│   │       ├── GrainOverlay.tsx        # フィルムグレインエフェクト
│   │       ├── LevelBadge.tsx          # 初級/中級/上級バッジ
│   │       ├── NewsTicker.tsx          # 画面上部のスクロールニュース
│   │       ├── PremiumPaywall.tsx      # 有料記事のペイウォール
│   │       ├── RelatedArticles.tsx     # 関連記事（スコアベース: カテゴリ+3, タグ+2）
│   │       ├── ScrollToTop.tsx         # フローティング「トップへ戻る」ボタン
│   │       ├── SearchModal.tsx         # 検索モーダル（タグ検索, キーボード操作, ハイライト）
│   │       ├── ShareButtons.tsx        # X / はてブ / LINE シェア
│   │       └── TableOfContents.tsx     # 目次自動生成（h2/h3, IntersectionObserver）
│   ├── generated/
│   │   ├── articles.json               # プリコンパイル済み記事データ
│   │   └── blog.json                   # プリコンパイル済みブログデータ
│   ├── i18n/
│   │   ├── config.ts, routing.ts, request.ts, navigation.ts
│   │   └── messages/{ja,en}.json       # UIテキスト翻訳
│   ├── lib/
│   │   └── content.ts                  # 記事・ブログ取得API
│   └── middleware.ts                   # next-intl ミドルウェア（※ OpenNext が proxy 未対応のため維持）
├── wrangler.toml                       # Cloudflare Workers 設定
├── open-next.config.ts                 # OpenNext アダプター設定
├── SKILL.md                            # ← このファイル
├── CONTENT_LOG.md                      # 全記事・ブログの管理ログ
├── REMAINING_TASKS.md                  # 残タスクリスト
└── package.json
```

---

## 新規サイト立ち上げ手順

### 1. プロジェクト初期化

```bash
npx create-next-app@latest {site-name} --typescript --tailwind --app --src-dir
cd {site-name}
npm install next-intl@^4 gray-matter unified remark-parse remark-rehype rehype-raw rehype-stringify stripe
npm install -D rehype-pretty-code shiki @opennextjs/cloudflare wrangler
```

### 2. i18n セットアップ（next-intl v4）

- `src/i18n/routing.ts` — ロケール定義（`['ja', 'en']`, defaultLocale: `'ja'`）
- `src/i18n/request.ts` — リクエストごとのロケール解決
- `src/middleware.ts` — next-intl のミドルウェア設定
- `src/i18n/messages/{ja,en}.json` — UI翻訳テキスト
- `src/app/[locale]/layout.tsx` — ロケールに応じた `<html lang>`

### 3. コンテンツシステム

**MDX 記事のフロントマター:**
```yaml
---
title: "記事タイトル"
slug: "url-slug"
category: "category-name"
level: "beginner|intermediate|advanced"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DDTHH:MM"   # ソート優先度制御（任意）
author: "サイト名"
description: "メタディスクリプション"
tags: ["tag1", "tag2"]
premium: false  # 有料記事の場合 true
---
```

**ソートルール:** `updated` フィールドがあればそれを優先、なければ `date`。同日の記事は `updated` のタイムスタンプで順序を制御する。

**プリコンパイル:** `scripts/generate-content.mjs` で MDX を HTML に変換し `src/generated/articles.json` に出力。ビルド時に自動実行（`prebuild` スクリプト）。

**カテゴリ定義:** `src/lib/content.ts` の `CATEGORIES` 配列でアイコン・カラーを設定。

### 4. テーマシステム（ダーク/ライト）

- CSS Variables で全色をテーマ対応（`globals.css`）
- `ThemeProvider` + `ThemeToggle` で localStorage ベースの切り替え
- FOUC 防止のブロッキングスクリプトを `<head>` に挿入

### 5. OGP 画像

`src/app/[locale]/opengraph-image.tsx` に全ページ共通の OGP 画像を配置。favicon の「C」ロゴベースのシンプルなデザイン（1200×630px）。`ImageResponse` で動的生成。

※ 記事・ブログ個別の OGP 画像は削除済み。全ページが共通画像を継承する。

### 6. SEO 設定

- `src/app/layout.tsx` — ベースメタデータ（keywords, robots, authors）
- `src/app/[locale]/page.tsx` — ロケール別メタデータ + JSON-LD (WebSite + FAQPage)
- 記事ページ — JSON-LD (Article + BreadcrumbList) + hreflang alternates
- `src/app/sitemap.ts` — 動的サイトマップ（hreflang, 記事実日付, ブログ含む）
- `public/robots.txt` — Allow: / + Sitemap + RSS 参照 + AI クローラー許可
- RSS フィード — `/feed.xml` (ja), `/en/feed.xml` (en)
- `<head>` に RSS alternate link

### 7. Cloudflare Pages デプロイ

```bash
# ビルド
npx opennextjs-cloudflare build

# デプロイ（GitHub連携推奨）
git push origin main  # Cloudflare Pages が自動デプロイ

# 手動デプロイ（環境変数 CLOUDFLARE_API_TOKEN が必要）
CLOUDFLARE_API_TOKEN=xxx npx wrangler pages deploy .open-next/assets --project-name={project-name}
```

**Cloudflare Pages 設定:**
- Build command: `npx opennextjs-cloudflare build`
- Build output directory: `.open-next/assets`
- 環境変数: STRIPE_SECRET_KEY, STRIPE_PRICE_ID（必要に応じて）

### 8. Stripe 統合

- `src/app/api/checkout/route.ts` — Checkout Session 作成（subscription mode）
- `src/app/api/customer-portal/route.ts` — Customer Portal リダイレクト
- `PremiumPaywall.tsx` — 有料記事のペイウォール UI

### 9. Google Analytics

`src/app/[locale]/layout.tsx` の `<head>` に gtag.js を配置:
```tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} />
```

---

## 日常運用

### 記事の追加

1. `content/articles/{locale}/{category}/{slug}.mdx` を作成（ja + en）
2. `node scripts/generate-content.mjs` で JSON 再生成
3. `npx opennextjs-cloudflare build` でビルド
4. `git push origin main` でデプロイ

### ニュースティッカーの更新

`src/components/ui/NewsTicker.tsx` の `NEWS_ITEMS` オブジェクトを編集。

### 自動更新（スケジュールタスク）

`claudelab-daily-content` タスクが毎日 9:00 / 12:00 / 15:00 / 21:00 に実行:
- `_reference_keywords` の優先キーワードから記事テーマを選択
- `_reference_urls` の参考URLから最新情報を取得
- 2-4 本の記事を日英で自動生成（2000-4000語、FAQ付き）
- `updated` フィールドを付与してソート順を制御
- ニュースティッカーを最新情報に更新
- ビルド → Git push → デプロイ確認

---

## 新サイト作成時のカスタマイズポイント

新しいナレッジベース（例: antigravitylab.net）を作る場合:

1. **CATEGORIES** を変更 — サイトのテーマに合わせたカテゴリ定義（`src/lib/content.ts`）
2. **カラーパレット** — `globals.css` の CSS Variables を差し替え
3. **フォント** — layout.tsx の Google Fonts URL を変更
4. **OGP デザイン** — `opengraph-image.tsx` のロゴ文字・カラー・グラデーション
5. **favicon** — SVG → Pillow 等で全サイズを生成（16, 32, 48, 192, 512, apple-touch-icon）
6. **i18n メッセージ** — `src/i18n/messages/` のUI翻訳テキスト
7. **BookRecommendation** — Amazon Associates のストアID変更
8. **Stripe** — 新しい Product / Price を作成
9. **Google Analytics** — 新しいプロパティの測定ID
10. **RSS フィード** — `feed.xml/route.ts` のサイト名・説明文を変更
11. **robots.txt** — Sitemap URL を新ドメインに
12. **wrangler.toml** — プロジェクト名を変更
13. **スケジュールタスク** — 新サイト用のキーワードリスト・参考URLに差し替え

コア構造（App Router, MDX システム, コンテンツAPI, 検索, ページネーション, SEO 基盤, RSS, サイトマップ, Cloudflare デプロイ）はそのまま再利用可能です。

---

## 技術スタック詳細

| パッケージ | バージョン | 用途 |
|---|---|---|
| next | 16.1.6 | フレームワーク |
| react / react-dom | 19.2.3 | UI ライブラリ |
| next-intl | ^4.8.3 | i18n |
| gray-matter | ^4.0.3 | MDX フロントマター解析 |
| unified + remark + rehype | ^11 | MDX → HTML 変換 |
| rehype-pretty-code + shiki | | コードハイライト |
| stripe | ^20.4.1 | 決済 |
| @opennextjs/cloudflare | ^1.17.1 | Cloudflare Pages アダプター |
| tailwindcss | ^4 | スタイル |
| wrangler | ^4.71.0 | Cloudflare CLI |
