<script>
  import { onMount, tick } from 'svelte';
  import { animateYear } from '$lib/js/animateBars';
  import { draw, fade } from 'svelte/transition';
  import { line } from 'd3-shape';

  export let xDomain;
  export let data;
  export let xScale;
  export let yScale;
  export let scrollIndex;
  export let onMouseEnter;
  export let onMouseMove;
  export let onMouseLeave;
  export let gdpData;
  export let gdpYScale;
  export let unemData;
  export let unemYScale;

  // ** SOUNDBAR ANIMATION FOR CHART ** //
  let visibleByYear = [];
  let stopAnimation = false;
  let lastBuild = false;
  let animationStarted = false;
  let animationDone = false; 

  function setVisibleByYear(index, segments) {
    visibleByYear[index] = segments;
    visibleByYear = [...visibleByYear];
  }

  $: if ([0, 1, 2].includes(scrollIndex) && !lastBuild) {
    lastBuild = true;
  }

  $: if (!animationStarted && scrollIndex !== 0 && data && xScale && yScale && xDomain?.length > 0) {
    animationStarted = true;
    stopAnimation = false;
    visibleByYear = xDomain.map(() => ({ base: null, animating: [] }));

    Promise.all(
      xDomain.map(async (year, yearIndex) => {
        const songs = data.filter((d) => d.year === year).sort((a, b) => a.index - b.index);
        const segments = songs.map((song) => ({
          ...song,
          x: xScale(song.year),
          y: yScale(song.index),
          height: Math.abs(yScale(0) - yScale(1)) - 0.7
        }));

        if (segments.length > 0) {
          await animateYear({
            yearIndex,
            allSegments: segments,
            setVisibleByYear,
            shouldStop: () => stopAnimation,
            freezeAfterLoop: () => lastBuild
          });
        }
      })
    ).then(() => {
      animationDone = true;
    });
  }

  // ** RECESSION + VIBECESSION BAR HIGHLIGHTS ** //
  const recessionPeriods = [
    { start: 1970, end: 1970 },
    { start: 1973, end: 1975 },
    { start: 1980, end: 1982 },
    { start: 1990, end: 1991 },
    { start: 2001, end: 2001 },
    { start: 2008, end: 2009 },
    { start: 2020, end: 2020 },
  ];
  const recessionYears = new Set([1970, 1973, 1974, 1975, 1980, 1981, 1982, 1990, 1991, 2001, 2008, 2009, 2020]);
  const vibeYears = new Set([1971, 1972, 1976, 1977, 1983, 1984, 2002, 2003, 2010, 2011, 2012, 2021, 2022]);

  // ** GRAY AGGREGATED CHART OVERLAY ** //
  let chartHeight = 0;
  if (yScale && yScale.range) {
    const range = yScale.range();
    chartHeight = Math.abs(range[0] - range[1]);
  }

  $: aggregatedData = xDomain.map((year) => {
    const yearData = data.filter((d) => d.year === year);
    return {
      year,
      count: yearData.length
    };
  });

  // ** GDP LINE ** //
  const gdpLineGenerator = line()
    .x((d) => xScale(d.year) + (xScale.bandwidth ? xScale.bandwidth() / 2 : 0))
    .y((d) => gdpYScale(d.gdp));

  $: gdpLinePath = gdpData ? gdpLineGenerator(gdpData) : "";

  // ** UNEMPLOYMENT LINE ** //
  const unemLineGenerator = line()
    .x((d) => xScale(d.year) + (xScale.bandwidth ? xScale.bandwidth() / 2 : 0))
    .y((d) => unemYScale(d.unrate));

  $: unemLinePath = unemData ? unemLineGenerator(unemData) : "";
</script>


