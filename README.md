# Etwas Server Wiki

## ドキュメント
環境構築は[セットアップ手順（Windows）](/docs/setup-windows.md)へ
編集方法は[編集方法](/docs/how-to-edit-wiki.md)へ

## セットアップ手順

```bash
pnpm install
pnpm dev
```

上記コマンド実行後、http://localhost:3000 にアクセスして MDX の編集結果をリアルタイムに確認してください。

## 利用可能なスクリプト

- `pnpm dev` — Turbopack 開発サーバーを起動し、即時プレビューを提供します
- `pnpm build` — 本番用バンドルを生成し、設定や MDX の不整合を検出します
- `pnpm start` — `build` の成果物を使って本番挙動をローカル検証します
- `pnpm run postbuild` — Pagefind の検索インデックスを再生成します

## プロジェクト構成

- `app/` — MDX ページのレイアウトとルーティングを管理します
- `content/` — トピック別に整理されたドキュメントを格納します
- `content/_meta.js` — サイドバーの階層と並び順を定義します
- `mdx-components.js` — 共有の MDX コンポーネントやショートコードを管理します
