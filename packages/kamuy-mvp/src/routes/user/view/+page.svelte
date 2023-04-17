<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<blockquote>
		<h2>ユーザーの詳細</h2>
	</blockquote>
</section>
<section>
	<aside>
		<p>{data.user.username}</p>
		<p>{data.user.address}</p>
		<p>{data.user.name}</p>
		<p>{data.user.email}</p>
		<p>{data.birthday}</p>
	</aside>
</section>
<section>
	<blockquote>
		<a href="/user"><i>戻る</i></a>
		<a href="/user/edit?id={data.user.id}"><b>編集</b></a>
	</blockquote>
</section>
