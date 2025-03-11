<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { LayerCake, Svg } from 'layercake';
  
    import Column from '$lib/components/charts/Column.svelte';
    import AxisX from '$lib/components/charts/AxisX.svelte';
    import AxisY from '$lib/components/charts/AxisY.svelte';
  
    // Define keys used in the chart
    const xKey = 'year';
    const yKey = 'total_songs';
  
    let data = [];
    let xDomain = [];
    let yDomain = [0, 0];
    const width = 800;
    const height = 400;
  
    // Define reactive scales so that they update when xDomain or yDomain change
    let xScale, yScale;
    $: xScale = scaleBand().domain(xDomain).range([0, width]).padding(0.1);
    $: yScale = scaleLinear().domain(yDomain).range([height, 0]);
  
    onMount(async () => {
      try {
        const dataPath = '/data/billboard.csv'; // Ensure this path is correct
        const csvData = await d3.csv(dataPath);
        console.log("Raw CSV Data:", csvData);
  
        // Apply filter criteria
        const filteredData = csvData.filter(d => {
          return +d.year >= 1970 &&
                 +d.bpm >= 120 &&
                 +d.danceability >= 68 &&
                 +d.energy >= 69;
        });
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
  
        // Set domains based on the processed data
        xDomain = data.map(d => d[xKey]);
        yDomain = [0, d3.max(data, d => d[yKey])];
  
        console.log("xDomain:", xDomain, "yDomain:", yDomain);
      } catch (error) {
        console.error("Error loading or processing data:", error);
      }
    });
  </script>
  
  <div class="chart-container">
    <LayerCake
      padding={{ top: 20, right: 20, bottom: 40, left: 40 }}
      x={xKey}
      y={yKey}
      {data}
      xScale={xScale}
      yScale={yScale}
    >
      <Svg>
        <AxisX />
        <AxisY />
        <Column fill="#01EFFE" />
      </Svg>
    </LayerCake>
  </div>
  
  <style>
    .chart-container {
      width: 100%;
      height: 400px;
      position: relative;
    }
  </style>
  