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

  let visibleByYear = [];
  let stopAnimation = false;
  let lastBuild = false;
  let animationStarted = false;

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

    xDomain.forEach((year, yearIndex) => {
      const songs = data.filter((d) => d.year === year).sort((a, b) => a.index - b.index);
      const segments = songs.map((song) => ({
        ...song,
        x: xScale(song.year),
        y: yScale(song.index),
        height: Math.abs(yScale(0) - yScale(1)) - 0.7
      }));

      if (segments.length > 0) {
        animateYear({
          yearIndex,
          allSegments: segments,
          setVisibleByYear,
          shouldStop: () => stopAnimation,
          freezeAfterLoop: () => lastBuild
        });
      }
    });
  }

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

  const gdpLineGenerator = line()
    .x((d) => xScale(d.year) + (xScale.bandwidth ? xScale.bandwidth() / 2 : 0))
    .y((d) => gdpYScale(d.gdp));

  $: gdpLinePath = gdpData ? gdpLineGenerator(gdpData) : "";

  const unemLineGenerator = line()
    .x((d) => xScale(d.year) + (xScale.bandwidth ? xScale.bandwidth() / 2 : 0))
    .y((d) => unemYScale(d.unrate));

  $: unemLinePath = unemData ? unemLineGenerator(unemData) : "";
</script>


 <!-- Rainbow bars -->
 {#if scrollIndex < 2}
 <g in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
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
{#each xDomain as year (year)}
  <g class="gray-overlays">
    {#each data.filter((d) => d.year === year) as song (song.id)}
      {#key song.id}
        {#if scrollIndex >= 2}
          <rect
            class="gray-overlay"
            in:fade={{ duration: 300 }}
            out:fade={{ duration: 300 }}
            x={xScale(year)}
            y={(scrollIndex >= 5
              ? yScale(aggregatedData.find((d) => d.year === year)?.count || 0)
              : yScale(song.index))}
            width={xScale.bandwidth ? xScale.bandwidth() : 30}
            height={(scrollIndex >= 5
              ? yScale(0) - yScale(aggregatedData.find((d) => d.year === year)?.count || 0)
              : yScale(0) - yScale(1) - 0.7)}
            fill="gray"
            rx="0.2"
            ry="0.2"
            style="animation-delay: {song.index * 0.2}s;"
          />
        {/if}
      {/key}
    {/each}
  </g>
{/each}



<!-- Recession bars -->
{#each xDomain as year (year)}
  {#if recessionYears.has(year)}
    <g class="recession-years">
      {#each data.filter((d) => d.year === year) as song (song.id)}
        <rect
          class="recession-bar {scrollIndex >= 5 && scrollIndex < 10 ? 'visible' : ''} {scrollIndex === 10 ? 'fade-out' : ''}"
          x={xScale(year)}
          y={yScale(aggregatedData.find((d) => d.year === year)?.count || song.index)}
          width={xScale.bandwidth ? xScale.bandwidth() : 30}
          height={yScale(0) - yScale(aggregatedData.find((d) => d.year === year)?.count || 0) - 0.7}
          fill="#23E8F2"
          rx="0.2"
          ry="0.2"
        />
      {/each}
    </g>
  {/if}
{/each}

<!-- Vibecession bars -->
{#each xDomain as year (year)}
  {#if vibeYears.has(year)}
    <g class="vibe-years">
      {#each data.filter((d) => d.year === year) as song (song.id)}
        <rect
          class="vibe-bar {scrollIndex >= 9 ? 'visible' : ''} {scrollIndex < 9 ? 'fade-out' : ''}"
          x={xScale(year)}
          y={yScale(aggregatedData.find((d) => d.year === year)?.count || song.index)}
          width={xScale.bandwidth ? xScale.bandwidth() : 30}
          height={yScale(0) - yScale(aggregatedData.find((d) => d.year === year)?.count || 0) - 0.7}
          fill="#FE88F9"
          rx="0.2"
          ry="0.2"
        />
      {/each}
    </g>
  {/if}
{/each}

<!-- Recession highlights -->
<g class="recession-highlights {scrollIndex === 10 ? 'fade-out' : ''}" class:active={scrollIndex >= 5 && scrollIndex <= 9}>
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

<!-- GDP and Unemployment Lines -->
{#if scrollIndex === 6}
  <path d={gdpLinePath} fill="none" stroke="#A6F9FF" stroke-width="5" in:draw={{duration: 2500}} pathLength={8} out:fade={{duration: 500}} />
{/if}
{#if scrollIndex === 7}
  <path d={unemLinePath} fill="none" stroke="#F9A6FF" stroke-width="5" in:draw={{duration: 5000}} pathLength={10} out:fade={{duration: 500}} />
{/if}


<style>
  .rainbow-bar {
    transform-origin: bottom;
    transform: scaleY(0);
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  }
  .rainbow-bar.visible {
    opacity: 1;
    transform: scaleY(1);
  }

  .rainbow-bar:hover {
    stroke: white;
    stroke-width: 2px;
  }

  .gray-overlay {
    transition: opacity 0.8s ease-in-out, height 1s ease-in-out, y 1s ease-in-out;
    pointer-events: none;
  }

  .gray-overlay:hover {
    stroke: white;
    stroke-width: 2px;
  }

  .vibe-bar {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    pointer-events: none;
  }
  .vibe-bar.visible {
    opacity: 1;
  }
  .vibe-bar.fade-out {
    opacity: 0;
  }
  .recession-bar {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    pointer-events: none;
  }
  .recession-bar.visible {
    opacity: 1;
    transition-delay: 1.8s;
  }
  .recession-bar.fade-out {
    opacity: 0;
    transition-delay: 0s;
  }
  .recession-highlights {
    pointer-events: none;
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
  }
  .recession-highlights.fade-out {
    opacity: 0;
  }
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
  @keyframes draw-left-right {
    from { opacity: 0; transform: scaleX(0); }
    to { opacity: 1; transform: scaleX(1); }
  }
  @keyframes draw-left-right-reverse {
    from { opacity: 1; transform: scaleX(1); }
    to { opacity: 0; transform: scaleX(0); }
  }
</style>