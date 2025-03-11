<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Songs from '$lib/components/sections/Songs.svelte';

	const { data } = $props();

	$inspect(data);
</script>

<div class = "">
	<Hero />
</div>


<div class="max-w-2xl flex items-center justify-center min-h-screen mx-auto">
	<Songs />
  </div>
  