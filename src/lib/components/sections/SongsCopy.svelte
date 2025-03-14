
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let fruits = [
    { name: 'Apple', value: 30 },
    { name: 'Banana', value: 20 },
    { name: 'Cherry', value: 25 },
    { name: 'Grapes', value: 15 },
    { name: 'Orange', value: 35 }
  ];

  let chart;

  onMount(() => {
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select(chart)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(fruits.map(d => d.name))
      .range([0, width - margin.left - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(fruits, d => d.value)])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "lightgray")
      .style("padding", "5px")
      .style("border-radius", "4px");

    svg.selectAll(".bar")
      .data(fruits)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - y(d.value))
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .text(`${d.name}: ${d.value}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));
  });
</script>

<svg bind:this={chart}></svg>

<!-- <script>
  import { onMount } from 'svelte';
  import { LayerCake, ScaledSvg, Html } from 'layercake';
  import { scaleBand } from 'd3-scale';
  import * as d3 from 'd3';

  import AxisX from '$lib/components/charts/AxisX.svelte';
  import AxisY from '$lib/components/charts/AxisY.svelte';

  let data = [];
  let xDomain = [];
  const xKey = 'year';
  const yKey = 'index'; // Each song is stacked by index

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
    xScale={scaleBand().range([0, 100]).paddingInner(0.1).paddingOuter(0)}
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
                width={xScale.bandwidth ? xScale.bandwidth() * 1 : 30} 
                height={(yScale(0) - yScale(1)) - 0.7}
                fill="url(#barGradient)"
                opacity="1"
                rx="0.2"
                ry="0.2"
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
    pointer-events: all; 
  }
</style> -->
