<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<blockquote>
		<h2>ユーザーの一覧</h2>
		<a href="/user/edit"><b>作成</b></a>
	</blockquote>
</section>

<section>
	{#each data.users as user}
		<aside>
			<a href="/user/view?id={user.id}">
				<h3>
					{user.username}
					{user.name != '' ? '(' + user.name + ')' : ''}
				</h3>
				<p>{user.email}</p>
			</a>
		</aside>
	{/each}
</section>
