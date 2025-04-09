<script>
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import { onMount } from 'svelte';

	// sticky the container, transform on x axis
	// translate x
	
	const content = page.data['albums'];
	let wrapper;
	let albumsContainer;
	let textContainer;
	let isFullyVisible = false;
	let isLocked = false;

	// parallax scrolling
	onMount(() => {
	let hasScrolledIntoView = false;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
					isFullyVisible = true;

					if (!isLocked) {
						isLocked = true;
						wrapper.scrollIntoView({ behavior: 'instant', block: 'start' }); 
					}
				} else {
					isFullyVisible = false;
				}
			}
		},
		{
			root: null,
			threshold: 0.9
		}
	);


	if (wrapper) {
		observer.observe(wrapper);
	}

	const handleScroll = (e) => {
		if (!isFullyVisible) return;

		const albumsScrollLeft = albumsContainer.scrollLeft;
		const textScrollLeft = textContainer.scrollLeft;

		const albumsMax = albumsContainer.scrollWidth - albumsContainer.clientWidth;
		const textMax = textContainer.scrollWidth - textContainer.clientWidth;

		const scrollingLeft = e.deltaY < 0;
		const canScrollAlbums = scrollingLeft ? albumsScrollLeft > 0 : albumsScrollLeft < albumsMax;
		const canScrollText = scrollingLeft ? textScrollLeft > 0 : textScrollLeft < textMax;

		if (canScrollAlbums || canScrollText) {
			e.preventDefault();

			const albumsScrollRatio = albumsMax > 0 ? albumsMax / Math.max(albumsMax, textMax) : 1;
			const textScrollRatio = textMax > 0 ? textMax / Math.max(albumsMax, textMax) : 1;

			albumsContainer.scrollLeft += e.deltaY * albumsScrollRatio;
			textContainer.scrollLeft += e.deltaY * textScrollRatio;
		}
	};

	wrapper.addEventListener('wheel', handleScroll, { passive: false });

	return () => {
		wrapper.removeEventListener('wheel', handleScroll);
		observer.disconnect();
	};
});

	
	let albums = [
		{ src: '/assets/covers/cover_brat.png', alt: 'brat album cover' },
		{ src: '/assets/covers/cover_sabrina.png', alt: 'sabrina album cover' },
		{ src: '/assets/covers/cover_chappell.png', alt: 'chappell album cover' },
		{ src: '/assets/covers/cover_kesha.png', alt: 'kesha album cover' },
		{ src: '/assets/covers/cover_bep.png', alt: 'black eyed pease album cover' },
		{ src: '/assets/covers/cover_miley.png', alt: 'miley cyrus album cover' },
		{ src: '/assets/covers/cover_gaga.png', alt: 'lady gaga album cover' },
		{ src: '/assets/covers/cover_bey.png', alt: 'beyonce album cover' },
		{ src: '/assets/covers/cover_katy.png', alt: 'katy perry album cover' },
	];
	</script>
	

<div bind:this={wrapper} class="w-full h-screen overflow-hidden flex flex-col justify-center gap-16 border-blue-500 border-3"> <!--  border-blue-500 border-2 -->

	<div bind:this={albumsContainer} class="w-full overflow-x-hidden">
	  <div class="inline-flex gap-16 p-4 min-w-max">
		{#each albums as album}
		  <img src={album.src} alt={album.alt} class="max-w-[350px]" />
		{/each}
	  </div>
	</div>
	
	<div bind:this={textContainer} class="w-full overflow-x-hidden py-4">
		<div class="flex flex-row">
		  {#each content.steps as step, i (i)}
			<div class="min-w-[100vw] flex justify-center items-start border-amber-500 border-3"> <!-- border-amber-500 border-3 !-->
			  <div class="border-3 border-black bg-white px-8 shadow-[6px_6px_0px_#2DF70A] max-w-xl inline-block">
				<p class="body">
				  {@html md(step.content)}
				</p>
			  </div>
			</div>
		  {/each}
		</div>
	  </div>
	  

  </div>

