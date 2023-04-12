# MVP

## プロジェクトを作成する

[SvelteKit] プロジェクトを作成する

```bash
pnpm create svelte@latest kamuy-mvp
cd kamuy-mvp
pnpm install
```

- 選択肢
  - Which Svelte app template?
    - [x] Skeleton project
  - Add type checking with TypeScript?
    - [x] Yes, using TypeScript syntax
  - Select additional options (use arrow keys/space bar)
    - [x] Add ESLint for code linting, Add Prettier for code formatting, Add Playwright for browser testing, Add Vitest for unit testing

DB として [Supabase] プロジェクトを作成する

- [kamuy-mvp]

ORM として [Prisma] をセットアップする

```bash
pnpm add -D prisma ts-node @types/node
pnpm add @prisma/client
pnpm exec prisma init
```

`.env` ファイルへ DB 接続先を設定する

> 参考: [Supabase] > [kamuy-mvp] > `Project Settings` > `Database` > `Connection string` > `URI`

[Prisma] でモデリングし、データ投入する
> 参考: https://www.prisma.io/docs/guides/migrate/seed-database

[SvelteKit]: https://kit.svelte.jp/
[Supabase]: https://supabase.com/
[kamuy-mvp]: (https://app.supabase.com/project/yishivdsetcfseylrrjo)
[Prisma]: https://www.prisma.io/
