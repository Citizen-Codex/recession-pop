<script lang="ts">
	import Background from '$lib/components/helpers/HeroBackground.svelte';
	import Wordmark from '$lib/components/helpers/Wordmark.svelte';
	import Window from '$lib/components/helpers/Window.svelte';
	import AudioButton from '$lib/components/helpers/AudioButton.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';
</script>


<section class="bg-black relative flex h-screen w-full flex-col items-center justify-center text-center">

	<div class="absolute inset-0 -z-10">
		<Background />
	</div>
	
	<div class="mb-20">
		<Wordmark />
	</div>	

	<div class="relative flex flex-col items-center gap-12">

		<!-- Title -->
		<div class="max-w-4xl">
			<img src="/assets/header.png" alt="Header" />
		</div>

		<!-- Subheading -->
		<div class="-mt-20 uppercase max-w-lg">
			<Window>
				{@html md(page.data.dek)}
			</Window>
		</div>

		<!-- Credits -->
		<p class="credits">
			{@html md(page.data.cred)}
		</p>

		<!-- Audio button -->
		<div class="">
			<AudioButton />
		</div>

	</div>
</section>