<!-- Rainbow bars -->
{#if scrollIndex < 3}
  <g in:fade={{ duration: 250 }} out:fade={{ duration: 250 }}>
    {#each visibleByYear as yearSegments, i (i)}
      {#if yearSegments.base}
        <rect
          class="visible rainbow-bar"
          x={yearSegments.base.x}
          y={yearSegments.base.y}
          width={xScale.bandwidth ? xScale.bandwidth() : 30}
          height={yearSegments.base.height}
          fill="url(#barGradient)"
          rx="0.2"
          ry="0.2"
          style="pointer-events: {animationDone ? 'auto' : 'none'}"
          on:mouseenter={(e) => onMouseEnter(yearSegments.base, e)}
          on:mousemove={onMouseMove}
          on:mouseleave={onMouseLeave}
        />
      {/if}
      {#each yearSegments.animating as song (song.id)}
        <rect
          class="visible rainbow-bar"
          x={song.x}
          y={song.y}
          width={xScale.bandwidth ? xScale.bandwidth() : 30}
          height={song.height}
          fill="url(#barGradient)"
          rx="0.2"
          ry="0.2"
          style="pointer-events: {animationDone ? 'auto' : 'none'}"
          on:mouseenter={(e) => onMouseEnter(song, e)}
          on:mousemove={onMouseMove}
          on:mouseleave={onMouseLeave}
          aria-label={`Year: ${song.year}, Rank: ${song.rank}, Song: ${song.song}, Artist: ${song.artist}`}
          role="img"
        />
      {/each}
    {/each}
  </g>
{/if}


<!-- Gray bars -->
{#if scrollIndex >= 3}
  <g in:fade={{ duration: 250 }} out:fade={{ duration: 250 }}>
    {#each xDomain as year (year)}
      <g class="gray-overlays">
        {#each data.filter((d) => d.year === year) as song (song.id)}
          {#key song.id}
            <rect
              class="gray-overlay"
              x={xScale(year)}
              y={(scrollIndex >= 6
                ? yScale(aggregatedData.find((d) => d.year === year)?.count || 0)
                : yScale(song.index))}
              width={xScale.bandwidth ? xScale.bandwidth() : 30}
              height={(scrollIndex >= 6
                ? yScale(0) - yScale(aggregatedData.find((d) => d.year === year)?.count || 0)
                : yScale(0) - yScale(1) - 0.7)}
              fill="gray"
              rx="0.2"
              ry="0.2"
            />
          {/key}
        {/each}
      </g>
    {/each}
  </g>
{/if}


<!-- Recession bars -->
{#if scrollIndex >= 6 && scrollIndex <= 10}
  <g class="recession-years" in:fade={{ delay: 1800, duration: 300 }} out:fade={{ duration: 300 }}>
    {#each xDomain as year (year)}
      {#if recessionYears.has(year)}
        {#each data.filter((d) => d.year === year) as song (song.id)}
          <rect
            class="recession-bar"
            x={xScale(year)}
            y={yScale(aggregatedData.find((d) => d.year === year)?.count || song.index)}
            width={xScale.bandwidth ? xScale.bandwidth() : 30}
            height={yScale(0) - yScale(aggregatedData.find((d) => d.year === year)?.count || 0)}
            fill="#23E8F2"
            rx="0.2"
            ry="0.2"
          />
        {/each}
      {/if}
    {/each}
  </g>
{/if}


<!-- Vibecession bars -->
{#if scrollIndex >= 10 && scrollIndex <= 12}
  <g class="vibe-years" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
    {#each xDomain as year (year)}
      {#if vibeYears.has(year)}
        {#each data.filter((d) => d.year === year) as song (song.id)}
          <rect
            class="vibe-bar"
            x={xScale(year)}
            y={yScale(aggregatedData.find((d) => d.year === year)?.count || song.index)}
            width={xScale.bandwidth ? xScale.bandwidth() : 30}
            height={yScale(0) - yScale(aggregatedData.find((d) => d.year === year)?.count || 0)}
            fill="#FE88F9"
            rx="0.2"
            ry="0.2"
          />
        {/each}
      {/if}
    {/each}
  </g>
{/if}


<!-- Recession highlights -->
{#if scrollIndex >= 6 && scrollIndex <= 10}
  <g class="recession-highlights active" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
    {#each recessionPeriods as period, i (period.start)}
      <rect
        class="recession-rect"
        x={xScale(period.start)}
        y={0}
        width={xScale(period.end + 1) - xScale(period.start)}
        height={chartHeight}
        fill="#36E4EC"
        fill-opacity="0.2"
        stroke="#36E4EC"
        stroke-opacity="1"
        stroke-width="0.5"
        style="animation-delay: {i * 0.2}s;"
      />
    {/each}
  </g>
{/if}


<!-- GDP Line -->
{#if scrollIndex === 7}
  <path
    d={gdpLinePath}
    fill="none"
    stroke="#F28E2A"
    stroke-width="5"
    in:draw={{duration: 2000}}
    out:fade={{duration: 500}}
    pathLength={10}
    class="fade-in"
  />
{/if}

<!-- Unemployment Line -->
{#if scrollIndex === 8}
  <path
    d={unemLinePath}
    fill="none"
    stroke="#06FF33"
    stroke-width="5"
    in:draw={{duration: 5000}}
    pathLength={12}
    out:fade={{duration: 500}}
    class="fade-in"
  />
{/if}


<style>
  /* Rainbow Bars */
  .rainbow-bar {
    transform-origin: bottom;
    transform: scaleY(0);
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .rainbow-bar.visible {
    opacity: 1;
    transform: scaleY(1);
  }

  .rainbow-bar:hover {
    stroke: white;
    stroke-width: 2px;
  }

  /* Gray Overlays */
  .gray-overlay {
    transition: height 1s ease-in-out, y 1s ease-in-out;
    pointer-events: none;
  }
  
  /* Vibe Bars */
  .vibe-bar {
    pointer-events: none;
  }

  .vibe-bar:hover {
    stroke: white;
    stroke-width: 2px;
  }

  /* Recession Bars */
  .recession-bar {
    pointer-events: none;
  }

  .recession-bar:hover {
    stroke: white;
    stroke-width: 2px;
  }

  /* Recession Highlights */
  .recession-highlights {
    pointer-events: none;
  }

  /* Recession Highlight Rects */
  .recession-rect {
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left;
  }

  .recession-highlights.active .recession-rect {
    animation: draw-left-right 0.5s forwards ease-out;
  }

  .recession-highlights:not(.active) .recession-rect {
    animation: draw-left-right-reverse 0.5s backwards ease-in;
  }

  /* Animation Keyframes */
  @keyframes draw-left-right {
    from { opacity: 0; transform: scaleX(0); }
    to   { opacity: 1; transform: scaleX(1); }
  }

  @keyframes draw-left-right-reverse {
    from { opacity: 1; transform: scaleX(1); }
    to   { opacity: 0; transform: scaleX(0); }
  }

  .fade-in {
      animation: fadeIn 0.5s ease-in-out forwards;
    }

  @keyframes fadeIn {
    from  { opacity: 0; }
    to    { opacity: 1; }
  }

</style>