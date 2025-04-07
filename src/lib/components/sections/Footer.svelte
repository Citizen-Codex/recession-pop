<script lang="ts">
	import Wordmark from '$lib/components/helpers/Wordmark.svelte';
	import { page } from '$app/state';

	const socials = [
		{
			title: 'Instagram',
			href: 'https://www.instagram.com/citizen.codex',
			icon: 'mdi:instagram'
		},
		{
			title: 'LinkedIn',
			href: 'https://www.linkedin.com/company/citizen-codex/',
			icon: 'mdi:linkedin'
		},
		{
			title: 'X',
			href: 'https://x.com/citizencodex',
			icon: 'fa6-brands:x-twitter'
		},
		{
			title: 'GitHub',
			href: 'https://github.com/Citizen-Codex',
			icon: 'mdi:github'
		}
	];

	const links = [
		{
			title: 'Work',
			href: `${page.data.publisher_url}/our-work`
		},
		{
			title: 'Services',
			href: `${page.data.publisher_url}/services`
		},
		{
			title: 'Ventures',
			href: `${page.data.publisher_url}/ventures`
		},
		{
			title: 'Research',
			href: `${page.data.publisher_url}/research`
		},
		{
			title: 'About',
			href: `${page.data.publisher_url}/about-us`
		},
		{
			title: 'hello@citizencodex.com',
			href: 'mailto:hello@citizencodex.com?subject=Website%20Enquiry'
		}
	];

</script>

<div class="flex flex-col gap-6 bg-black px-4 py-8 text-white md:px-6 w-full">
	<a href={page.data.publisher_url} aria-current="page" class="logo-link w-inline-block w--current"
		><Wordmark /></a
	>

	<div class="label mb-1 flex flex-wrap gap-x-6 gap-y-2 text-white">
		{#each links as { title, href } (title)}
			<a {href}>{title}</a>
		{/each}
	</div>

	<div class="flex w-full flex-wrap items-end justify-between gap-3">
		<div class="label text-xs">2025 Copyright, Citizen Codex LLC.</div>
		<div class="flex items-center gap-2">
			{#each socials as { title, href, icon } (title)}
				<a
					{href}
					target="_blank"
					class="h-fit transition-transform hover:scale-110"
					aria-label={title}
				>
					<iconify-icon {icon} class="h-5 text-2xl"></iconify-icon>
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	a {
		@apply hover:underline;
	}
</style>



<!-- <script>
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
    
</footer> -->
