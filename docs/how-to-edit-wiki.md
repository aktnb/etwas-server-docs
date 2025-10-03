# 編集方法

ローカル環境でページを追加・更新し、Pull Request を出すまでの流れを順番に説明します。困ったときは各ステップを飛ばさずに確認してください。

## 前提条件
- GitHub アカウントがあること（未登録の場合は https://github.com で作成）
- Git がインストールされていること（Windows は Git for Windows、macOS は Xcode Command Line Tools など）
- Node.js 18 以降と pnpm がインストールされていること（`npm install -g pnpm`）
- このリポジトリにアクセスできること（メンバーとして招待されていない場合は管理者に問い合わせ）

## リポジトリの取得と初期設定
1. 変更を保存するフォルダを用意し、ターミナルを開きます。
2. リポジトリをクローンします。
   ```bash
   git clone https://github.com/aktnb/etwas-server-docs.git etwas-server-docs
   cd etwas-server-wiki
   ```
3. 依存関係をインストールします。
   ```bash
   pnpm install
   ```

## プロジェクト構成の概要
- `app/` : Next.js + Nextra のページをレンダリングする処理があります。特に `app/[[...mdxPath]]/page.jsx` が MDX ページのエントリポイントです。
- `content/` : サイトに表示される本文。テーマごとにディレクトリを分けます（例: `content/world`, `content/farm`）。
- `content/_meta.js` : サイドバーの並び順と表示名を管理します。新しいセクションを追加したらここも更新します。
- `content/<エリア>/_meta.js` : 各ディレクトリ内のページ順とタイトルを決めます。ファイルが存在しない場合は新しく作成してください。
- `docs/` : 編集手順や開発者向けメモなど、Wiki の運用に関するドキュメントです。
- `mdx-components.js` : MDX で共通利用するコンポーネントを登録しています。

編集時はまず `content/` 直下のどこにページを置くかを決め、必要なら `_meta.js` に項目を追加してください。

## 変更用ブランチの作成
メインブランチ（`master`）で直接作業せず、作業内容ごとにブランチを作ります。
```bash
git switch master
git pull origin master
git switch -c feature/<トピック名>
```
例: ネザーゲートの記事を追加するなら `feature/nether-portal-guide` のようにします。

## ローカルでプレビューする
編集しながら表示を確認できるよう、開発サーバーを起動します。
```bash
pnpm dev
```
ブラウザで http://localhost:3000 を開くと最新の内容が反映されます。作業を終えるまでターミナルは開いたままにしてください（停止する場合は `Ctrl + C`）。

## ページを追加・更新する手順
### 既存ページを更新する
1. 該当する MDX ファイル（例: `content/world/nether-portal.mdx`）をエディタで開きます。
2. 保存後、ブラウザをリロードして見た目を確認します。

### 新しいページを追加する
1. 適切なディレクトリを確認します（例: ワールド情報なら `content/world/`）。
2. ファイル名はケバブケースで作成します（例: `new-farm-design.mdx`）。
3. 必要に応じて `content/_meta.js` にもエントリを追加し、サイドバーにセクションを出します。
4. MDX 内で共通要素を使いたい場合は `mdx-components.js` にあるコンポーネントを利用するか、新規に登録します。
5. `pnpm dev` を起動した状態でブラウザを更新し、表示・リンク切れ・ナビゲーションを確認します。


## 変更内容を確認する
1. 作業が終わったら開発サーバーを終了し（`Ctrl + C`）、テストとして以下を実行します。
   ```bash
   pnpm build
   pnpm run postbuild
   ```
   `pnpm build` に失敗した場合はエラーメッセージを読んで修正します。
2. 再度 `pnpm dev` を立ち上げ、必要なら目視で確認します。

## 変更をコミットする
1. 変更点を確認します。
   ```bash
   git status
   ```
2. 追加・更新したファイルをステージします。
   ```bash
   git add content/world/nether-portal.mdx content/world/_meta.js
   ```
   追加するファイルが多い場合は `git add .` でもかまいませんが、意図しないファイルが含まれていないか確認してください。
3. コミットメッセージは短い命令形で書きます。
   ```bash
   git commit -m "Add nether portal guide"
   ```

## ブランチをリモートへ送る
```bash
git push origin feature/<トピック名>
```
初回だけ GitHub の認証を求められる場合があります。案内に従ってログインしてください。

## Pull Request を作成する
1. ブラウザで GitHub リポジトリを開き、"Compare & pull request" をクリックします（表示されない場合は "Pull requests" → "New pull request" → 自分のブランチを選択）。
2. タイトルはコミットと同じく短い命令形にします。本文には以下の項目を記載するとレビューがスムーズです。
   - 変更内容の概要
   - 実行したコマンド（例: `pnpm build`, `pnpm run postbuild`）
   - 確認した内容（ナビゲーション、リンク、テーマ切り替えなど）
   - 関連する Issue があれば番号を記載
3. 画面下部の "Create pull request" をクリックします。

## レビュー対応とマージ
- レビューコメントがついたら、ローカルでブランチをチェックアウトしたまま修正します。
- 追加の変更も同じブランチでコミットし、`git push` します。
- レビューが承認されたら、GitHub 上で "Merge" を実行し、ローカルの `master` ブランチにも反映させます。
  ```bash
  git switch master
  git pull origin master
  ```

## よくあるトラブル
- **依存関係のインストールに失敗する**: pnpm のバージョンが古い場合は `npm install -g pnpm@latest` で更新してください。
- **`pnpm build` が失敗する**: エラーメッセージに出ているファイルを開いて、Front Matter や import の綴りを確認します。
- **Push に失敗する**: リモートブランチ名が重複していないか確認し、`git push --set-upstream origin feature/<トピック名>` を試してください。
- **他の人の変更とコンフリクトした**: `git pull --rebase origin master` を実行し、指示に従ってコンフリクトを解消します。MDX では自分の編集部分だけが正しいか確認してから保存します。

この手順に沿って進めれば、Git 初心者でも自信を持って Wiki を更新できるはずです。迷ったときは遠慮なくチームに相談してください。
