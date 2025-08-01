<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_CLARITY_ID } from '$env/static/public';
	import Header from '$lib/components/sections/Header.svelte';

	let { children } = $props();

	onMount(() => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", '${PUBLIC_CLARITY_ID}');
  `;
		document.head.appendChild(script);
	});
</script>
<Header />
<main class="mx-auto max-w-screen-2xl p-2">
	{@render children()}
	<Footer />
</main>
