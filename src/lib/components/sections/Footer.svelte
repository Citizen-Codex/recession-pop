<script>
	import Wordmark from '$lib/components/helpers/Wordmark.svelte';

	const links = [
		{ name: "about", url: "https://www.citizencodex.com/about-us" },
		{ name: "our stories", url: "https://www.citizencodex.com/our-stories" },
		{ name: "linkedin", url: "https://www.linkedin.com/company/citizen-codex/" },
	];
</script>

<footer class="w-full bg-[#303334] text-white text-[16px] font-sans px-8 py-12">

	<section class="text-center max-w-3xl mx-auto pt-10">
		<div class="max-w-xs mx-auto mb-12 flex justify-center">
			<a href="https://citizencodex.com" target="_self">
				<Wordmark />
			</a>
		</div>

		<p class="text-white mb-4">
			<a href="https://citizencodex.com" target="_self" class="underline underline-offset-2 decoration-[#F4E48A] hover:bg-[#F4E48A] hover:text-black transition-colors">
				Citizen Codex
			</a>
			is a data design studio sharing insights and data more clearly to the world.
		</p>

		<p class="text-white">
			Reach out:
			<a href="mailto:hello@citizencodex.com" class="underline underline-offset-2 decoration-[#F4E48A] hover:bg-[#F4E48A] hover:text-black transition-colors">
				hello@citizencodex.com
			</a>
		</p>
	</section>

	<section class="mt-12">
		<ul class="flex flex-wrap justify-center items-center gap-4">
			{#each links as link}
				<li>
					<a
						href={link.url}
						target="_self"
						class="flex items-center no-underline hover:bg-[#F4E48A] hover:text-black transition-colors px-4 py-2 decoration-[#F4E48A]"
					>
						<span class="mx-2">{link.name.toUpperCase()}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
    
</footer>
