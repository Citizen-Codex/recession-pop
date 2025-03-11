<script lang="ts">
	import Background from '$lib/components/helpers/HeroBackground.svelte';
	import Wordmark from '$lib/components/helpers/Wordmark.svelte';
	import Audio from '$lib/components/helpers/Audio.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';
</script>


<section class="relative flex h-screen w-full flex-col items-center justify-center text-center">

	<div class="absolute inset-0 -z-10">
		<Background />
	</div>
	
	<Wordmark />	

	<div class="relative flex flex-col items-center gap-12">

		<!-- Title -->
		<div class="max-w-4xl">
			<img src="/assets/header.png" alt="Header" />
		</div>

		<!-- Subheading -->
		<p class="subheading p-6 px-24 text-black font-b bg-white border-gray border-2 shadow-[4px_4px_var(--color-purple)] max-w-xl">{page.data.dek}</p>

		<!-- Credits -->
		<p class="credits">
			{@html md(page.data.cred)}
		</p>

		<!-- Audio button -->
		<div class="mt-10">
			<Audio />
		</div>

	</div>
</section>