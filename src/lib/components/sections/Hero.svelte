<script lang="ts">
	import Background from '$lib/components/helpers/HeroBackground.svelte';
	import Wordmark from '$lib/components/helpers/Wordmark.svelte';
	import Window from '$lib/components/helpers/Window.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';
</script>


<section class="relative flex h-svh w-full flex-col items-center justify-center text-center min-h-[650px]">
	<div class="absolute inset-0 -z-10">
		<Background />
	</div>

	<div class="absolute top-8 max-w-50 text-white">
		<a href={page.data.publisher_url} aria-current="page" class="logo-link w-inline-block w--current"
		><Wordmark /></a>
	</div>

	<div class="relative flex flex-col items-center gap-8 md:gap-12 top-8">
		<!-- Title -->
		<div class="max-w-2xl md:max-w-4xl px-4">
			<img src="/assets/header.png" alt="Header" />
		</div>

		<div class="relative">
			<!-- Subheading  -->
			<div class="md:-mt-20 md:text-4xl md:px-0 px-4 max-w-xl uppercase text-2xl font-title">
			  <Window>
				{@html md(page.data.dek)}
			  </Window>
			</div>
		  
			<!-- Notes icon -->
			<img 
			  src="assets/icons/notes.svg" 
			  alt="notes icon" 
			  class="hidden md:block absolute left-[-10vw] top-0"
			/>

			<!-- Cursor icon -->
			<img 
			  src="assets/icons/cursor.svg" 
			  alt="notes icon" 
			  class="absolute right-4 md:right-[-8vw] top-40 w-12 md:w-auto"
			/>
		  </div>
		  

		<!-- Credits -->
		<p class="credits">
			{@html md(page.data.cred)}
		</p>

	</div>
</section>
