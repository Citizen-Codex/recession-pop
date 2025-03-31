<script>
	import { getContext } from 'svelte';

	const { xRange, yScale, percentRange } = getContext('LayerCake');

	/** @type {boolean} [tickMarks=false] - Show marks next to the tick label. */
	export let tickMarks = false;

	/** @type {String} [labelPosition='even'] - Whether the label sits even with its value ('even') or sits on top ('above') the tick mark. */
	export let labelPosition = 'even';

	/** @type {boolean} [snapBaselineLabel=false] - Adjust the lowest label so that it sits above the tick mark if labelPosition is 'even'. */
	export let snapBaselineLabel = false;

	/** @type {boolean} [gridlines=true] - Show gridlines extending into the chart area. */
	export let gridlines = true;

	/** @type {Number|undefined} [tickMarkLength=undefined] - Length of the tick mark. If not set, becomes the width of the tick label. */
	export let tickMarkLength = undefined;

	/** @type {(d: any) => string} [format=d => d] - Format tick values. */
	export let format = (d) => d;

	/** @type {Number|Array<any>|Function} [ticks=4] - Number of ticks, list of values, or tick generator function. */
	export let ticks = 4;

	/** @type {Number} [tickGutter=0] - Whitespace between tick mark and chart. */
	export let tickGutter = 0;

	/** @type {Number} [dx=0] - Optional horizontal shift for text. */
	export let dx = 0;

	/** @type {Number} [dy=-3] - Optional vertical shift for text. */
	export let dy = -3;

	/** @type {Number} [charPixelWidth=20] - Used to calculate label width for spacing. */
	export let charPixelWidth = 20;

	/** @type {String} units - 'px' or '%'. Defaults based on percentRange. */
	export let units = $percentRange === true ? '%' : 'px';

	/** @type {'left' | 'right'} [align='left'] - Which side of the chart to align the axis to. */
	export let align = 'left';

	// Determine tick values
	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
			? $yScale.domain()
			: typeof ticks === 'function'
				? ticks($yScale.ticks())
				: $yScale.ticks(ticks);

	// Longest tick label
	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	$: widestTickLen = Math.max(
		10,
		Math.max(...tickVals.map((d) => format(d).toString().split('').reduce(calcStringLength, 0)))
	);

	$: tickLen =
		tickMarks === true
			? labelPosition === 'above'
				? (tickMarkLength ?? widestTickLen)
				: (tickMarkLength ?? 6)
			: 0;

	$: x1 = -tickGutter - (labelPosition === 'above' ? widestTickLen : tickLen);
	$: halfBand = isBandwidth ? $yScale.bandwidth() / 2 : 0;
	$: maxTickValUnits = Math.max(...tickVals.map($yScale));
</script>

<div
	class="axis y-axis"
	style="left: {align === 'left' ? $xRange[0] : $xRange[1]}{units};"
>
	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = $yScale(tick)}

		<div
			class="tick tick-{i}"
			style="left: 0; top: {tickValUnits + halfBand}{units};"
		>
			{#if gridlines === true}
				<div
					class="gridline"
					style="top: 0;"
					style:left="{align === 'left' ? x1 : 'auto'}px"
					style:right="{align === 'right' ? 0 : 'auto'}px"
				></div>
			{/if}

			{#if tickMarks === true}
				<div
					class="tick-mark"
					style="top: 0;"
					style:left="{align === 'left' ? x1 : 'auto'}px"
					style:right="{align === 'right' ? 0 : 'auto'}px"
					style:width="{tickLen}px"
				></div>
			{/if}

			<!-- Label -->
			<div
				class="text"
				style="top: 0;"
				style:text-align={align === 'right' ? 'left' : 'right'}
				style:width="{widestTickLen}px"
				style:left={
					align === 'right'
						? '10px'
						: `-${widestTickLen + tickGutter + (labelPosition === 'even' ? tickLen : 0) + 10}px`
				}
				style:transform="translate({dx + (labelPosition === 'even' ? -3 : 0)}px, calc(-50% + {dy +
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
		pointer-events: none;
	}
	.tick {
		font-size: 16px;
		width: 100%;
		font-family: var(--font-mono, monospace);
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
