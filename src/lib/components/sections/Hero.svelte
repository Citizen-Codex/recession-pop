<script lang="ts">
	import Background from '$lib/components/helpers/HeroBackground.svelte';
	import Wordmark from '$lib/components/helpers/Wordmark.svelte';
	import Window from '$lib/components/helpers/Window.svelte';
	import AudioButton from '$lib/components/helpers/AudioButton.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';
</script>

<section
	class="relative flex h-screen w-full flex-col items-center justify-center text-center"
>
	<div class="absolute inset-0 -z-10">
		<Background />
	</div>

	<div class="mb-20">
		<Wordmark />
	</div>

	<div class="relative flex flex-col items-center gap-12">
		<!-- Title -->
		<div class="max-w-6xl">
			<img src="/assets/header.png" alt="Header" />
		</div>

		<div class="relative">
			<!-- Subheading  -->
			<div class="-mt-20 max-w-lg uppercase text-xl">
			  <Window>
				{@html md(page.data.dek)}
			  </Window>
			</div>
		  
			<!-- Notes icon -->
			<img 
			  src="assets/icons/notes.svg" 
			  alt="notes icon" 
			  class="absolute left-[-100px] top-0"
			/>

			<!-- Cursor icon -->
			<img 
			  src="assets/icons/cursor.svg" 
			  alt="notes icon" 
			  class="absolute right-[-30px] top-40"
			/>
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
