<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Divider from '$lib/components/helpers/Divider.svelte';
	import Intro from '$lib/components/sections/Intro.svelte';
	import MusicEconomy from '$lib/components/sections/MusicEconomy.svelte';
	import Songs from '$lib/components/sections/Songs.svelte';
	import Vibecession from '$lib/components/sections/Vibecession.svelte';

	const { data } = $props();

	$inspect(data);
</script>

	
<main class="flex flex-col items-center">
	<Hero />

	<Divider />

	<div class="min-h-screen w-full bg-white">
		<div class="column">
			<Intro />
		</div>
	</div>

	<div class="rotate-180">
		<Divider />
	</div>

	<div class="min-h-screen w-full bg-black">
		<div class="column">
			<MusicEconomy />
		</div>
	</div>

	<div class="bg-black flex items-center justify-center min-h-screen w-full pointer-events-auto">
		<Songs />
	</div>

	<div class="min-h-screen w-full bg-black">
		<div class="column max-w-7xl">
			<Vibecession />
		</div>
	</div>

</main>

