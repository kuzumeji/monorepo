# `GraphQL` サーバー

以下のテクノロジースタックを使って `TypeScript` で `GraphQL` サーバーを構築しています。

- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server): `GraphQL` サーバー
- [Pothos](https://pothos-graphql.dev/): コードファースト `GraphQL` スキーマ定義ライブラリ
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client): データベースアクセス(ORM)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate): データベースマイグレーション
- [PostgreSQL](https://www.postgresql.org/): リレーショナルデータベース(RDB)

## 目次

- [はじめに](#はじめに)
- [GraphQL-API の使用](#GraphQL-APIの使用)
- [アプリの進化](#アプリの進化)
- [別のデータベースに切り替える](#別のデータベースに切り替える)
- [次のステップ](#次のステップ)

## はじめに

### 1. サンプルコードのダウンロードと依存関係のインストール

See https://github.com/prisma/try-prisma#readme

```bash
monorepo (main)$ pnpm dlx try-prisma@latest -i pnpm -n kamuy-api -p packages -t typescript/graphql -v
```

### 2. データベースの作成とテストデータのロード

次のコマンドでデータベースを作成します。(`$ pnpm exec prisma migrate dev --name init`)
これにより スキーマ定義(`./prisma/schema.prisma`) のテーブルが作成されます。

新しく作成されたデータベースに対して上記コマンドが実行されると、テストデータのロードスクリプト(`./prisma/seed.ts`)が実行されてデータがロードされます。

### 3. `GraphQL` サーバーの起動

次のコマンドで `GraphQL` サーバーを起動します。(`pnpm run dev`)

ブラウザで [http://localhost:4000](http://localhost:4000) に移動して、[GraphQL Playground](https://github.com/prisma/graphql-playground) で `GraphQL` サーバーの API をテストします。

## GraphQL-API の使用

`GraphQL` サーバーの API 操作を指定するスキーマは、[`./schema.graphql`](./schema.graphql) で定義されます。
以下は、`GraphQL Playground` を使用して API に送信できるいくつかの操作です。
フィールドを追加または削除して、操作を自由に調整してください。
`GraphQL Playground` は、オートコンプリートとクエリーバリデーションが便利です。

### 公開されたすべての投稿とその作成者を取得する

```graphql
query {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

<details><summary><strong>API 操作をもっと見る</strong></summary>

### ユーザーの下書きを取得する

```graphql
query {
  draftsByUser(userUniqueInput: { email: "mahmoud@prisma.io" }) {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

### 新しいユーザーを作成する

```graphql
mutation {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io" }) {
    id
  }
}
```

### 新しい下書きを作成する

```graphql
mutation {
  createDraft(
    data: { title: "Join the Prisma Slack", content: "https://slack.prisma.io" }
    authorEmail: "alice@prisma.io"
  ) {
    id
    viewCount
    published
    author {
      id
      name
    }
  }
}
```

### 既存の投稿を公開/非公開にする

```graphql
mutation {
  togglePublishPost(id: __POST_ID__) {
    id
    published
  }
}
```

`__POST_ID__` プレースホルダーをデータベースの `Post` レコードの実際の `id` に置き換える必要があることに注意してください (例: 5):

```graphql
mutation {
  togglePublishPost(id: 5) {
    id
    published
  }
}
```

### 投稿の閲覧数を増やす

```graphql
mutation {
  incrementPostViewCount(id: __POST_ID__) {
    id
    viewCount
  }
}
```

`__POST_ID__` プレースホルダーをデータベースの `Post` レコードの実際の `id` に置き換える必要があることに注意してください (例: 5):

```graphql
mutation {
  incrementPostViewCount(id: 5) {
    id
    viewCount
  }
}
```

### タイトルまたはコンテンツに特定の文字列を含む投稿を検索します

```graphql
{
  feed(searchString: "prisma") {
    id
    title
    content
    published
  }
}
```

### 返された投稿のページ付けと順序付け

```graphql
{
  feed(skip: 2, take: 2, orderBy: { updatedAt: desc }) {
    id
    updatedAt
    title
    content
    published
  }
}
```

### 1 つの投稿を取得する

```graphql
{
  postById(id: __POST_ID__) {
    id
    title
    content
    published
  }
}
```

`__POST_ID__` プレースホルダーをデータベースの `Post` レコードの実際の `id` に置き換える必要があることに注意してください (例: 5):

```graphql
{
  postById(id: 5) {
    id
    title
    content
    published
  }
}
```

### 投稿を削除する

```graphql
mutation {
  deletePost(id: __POST_ID__) {
    id
  }
}
```

`__POST_ID__` プレースホルダーをデータベースの `Post` レコードの実際の `id` に置き換える必要があることに注意してください (例: 5):

```graphql
mutation {
  deletePost(id: 5) {
    id
  }
}
```

</details>

## アプリの進化

アプリケーションを進化させるには、通常、次の 2 つの手順が必要です。

1. Prisma Migrate を使用してデータベースを移行する
2. アプリケーション コードを更新する

次の例のシナリオでは、ユーザーがプロファイルを作成し、自分自身についての短い略歴を書くことができる "プロファイル" 機能をアプリに追加するとします。

### 1. `Prisma Migrate` を使用してデータベースを移行する

最初のステップは、新しいテーブルを追加することです。データベースへの`Profile`と呼ばれます。これを行うには、Prisma スキーマ定義(`./prisma/schema.prisma`)ファイルに新しいモデルを追加し、その後移行を実行します。

```diff
// ./prisma/schema.prisma

model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  viewCount Int      @default(0)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
```

データモデルを更新したら、次のコマンドを使用してデータベースに対して変更を実行できます。

```bash
pnpm exec prisma migrate dev --name add-profile
```

これにより、`prisma/migrations` ディレクトリに別の移行が追加され、データベースに新しい `Profile` テーブルが作成されます。

### 2. アプリケーションコードを更新する

`PrismaClient` インスタンスを使用して、新しい `Profile` テーブルに対して操作を実行できるようになりました。これらの操作を使用して、 `GraphQL API` でクエリとミューテーションを実装できます。

#### 2.1. GraphQL スキーマに `Profile` タイプを追加します

まず、新しい `profile.ts` ファイルを作成し、`Pothos` の `prismaObject` 関数を介して新しい `GraphQL` タイプを追加します。

```diff
// ./src/schema/profile.ts
+import { builder } from "../builder";

+builder.prismaObject('Profile', {
+  fields: (t) => ({
+    id: t.exposeInt('id'),
+    bio: t.exposeString('bio', { nullable: true }),
+    user: t.relation('user'),
+  }),
+})
```

`User` オブジェクトタイプを更新して、 `profile` フィールドを含めます。

```diff
// ./src/schema/user.ts

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email'),
    posts: t.relation('posts'),
+    profile: t.relation('profile'),
  }),
})
```

#### 2.2. `GraphQL` ミューテーション(`createProfile`) を追加する

```diff
// ./src/schema/profile.ts
import { builder } from "../builder";
+import { prisma } from '../db'
+import { UserUniqueInput } from './user';

// ... object type


+builder.mutationField('createProfile', (t) =>
+  t.prismaField({
+    type: 'Profile',
+    args: {
+      bio: t.arg.string({ required: true }),
+      data: t.arg({ type: UserUniqueInput })
+    },
+    resolve: async (query, _parent, args, _context) =>
+      prisma.profile.create({
+        ...query,
+        data: {
+          bio: args.bio,
+          user: {
+            connect: {
+              id: args.data?.id || undefined,
+              email: args.data?.email || undefined
+            }
+          }
+        }
+      })
+  })
+)
```

最後に、次のように新しいミューテーションをテストできます。

```graphql
mutation {
  createProfile(
    data: { email: "mahmoud@prisma.io" }
    bio: "I like turtles"
  ) {
    id
    bio
    user {
      id
      name
    }
  }
}
```

<details><summary>展開して <code>Profile</code> の <code>Prisma Client</code> クエリーをさらに表示</summary>

以下は、新しい <code>Profile</code> モデルでの <code>Prisma Client</code> クエリーのサンプルコードです。

##### 既存ユーザーの新しいプロファイルを作成する

```ts
const profile = await prisma.profile.create({
  data: {
    bio: 'Hello World',
    user: {
      connect: { email: 'alice@prisma.io' },
    },
  },
})
```

##### 新しいプロファイルで新しいユーザーを作成する

```ts
const user = await prisma.user.create({
  data: {
    email: 'john@prisma.io',
    name: 'John',
    profile: {
      create: {
        bio: 'Hello World',
      },
    },
  },
})
```

##### 既存ユーザーのプロファイルを更新する

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: 'alice@prisma.io' },
  data: {
    profile: {
      update: {
        bio: 'Hello Friends',
      },
    },
  },
})
```

</details>

## 別のデータベースに切り替える

別のデータベースで試してみたい場合は、`datasource` ブロックを再構成することにより、`Prisma`スキーマ定義(`./prisma/schema.prisma`) でデータベース接続を調整できます。

[ドキュメント](https://www.prisma.io/docs/reference/database-reference/connection-urls)でさまざまな接続構成の詳細を確認してください。

<details><summary>展開して、さまざまなデータベースを使用した構成例の概要を確認します</summary>

### PostgreSQL

PostgreSQL の場合、接続 URL の構造は次のとおりです。

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
}
```

ローカル PostgreSQL データベースを使用した接続文字列の例を次に示します。

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://janedoe:mypassword@localhost:5432/notesapi?schema=public"
}
```

### MySQL

MySQL の場合、接続 URL の構造は次のとおりです。

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```

ローカルの MySQL データベースを使用した接続文字列の例を次に示します。

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://janedoe:mypassword@localhost:3306/notesapi"
}
```

### Microsoft SQL Server

ローカルの Microsoft SQL Server データベースとの接続文字列の例を次に示します。

```prisma
datasource db {
  provider = "sqlserver"
  url      = "sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
}
```

### MongoDB

ローカル MongoDB データベースを使用した接続文字列の例を次に示します。

```prisma
datasource db {
  provider = "mongodb"
  url      = "mongodb://USERNAME:PASSWORD@HOST/DATABASE?authSource=admin&retryWrites=true&w=majority"
}
```

</details>

## 次のステップ

- [Prisma ドキュメント](https://www.prisma.io/docs) を確認する
- [Prisma Slack](https://slack.prisma.io/) の [`#product-wishlist`](https://prisma.slack.com/messages/CKQTGR6T0/) チャンネルでフィードバックを共有してください
- [GitHub](https://github.com/prisma/prisma/) で問題を作成して質問する
- [Youtube](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w) で隔週の `What's new in Prisma` ライブストリームをご覧ください。
