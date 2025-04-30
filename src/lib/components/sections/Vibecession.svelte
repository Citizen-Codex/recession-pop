<script>
	import Window from '$lib/components/helpers/Window.svelte';
	import Quote from '$lib/components/helpers/Quote.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['vibe'];
</script>

<div class="column max-w-7xl">
	<section class="sections text-white max-w-5xl mx-auto">

		<Window>

			<div class="mx-28 my-10">

				<div class="flex items-center gap-12 flex">
					<img src="assets/icons/bulb.svg" alt="bulb icon" />
					<p class="heading text-left">
						{@html md(content.hed)}
					</p>
				</div>
				
				<p class="body text-left">
					{@html md(content['content-before'])}
				</p>

				<Quote 
				quote={md(content['quote'])}
				color="#44FF8F" />



				<p class="body text-left">
					{@html md(content['content-after'])}
				</p>

			</div>

		</Window>

	</section>
</div>

