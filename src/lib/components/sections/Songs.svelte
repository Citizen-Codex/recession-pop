<script>
  import { onMount } from 'svelte';
  import { LayerCake, ScaledSvg, Html } from 'layercake';
  import { scaleBand } from 'd3-scale';
  import * as d3 from 'd3';

  import AxisX from '$lib/components/charts/AxisX.svelte';
  import AxisY from '$lib/components/charts/AxisY.svelte';
  import Tooltip from '$lib/components/charts/Tooltip.svelte';

  let data = [];
  let xDomain = [];
  const xKey = 'year';
  const yKey = 'index'; // Each song is stacked by index

  // Tooltip State
  let tooltipX = 0;
  let tooltipY = 0;
  let tooltipContent = "";
  let tooltipVisible = false;

  // Load Data
  onMount(async () => {
    try {
      const dataPath = '/data/billboard.csv';
      const csvData = await d3.csv(dataPath);

      // Filter dataset
      const filteredData = csvData.filter(d =>
        +d.year >= 1970 && +d.bpm >= 120 && +d.danceability >= 68 && +d.energy >= 69
      );

      console.log("Filtered Data:", filteredData);

      // Group data by year
      let groupedData = new Map();
      filteredData.forEach(d => {
        const year = +d.year;
        if (!groupedData.has(year)) groupedData.set(year, []);
        groupedData.get(year).push(d);
      });

      // Convert grouped data to array format
      data = [];
      groupedData.forEach((songs, year) => {
        songs.forEach((song, index) => {
          data.push({
            year,
            index: index + 1, // Stacking index
            id: song.id, // Unique identifier
            song: song.song, // Song name
            artist: song.artist, // Artist name
          });
        });
      });

      // Extract unique years
      xDomain = [...new Set(data.map(d => d[xKey]))].sort((a, b) => a - b);

      console.log('Processed Data:', data);
      console.log('xDomain:', xDomain);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });

  // Tooltip Handlers
  function showTooltip(event, song, artist) {
    tooltipX = event.pageX;
    tooltipY = event.pageY - 10;
    tooltipContent = `${song} - ${artist}`;
    tooltipVisible = true;
  }

  function hideTooltip() {
    tooltipVisible = false;
  }
</script>

<!-- Tooltip Component -->
  <Tooltip x={tooltipX} y={tooltipY} visible={tooltipVisible} content={tooltipContent} />

<div class="chart-container">
  <LayerCake
    ssr
    percentRange
    position="absolute"
    padding={{ top: 20, right: 20, bottom: 40, left: 40 }}
    x={xKey}
    y={yKey}
    xScale={scaleBand().range([0, 100]).paddingInner(0.5).paddingOuter(0)}
    {xDomain}
    yDomain={[0, d3.max(data, d => d.index)]}  
    {data}
    let:xScale
    let:yScale
  >
    <ScaledSvg let:width>
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id="barGradient" gradientUnits="userSpaceOnUse" x1="0" x2={width} y1="0" y2="0">
            <stop offset="0%" stop-color="#FE88F9" />
            <stop offset="20%" stop-color="#967CFF" />
            <stop offset="40%" stop-color="#4E19ED" />
            <stop offset="60%" stop-color="#36E4EC" />
            <stop offset="80%" stop-color="#06FF33" />
            <stop offset="100%" stop-color="#FCFF60" />
          </linearGradient>
        </defs>

        {#each xDomain as year}
          {#key year}
            <g>
              {#each data.filter(d => d.year === year) as song}
              <rect
                class="cell"
                x={xScale(year)}
                y={yScale(song.index)}
                width={xScale.bandwidth ? xScale.bandwidth() * 2 : 30} 
                height={(yScale(0) - yScale(1)) - 0.5}
                fill="url(#barGradient)"
                opacity="1"
                rx="0.1"
                ry="0.1"
                on:mouseover={(e) => showTooltip(e, song.song, song.artist)}
                on:mouseleave={hideTooltip}
              />
              {/each}
            </g>
          {/key}
        {/each}
      </svg>
    </ScaledSvg>

    <Html>
      <AxisX gridlines={false} tickMarks={true} baseline={true} />
      <AxisY gridlines={true} snapBaselineLabel />
    </Html>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 350px;
    position: relative;
  }

  .cell {
    stroke: black;
    stroke-width: 0.25px;
    pointer-events: all; /* Ensure SVG rects receive mouse events */
  }
</style>
