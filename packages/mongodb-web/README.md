# `Svelte`プロジェクト(`create-svelte`)

`Svelte`プロジェクトのビルドに必要なものは、[create-svelte](https://github.com/sveltejs/kit/tree/master/packages/create-svelte) に搭載されています。

## プロジェクトの作成

```bash
# create a new project in kamuy-web
pnpm create svelte@latest kamuy-web
```

## 開発

依存関係のインストールと開発サーバーの開始

```bash
pnpm run dev
# or start the server and open the app in a new browser tab
pnpm run dev --open
```

## ビルド

アプリケーションの製品ビルド(`$ pnpm run build`)

製品ビルドのプレビュー(`$ npm run preview`)

> アプリケーションのデプロイには、ターゲット向け[アダプター](https://kit.svelte.dev/docs/adapters)のインストールが必要なときがあります。
