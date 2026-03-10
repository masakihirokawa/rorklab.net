# Claude Lab 残タスクリスト

*最終更新: 2026-03-09*

---

## 実装済み機能 ✓

| 機能 | 説明 | 実装日 |
|------|------|--------|
| 検索強化 | タグ検索、スコアベースランキング、キーボード操作、ハイライト | 2026-03-09 |
| ページネーション | 12件/ページ、カテゴリフィルターチップ | 2026-03-09 |
| 関連記事表示 | カテゴリ+3pt, タグ+2pt のスコアベース、上位3件 | 2026-03-08 |
| 目次 (TOC) | h2/h3 自動抽出、IntersectionObserver でアクティブ追跡 | 2026-03-08 |
| RSS フィード | /feed.xml (ja), /en/feed.xml (en) | 2026-03-09 |
| サイトマップ | 動的生成、hreflang、記事実日付 | 2026-03-07 |
| OGP 画像共通化 | favicon ベース、全ページ共通 | 2026-03-09 |
| ScrollToTop ボタン | 400px スクロール後にフローティング表示 | 2026-03-09 |
| スケジュールタスク | 4回/日、キーワード＋参考URL組み込み | 2026-03-09 |
| サポートページ | Ko-fi, PayPal, Wise, Revolut + モバイルヘッダーに♥ | 2026-03-09 |

---

## 高優先度（外部条件待ち）

### 1. Stripe 本番移行
- **条件:** Stripe 審査完了後
- **作業:** テストキー → 本番キーに差し替え
- **ファイル:**
  - `src/app/api/checkout/route.ts` — STRIPE_SECRET_KEY
  - `src/app/api/customer-portal/route.ts` — STRIPE_SECRET_KEY
  - `wrangler.toml` or Cloudflare 環境変数 — STRIPE_SECRET_KEY, STRIPE_PRICE_ID
  - クライアント側の公開可能キー（該当箇所）

### 2. AdSense 申請
- **条件:** 月間 1,000 PV 目安でアクセス安定後
- **作業:**
  - Google AdSense に申請
  - `<head>` に AdSense スクリプトを追加
  - 記事ページに広告ユニットを配置

### 3. 広告開始時のサポートページ文言差替え
- **条件:** AdSense 承認後
- **作業:** サポートページの「広告なし」表現を更新
- **ファイル:** `src/app/[locale]/support/page.tsx`

---

## 低優先度（将来）

### 4. middleware → proxy 移行
- **条件:** OpenNext が Next.js 16 の proxy.ts をサポートした後
- **作業:** `src/middleware.ts` → `src/proxy.ts` にリネーム、export 変更
- **現状:** OpenNext が Node.js proxy 非対応のため保留中

### 5. Contentlayer2 統合
- **目的:** MDX コンテンツの型安全なアクセス
- **現状:** `generate-content.mjs` で自前プリコンパイル中。Contentlayer2 が安定したら移行検討

### 6. D1 データベース
- **目的:** ユーザーデータ、プレミアム記事管理、閲覧履歴
- **条件:** ユーザー認証（NextAuth）導入後

### 7. NextAuth.js v5（ユーザー認証）
- **目的:** ログイン機能、プレミアムコンテンツのアクセス制御
- **依存:** D1 データベースと連携

---

## 認証情報リファレンス

| 項目 | 値 / 場所 |
|------|-----------|
| GitHub リポジトリ | masakihirokawa/claudelab.net |
| Cloudflare Account ID | 8c716b96a609673f9521f94e10d8edaa |
| Google Analytics | G-ZXTYGTXKTG |
| Amazon Associates | pinocchio-22 |
| Ko-fi | ko-fi.com/dolice |
| Stripe (テスト) | pk_test_51Sci... / sk_test_51Sci... |
| Stripe Price ID | price_1T8pUpCxxiy4VbgNK4DAw4S6 |
| スケジュールタスク | claudelab-daily-content (0 9,12,15,21 * * *) |
