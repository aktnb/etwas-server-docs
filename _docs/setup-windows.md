# Windows でのセットアップ手順

このリポジトリを Windows 10/11 上で動作させるための手順です。PowerShell を前提に記載していますが、Windows Terminal でも同様に実行できます。

## 1. 前提条件の確認
- Windows 10 22H2 以降または Windows 11（64bit）
- インストール権限のあるローカル管理者アカウント
- 安定したネットワーク接続

## 2. 必要ツールのインストール
1. **Git for Windows** を `winget` からインストールします。
   ```powershell
   winget install Git.Git -e --source winget
   ```
2. **Node.js 20.x LTS** を導入します。`winget` が利用できる場合は以下のコマンドが簡単です。
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```
   すでに Node.js が入っている場合は `node -v` を実行し、`v20` 系であることを確認してください。
3. Node.js には `corepack` が同梱されているため、以下を実行して `pnpm` を有効化します。
   ```powershell
   corepack enable
   corepack prepare pnpm@latest --activate
   ```
   `pnpm -v` がバージョン番号を返せば準備完了です。
4. ネイティブ拡張をビルドする npm パッケージを利用する場合に備え、**Microsoft Visual C++ Build Tools** のインストールを推奨します。
   ```powershell
   winget install Microsoft.VisualStudio.2022.BuildTools
   ```
   インストーラーが起動したら `C++ build tools` ワークロードにチェックを入れて導入してください。

## 3. リポジトリの取得と依存関係の導入
1. 作業用ディレクトリを作成し、Git でリポジトリをクローンします。
   ```powershell
   mkdir $Env:USERPROFILE\git
   cd $Env:USERPROFILE\git
   git clone https://github.com/aktnb/etwas-server-docs.git etwas-server-wiki
   cd etwas-server-wiki
   ```
2. 依存関係をインストールします。
   ```powershell
   pnpm install
   ```
   初回実行時にブラウザやウイルス対策ソフトから許可を求められた場合は、信頼できる操作として承認してください。

## 4. 開発サーバーの起動と動作確認
1. ローカル開発サーバーを起動します。
   ```powershell
   pnpm dev
   ```
2. ブラウザで `http://localhost:3000` にアクセスし、ドキュメントが表示されることを確認します。MDX ファイルの変更はホットリロードで即時反映されます。

## 5. ビルドと本番動作確認
運用前に以下のコマンドでビルドと検索インデックスの生成を行いましょう。
- 本番ビルド: `pnpm build`
- 本番相当のサーバー起動: `pnpm start`
- Pagefind の再インデックス: `pnpm run postbuild`

## 6. トラブルシューティングのヒント
- `pnpm dev` 起動時にポート 3000 が使用中と表示された場合は、`pnpm dev -- --port 3001` のようにポート番号を指定します。
- ビルドが失敗する場合は `node -v` と `pnpm -v` を確認し、LTS 版 Node.js と最新の pnpm が使用されているか確認してください。
- 権限エラーが発生した場合は PowerShell を「管理者として実行」で開き直し、再度コマンドを実行してください。
