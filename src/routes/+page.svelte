<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';

	const { data } = $props();

	$inspect(data);
</script>

<Hero />


<section class="h-screen bg-white"></section>
