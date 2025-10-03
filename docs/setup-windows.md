# セットアップ手順（Windows）

このリポジトリを Windows 10/11 上で動作させるための手順です。PowerShell を前提に記載していますが、Windows Terminal でも同様に実行できます。

## 0. 前提条件の確認
- Windows 10 22H2 以降または Windows 11（64bit）
- インストール権限のあるローカル管理者アカウント

## 1. Powershell 起動
#### 方法1
Windows スタートメニューを右クリックし「ターミナル（管理者）」をクリックして開きます

> [!IMPORTANT]
> 権限エラーが発生する可能性が高いため「ターミナル」ではなく「ターミナル（管理者）」を開くことをお勧めします

#### 方法2
Windows スタートメニューで「PowerShell」と検索します。「Windows PowerShell」の `>` マークを押して「管理者として実行する」から起動します。

> [!IMPORTANT]
> 権限エラーが発生する可能性が高いため「管理者として実行する」から開くことをお勧めします

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

> [!IMPORTANT]
> 権限エラー（`EPERM: operation not permitted` など）が発生した場合は、PowerShell または Windows Terminal を「管理者として実行」で開き直してから再実行してください。

## 3. リポジトリの取得と依存関係の導入
1. 作業用ディレクトリを作成し、Git でリポジトリをクローンします。
   ```powershell
   mkdir $Env:USERPROFILE\git -Force
   cd $Env:USERPROFILE\git
   git clone https://github.com/aktnb/etwas-server-docs.git etwas-server-docs
   cd etwas-server-docs
   ```
2. 依存関係をインストールします。
   ```powershell
   pnpm install
   ```

> [!IMPORTANT]
> 初回実行時にブラウザやウイルス対策ソフトから許可を求められた場合は、信頼できる操作として承認してください。

> [!IMPORTANT]
> `pnpm` 実行時に「このシステムではスクリプトの実行が無効」と表示される場合は、PowerShell の実行ポリシーを変更します。
>  ```powershell
>  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
>  ```
>  変更後に PowerShell を再起動し、再度 `pnpm install` を実行してください。

## 4. 開発サーバーの起動と動作確認
1. ローカル開発サーバーを起動します。
   ```powershell
   pnpm dev
   ```

> [!IMPORTANT]
> `pnpm dev` 起動時にポート 3000 が使用中と表示された場合は、`pnpm dev -- --port 3001` のようにポート番号を指定します。

> [!IMPORTANT]
> 初回実行時にブラウザやウイルス対策ソフトから許可を求められた場合は、信頼できる操作として承認してください。

2. ブラウザで `http://localhost:3000` にアクセスし、ドキュメントが表示されることを確認します。MDX ファイルの変更はホットリロードで即時反映されます。

> [!IMPORTANT]
> サーバーは PowerShell 上で `Ctrl` + `c` を押すことで停止できます

> [!NOTE]
> アクセス時にページがコンパイルされることによりロードに時間がかかる場合があります

## 5. ビルドと本番動作確認の仕方（任意）
以下のコマンドでビルドと検索インデックスの生成ができます。
- 本番ビルド: `pnpm build`
- 本番相当のサーバー起動: `pnpm start`
- Pagefind の再インデックス: `pnpm run postbuild`

## 6. 編集しよう！
[編集方法](/docs/how-to-edit-wiki.md) へ続く

## トラブルシューティングのヒント

> [!TIP]
> ビルドが失敗する場合は `node -v` と `pnpm -v` を確認し、LTS 版 Node.js と最新の pnpm が使用されているか確認してください。
