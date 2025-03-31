<script>
  import { onMount } from 'svelte';

  export let aggregatedData;
  export let xScale;
  export let yScale;
  export let scrollIndex; 

  const recessionPeriods = [
    { start: 1970, end: 1970 },
    { start: 1973, end: 1975 },
    { start: 1980, end: 1982 },
    { start: 1990, end: 1991 },
    { start: 2001, end: 2001 },
    { start: 2008, end: 2009 },
    { start: 2020, end: 2020 },
  ];

  // Calculate the chart's height from the yScale's range.
  let chartHeight = 0;
  if (yScale && yScale.range) {
    const range = yScale.range();
    chartHeight = Math.abs(range[0] - range[1]);
  }
</script>

<svg width="100%" height="{chartHeight}">


  <!-- Aggregated bars -->
  {#each aggregatedData as d}
    {#if xScale(d.year) !== undefined}
      <rect
        x={xScale(d.year)}
        y={yScale(d.count)}
        width={xScale.bandwidth()}
        height={chartHeight - yScale(d.count)}
        fill="gray"
        stroke="black"
      />
    {/if}
  {/each}

  <!-- Recession highlights -->
  {#if scrollIndex === 6}
  {#key scrollIndex}
    {#each recessionPeriods as period}
      {#if xScale(period.start) !== undefined && xScale(period.end) !== undefined}
        <rect
          x={xScale(period.start)}
          y="0"
          width={(xScale(period.end) + xScale.bandwidth()) - xScale(period.start)}
          height={chartHeight}
          fill="#36E4EC"
          fill-opacity="0.3"
          stroke="#36E4EC"
          stroke-opacity="1"
          stroke-width="0.5"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="1s"
            fill="freeze"
          />
        </rect>
      {/if}
    {/each}
  {/key}
{/if}


</svg>

<style>
  svg {
    display: block;
    margin: auto;
  }
</style>
