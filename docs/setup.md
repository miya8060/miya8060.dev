# miya8060.dev セットアップメモ

miya8060 のフリーランスデビュー用ポートフォリオサイト。Next.js 16 ベースで構築する。

本ドキュメントはスタック確定事項とフェーズ計画を記録するためのもの。詳細な実装手順や PR 単位のメモは別途。

## スタック（2026-04-26 確定）

| 項目                 | 採用                                     | 補足                                                                         |
| -------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| フレームワーク       | Next.js 16 (App Router, Turbopack 既定)  | Node 22.0+ / TS 5.1+                                                         |
| 言語                 | TypeScript (strict)                      | create-next-app 既定                                                         |
| スタイリング         | Tailwind CSS v4                          | create-next-app 既定で導入                                                   |
| コンテンツ           | MDX (`@next/mdx` + `gray-matter`)        | リポジトリ内 `content/` で管理                                               |
| Lint                 | ESLint v10 Flat Config                   | `next lint` は Next.js 16 で削除されたため `eslint .` を直接実行             |
| Format               | Prettier + `prettier-plugin-tailwindcss` | クラス順を Tailwind 規則に揃える                                             |
| テスト               | Playwright (E2E のみ)                    | 単体テストは導入せず E2E に一本化                                            |
| 開発手法             | 実用的 TDD                               | ロジック層と主要ルートは test-first、自明な UI/型はスキップ                  |
| MCP                  | `@playwright/mcp` をプロジェクト同梱     | `.mcp.json` で commit、Claude がブラウザ駆動できる                           |
| パッケージマネージャ | pnpm 10.5.2                              | `package.json#engines` で固定                                                |
| ホスティング         | Vercel                                   | main = Production / PR = Preview / Preview に Deployment Protection          |
| Analytics            | Vercel Analytics + Speed Insights        | App Router 用 (`@vercel/analytics/next` 等)                                  |
| CI                   | GitHub Actions                           | `ci.yml` (lint/format/tsc) + `e2e-preview.yml` (Vercel Preview に対する E2E) |
| ドメイン             | `miya8060.dev`                           | Porkbun で取得 → NS を Vercel に委任、`www` は apex に 308 リダイレクト      |
| GitHub 公開設定      | Public                                   | 雛形段階から公開で OK                                                        |

## 採用見送り（背景）

- **Cache Components / React Compiler**: ポートフォリオは静的寄りで初期は恩恵が薄いので当面オフ。必要になったら `next.config.ts` で opt-in。
- **Headless CMS（microCMS 等）**: 記事数が少ない想定なので MDX で十分。執筆頻度が増えたら切替検討。
- **shadcn/ui や UI ライブラリ**: 最初は必要最小限の手書きコンポーネントで進め、共通化したくなったタイミングで導入判断。
- **Biome**: ESLint Flat Config + Prettier で必要十分。Biome は将来検討。
- **Vitest / Jest（単体テスト）**: Playwright E2E に一本化する方針。コンポーネント単位のテストは E2E でカバーできない複雑なロジックが出てきた段階で再検討。

## テスト方針（実用的 TDD）

- **対象**: ルーティング・主要ユーザーフロー・MDX ローダー / frontmatter パース・お問い合わせ送信などロジックを伴う層
- **やらない**: 自明なマークアップ、型で守れる箇所、単発のスタイル微調整
- **進め方**: 失敗する E2E テストを先に書く → 実装で green にする → リファクタ（red → green → refactor）
- **実行**:
  - ローカル: `pnpm test:e2e`（`webServer` が `pnpm dev` を起動）
  - CI: Vercel Preview デプロイ完了をトリガーに `repository_dispatch (vercel.deployment.success)` で発火し、Preview URL に対して Playwright を実行
  - 手元から Preview を直接叩く: `PLAYWRIGHT_BASE_URL=https://<preview>.vercel.app VERCEL_AUTOMATION_BYPASS_SECRET=... pnpm test:e2e`
- **MCP**: `@playwright/mcp` を `.mcp.json` で同梱。Claude がブラウザを直接操作してテスト追補・確認に使える

## フェーズ

### Phase 1: ブートストラップ（完了）

- `pnpm create next-app@latest .` で雛形生成（`--no-git` で既存 `.git` を温存）
- MDX セットアップ（ビルドが通る最小構成）
- Prettier 導入
- README 整備
- GitHub Public リポジトリ作成 & 初回 push
- Playwright + 実用的 TDD のテスト基盤導入（`@playwright/mcp` 含む）

### Phase 2: デプロイ基盤（完了 / 2026-04-26）

コード側（PR ベース）:

- `package.json#engines` で Node 22 / pnpm 10.5.2 を固定
- Vercel Analytics + Speed Insights を `src/app/layout.tsx` に挿入
- `playwright.config.ts` を `PLAYWRIGHT_BASE_URL` / `VERCEL_AUTOMATION_BYPASS_SECRET` 対応に
- `.github/workflows/ci.yml`: PR / main push で lint / format:check / tsc
- `.github/workflows/e2e-preview.yml`: Vercel Preview に対する Playwright E2E（`repository_dispatch` 発火）

ダッシュボード側（手動。詳細は下記「Vercel Dashboard セットアップ」）:

