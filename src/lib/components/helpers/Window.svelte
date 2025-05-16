<script lang="ts">
	// use slot instead of exporting 'content'
</script>

<div class="relative mx-auto w-full">
	<!-- window bar -->
	<div
		class="border-gray relative top-0 left-0 flex h-8 w-full items-center gap-1 rounded-t-lg border-x-2 border-t-2 bg-white bg-gradient-to-b from-transparent to-black/20"
	>
		<!-- circles -->
		<div class="red border-gray ml-1.5 h-4.5 w-4.5 rounded-full border-2"></div>
		<div class="yellow border-gray h-4.5 w-4.5 rounded-full border-2"></div>
		<div class="green border-gray h-4.5 w-4.5 rounded-full border-2"></div>
	</div>

	<!-- content -->
	<div class="border-gray relative border-2 bg-white px-4 py-4 md:px-10 md:py-12 text-black">
		<slot />
	</div>
</div>

<style>
	.red {
		background:
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0) 18.71%,
				rgba(0, 0, 0, 0.2) 71.14%,
				rgba(255, 255, 255, 0.2) 98.37%
			),
			#f00;
	}
	.yellow {
		background:
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0) 18.71%,
				rgba(0, 0, 0, 0.2) 71.14%,
				rgba(255, 255, 255, 0.2) 98.37%
			),
			#ffd000;
	}
	.green {
		background:
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0) 18.71%,
				rgba(0, 0, 0, 0.2) 71.14%,
				rgba(255, 255, 255, 0.2) 98.37%
			),
			#06ff33;
	}
</style>
