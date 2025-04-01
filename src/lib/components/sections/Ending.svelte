<script>
	import Window from '$lib/components/helpers/Window.svelte';
	import Quote from '$lib/components/helpers/Quote.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['ending'];
</script>

<section class="sections text-white max-w-5xl mx-auto">

	<Window>

		<div class="mx-28 text-left relative">

			<img src="assets/icons/pink-triangle.svg"
            alt="pink triangle icon"
            class="absolute top-[300px] left-[-100px]"
            />

            <img src="assets/icons/loud.svg"
            alt="loud icon"
            class="absolute top-0 right-[-110px]"
            />

            <img src="assets/icons/headphone.svg"
            alt="headphone icon"
            class="absolute top-[750px] right-[-140px]"
            />

			<p class="body">
				{@html md(content['content-before'])}
			</p>

			<Quote 
			quote={md(content['quote'])}
			color="#CBFDC2" />

			<p class="body">
				{@html md(content['content-after'])}
			</p>

		</div>

	</Window>

</section>

