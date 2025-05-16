<script lang="ts">
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import Scrolly from '$lib/components/helpers/Scrolly.svelte';
	import SongsCharts from '$lib/components/sections/SongsCharts.svelte';

	const content = page.data['charts'];

	let scrollIndex;
	let inView;

	// split text by double newline into paragraphs
	function splitParagraphs(text) {
		return text
			.split('\n\n')
			.map((p) => p.trim())
			.filter((p) => p.length > 0);
	}

	$: shadowClass =
		scrollIndex >= 0 && scrollIndex <= 1
			? 'shadow-[6px_6px_0px_#FFD000]'
			: scrollIndex >= 2 && scrollIndex <= 5
				? 'shadow-[6px_6px_0px_#D3D3D3]'
				: scrollIndex >= 6 && scrollIndex <= 8
					? 'shadow-[6px_6px_0px_#01EFFE]'
					: scrollIndex >= 9
						? 'shadow-[6px_6px_0px_#FE88F9]'
						: '';
</script>

<div class="w-full bg-black px-4 md:p-0 mx-auto">
	<section class="relative top-0 z-0 mx-auto w-4/5 gap-16">
		<div
			class="sticky top-0 z-0 m-0 flex min-h-lvh items-center justify-center transition-all duration-5000"
		>
			<div class="h-full w-full">
				<SongsCharts {scrollIndex} {inView} />
			</div>
		</div>

		<div class="h-[50lvh]" />

		<div class="pointer-events-none relative z-10 mx-auto max-w-xl">
			<Scrolly bind:value={scrollIndex} bind:inView>
				{#each content.steps as step, i (i)}
					<div
						class="pointer-events-auto mb-[90lvh] flex flex-col items-center justify-center gap-4"
					>
						<div class="body border-3 border-black bg-white px-4 py-4 md:p-8 {shadowClass} w-full">
							<p class="text-left">{@html md(step.content)}</p>
						</div>
					</div>

					{#if i === 1}
						<div class="pointer-events-none h-[100lvh] w-full"></div>
					{/if}
				{/each}
			</Scrolly>
		</div>

		<div class="h-[50lvh]" />
	</section>
</div>

