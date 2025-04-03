<script>
	import { onMount } from 'svelte';

	let wrapper;

	// Enable vertical scroll -> horizontal scroll mapping
	onMount(() => {
		wrapper.addEventListener(
			'wheel',
			(e) => {
				e.preventDefault();
				wrapper.scrollLeft += e.deltaY;
			},
			{ passive: false }
		);
	});

	let albums = [
		{ src: '/assets/covers/brat.jpeg', alt: 'Album cover 1' },
		{ src: '/assets/covers/sabrina.jpeg', alt: 'Album cover 2' },
		{ src: '/assets/covers/chappell.jpeg', alt: 'Album cover 3' },
		{ src: '/assets/covers/brat.jpeg', alt: 'Album cover 4' },
		{ src: '/assets/covers/sabrina.jpeg', alt: 'Album cover 5' },
		{ src: '/assets/covers/chappell.jpeg', alt: 'Album cover 6' }
	];
</script>

<div bind:this={wrapper} class="wrapper">
	<div class="scroll-row">
		{#each albums as album}
			<img src={album.src} alt={album.alt} class="cover" />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		border: 2px solid #333;
		height: 100vh;
	}

	.scroll-row {
		display: inline-flex;
		gap: 1rem;
		padding: 1rem;
		min-width: max-content;
	}

	.cover {
		width: 300px;
		height: 300px;
		object-fit: cover;
		flex-shrink: 0;
	}
</style>
