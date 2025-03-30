<script>
	export let data = [];
	export let xDomain = [];
	export let xScale;
	export let yScale;
</script>

{#each xDomain as year (year)}
	<g>
		{#each data.filter((d) => d.year === year) as song (song.id)}
			<rect
				class="cell"
				x={xScale(year)}
				y={yScale(song.index)}
				width={xScale.bandwidth ? xScale.bandwidth() : 30}
				height={yScale(0) - yScale(1) - 0.7}
				fill="url(#barGradient)"
				opacity="1"
				rx="0.2"
				ry="0.2"
			/>
		{/each}
	</g>
{/each}

<style>
	.cell {
		stroke: black;
		stroke-width: 0.25px;
		pointer-events: all !important;
	}
</style>
