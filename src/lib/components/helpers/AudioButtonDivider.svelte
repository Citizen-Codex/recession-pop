<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Divider from '$lib/components/helpers/Divider.svelte';

	let visible = false;
	let triggered = false;
	let container;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !triggered) {
					visible = true;
					triggered = true; // ensures it only runs once
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);

		if (container) observer.observe(container);

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={container}
	class="relative flex items-center justify-center w-full"
>
	<Divider type="normal" />

	{#if visible}
		<div
			class="absolute flex items-center justify-center"
			in:fly={{ y: 20, opacity: 0, duration: 1000 }}
		>
			<div class="w-full h-full p-4 bg-gradient-to-b from-[#3A3A3A] to-[#001121] rounded outline-1 outline-[#2DF70A] outline-offset-[-1px] flex justify-start items-center gap-2.5 transition-transform duration-200 ease-in-out hover:scale-[1.025] uppercase font-mono text-white text-sm md:text-base text-center">
				<p>this is an audio story
					<br>turn on sound for best experience</p>
				<!-- <img src="assets/icons/audio.svg" alt="audio button"/> -->
			</div>
		</div>
	{/if}
</div>