- Vercel プロジェクト作成・GitHub 連携・Production = main
- Deployment Protection を Preview にかけ、Automation Bypass secret を発行
- Vercel Analytics / Speed Insights を有効化
- `miya8060.dev` を Porkbun で取得 → NS を Vercel に委任 (`ns1/ns2.vercel-dns.com`)
- `miya8060.dev` (apex) を Production、`www.miya8060.dev` を apex への 308 リダイレクトに設定

### Phase 3: ページ実装

- ルート: `/`, `/about`, `/works`, `/blog`, `/contact`
- ダークモード対応
- OG 画像・SEO メタ整備

### Phase 4: コンテンツ機能

- MDX ローダー（frontmatter パース、一覧化、個別ページ）
- ブログ・実績の初期コンテンツ投入

### Phase 5: お問い合わせフォーム

- メール送信サービス選定（Resend など）
- スパム対策（hCaptcha / honeypot 等）

## Vercel Dashboard セットアップ（Phase 2）

ユーザーが手動で行う Vercel ダッシュボード作業のチェックリスト。コード変更 PR とは独立に進める。

1. **Project Import**: <https://vercel.com/new> から `miya8060/miya8060.dev` を Import
2. **Framework**: Next.js（自動検出）。Build / Install コマンドはデフォルト（pnpm 検出）
3. **Settings → General**: Node.js Version = `22.x`
4. **Settings → Git**:
   - Production Branch = `main`
   - Vercel Bot PR Comments = ON
5. **Settings → Deployment Protection**:
   - Vercel Authentication = **Standard Protection**（Preview のみ ON、Production は OFF）
   - **Protection Bypass for Automation** で secret を生成 → コピー
6. **Settings → Analytics** = Enable
7. **Settings → Speed Insights** = Enable
8. **GitHub repo → Settings → Secrets and variables → Actions**:
   - `VERCEL_AUTOMATION_BYPASS_SECRET` = 5 でコピーした値
9. **動作確認**: main への空コミット push（または Vercel Dashboard から Redeploy）→ Production が緑になることを確認
10. **ドメイン (Step C)**: Porkbun で `miya8060.dev` を取得 → ICANN 検証メールを承認。Vercel Dashboard → Domains で `miya8060.dev` と `www.miya8060.dev` を Add し、表示された NS (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`) を Porkbun の Authoritative Nameservers に設定。NS 伝播後、`miya8060.dev` を Production（apex 直サーブ）、`www.miya8060.dev` を `miya8060.dev` への 308 リダイレクトに設定。SSL は Vercel が自動発行

## CI ワークフロー

`.github/workflows/ci.yml` (lint):

- トリガー: `pull_request` (opened/synchronize/reopened) / `push` to `main`
- 実行内容: `pnpm lint` / `pnpm format:check` / `pnpm exec tsc --noEmit`
- 並行実行抑止: 同一ブランチで前の run を cancel

`.github/workflows/e2e-preview.yml` (E2E against Vercel Preview):

- トリガー:
  - `repository_dispatch` の `vercel.deployment.success`（Vercel for GitHub が Preview デプロイ成功時に dispatch）
  - `workflow_dispatch`（Preview URL を手動指定して実行できる fallback）
- フィルタ: `client_payload.environment == 'preview'` で Production を除外
- チェックアウト先: `client_payload.git.sha`（Vercel が build した commit に固定）
- 実行内容: Playwright browser キャッシュ → `playwright install` → `pnpm test:e2e` を `PLAYWRIGHT_BASE_URL` と `VERCEL_AUTOMATION_BYPASS_SECRET` 付きで実行
- 失敗時: `playwright-report/` と `test-results/` を artifact アップロード

> `repository_dispatch` は default branch にワークフロー YAML が存在する時のみ発火する。本ワークフロー初回は merge 後に有効化されるため、最初の数 PR では `workflow_dispatch` で手動実行することがある。

## Secret / 環境変数

| 名前                              | 場所                   | 用途                                                                                                                                          |
| :-------------------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | GitHub Actions Secrets | E2E が Deployment Protection をかけた Preview を叩くための bypass。`x-vercel-protection-bypass` / `x-vercel-set-bypass-cookie` ヘッダーに使用 |
| `PLAYWRIGHT_BASE_URL`             | CI 内で動的に注入      | E2E の baseURL 上書き。Vercel Preview URL を入れる                                                                                            |

ローカル開発では両方 unset で OK（`webServer` が `pnpm dev` を起動）。

## 開発コマンド（Phase 1 完了後に有効）

```bash
pnpm dev          # 開発サーバ (http://localhost:3000)
pnpm build        # 本番ビルド
pnpm start        # 本番サーバ
pnpm lint         # ESLint
pnpm format       # Prettier 書き換え
pnpm format:check # Prettier チェックのみ
pnpm test:e2e     # Playwright E2E テスト
pnpm test:e2e:ui  # Playwright UI モード
```

## ディレクトリ構成（Phase 1 完了時点の想定）

```
miya8060.dev/
├── docs/
│   └── setup.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── mdx-components.tsx
├── content/
│   ├── blog/.gitkeep
│   └── works/.gitkeep
├── e2e/                 # Playwright E2E テスト
├── public/
├── .github/
│   └── workflows/       # CI (lint) + E2E against Vercel Preview
├── .mcp.json            # Playwright MCP server 設定
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.mjs
├── playwright.config.ts
├── postcss.config.mjs
├── package.json
├── pnpm-lock.yaml
└── README.md
```
