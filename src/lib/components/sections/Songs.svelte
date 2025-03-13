<script>
  import { onMount } from 'svelte';
  import { LayerCake, Svg, ScaledSvg, Html } from 'layercake';
  import { scaleBand } from 'd3-scale';
  import * as d3 from 'd3';

  import Column from '$lib/components/charts/Column.svelte';
  import AxisX from '$lib/components/charts/AxisX.svelte';
  import AxisY from '$lib/components/charts/AxisY.svelte';

  let data = [];
  let xDomain = [];
  const xKey = 'year';
  const yKey = 'total_songs';

  onMount(async () => {
    try {
      const dataPath = '/data/billboard.csv';
      const csvData = await d3.csv(dataPath);

      // Apply filter criteria
      const filteredData = csvData.filter(d =>
        +d.year >= 1970 && +d.bpm >= 120 && +d.danceability >= 68 && +d.energy >= 69
      );
      console.log("Filtered Data:", filteredData);

      // Group by year and count songs per year
      const songsPerYear = d3.rollup(
        filteredData,
        v => v.length,
        d => d.year
      );

      // Convert the rollup result into an array of objects
      data = Array.from(songsPerYear, ([year, total_songs]) => ({
        year,
        total_songs
      }));
      
      // Extract unique years and sort
      xDomain = [...new Set(data.map(d => d[xKey]))].sort();
      
      console.log('Data:', data);
      console.log('xDomain:', xDomain);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });
</script>

<div class="chart-container">
  <LayerCake
    ssr
    percentRange
    position="absolute"
    padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
    x={xKey}
    y={yKey}
    xScale={scaleBand().range([0, 100]).paddingInner(0.1).paddingOuter(0.05)}
    {xDomain}
    yDomain={[0, null]}
    {data}
  >

  <ScaledSvg let:width>
    <svg width="100%" height="100%">
      <defs>
        <linearGradient id="barGradient" gradientUnits="userSpaceOnUse" x1="0" x2={width} y1="0" y2="0">
          <!-- gradientUnits="userSpaceOnUse" ensures the gradient stretches across the entire x-axis

          x1="0" and x2={width} ensures the gradient spans across all bars, not just one -->
          <stop offset="0%" stop-color="#FE88F9" />
          <stop offset="20%" stop-color="#967CFF" />
          <stop offset="40%" stop-color="#4E19ED" />
          <stop offset="60%" stop-color="#36E4EC" />
          <stop offset="80%" stop-color="#06FF33" />
          <stop offset="100%" stop-color="#FCFF60" />
        </linearGradient>
      </defs>
    </svg>
  
    <Column fill="url(#barGradient)" />
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
    height: 400px;
    position: relative;
  }
</style>
