<script lang="ts">
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['economy'];
</script>

<section class="sections w-full bg-black text-white">

	<div class="relative column">

		<p class="heading text-left w-xs md:w-full">
			{@html md(content.hed)}
		</p>

		<p class="body">
			{@html md(content.content)}
		</p>

		<img src="assets/icons/green_note.svg"
		alt="green note icon"
		class="hidden md:block absolute top-[-80px] left-[-80px]"
		/>

		<img src="assets/icons/money.svg"
		alt="money icon"
		class="absolute top-[-40px] right-[20px] md:top-[60px] md:right-[-100px] w-14 md:w-auto"
		/>

	</div>

</section>