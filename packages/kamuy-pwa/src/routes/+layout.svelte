<svelte:head>
  <title>home (kamuy)</title>
</svelte:head>
<header>
  <nav>
    <a href="/"
      ><img
        alt="Logo"
        src="https://via.placeholder.com/100x30/118bee/FFF/?text=Kamuy"
        height="50"
      /></a
    >
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/user">User</a></li>
      <li>
        <a href="#3">三</a>
        <ul>
          <li><a href="/about">About</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</header>
<main>
  <slot />
</main>
<footer>
  <hr />
  <p>
    <small
      >Kamuy is <a href="https://github.com/ua4iugi/kamuy#readme"
        >free and open source software</a
      > released under the AGPLv3 license.</small
    >
  </p>
</footer>
