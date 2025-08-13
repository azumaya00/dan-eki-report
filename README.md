# Dan Eki Report

Vite + Svelte + TypeScript で構築された最小プロジェクトです。

## 技術スタック

- **Vite** - 高速なビルドツール
- **Svelte** - 軽量なフレームワーク
- **TypeScript** - 型安全なJavaScript
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマット

## セットアップ

### 前提条件

- Node.js 18.0.0 以上
- npm 8.0.0 以上

### インストール

```bash
# 依存関係をインストール
npm install
```

## 開発サーバーの起動

```bash
# 開発サーバーを起動（http://localhost:5173）
npm run dev
```

## ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## コード品質

```bash
# ESLintでコードチェック
npm run lint

# Prettierでコードフォーマット
npm run format
```

## プロジェクト構造

```
dan-eki-report/
├── src/
│   ├── App.svelte      # メインコンポーネント
│   ├── main.ts         # エントリーポイント
│   └── app.css         # グローバルスタイル
├── index.html          # HTMLエントリーポイント
├── vite.config.ts      # Vite設定
├── tsconfig.json       # TypeScript設定
├── .eslintrc.cjs       # ESLint設定
├── .prettierrc         # Prettier設定
├── .editorconfig       # エディタ設定
└── package.json        # プロジェクト設定
```

## スクリプト一覧

| スクリプト        | 説明                             |
| ----------------- | -------------------------------- |
| `npm run dev`     | 開発サーバー起動                 |
| `npm run build`   | 本番用ビルド                     |
| `npm run preview` | ビルド結果プレビュー             |
| `npm run lint`    | ESLintによるコードチェック       |
| `npm run format`  | Prettierによるコードフォーマット |

## 開発の始め方

1. `npm install` で依存関係をインストール
2. `npm run dev` で開発サーバーを起動
3. ブラウザで http://localhost:5173 を開く
4. `src/App.svelte` を編集してアプリケーションをカスタマイズ

## 注意事項

- TypeScriptファイルは `.ts` 拡張子を使用
- Svelteコンポーネントは `.svelte` 拡張子を使用
- コードの品質は `npm run lint` でチェック
- コードのフォーマットは `npm run format` で統一
