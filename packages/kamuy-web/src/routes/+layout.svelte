<script lang="ts">
	import { onMount } from 'svelte';
	import * as Realm from 'realm-web';
	const {
		BSON: { ObjectId }
	} = Realm;
	let username: string;
	onMount(async () => {
		console.log('the component has mounted');
		const app = new Realm.App({ id: 'data-gipvp' });
		// const credentials = Realm.Credentials.anonymous();
		const user = await app.logIn(Realm.Credentials.anonymous());
		console.assert(user.id === app.currentUser?.id);
		user.mongoClient('Cluster0').db('kamuy').collection('User')
			?.findOne()
			.then((data) => {
				console.log('user:' + JSON.stringify(data));
				username = data['name'];
			});
	});
	// import { realmUser } from '$lib/realmUser';
	// import { collection } from '$lib/collection';
	// const _realmUser = realmUser();
</script>

<header>
	<nav>
		<a href="/"
			><img alt="Kamuy" src="https://via.placeholder.com/200x70?text=Kamuy" height="70" /></a
		>
		<ul>
			<li><a href="/">Home</a></li>
			<li><small>Signed in as {username}</small></li>
		</ul>
	</nav>
</header>
<main><slot /></main>
<footer>Contact info</footer>
