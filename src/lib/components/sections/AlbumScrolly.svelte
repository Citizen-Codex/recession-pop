<!-- 
animation from https://scroll-driven-animations.style/demos/cover-flow/css/
polyfill from https://github.com/flackr/scroll-timeline

// import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
-->

<script>
	

	let albums = [
		{ src: '/assets/covers/brat.jpeg', alt: 'Album cover 1' },
		{ src: '/assets/covers/sabrina.jpeg', alt: 'Album cover 2' },
		{ src: '/assets/covers/chappell.jpeg', alt: 'Album cover 3' },
		{ src: '/assets/covers/brat.jpeg', alt: 'Album cover 4' },
		{ src: '/assets/covers/sabrina.jpeg', alt: 'Album cover 5' },
		{ src: '/assets/covers/chappell.jpeg', alt: 'Album cover 6' },
		{ src: '/assets/covers/brat.jpeg', alt: 'Album cover 4' },
		{ src: '/assets/covers/sabrina.jpeg', alt: 'Album cover 5' },
		{ src: '/assets/covers/chappell.jpeg', alt: 'Album cover 6' }
	];
</script>

<div class="cards-wrapper overflow-x-auto overflow-y-hidden mx-auto flex flex-col justify-center border-blue-600 border-3">
	<ul class="cards inline-flex list-none whitespace-nowrap p-0 m-0 justify-start">
		{#each albums as album}
			<li>
				<img src={album.src} alt={album.alt} />
			</li>
		{/each}
	</ul>
</div>

<style>
	:global(:root) {
		--cover-size: 300px;
	}

	.cards-wrapper {
		max-width: calc(var(--cover-size) * 3);
		height: calc(var(--cover-size) * 3);
		scroll-snap-type: x mandatory;
	}
	
	.cards li {
		flex: 0 0 auto;
		width: var(--cover-size);
		aspect-ratio: 1;
		scroll-snap-align: center;
		position: relative;
		view-timeline-name: --li-in-and-out-of-view;
		view-timeline-axis: inline;
		animation: linear adjust-z-index both;
		animation-timeline: --li-in-and-out-of-view;
		perspective: 40em;
	}

	.cards li > img {
		width: 100%;
		height: auto;
		-webkit-box-reflect: below 0.5em linear-gradient(rgb(0 0 0 / 0), rgb(0 0 0 / 0.25));
		animation: linear rotate-cover both;
		animation-timeline: --li-in-and-out-of-view;
	}

	@keyframes adjust-z-index {
		0% {
			z-index: 1;
		}
		50% {
			z-index: 100;
		}
		100% {
			z-index: 1;
		}
	}

	@keyframes rotate-cover {
		0% {
			transform: translateX(-100%) rotateY(-45deg);
		}
		35% {
			transform: translateX(0) rotateY(-45deg);
		}
		50% {
			transform: rotateY(0deg) translateZ(1em) scale(1.5);
		}
		65% {
			transform: translateX(0) rotateY(45deg);
		}
		100% {
			transform: translateX(100%) rotateY(45deg);
		}
	}
</style>
