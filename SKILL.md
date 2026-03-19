# Rork Lab サイト構築テンプレート — SKILL.md

このスキルファイルは rorklab.net の構築手順・アーキテクチャ・運用方法をまとめたものです。
同じ雛形で新しいナレッジベースサイトを立ち上げる際のリファレンスとして使えます。

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
| OGP | 静的 PNG（public/og/rorklab-og.png、1200×1200px）— 全ページ共通 |
| 検索 | クライアントサイド検索（タグ・タイトル・説明文のスコアベースランキング） |
| RSS | /feed.xml (ja), /en/feed.xml (en) — 最新50件 |
| サイトマップ | 動的生成（hreflang付き、記事・ブログ・静的ページ） |

---

## サイト規模（2026-03-20 現在）

- 記事: JA 130本 / EN 107本 = 237エントリ（うちプレミアム JA 33本 / EN 22本）
- ブログ: JA 8本 / EN 7本 = 15エントリ
- カテゴリ: rork-dev (78), rork-basics (19), rork-business (15), rork-ai (14), app-dev (4)

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
│   │   │   ├── HomeClient.tsx          # ホームページUI（クライアント）— 「すべての記事 (N) →」で総記事数を表示
│   │   │   ├── opengraph-image.tsx     # OGP fallback（実質未使用）
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
│   │   │   ├── membership/page.tsx     # メンバーシップページ（プラン一覧 + プレミアム記事一覧）
│   │   │   ├── terms/page.tsx
│   │   │   └── tokusho/page.tsx
│   │   └── api/
│   │       ├── checkout/route.ts       # Stripe Checkout Session 作成（Pro: subscription / Premium: payment）
│   │       ├── customer-portal/route.ts # Stripe Customer Portal
│   │       ├── verify-session/route.ts  # Stripe セッション検証 → KV 保存 → Cookie 発行
│   │       ├── webhook/route.ts         # Stripe Webhook 受信 → KV 書き込み
│   │       ├── restore-access/route.ts  # Cookie 消失時のアクセス復元
│   │       └── search-data/route.ts    # 検索用 JSON API（タグ・レベル含む）
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # 固定ヘッダー（検索, テーマ, 言語, ♥サポート, メンバーシップリンク）
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
│   │       ├── MembershipCTA.tsx       # 無料記事末尾に自動表示するメンバーシップ誘導CTA
│   │       ├── NewsTicker.tsx          # 画面上部のスクロールニュース
│   │       ├── PremiumPaywall.tsx      # 有料記事のペイウォール（Pro/Premiumボタン）
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
level: "beginner|beginner-intermediate|intermediate|intermediate-advanced|advanced"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DDTHH:MM"   # ソート優先度制御（任意）
author: "サイト名"
description: "メタディスクリプション"
tags: ["tag1", "tag2"]
premium: false  # 有料記事の場合 true
---
```

**ソートルール:** `updated` フィールドがあればそれを優先、なければ `date`。同日の記事は `updated` のタイムスタンプで順序を制御する。

**プリコンパイル:** `scripts/generate-content.mjs` で MDX を HTML に変換し `src/generated/articles.json` に出力。`npm run generate` で手動実行（**注意: `package.json` の `prebuild` は `generate` にリネームすること。`prebuild` のままだと `npm run build` のたびに自動実行されて Cloudflare Pages で OOM が発生する**）。

**カテゴリ定義:** `src/lib/content.ts` の `CATEGORIES` 配列でアイコン・カラーを設定。

### 4. テーマシステム（ダーク/ライト）

- CSS Variables で全色をテーマ対応（`globals.css`）
- `ThemeProvider` + `ThemeToggle` で localStorage ベースの切り替え
- FOUC 防止のブロッキングスクリプトを `<head>` に挿入

### 5. OGP 画像

`public/og/rorklab-og.png`（1200×1200px 正方形）が全ページの OGP 画像として設定されている（`src/app/layout.tsx` の `openGraph.images` に直接 URL を指定）。LINE・Stripe Checkout のサムネイルにも正方形が最適。画像を更新する場合は `_material/OGP images/` のデザインを編集してから `public/og/rorklab-og.png` に上書きコピーし、push する。

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

> ⚠️ **重要 — generate-content.mjs の OOM 対策**: `unified()` プロセッサをモジュール先頭で1回だけ作成し `.freeze()` を呼ぶこと。記事ごとに `unified()` を新規作成すると shiki WASM が毎回初期化されて Cloudflare Pages ビルドが OOM で失敗する。

### 8. Stripe 統合

- `src/app/api/checkout/route.ts` — Checkout Session 作成（subscription mode）
- `src/app/api/customer-portal/route.ts` — Customer Portal リダイレクト
- `src/app/api/verify-session/route.ts` — Stripe セッション検証 → Cloudflare KV 保存 → Cookie 発行
- `src/app/api/webhook/route.ts` — Stripe Webhook 受信 → KV 書き込み
- `src/app/api/restore-access/route.ts` — Cookie 消失時にメールアドレスで再認証
- `PremiumPaywall.tsx` — 有料記事のペイウォール UI（Pro/Premium 両ボタン）
- `MembershipCTA.tsx` — 無料記事末尾に自動表示（非プレミアム会員にのみ表示）
- `src/app/[locale]/membership/page.tsx` — メンバーシップページ（プラン比較 + premium記事一覧）
- Cloudflare KV `PREMIUM_ACCESS` — メール→Cookie トークンの保存（wrangler.toml にバインディング設定済み）
- `public/stripe.png` — Stripe 商品サムネイル（1200×1200px 正方形）

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
4. **OGP デザイン** — `_material/OGP images/` のデザイン画像を `public/og/rorklab-og.png` として配置（1200×1200px）
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


---

## ⚠ 既知の問題と対応（2026-03-13）

### 1. MDX 内ハードコードの関連記事リンクによる架空記事表示

**症状**: 記事ページに「関連記事」が2重に表示される。上側の関連記事がリンク切れ（404）になる。

**原因**: 一部の MDX ファイルに `## 関連記事` / `## Related Articles` セクションがハードコードされており、
動的な `RelatedArticles.tsx` コンポーネントとは別に表示されていた。
さらにそのリンクのURLが `/articles/ja/category/slug`（正しくは `/articles/category/slug`）や
`/articles/en/category/slug`（正しくは `/en/articles/category/slug`）という
間違ったロケールプレフィックス形式だった。

