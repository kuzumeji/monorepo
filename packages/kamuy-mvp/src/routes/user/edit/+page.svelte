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
    <label for="name">氏名：</label>
    <input
      id="name"
      name="name"
      type="text"
      size="40"
      placeholder="例：山本太郎"
      bind:value={user.name}
    />
    <blockquote>
      <a href="/user"><i>戻る</i></a>
      <button type="submit">保存</button>
    </blockquote>
  </form>
</section>
