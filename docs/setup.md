# miya8060.dev セットアップメモ

miya8060 のフリーランスデビュー用ポートフォリオサイト。Next.js 16 ベースで構築する。

本ドキュメントはスタック確定事項とフェーズ計画を記録するためのもの。詳細な実装手順や PR 単位のメモは別途。

## スタック（2026-04-26 確定）

| 項目 | 採用 | 補足 |
|------|------|------|
| フレームワーク | Next.js 16 (App Router, Turbopack 既定) | Node 20.9+ / TS 5.1+ |
| 言語 | TypeScript (strict) | create-next-app 既定 |
| スタイリング | Tailwind CSS v4 | create-next-app 既定で導入 |
| コンテンツ | MDX (`@next/mdx` + `gray-matter`) | リポジトリ内 `content/` で管理 |
| Lint | ESLint v10 Flat Config | `next lint` は Next.js 16 で削除されたため `eslint .` を直接実行 |
| Format | Prettier + `prettier-plugin-tailwindcss` | クラス順を Tailwind 規則に揃える |
| パッケージマネージャ | pnpm 10.5.2 | |
| ホスティング | Vercel | 連携は Phase 2 |
| ドメイン | `miya8060.dev` | 取得は本リポジトリ作成と並走、Vercel 接続時に確定 |
| GitHub 公開設定 | Public | 雛形段階から公開で OK |

## 採用見送り（背景）

- **Cache Components / React Compiler**: ポートフォリオは静的寄りで初期は恩恵が薄いので当面オフ。必要になったら `next.config.ts` で opt-in。
- **Headless CMS（microCMS 等）**: 記事数が少ない想定なので MDX で十分。執筆頻度が増えたら切替検討。
- **shadcn/ui や UI ライブラリ**: 最初は必要最小限の手書きコンポーネントで進め、共通化したくなったタイミングで導入判断。
- **Biome**: ESLint Flat Config + Prettier で必要十分。Biome は将来検討。

## フェーズ

### Phase 1: ブートストラップ ← 現在
- `pnpm create next-app@latest .` で雛形生成（`--no-git` で既存 `.git` を温存）
- MDX セットアップ（ビルドが通る最小構成）
- Prettier 導入
- README 整備
- GitHub Public リポジトリ作成 & 初回 push

### Phase 2: デプロイ基盤
- Vercel プロジェクト作成・GitHub 連携
- 自動デプロイ確認
- `miya8060.dev` ドメイン取得 → Vercel に接続

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

## 開発コマンド（Phase 1 完了後に有効）

```bash
pnpm dev          # 開発サーバ (http://localhost:3000)
pnpm build        # 本番ビルド
pnpm start        # 本番サーバ
pnpm lint         # ESLint
pnpm format       # Prettier 書き換え
pnpm format:check # Prettier チェックのみ
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
├── public/
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.mjs
├── postcss.config.mjs
├── package.json
├── pnpm-lock.yaml
└── README.md
```
