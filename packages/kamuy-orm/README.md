# Kamuy-ORM

- TypeScript プロジェクトの作成と Prisma のセットアップ

  ```sh
  $ pnpm init
  $ pnpm add -D typescript ts-node @types/node
  $ pnpm exec tsc --init
  $ pnpm add -D prisma
  $ pnpm exec prisma init --datasource-provider=mongodb
  ```

- データベースを接続する

  - [MongoDB Cloud] をセットアップする
    - サインアップする(Google|GitHub と ID 連携も OK)
    - ログインする
    - `ORGANIZATION` からプロジェクトを作成する(`kamuy-db`)
    - `Data Services`/`Database` からクラスターを作成する(`Cluster0`)
      - `Browse Collections` からデータベースを作成する(`kamuy`)
        - `kamuy` ユーザのパスワードを記録しておく
      - `Connect` の `Connect you application` から URL を記録する
        - 例:`mongodb+srv://kamuy:<password>@cluster0.riulps0.mongodb.net/?retryWrites=true&w=majority`
    - `App Services`/`Create a New App` からアプリを作成する(`data`)
      ```text
      App ID: data-gipvp
      region: Singapore (ap-southeast-1) • AWS
      ```
    - `Data API` からデータ API をセットアップする TODO:削除予定
      - [Read and Write with the Data API](https://www.mongodb.com/docs/atlas/api/data-api/)
      - `Data API Key` を記録しておく

- Prisma と データベースのモデルを同期する
  - Prisma の DB 接続先を設定する(`.env`)
    - 下記の `<password>` は上記で記録した `kamuy` ユーザのパスワードを指定する
      ```text
      DATABASE_URL="mongodb+srv://kamuy:<password>@cluster0.riulps0.mongodb.net/kamuy"
      ```
  - Prisma のスキーマを作成する
    - 参考:[Creating the Prisma schema](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/creating-the-prisma-schema-typescript-mongodb)
  - Prisma クライアントのインストールと生成する
    - インストールする(`$ pnpm add @prisma/client`)
    - 生成する(`pnpm exec prisma generate`)
  - データベースへ初期データを作成する
    - ビルドルールへ初期データ作成スクリプトを登録する(`package.json`)
      ```text
      "prisma": {
        "seed": "ts-node prisma/seed.ts"
      },
      ```
    - 初期データ作成スクリプトを作成する
      - 参考:[Querying the database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/querying-the-database-typescript-mongodb)
    - データベースへ初期データを作成する(`$ pnpm exec prisma db seed`)
      - キー制約エラー回避のためデータを登録する前に該当テーブルを削除する
        ```text
        await prisma.post.deleteMany();
        await prisma.user.deleteMany();
        ```

[MongoDB Cloud]: https://cloud.mongodb.com/
