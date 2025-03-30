<script>
    export let xDomain;
    export let data;
    export let xScale;
    export let yScale;

    export let onMouseEnter;
    export let onMouseMove;
    export let onMouseLeave;

    export let animation;
  </script>
  
  {#each xDomain as year (year)}
    <g>
      {#each data.filter((d) => d.year === year) as song (song.id)}
        <rect
          class="cell"
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
        />
      {/each}
    </g>
  {/each}
  
  <style>
    .cell {
      stroke: black;
      stroke-width: 0.25px;
      pointer-events: all !important;
    }
    .cell:hover {
      stroke: white;
      stroke-width: 2px;
    }
  </style>
  