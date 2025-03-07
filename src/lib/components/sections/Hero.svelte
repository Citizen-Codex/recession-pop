<script lang="ts">
	import Background from '$lib/components/helpers/HeroBackground.svelte';
	import { page } from '$app/state';
</script>

<section class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
	<Background />

	<div class="content-well-medium relative flex flex-col items-center gap-8 text-center">
		<h1 class="py-8 text-8xl font-semibold text-yellow-cc">{page.data.hed}</h1>
		<p class="subheading border-y border-white p-6 font-medium text-white">{page.data.dek}</p>
	</div>
</section>
