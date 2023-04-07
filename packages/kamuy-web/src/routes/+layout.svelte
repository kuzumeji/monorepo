<script lang="ts">
	import { collection } from '$lib/collection';
	let user: string;
	collection('User')
		?.findOne()
		.then((data) => {
			console.log('user:' + JSON.stringify(data));
			user = data['name'];
		});
</script>

<header>
	<nav>
		<a href="/"
			><img alt="Kamuy" src="https://via.placeholder.com/200x70?text=Kamuy" height="70" /></a
		>
		<ul>
			<li><a href="/">Home</a></li>
			<li><small>Signed in as {user}</small></li>
		</ul>
	</nav>
</header>
<main><slot /></main>
<footer>Contact info</footer>
