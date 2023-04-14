<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const { users } = data;
</script>

<section>
	<blockquote>ユーザの一覧</blockquote>
</section>
<section>
	<table>
		<caption>
			<a href="/user/edit">新規作成</a>
		</caption>
		<thead>
			<tr>
				<th>ユーザー名</th>
				<th>氏名</th>
				<th>メールアドレス</th>
				<th colspan="3" />
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<td>{user.username}</td>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td><a href="/user/view?id={user.id}">閲覧</a></td>
					<td><a href="/user/edit?id={user.id}">編集</a></td>
					<td><a href="/user/delete?id={user.id}">削除</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
