# miya8060.dev

[miya8060](https://github.com/miya8060) のフリーランスデビュー用ポートフォリオサイト。Next.js 16 + Tailwind CSS v4 + MDX で構築、Vercel にデプロイ。

スタック確定事項とフェーズ計画、Vercel / CI セットアップ手順は [`docs/setup.md`](./docs/setup.md) を参照。

## 必要環境

- Node.js 22.0+
- pnpm 10.5.2+

## 開発コマンド

```bash
pnpm install      # 依存インストール
pnpm dev          # 開発サーバ (http://localhost:3000)
pnpm build        # 本番ビルド
pnpm start        # 本番サーバ
pnpm lint         # ESLint
pnpm format       # Prettier 書き換え
pnpm format:check # Prettier チェックのみ
pnpm test:e2e     # Playwright E2E（webServer がローカル起動）
pnpm test:e2e:ui  # Playwright UI モード
```

## デプロイ

- **Production**: `main` への push で Vercel が自動デプロイ
- **Preview**: PR ごとに Vercel が Preview デプロイを作成（Deployment Protection で限定公開）。Vercel Bot が PR にコメントで URL を案内
- **CI**:
  - `.github/workflows/ci.yml`: lint / format:check / tsc を PR と main push で実行
  - `.github/workflows/e2e-preview.yml`: Vercel Preview デプロイ完了 (`repository_dispatch: vercel.deployment.success`) をトリガーに、Preview URL に対して Playwright を実行
- **Vercel ダッシュボード設定 / Secret 管理**: [`docs/setup.md`](./docs/setup.md#vercel-dashboard-セットアップphase-2) を参照

## ディレクトリ構成

```
miya8060.dev/
├── docs/                  # スタック・運用メモ
├── src/
│   ├── app/               # App Router（layout / page / globals.css）
│   └── mdx-components.tsx # MDX グローバルコンポーネント
├── content/
│   ├── blog/              # ブログ記事 (MDX)
│   └── works/             # 実績 (MDX)
├── e2e/                   # Playwright E2E テスト
├── public/                # 静的アセット
├── .github/workflows/     # CI (lint) + E2E against Vercel Preview
├── .mcp.json              # Playwright MCP server 設定
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.mjs
├── playwright.config.ts
└── postcss.config.mjs
```
