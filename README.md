# microCMS AI

AI で文章を校正し、リッチエディタに変換後に microCMS に投稿するアプリケーションです。Google Gemini AI を活用して、テキスト執筆から CMS 投稿までのワークフローを自動化します。

## 📋 プロジェクト概要

このプロジェクトは、ブログ記事や Webコンテンツの執筆・編集作業を効率化するツールです。以下のフローを自動化します：

1. **テキスト入力** - 執筆した文章を入力
2. **AI 校正** - Google Gemini AI が文法、表現、読みやすさを改善
3. **リッチテキスト変換** - マークダウンやHTMLに自動変換
4. **microCMS 投稿** - 編集内容を microCMS に自動投稿

## 🛠️ 使用技術

### フロントエンド
- **Next.js 15.5.6** - React フルスタックフレームワーク
- **React 19.1.0** - UI ライブラリ
- **TypeScript 5** - 型安全性を備えた JavaScript
- **Tailwind CSS 4** - ユーティリティベースのスタイリング

### AI・API
- **Google Gemini AI (@google/genai 1.25.0)** - テキスト生成・校正エンジン
- **Hono 4.10.1** - 軽量 Web フレームワーク（API ルーティング）
- **@hono/node-server 1.19.5** - Node.js サーバーアダプター

### CMS 連携
- **microCMS** - ヘッドレス CMS
- **microCMS API** - コンテンツ投稿 API

### 開発ツール
- **ESLint 9** - コード品質チェック
- **Turbopack** - 高速ビルド（Next.js 統合）
- **dotenv** - 環境変数管理

## 🚀 クイックスタート

### 前提条件
- Node.js 18+
- npm または yarn / pnpm
- Google Gemini API キー
- microCMS アカウント

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kazu1998727/microCMS-ai.git
cd microCMS-ai

# 依存パッケージをインストール
npm install
# または
yarn install
# または
pnpm install
```

### 環境設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key

# microCMS API
NEXT_PUBLIC_MICROCMS_SERVICE_ID=your_service_id
NEXT_PUBLIC_MICROCMS_API_KEY=your_api_key
NEXT_PUBLIC_MICROCMS_ENDPOINT=your_endpoint
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

## 📚 よく使うコマンド

### 開発・ビルド

```bash
# 開発サーバーを起動（Turbopack で高速ビルド）
npm run dev

# プロダクション用にビルド
npm run build

# ビルド後にサーバーを起動
npm run start
```

### コード品質

```bash
# ESLint でコードをチェック
npm run lint
```

## 📁 プロジェクト構成

```
microCMS-ai/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx          # メインエディター
│   │   └── api/              # API ルート
│   │       ├── proofread     # 校正 API
│   │       └── publish       # 投稿 API
│   ├── components/           # React コンポーネント
│   │   ├── Editor.tsx        # テキストエディター
│   │   ├── Preview.tsx       # プレビュー表示
│   │   └── PublishForm.tsx   # 投稿フォーム
│   └── lib/                  # ユーティリティ
│       ├── gemini.ts         # Gemini AI 連携
│       └── microcms.ts       # microCMS 連携
├── public/                   # 静的ファイル
├── .env.local               # 環境変数（ローカル）
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎯 主な機能

### テキスト校正
- 文法や表現の改善
- 読みやすさの向上
- トーンの調整（丁寧、カジュアルなど）

### リッチテキスト変換
- マークダウン形式への自動変換
- 見出し、リスト、リンクの自動認識
- HTML への変換オプション

### microCMS 連携
- API を使用した自動投稿
- メタデータの設定
- カテゴリ・タグの管理

### ユーザーインターフェース
- シンプルで直感的なエディター
- リアルタイムプレビュー
- 校正結果の確認・編集

## 📖 参考リソース

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Google Gemini API ドキュメント](https://ai.google.dev)
- [Hono ドキュメント](https://hono.dev)
- [microCMS ドキュメント](https://microcms.io/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)

## 🔧 API エンドポイント

### 校正 API
```
POST /api/proofread
Content-Type: application/json

{
  "text": "校正対象のテキスト",
  "tone": "formal" // optional: formal, casual, neutral
}
```

### 投稿 API
```
POST /api/publish
Content-Type: application/json

{
  "title": "記事タイトル",
  "content": "記事内容",
  "category": "カテゴリID",
  "tags": ["タグ1", "タグ2"]
}
```

## 💡 使用シーン

- ブログ記事の執筆・編集を効率化したい
- 複数のライターのコンテンツを一元管理したい
- CMS への投稿作業を自動化したい
- 文章の品質を高めたい

## 🚀 デプロイ

### Vercel へのデプロイ

1. GitHub にプッシュ
2. Vercel でリポジトリを接続
3. 環境変数を設定
4. 自動デプロイ

## ⚙️ カスタマイズ

### Gemini AI のプロンプト調整

`src/lib/gemini.ts` でプロンプトを編集して、校正の動作をカスタマイズできます。

### microCMS のフィールド設定

`src/lib/microcms.ts` で microCMS の API スキーマに合わせてフィールドを調整します。

## 📝 ライセンス

このプロジェクトはオープンソースです。

## 🤝 貢献

バグ報告や機能提案は、Issues から提出してください。プルリクエストも歓迎します！

---

**開発者からのメッセージ**

コンテンツ作成をもっと効率的に。AI と CMS の組み合わせで、執筆作業がもっと楽しくなります。
