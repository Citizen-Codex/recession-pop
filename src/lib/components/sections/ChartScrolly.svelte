<script>
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import Scrolly from "$lib/components/helpers/Scrolly.svelte";
	import SongsCharts from "$lib/components/sections/SongsCharts.svelte";

	const content = page.data['charts'];

	let scrollIndex;

	// split text by double newline into paragraphs
	function splitParagraphs(text) {
		return text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
	}

	$: shadowClass = 
	(scrollIndex >= 0 && scrollIndex <= 1) ? 'shadow-[6px_6px_0px_#FFD000]' :
	(scrollIndex >= 2 && scrollIndex <= 5) ? 'shadow-[6px_6px_0px_#D3D3D3]' :
	(scrollIndex >= 6 && scrollIndex <= 8) ? 'shadow-[6px_6px_0px_#01EFFE]' :
	(scrollIndex >= 9) ? 'shadow-[6px_6px_0px_#FE88F9]' : '';

</script>

<div class="w-full bg-black">
	<section class="top-0 relative w-4/5 gap-16 mx-auto z-0">
		<div class="sticky top-0 transition-all duration-5000 min-h-screen m-0 z-0 flex items-center justify-center">
			<div class="w-full h-full">
				<SongsCharts {scrollIndex} />
			</div>
		</div>
		
		<div class="h-[50vh]" />

		<div class="relative z-10 pointer-events-none max-w-xl mx-auto z-10">
			<Scrolly bind:value={scrollIndex}>
				{#each content.steps as step, i (i)}
					<div class="flex flex-col items-center justify-center gap-4 mb-[90vh] pointer-events-auto">
						<div class="body border-3 border-black bg-white px-6 py-0 {shadowClass} w-full">
							<p class="body text-left">{@html md(step.content)}</p>
						</div>
					</div>
			
					{#if i === 1}
						<div class="h-[100vh] w-full pointer-events-none"></div>
					{/if}
				{/each}
			</Scrolly>
			
		</div>
		
		<div class="h-[50vh]" />
	</section>
</div>