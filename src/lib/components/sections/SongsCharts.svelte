<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';
	import * as d3 from 'd3';
  
	import AxisX from '$lib/components/charts/AxisX.svelte';
	import AxisY from '$lib/components/charts/AxisY.svelte';
	import Tooltip from '$lib/components/charts/Tooltip.svelte';
	
	import AnimatedChart from '$lib/components/charts/AnimatedChart.svelte';
	import DetailedChart from '$lib/components/charts/DetailedChart.svelte';
	import AggregatedChart from '$lib/components/charts/AggregatedChart.svelte';
	
	export let scrollIndex = '';

	console.log({scrollIndex})

	// CHART 1: DETAILED CELLS WITH SONGS
	// CHART 2: AGGREGATED AND GRAYED OUT

	// TOOLTIP
	let evt = {};
	let hideTooltip = true;
	let hoveredSong = null;

	// CHART 1: Set data and domain
	let data = [];
	let xDomain = [];
	const xKey = 'year';
	const yKey = 'index';
  
	// LOAD DATA
	onMount(async () => {
	  try {
		const dataPath = '/data/billboard.csv';
		const csvData = await d3.csv(dataPath);
  
		// CHART 1: Filter for vibecession songs
		const filteredData = csvData.filter(
		  (d) => +d.year >= 1970 && +d.bpm >= 120 && +d.danceability >= 68 && +d.energy >= 69
		);
  
		// CHART 2: Group data by year
		let groupedData = new Map();
		filteredData.forEach((d) => {
		  const year = +d.year;
		  if (!groupedData.has(year)) groupedData.set(year, []);
		  groupedData.get(year).push(d);
		});
  
		// Convert grouped data to array with a unique id for each song
		data = [];
		groupedData.forEach((songs, year) => {
		  songs.sort((a, b) => b.rank - a.rank);
		  songs.forEach((song, index) => {
			data.push({
			  year,
			  index: index + 1, // Stacking index
			  id: `${year}-${index}`,
			  song: song.song,
			  artist: song.artist,
			  rank: song.rank
			});
		  });
		});
  
		// ALL CHARTS: Extract unique years for the x domain
		xDomain = [...new Set(data.map((d) => d[xKey]))].sort((a, b) => a - b);
	  } catch (error) {
		console.error('Error loading data:', error);
	  }
	});
  
	// CHART 2: Reactive aggregated data
	$: aggregatedData = Array.from(
	  d3.rollup(data, (v) => v.length, (d) => d.year)
	).map(([year, count]) => ({ year, count }));
  
	// TOOLTIP
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
		<AxisX gridlines={false} tickMarks={true} baseline={true} />
		<AxisY gridlines={true} snapBaselineLabel />
	  </Html>
  
	  <!-- Chart Elements -->
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
		
		<DetailedChart
			{xDomain}
			{data}
			{xScale}
			{yScale}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			/>
			
		{#if scrollIndex >= 5}
			<AggregatedChart 
			aggregatedData={aggregatedData}
			{xScale}
			{yScale}
			scrollIndex={scrollIndex}
			/>
		{/if}
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
  