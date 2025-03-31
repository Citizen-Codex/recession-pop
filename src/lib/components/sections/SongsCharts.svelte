<script>
	import { onMount } from 'svelte';
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import * as d3 from 'd3';

	import AxisX from '$lib/components/charts/AxisX.svelte';
	import AxisY from '$lib/components/charts/AxisY.svelte';
	import AxisYRight from '$lib/components/charts/AxisYRight.svelte';
	import Tooltip from '$lib/components/charts/Tooltip.svelte';
	import Chart from '$lib/components/charts/Chart.svelte';

	export let scrollIndex = '';

	let evt = {};
	let hideTooltip = true;
	let hoveredSong = null;

	let data = [];
	let gdpData = [];
	let gdpYScale;
	let yScale;
	let xDomain = [];

	const xKey = 'year';
	const yKey = 'index';
	const gdpByYear = {};

	onMount(async () => {
		try {
			const vibeData = await d3.csv('/data/billboard.csv');
			const rawGdp = await d3.csv('/data/gdp.csv');

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

			// GDP data averaged out over 4 quarters per year
			rawGdp.forEach(d => {
				const year = parseInt(d.observation_date.slice(0, 4));
				if (year >= 1970) {
					if (!gdpByYear[year]) {
						gdpByYear[year] = [];
					}
					gdpByYear[year].push(Number(d.GDPC1));
				}
			});

			gdpData = Object.entries(gdpByYear).map(([year, values]) => ({
				year: +year,
				gdp: values.reduce((sum, val) => sum + val, 0) / values.length
			}));

			console.log('GDP Data', gdpData)

			// GDP Y scale
			gdpYScale = scaleLinear()
				.domain([0, 25000])
				.range([100, 0]); 
			
			// Set xDomain
			xDomain = [...new Set(data.map((d) => d[xKey]))].sort((a, b) => a - b);
		} catch (error) {
			console.error('Error loading data:', error);
		}

	});

	$: aggregatedData = Array.from(
		d3.rollup(data, (v) => v.length, (d) => d.year)
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
		yDomain={
			scrollIndex === 0
				? [0, d3.max(data, (d) => d.index)]
				: [0, d3.max(aggregatedData, (d) => d.count)]
		}
		data={scrollIndex === 0 ? data : aggregatedData}
		let:xScale
		let:yScale
	>

		<!-- Axes -->
		<Html class="pointer-events-none">
			<AxisX 
				gridlines={false} 
				tickMarks={true} 
				baseline={true} />
			
			<!-- Left Y axis for song rank or count -->
			<AxisY 
				scale={yScale}
				gridlines={true}
				snapBaselineLabel={true}
				/>

			<!-- Right Y axis for GDP -->
			{#if gdpYScale}
				<AxisYRight 
					scale={gdpYScale}
					gridlines={true}
					snapBaselineLabel={true}
				/>
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
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				scrollIndex={scrollIndex}
				chartHeight={height}
			/>
		</ScaledSvg>

		{#if !hideTooltip && hoveredSong && evt.detail}
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
		height: 650px;
		position: relative;
		pointer-events: all !important;
	}
</style>
