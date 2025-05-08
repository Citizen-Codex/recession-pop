<script>
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import { onMount } from 'svelte';
  
	const content = page.data['albums'];
	let wrapper;
	let parentContainer;
	let albumsContainer;
	let textContainer;
	let contentHeight = 0;
	
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
  
	onMount(() => {
	  // Calculate the total width of content for horizontal scrolling
	  const albumsWidth = albumsContainer.scrollWidth - albumsContainer.clientWidth;
	  const textWidth = textContainer.scrollWidth - textContainer.clientWidth;
	  const totalScrollWidth = Math.max(albumsWidth, textWidth);
  
	  // Set the height of the parent container to create space for vertical scrolling
	  // Height needs to be viewport height plus enough extra space to accommodate the full horizontal scroll
	  contentHeight = window.innerHeight + totalScrollWidth;
	  parentContainer.style.height = `${contentHeight}px`;
  
	  // Set up scroll event listener to handle the parallax effect
	  window.addEventListener('scroll', handleScroll);
  
	  return () => {
		window.removeEventListener('scroll', handleScroll);
	  };
	});
  
	function handleScroll() {
	  if (!wrapper || !albumsContainer || !textContainer || !parentContainer) return;
  
	  // Get the vertical scroll position of the page
	  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	  
	  // Calculate the scroll position relative to the wrapper
	  const wrapperRect = parentContainer.getBoundingClientRect();
	  const wrapperTop = wrapperRect.top + window.pageYOffset;
	  
	  // Only apply horizontal scroll when wrapper is in view
	  if (scrollTop >= wrapperTop && scrollTop <= wrapperTop + contentHeight - window.innerHeight) {
		// The amount scrolled within the wrapper section
		const relativeScroll = scrollTop - wrapperTop;
		
		// Calculate how much to scroll horizontally based on vertical scroll
		const albumsWidth = albumsContainer.scrollWidth - albumsContainer.clientWidth;
		const textWidth = textContainer.scrollWidth - textContainer.clientWidth;
		
		// Apply horizontal scrolling proportionally
		albumsContainer.scrollLeft = (relativeScroll / (contentHeight - window.innerHeight)) * albumsWidth;
		textContainer.scrollLeft = (relativeScroll / (contentHeight - window.innerHeight)) * textWidth;
	  }
	}
  </script>
  
  <div bind:this={parentContainer} class="relative w-full">
	<div bind:this={wrapper} class="w-full h-screen sticky top-0 flex flex-col justify-center gap-16 overflow-hidden items-center">
	  <div bind:this={albumsContainer} class="w-full overflow-hidden">
		<div class="inline-flex gap-16 p-4 min-w-max">
		  {#each albums as album}
			<img src={album.src} alt={album.alt} class="max-w-[250px] md:max-w-[350px]" />
		  {/each}
		</div>
	  </div>
	  
	  <div bind:this={textContainer} class="w-full overflow-hidden py-4">
		<div class="flex flex-row">
		  {#each content.steps as step, i (i)}
			<div class="min-w-[100vw] flex justify-center items-start">
			  <div class="border-3 border-black bg-white shadow-[6px_6px_0px_#2DF70A] max-w-84 md:max-w-xl inline-block">
				<p class="body py-4 px-4 md:py-8 md:px-8">
				  {@html md(step.content)}
				</p>
			  </div>
			</div>
		  {/each}
		</div>
	  </div>
	</div>
  </div>