**正しいURL形式**（next-intl `localePrefix: "as-needed"` の場合）:
- 日本語（デフォルトロケール）: `/articles/{category}/{slug}`
- 英語: `/en/articles/{category}/{slug}`

**対応**:
1. MDX ファイル内のハードコード `## 関連記事` セクションを全削除（`RelatedArticles.tsx` が動的に処理するため不要）
2. MDX 内に残るインラインリンクのロケールプレフィックスを修正
3. `scripts/generate-content.mjs` にバリデーションを追加:
   コンパイル後 HTML に `href="/articles/ja/` または `href="/articles/en/` が含まれる場合、
   コンソールに `⚠ WARNING` を出力するようにした（誤ったリンクの早期検出のため）。

### 2. Tailwind v4 Preflight によるリストスタイル消去

**症状**: 記事本文の `<ul>` / `<ol>` リストに「・」や番号が表示されない。

**原因**: `@import "tailwindcss"` （Tailwind v4）の Preflight CSS が `list-style: none` を全 `ul`/`ol` に適用する。

**対応**: `globals.css` の `.article-content ul/ol` に `list-style-type` と `li::marker` スタイルを明示指定:
```css
.article-content ul { list-style-type: disc; }
.article-content ul ul { list-style-type: circle; }
.article-content ol { list-style-type: decimal; }
.article-content li::marker { color: var(--text-secondary); }
```

### 3. パンくずリストのロケール未対応

**症状**: 日本語ページの記事パンくずリストに「Articles」と英語表示になる。

**対応**: `src/app/[locale]/articles/[category]/[slug]/page.tsx` のパンくずリストを修正:
```tsx
{locale === "ja" ? "記事一覧" : "Articles"}
```
