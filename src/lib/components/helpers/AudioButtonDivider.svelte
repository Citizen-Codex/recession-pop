<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import AudioButton from '$lib/components/helpers/AudioButton.svelte';
	import Divider from '$lib/components/helpers/Divider.svelte';

	let showAudioButton = false;
	let container;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					showAudioButton = entry.isIntersecting;
				});
			},
			{ threshold: 0.5 }
		);

		if (container) {
			observer.observe(container);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<div
	bind:this={container}
	class="relative flex items-center justify-center w-full"
>
	<Divider type="normal" />

	{#if showAudioButton}
		<div
			class="absolute flex items-center justify-center"
			in:fly={{ y: 20, opacity: 0, duration: 1000 }}
			out:fly={{ y: -20, opacity: 0, duration: 500 }}
		>
			<AudioButton />
		</div>
	{/if}
</div>

  