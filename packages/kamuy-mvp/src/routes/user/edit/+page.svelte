<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  const user = data;
</script>

<section>
  <blockquote>ユーザの{user.id != null ? "編集" : "作成"}</blockquote>
</section>
<section>
  <form method="POST">
    <input id="id" name="id" type="hidden" bind:value={user.id} />
    <label for="username">ユーザー名：</label>
    <input
      id="username"
      name="username"
      type="text"
      size="20"
      placeholder="例：account"
      bind:value={user.username}
    />
    <label for="sex">性別：</label>
    <input
      id="sex"
      name="sex"
      type="text"
      size="10"
      placeholder="例：男女"
      bind:value={user.sex}
    />
    <label for="address">住所：</label>
    <input
      id="address"
      name="address"
      type="text"
      size="100"
      placeholder="例：東京都港区芝公園４−２−８"
      bind:value={user.address}
    />
    <label for="name">氏名：</label>
    <input
      id="name"
      name="name"
      type="text"
      size="20"
      placeholder="例：山本太郎"
      bind:value={user.name}
    />
    <label for="email">メールアドレス：</label>
    <input
      id="email"
      name="email"
      type="email"
      required
      size="40"
      placeholder="例：you@gmail.com"
      bind:value={user.email}
    />
    <label for="birthday">生年月日：</label>
    <input
      id="birthday"
      name="birthday"
      type="text"
      required
      size="40"
      placeholder="例：1980-01-01"
      bind:value={user.birthday}
    />
    <blockquote>
      <a href="/user"><i>戻る</i></a>
      <button type="submit">保存</button>
    </blockquote>
  </form>
</section>
