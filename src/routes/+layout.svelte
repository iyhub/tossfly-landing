<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/sections/Footer.svelte';

	let { children } = $props();
</script>

<main class="mx-auto max-w-screen-2xl p-2">
	{@render children()}
	<Footer />
</main>
