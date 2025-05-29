<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Divider from '$lib/components/helpers/Divider.svelte';
	import AudioButtonDivider from '$lib/components/helpers/AudioButtonDivider.svelte';
	import Intro from '$lib/components/sections/Intro.svelte';
	import MusicEconomy from '$lib/components/sections/MusicEconomy.svelte';
	import Vibecession from '$lib/components/sections/Vibecession.svelte';
	import ChartScrolly from '$lib/components/sections/ChartScrolly.svelte';
	import MusicPlayer from '$lib/components/sections/MusicPlayer.svelte';
	import Ending from '$lib/components/sections/Ending.svelte';
	import Citations from '$lib/components/sections/Citations.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';


	const { data } = $props();

	$inspect(data);

</script>

<main class="flex flex-col items-center">
	<Hero />

	<AudioButtonDivider />

	<!-- Section with divider as background -->
	<div class="min-h-lvh w-full bg-white relative">
		<div class="absolute rotate-180 bottom-0 z-0">
		  <Divider type="normal" />
		</div>
		<Intro />
	</div>


	<MusicEconomy />
	<ChartScrolly />

	<!-- Section with divider as background -->
	<div class="min-h-lvh w-full bg-black relative">
		<div class="absolute bottom-10 md:bottom-0"> <!-- top-[62%] -->
		  <Divider type="trans" />
		</div>

		<Vibecession />
	
	  </div>
	<!--  -->

	<MusicPlayer />


	<Ending />
	<Citations />
	<Footer />
	
</main>
