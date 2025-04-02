<script>
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['economy'];
</script>

<section class="sections w-full bg-black text-white">

	<div class="relative column">

		<p class="heading text-left">
			{@html md(content.hed)}
		</p>

		<p class="body">
			{@html md(content.content)}
		</p>

		<img src="assets/icons/green_note.svg"
		alt="green note icon"
		class="absolute top-[-80px] left-[-80px]"
		/>

		<img src="assets/icons/money.svg"
		alt="green note icon"
		class="absolute top-[60px] right-[-120px]"
		/>

	</div>

</section>