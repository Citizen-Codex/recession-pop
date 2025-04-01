<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	const { xRange, percentRange } = getContext('LayerCake');

	/** Moves axis title !IMPORTANT 
	 * remove this in the axisTitle section if not wanted */
	export let titleDisplace = 55;

	/** @type {String} [axisTitle=''] */
	export let axisTitle = '';

	/** @type {any} scale - The yScale to use for this axis */
	export let scale;

	/** @type {boolean} [tickMarks=false] */
	export let tickMarks = false;

	/** @type {String} [labelPosition='even'] */
	export let labelPosition = 'even';

	/** @type {boolean} [snapBaselineLabel=false] */
	export let snapBaselineLabel = false;

	/** @type {boolean} [gridlines=true] */
	export let gridlines = true;

	/** @type {Number|undefined} [tickMarkLength=undefined] */
	export let tickMarkLength = undefined;

	/** @type {(d: any) => string} [format=d => d] */
	export let format = d => d;

	/** @type {Number|Array<any>|Function} [ticks=4] */
	export let ticks = 4;

	/** @type {Number} [tickGutter=0] */
	export let tickGutter = 0;

	/** @type {Number} [dx=0] */
	export let dx = 0;

	/** @type {Number} [dy=-3] */
	export let dy = -3;

	/** @type {Number} [charPixelWidth=7.25] */
	export let charPixelWidth = 7.25;

	/** @type {String} units - '%' -- REMOVE PX */
	// export let units = percentRange === true ? '%' : 'px';
	export let units = '%';

	// Is this a band scale (ordinal)?
	$: isBandwidth = typeof scale?.bandwidth === 'function';

	// Determine tick values
	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
			? scale.domain()
			: typeof ticks === 'function'
				? ticks(scale.ticks())
				: scale.ticks(ticks);

	// Calculate pixel width of each formatted tick label
	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	// Widest label length
	$: widestTickLen = Math.max(
		10,
		Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0)))
	);

	// Tick mark length logic
	$: tickLen =
		tickMarks === true
			? labelPosition === 'above'
				? (tickMarkLength ?? widestTickLen)
				: (tickMarkLength ?? 6)
			: 0;

	// Half the bandwidth for centering band scale ticks
	$: halfBand = isBandwidth ? scale.bandwidth() / 2 : 0;

	// Position on the right side
	$: x1 = tickGutter + (labelPosition === 'above' ? widestTickLen : tickLen);

	// Needed for snapBaselineLabel
	$: maxTickValUnits = Math.max(...tickVals.map(scale));
</script>

<div class="axis y-axis right">
	{#if axisTitle}
		<div
			class="axis-title"
			style="right: calc({$xRange[0]}{units} - {titleDisplace}px);"
		>
			{axisTitle}
		</div>
	{/if}

	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = scale(tick)}

		<div
			class="tick tick-{i}"
			style="right:0;top:{tickValUnits + halfBand}{units};"
			transition:fly={{ y: 20, duration: 400, delay: i * 30 }}
		>
			{#if gridlines === true}
				<div class="gridline" style="top:0;" style:right="{x1}px" style:left="0px"></div>
			{/if}

			{#if tickMarks === true}
				<div class="tick-mark" style:top="0" style:right="{x1}px" style:width="{tickLen}px"></div>
			{/if}

			<div
				class="text"
				style:top="0"
				style:text-align={labelPosition === 'even' ? 'left' : 'right'}
				style:width="{widestTickLen}px"
				style:right="{-widestTickLen - tickGutter - (labelPosition === 'even' ? tickLen : 0) - 10}px"
				style:transform="translate({dx + (labelPosition === 'even' ? 3 : 0)}px, calc(-50% + {dy +
					(labelPosition === 'above' ||
					(snapBaselineLabel === true && tickValUnits === maxTickValUnits)
						? -3
						: 4)}px))"
			>
				{format(tick)}
			</div>
		</div>
	{/each}
</div>

<style>
	.axis,
	.tick,
	.tick-mark,
	.gridline,
	.baseline,
	.text {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.axis-title {
		position: absolute;
		top: 0;
		transform: translateY(-3em);
		font-size: 18px; 
		color: white;
		font-family: var(--font-mono);
	}
	.tick {
		font-size: 16px;
		width: 100%;
		font-family: var(--font-mono);
	}
	.gridline {
		border-top: 0.5px dashed #aaa;
	}
	.tick-mark {
		border-top: 1px solid #aaa;
	}
	.baseline.gridline {
		border-top-style: solid;
	}
	.tick .text {
		color: white;
	}

</style>
