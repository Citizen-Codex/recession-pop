<script lang="ts">
	import { onMount } from 'svelte';
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import * as d3 from 'd3';
	import { format as d3format } from 'd3-format';

	import AxisX from '$lib/components/charts/AxisX.svelte';
	import AxisY from '$lib/components/charts/AxisY.svelte';
	import AxisYRight from '$lib/components/charts/AxisYRight.svelte';
	import Tooltip from '$lib/components/charts/Tooltip.svelte';
	import Chart from '$lib/components/charts/Chart.svelte';

	export let scrollIndex;
	export let inView;

	let evt = {};
	let hideTooltip = true;
	let hoveredSong = null;

	let data = [];
	let gdpData = [];
	let unemData = [];
	let gdpYScale;
	let unemYScale;
	let yScale;
	let xDomain = [];

	const xKey = 'year';
	const yKey = 'index';
	const gdpByYear = {};
	const unemByYear = {};
	
	onMount(async () => {
		try {
			const vibeData = await d3.csv('/data/billboard.csv');
			const rawGdp = await d3.csv('/data/gdp.csv');
			const rawUnem = await d3.csv('/data/unemployment.csv');

			// Filter music data
			const filteredData = vibeData.filter(
				(d) => +d.year >= 1970 && +d.bpm >= 120 && +d.danceability >= 68 && +d.energy >= 69
			);

			// Group by year
			let groupedData = new Map();
			filteredData.forEach((d) => {
				const year = +d.year;
				if (!groupedData.has(year)) groupedData.set(year, []);
				groupedData.get(year).push(d);
			});

			data = [];
			groupedData.forEach((songs, year) => {
				songs.sort((a, b) => b.rank - a.rank);
				songs.forEach((song, index) => {
					data.push({
						year,
						index: index + 1,
						id: `${year}-${index}`,
						song: song.song,
						artist: song.artist,
						rank: song.rank
					});
				});
			});

			// GDP year average
			rawGdp.forEach((d) => {
				const year = parseInt(d.observation_date.slice(0, 4));
				if (year >= 1970) {
					if (!gdpByYear[year]) {
						gdpByYear[year] = [];
					}
					gdpByYear[year].push(Number(d.GDPC1));
				}
			});

			gdpData = Object.entries(gdpByYear).map(([year, values]) => ({
				year: +year, // convert string key to number
				gdp: values.reduce((sum, val) => sum + val, 0) / values.length // average
			}));

			// GDP Y scale
			gdpYScale = scaleLinear().domain([0, 25000]).range([100, 0]);

			// Unemployment year average
			rawUnem.forEach((d) => {
				const year = parseInt(d.observation_date.slice(0, 4));
				if (year >= 1970 && year <= 2024) {
					if (!unemByYear[year]) {
						unemByYear[year] = [];
					}
					unemByYear[year].push(Number(d.UNRATE));
				}
			});

			unemData = Object.entries(unemByYear).map(([year, values]) => ({
				year: +year,
				unrate: values.reduce((sum, val) => sum + val, 0) / values.length
			}));

			// GDP Y scale
			unemYScale = scaleLinear().domain([0, 10]).range([100, 0]);

			// Set xDomain
			xDomain = [...new Set(data.map((d) => d[xKey]))].sort((a, b) => a - b);
		} catch (error) {
			console.error('Error loading data:', error);
		}
	});

	$: aggregatedData = Array.from(
		d3.rollup(
			data,
			(v) => v.length,
			(d) => d.year
		)
	).map(([year, count]) => ({ year, count }));

	function handleMouseEnter(song, event) {
		hoveredSong = song;
		evt = { detail: { e: event } };
		hideTooltip = false;
	}

	function handleMouseMove(event) {
		evt = { detail: { e: event } };
	}

	function handleMouseLeave() {
		hoveredSong = null;
		hideTooltip = true;
		evt = {};
	}
</script>

<div class="chart-container">
	<LayerCake
		percentRange
		position="absolute"
		padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().range([0, 100]).paddingInner(0.1).paddingOuter(0)}
		{xDomain}
		yDomain={scrollIndex === 0
			? [0, d3.max(data, (d) => d.index)]
			: [0, d3.max(aggregatedData, (d) => d.count)]}
		data={scrollIndex === 0 ? data : aggregatedData}
		let:xScale
		let:yScale
	>

	<Html>
		<!-- Main axes container -->
		
			<div
			class="opacity-0 transition-opacity duration-500"
			style:opacity={inView ? 1 : 0}>

		  <!-- X axis -->
		  <AxisX
			gridlines={false}
			tickMarks={true}
			baseline={true} />
		  
		  <!-- Left Y axis for song -->
		  <AxisY
			scale={yScale}
			gridlines={true}
			snapBaselineLabel={true}
			axisTitle="No. of recession pop songs in the Billboard Year-End Hot 100"
		  />
		
		
		<!-- Right Y axis for GDP -->
		{#if gdpYScale}
		  <div
			style="transition: opacity 500ms;"
			style:opacity={scrollIndex === 7 ? 1 : 0}
		  >
			<AxisYRight
			  scale={gdpYScale}
			  format={d => `$${d3format('~s')(d)}`}
			  axisTitle="Real GDP ($ billions)"
			  titleDisplace={55}
			/>
		  </div>
		{/if}
		
		<!-- Right Y axis for unemployment -->
		{#if unemYScale}
		  <div
			style="transition: opacity 500ms;"
			style:opacity={scrollIndex === 8 ? 1 : 0}
		  >
			<AxisYRight
			  scale={unemYScale}
			  axisTitle="Unemployment rate (%)"
			  titleDisplace={35}
			/>
		  </div>
		{/if}
		
		</Html>
	

		<ScaledSvg let:width let:height>
			<defs>
				<linearGradient
					id="barGradient"
					gradientUnits="userSpaceOnUse"
					x1="0"
					x2={width}
					y1="0"
					y2="0"
				>
					<stop offset="0%" stop-color="#FE88F9" />
					<stop offset="20%" stop-color="#967CFF" />
					<stop offset="40%" stop-color="#4E19ED" />
					<stop offset="60%" stop-color="#36E4EC" />
					<stop offset="80%" stop-color="#06FF33" />
					<stop offset="100%" stop-color="#FCFF60" />
				</linearGradient>
			</defs>

			<Chart
				{xDomain}
				{data}
				{xScale}
				{yScale}
				{gdpData}
				{gdpYScale}
				{unemData}
				{unemYScale}
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				{scrollIndex}
				chartHeight={height}
			/>
		</ScaledSvg>

		{#if !hideTooltip && hoveredSong && evt.detail && scrollIndex < 3}
			<Html pointerEvents={false}>
				<Tooltip {evt}>
					<div><strong>{hoveredSong.year}</strong></div>
					<div><strong>Rank:</strong> #{hoveredSong.rank}</div>
					<div><strong>Song:</strong> {hoveredSong.song}</div>
					<div><strong>Artist:</strong> {hoveredSong.artist}</div>
				</Tooltip>
			</Html>
		{/if}
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 300px;
		position: relative;
		pointer-events: all !important;
	}

	@media (width >= 64rem) {
        .chart-container {
			width: 100%;
			height: 650px;
		}
	}
</style>
