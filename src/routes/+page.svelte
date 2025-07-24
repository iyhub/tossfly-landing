<script lang="ts">
	import type { PageData } from './$types';
	import { postsQuery as query, type Post } from '$lib/sanity/queries';
	import { useQuery } from '@sanity/svelte-loader';
	import { ArrowUpRight } from 'phosphor-svelte';
	import Header from '$lib/components/sections/Header.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Image } from '@unpic/svelte';
	import { urlFor } from '$lib/sanity/image';
	import * as Select from '$lib/components/ui/select/index.js';

	const { data } = $props<{ data: PageData }>();
	let count = $state(data.count);
	let perPage = $state(data.options.pageSize);
	const q = useQuery(data);

	let posts = $state<Post[]>($q.data as Post[]);
	let sections = $state(data.options.sections.data);
	let categories = $state(data.options.categories.data);
	let styles = $state(data.options.styles.data);
	let techStacks = $state(data.options.techStacks.data);
	let products = $state(data.options.products.data);

	let selectedSectionType = $state('all');

	// Select options
	const sectionTypeOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'blog', label: 'Blog' },
		{ value: 'project', label: 'Project' }
	];

	$inspect(posts);
</script>

<svelte:head>
	<title>AI SaaS landing page inspiration - Tossfly</title>
	<meta name="description" content="A curated collection of AI SaaS landing pages" />
	<meta property="og:title" content="AI SaaS landing page inspiration - Tossfly" />
	<meta property="og:description" content="A curated collection of AI SaaS landing pages" />
	<meta property="og:image" content="https://tossfly.com/og-image.png" />
	<meta property="og:url" content="https://tossfly.com" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="AI SaaS landing page inspiration - Tossfly" />
	<meta name="twitter:description" content="A curated collection of AI SaaS landing pages" />
	<meta name="twitter:image" content="https://tossfly.com/og-image.png" />
</svelte:head>
<!-- <Header /> -->

<section class="py-12">
	<h1 class="text-center text-2xl font-bold md:text-4xl">AI SaaS landing page inspiration</h1>
	<p class="text-muted-foreground mt-2 text-center">
		A curated collection of AI SaaS landing pages
	</p>
</section>

<!-- <pre>{JSON.stringify(sections, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(categories, null, 2)}</pre>
<pre>{JSON.stringify(styles, null, 2)}</pre>
<pre>{JSON.stringify(techStacks, null, 2)}</pre> -->

<!-- Blogs:
{#each posts as post}
	<h1>{post.title}</h1>
{/each}
<h1>Sections</h1>
{#each sections as section}
	<h1>{section.name}</h1>
{/each} -->

<!-- filters -->
<!-- <div class="bg-card flex w-full flex-col items-center justify-center gap-1 md:flex-row">
	<Select.Root type="single">
		<Select.Trigger class="h-full w-full">Section Type</Select.Trigger>
		<Select.Content>
			{#each sections as section}
				<Select.Item value={section.slug.current}>{section.name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Select.Root type="single">
		<Select.Trigger class="h-full w-full">Category</Select.Trigger>
		<Select.Content>
			{#each categories as category}
				<Select.Item value={category.slug.current}>{category.name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Select.Root type="single">
		<Select.Trigger class="h-full w-full">Tech Stack</Select.Trigger>
		<Select.Content>
			{#each techStacks as techStack}
				<Select.Item value={techStack.slug.current}>{techStack.name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<Select.Root type="single">
		<Select.Trigger class="h-full w-full">Style</Select.Trigger>
		<Select.Content>
			{#each styles as style}
				<Select.Item value={style.slug.current}>{style.name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div> -->

<div class="mt-4 grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2 lg:grid-cols-3">
	{#each products as product, index}
		<div class="group flex flex-col gap-2">
			<div
				class="bg-card group group-hover:ring-primary relative h-[600px] w-full transition-all duration-300 group-hover:ring-2"
			>
				<a
					href={`${product.url}?utm_source=tossfly.com&utm_medium=referral` || ''}
					rel="noopener noreferrer"
					target="_blank"
					class="absolute top-2 right-2 hidden group-hover:block"
				>
					<ArrowUpRight class="text-primary h-5 w-5" />
				</a>
				<Image
					src={urlFor(product.mainImage).fit('max').url()}
					layout="constrained"
					loading="lazy"
					alt={product.title}
					class="h-full w-full object-cover object-top"
				/>
			</div>
			<a
				href={`${product.url}?utm_source=tossfly.com&utm_medium=referral` || ''}
				rel="noopener noreferrer"
				target="_blank"
			>
				<h3
					class="after:bg-primary/90 relative inline-block w-fit overflow-hidden font-serif text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 after:ease-out group-hover:after:w-full"
				>
					{product.title}
				</h3>
			</a>
		</div>
	{/each}
</div>
