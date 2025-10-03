# Repository Guidelines

## プロジェクト構成とモジュール配置
本リポジトリ (this repository) は Next.js と Nextra Docs theme を用いて動作します。主要なレイアウトとルーティングは `app/` ディレクトリ内にあり、特に `app/[[...mdxPath]]/page.jsx` が MDX ページをレンダリングするエントリポイントです。コンテンツは `content/` 以下に整理され、`content/_meta.js` がサイドバー階層 (sidebar hierarchy) を制御します。たとえば `content/farm` や `content/world` のようなトピック別ディレクトリで記事を管理し、共通コンポーネントやマクロは関連する階層に配置して可読性と再利用性を高めてください。

## ビルド・テスト・開発コマンド
- `pnpm install` — フレームワーク依存関係と `pagefind` をインストールし、ローカル環境を初期化します。
- `pnpm dev` — Turbopack development server を `http://localhost:3000` で起動し、MDX 編集内容を即時にプレビューします。
- `pnpm build` — Production bundle を生成し、MDX や設定の不整合を検出します。PR 送信前に必ず実行してください。
- `pnpm start` — `build` 生成物を用いてローカルで本番挙動を検証します。静的配信環境に近い挙動を確認できます。
- `pnpm run postbuild` — Pagefind index を再構築し、検索機能 (site search) の更新を反映します。CI やデプロイフローでは `build` の後に実行する想定です。

## コーディングスタイルと命名規則
ESM imports と関数型 React components を標準とし、`app/layout.jsx` に倣った 2 スペースインデント、末尾カンマ、整形済みコメントスタイルを維持します。MDX の見出しはセンテンスケース (sentence case)、ファイル名はケバブケース (`getting-started.mdx`) を使用してください。JSX props は意味のまとまりまたはアルファベット順に整理し、略語ではなく意図が伝わるコンポーネント名を選択します。必要に応じて `mdx-components.js` に共有コンポーネントを追加し、命名を PascalCase に統一します。

## テスト方針
現時点では自動テストフレームワークが未導入のため、`pnpm build` を品質ゲートとして活用します。ナビゲーション、Pagefind 検索、テーマ切替といった重要機能は `pnpm dev` 上で手動確認してください。今後テストを追加する場合は対象ページまたはコンポーネントの近くに colocate し、テスト名 (test title) には日本語および英語の併記でシナリオを明瞭に記述することを推奨します。

## コミットおよび Pull Request ガイドライン
履歴では絵文字付きコミット (`✨ 基本的なページを追加`) と英語メッセージ (`Update layout component ...`) が混在しています。短い命令形 (imperative mood) を基本とし、変更内容がローカライズに関わる場合のみ日本語主体にします。Pull Request では関連 Issue 参照、変更概要 (change summary)、実行済みコマンド一覧 (`pnpm build`, `pnpm run postbuild`) を箇条書きで明示し、UI 変更時は before / after スクリーンショットを添付してください。レビューアの負担軽減のため、影響範囲やリグレッションリスクについても一言記載すると効果的です。

## コンテンツ作成のヒント
新規トピックは `content/<area>/` に配置し、該当ディレクトリの `_meta.js` にエントリを追加してナビゲーション順序を確定させます。共通ショートコードや MDX コンポーネントは `mdx-components.js` を再利用し、文言は `content/index.mdx` のグロッサリーと整合性を保ってください。公開前には `pnpm dev` でリンク切れや翻訳漏れをチェックし、必要に応じて Pagefind インデックスの再生成を行います。翻訳や多言語対応を追加する際は、各セクションで言語スイッチの導線が途切れないかも合わせて確認しましょう。

## セキュリティと設定の注意点
環境変数 (environment variables) は `.env.local` に保存し、バージョン管理には含めないでください。外部サービスの API キーやシークレットは Vercel の Project Settings で管理し、ローカル検証時のみ `.env.example` を更新して共有します。Pagefind による検索インデックスはビルド成果物に含まれるため、公開前に不要なドラフトページが残っていないか確認し、アクセス制御が必要な資料は `content` ではなく別リポジトリまたは認証付きストレージで扱うことを推奨します。
