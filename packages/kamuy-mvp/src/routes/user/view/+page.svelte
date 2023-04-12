<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  const user = data;
</script>

<section>
  <blockquote>ユーザの閲覧</blockquote>
</section>
<section>
  <form>
    <label for="email">メールアドレス：</label>
    <h3 id="email">{user.email}</h3>
    <label for="name">氏名：</label>
    <h3 id="name">{user.name}</h3>
    <blockquote>
      <a href="/user"><i>戻る</i></a>
    </blockquote>
  </form>
</section>
