# Etwas Server Wiki

Etwas サーバーのドキュメントサイトです。Next.js と Nextra Docs theme で構築されており、`app/[[...mdxPath]]/page.jsx` をエントリポイントに `content/` ディレクトリ以下の MDX コンテンツをレンダリングします。

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

## 貢献ガイドライン

Pull Request を送る前に `pnpm build` を実行し、PR 説明には実行したコマンドを箇条書きで記載してください。UI に変更がある場合は before / after スクリーンショットを添付し、影響範囲やリグレッションリスクについても一言触れるとレビューがスムーズになります。
