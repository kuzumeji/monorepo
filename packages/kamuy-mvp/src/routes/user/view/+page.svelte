<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<table>
		<caption>
			<blockquote>ユーザの閲覧</blockquote>
		</caption>
		<tbody>
			<tr>
				<td>ユーザー名</td>
				<td>{data.user.username}</td>
			</tr>
			<tr>
				<td>住所</td>
				<td>{data.user.address}</td>
			</tr>
			<tr>
				<td>氏名</td>
				<td>{data.user.name}</td>
			</tr>
			<tr>
				<td>メールアドレス</td>
				<td>{data.user.email}</td>
			</tr>
			<tr>
				<td>生年月日</td>
				<td>{data.birthday}</td>
			</tr>
		</tbody>
	</table>
</section>
<section>
	<blockquote>
		<a href="/user"><i>戻る</i></a>
	</blockquote>
</section>
