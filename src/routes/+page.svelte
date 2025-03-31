<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Divider from '$lib/components/helpers/Divider.svelte';
	import Intro from '$lib/components/sections/Intro.svelte';
	import MusicEconomy from '$lib/components/sections/MusicEconomy.svelte';
	import Songs from '$lib/components/sections/SongsCharts.svelte';
	import Vibecession from '$lib/components/sections/Vibecession.svelte';
	import ChartScrolly from '$lib/components/sections/ChartScrolly.svelte';
	import MusicPlayer from '$lib/components/sections/MusicPlayer.svelte';


	const { data } = $props();

	$inspect(data);

</script>

<main class="flex flex-col items-center">
	<Hero />

	<Divider />

	<div class="relative">

		<div class="w-full bg-white">
			<div class="column">
				<Intro />
			</div>
		</div>

		<div class="rotate-180">
			<Divider />
		</div>

	</div>

	<div class="w-full bg-black">
		<div class="column">
			<MusicEconomy />
		</div>
	</div>

	<div class="w-full bg-black">
		<ChartScrolly />
	</div>

	<div class="min-h-screen w-full bg-black">
		<div class="column max-w-7xl">
			<Vibecession />
		</div>
	</div>

	<div class="w-full bg-black">
		<MusicPlayer />
	</div>

	<div class="min-h-screen bg-black w-full">
	</div>
	
</main>
