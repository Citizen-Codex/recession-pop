<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
	import Head from '$lib/components/Head.svelte';

	let { children } = $props();
</script>

<Head />

{@render children()}
