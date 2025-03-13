<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Songs from '$lib/components/sections/Songs.svelte';
	import SongsCopy from '$lib/components/sections/SongsCopy.svelte';

	const { data } = $props();

	$inspect(data);
</script>

<section class="bg-black">
	
	<div class = "">
		<Hero />
	</div>

	<div class="max-w-3xl flex items-center justify-center min-h-screen mx-auto">
		<Songs />
	</div>
	
	<div class="max-w-3xl flex items-center justify-center min-h-screen mx-auto">
		<SongsCopy />
		<p class="text-white">this is backup</p>
	</div>
  
</section>