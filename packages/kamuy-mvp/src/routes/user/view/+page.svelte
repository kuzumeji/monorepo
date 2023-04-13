<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const user = data;
</script>

<section>
	<blockquote>ユーザの閲覧</blockquote>
</section>
<section>
	<table>
		<tbody>
			<tr>
				<td>ユーザー名</td>
				<td>{user.username}</td>
			</tr>
			<tr>
				<td>性別</td>
				<td>{user.sex}</td>
			</tr>
			<tr>
				<td>住所</td>
				<td>{user.address}</td>
			</tr>
			<tr>
				<td>氏名</td>
				<td>{user.name}</td>
			</tr>
			<tr>
				<td>メールアドレス</td>
				<td>{user.email}</td>
			</tr>
			<tr>
				<td>生年月日</td>
				<td>{user.birthday.toISOString().split('T')[0]}</td>
			</tr>
		</tbody>
	</table>
</section>
<section>
	<blockquote>
		<a href="/user"><i>戻る</i></a>
	</blockquote>
</section>
