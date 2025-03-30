<script>
  export let xDomain;
  export let data;
  export let xScale;
  export let yScale;

  export let onMouseEnter;
  export let onMouseMove;
  export let onMouseLeave;

  export let scrollIndex;
</script>

{#each xDomain as year (year)}
  <g>
    {#each data.filter((d) => d.year === year) as song (song.id)}
      <rect
        class="cell"
        class:soundwave={scrollIndex === undefined}
        x={xScale(year)}
        y={yScale(song.index)}
        width={xScale.bandwidth ? xScale.bandwidth() : 30}
        height={yScale(0) - yScale(1) - 0.7}
        fill="url(#barGradient)"
        opacity="1"
        rx="0.2"
        ry="0.2"
        on:mouseenter={(event) => onMouseEnter(song, event)}
        on:mousemove={(event) => onMouseMove(event)}
        on:mouseleave={onMouseLeave}
        aria-label={`Year: ${song.year}, Rank: ${song.rank}, Song: ${song.song}, Artist: ${song.artist}`}
        role="img"
        style="animation-delay: {song.index * 0.2}s;"
      />
    {/each}
  </g>
{/each}

<style>
  /* Default styling for each bar */
  .cell {
    stroke: black;
    stroke-width: 0.25px;
    pointer-events: all !important;
    transform-origin: bottom;
  }
  
  .cell:hover {
    stroke: white;
    stroke-width: 2px;
  }
  
  /* Stacking / soundbar effect: Each rect fades and slides in from below */
  .soundwave {
    animation: stack-up 0.5s forwards;
  }
  
  @keyframes stack-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
