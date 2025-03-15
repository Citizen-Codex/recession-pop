<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Songs from '$lib/components/sections/Songs.svelte';

	const { data } = $props();

	$inspect(data);
</script>

<section class="bg-black pointer-events-auto">
	
	<div class = "">
		<Hero />
	</div>

	<div class="max-w-4xl flex items-center justify-center min-h-screen mx-auto ">
		<Songs />
	</div>

</section>