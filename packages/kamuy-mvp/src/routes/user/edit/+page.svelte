<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<blockquote>ユーザの{data.user.id != null ? '編集' : '作成'}</blockquote>
</section>
<section>
	<form method="POST">
		<input id="id" name="id" type="hidden" bind:value={data.user.id} />
		<label for="username">ユーザー名：</label>
		{#if data.user.id == null}
			<input
				id="username"
				name="username"
				required
				type="text"
				placeholder="例：account"
				bind:value={data.user.username}
			/>
		{:else}
			<input
				id="username"
				name="username"
				disabled
				type="text"
				placeholder="例：account"
				bind:value={data.user.username}
			/>
		{/if}
		<label for="address">住所：</label>
		<input
			id="address"
			name="address"
			type="text"
			size="100"
			placeholder="例：東京都港区芝公園４−２−８"
			bind:value={data.user.address}
		/>
		<label for="name">氏名：</label>
		<input
			id="name"
			name="name"
			type="text"
			placeholder="例：山本太郎"
			bind:value={data.user.name}
		/>
		<label for="email">メールアドレス：</label>
		<input
			id="email"
			name="email"
			type="email"
			size="60"
			placeholder="例：you@gmail.com"
			bind:value={data.user.email}
		/>
		<label for="birthday">生年月日：</label>
		<input id="birthday" name="birthday" type="date" bind:value={data.birthday} />
		<blockquote>
			<a href="/user"><i>戻る</i></a>
			<button type="submit">保存</button>
		</blockquote>
	</form>
</section>
