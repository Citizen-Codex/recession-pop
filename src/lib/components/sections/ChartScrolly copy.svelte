<!-- <script>
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['charts'];

	import Scrolly from "$lib/components/helpers/Scrolly.svelte";
	import SongsCharts from "$lib/components/sections/SongsCharts.svelte";
  
  
	let scrollIndex;


	</script>


<section class="relative w-full gap-16 mx-auto">

	<div class="sticky top-0 transition-all duration-1000 min-h-screen m-0 z-0 flex items-center justify-center">
		<div class="w-4/5 max-w-screen-lg">
			<SongsCharts {scrollIndex} />
		</div>
	</div>
	

	<div class="relative z-10 transform translate-x-0 translate-y-0">
		<Scrolly bind:value={scrollIndex}>
			{#each content.steps as step, i (i)}
				<div
					class="body mb-[90vh] flex max-h-52 max-w-md flex-col items-center justify-center gap-4 border-3 border-black bg-white p-6 shadow-[6px_6px_0px_#01EFFE]"
				>
					<p class="body text-left">{@html md(step.content)}</p>
				</div>
			{/each}
		</Scrolly>
	</div>

	  
	<div class="h-[75vh]" />
</section> -->

<script>
	import Scroller from '@sveltejs/svelte-scroller';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['charts'];

	// import Scrolly from "$lib/components/helpers/Scrolly.svelte";
	import SongsCharts from "$lib/components/sections/SongsCharts.svelte";
  
  
	let scrollIndex;


	$: console.log('Scroll Index:', scrollIndex);

	</script>

<Scroller top={0.1} threshold={0.5} bottom={0.8} query=".step" bind:scrollIndex>
	{#snippet background()}
		<div class="sticky top-0 transition-all duration-1000 min-h-screen m-0 z-0 flex items-center justify-center">
			<div class="w-4/5 max-w-screen-lg">
				<SongsCharts {scrollIndex} />
			</div>
		</div>
	{/snippet}

	{#snippet foreground()}
	{#each content.steps as step, i (i)}
	<div
		class="step body mb-[90vh] flex max-h-52 max-w-md flex-col items-center justify-center gap-4 border-3 border-black bg-white p-6 shadow-[6px_6px_0px_#01EFFE]"
	>
		<p class="body text-left">{@html md(step.content)}</p>
	</div>
{/each}

	{/snippet}
</Scroller>
