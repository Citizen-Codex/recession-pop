<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import * as d3 from "d3";
  import { scaleBand, scaleLinear } from 'd3-scale';
  import { onMount } from 'svelte';

  import Column from '$lib/components/charts/Column.svelte';
  import AxisX from '$lib/components/charts/AxisX.svelte';
  import AxisY from '$lib/components/charts/AxisY.svelte';

  // Define keys
  const xKey = 'year';
  const yKey = 'total_songs';

  let data = [];
  let xDomain = [];
  let yDomain = [0, 0];

  onMount(async () => {
    try {
      const dataPath = '/data/billboard.csv'; // Ensure this path is correct
      const csvData = await d3.csv(dataPath);

      // Log the data to make sure it's loaded
      console.log(csvData);

      const filteredData = csvData.filter(d => {
        return +d.bpm >= 120 && +d.danceability >= 69 && +d.energy >= 68;
      });

      // Log the filtered data
      console.log(filteredData);

      // Group by year and count songs
      const songsPerYear = d3.rollup(
        filteredData,
        v => v.length, // Count number of songs
        d => d.year    // Group by 'year'
      );

      // Convert rollup result into an array
      data = Array.from(songsPerYear, ([year, total_songs]) => ({
        year: year,
        total_songs: total_songs
      }));

      // Set xDomain and yDomain
      xDomain = Array.from(new Set(data.map(d => d[xKey])));
      yDomain = [0, d3.max(data, d => d[yKey])];

      // Log domains
      console.log(xDomain, yDomain);
    } catch (error) {
      console.error('Error loading or processing the data:', error);
    }
  });
</script>

<div class="chart-container">
  <LayerCake
    padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
    x={xKey}
    y={yKey}
    xScale={scaleBand().paddingInner(0.02).round(true).domain(xDomain)}
    yScale={scaleLinear().domain(yDomain)} 
    {data}
  >
    <Svg>
      <AxisX gridlines={false} baseline={true} />
      <AxisY snapBaselineLabel />
      <Column fill="#01EFFE" />
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }
</style>
