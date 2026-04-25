# miya8060.dev

[miya8060](https://github.com/miya8060) のフリーランスデビュー用ポートフォリオサイト。Next.js 16 + Tailwind CSS v4 + MDX で構築、Vercel にデプロイ予定。

スタック確定事項とフェーズ計画は [`docs/setup.md`](./docs/setup.md) を参照。

## 必要環境

- Node.js 20.9+
- pnpm 10.5+

## 開発コマンド

```bash
pnpm install      # 依存インストール
pnpm dev          # 開発サーバ (http://localhost:3000)
pnpm build        # 本番ビルド
pnpm start        # 本番サーバ
pnpm lint         # ESLint
pnpm format       # Prettier 書き換え
pnpm format:check # Prettier チェックのみ
```

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
├── public/                # 静的アセット
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.mjs
└── postcss.config.mjs
```
