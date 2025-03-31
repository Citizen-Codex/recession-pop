<script>
    import { onMount } from 'svelte';
    import { select, axisLeft, axisRight } from 'd3';
  
    export let leftScale;
    export let rightScale;
    export let height = 650;
    export let ticks = 5;
  
    let leftAxisEl;
    let rightAxisEl;
  
    function drawAxes() {
      if (leftScale) {
        select(leftAxisEl).call(axisLeft(leftScale).ticks(ticks));
      }
      if (rightScale) {
        select(rightAxisEl).call(axisRight(rightScale).ticks(ticks));
      }
    }
  
    onMount(drawAxes);
    $: drawAxes();
  </script>
  
  <svg class="dual-y-axes" width="100%" height={height}>
    <g bind:this={leftAxisEl} class="y-axis-left" transform="translate(40, 0)" />
    <g bind:this={rightAxisEl} class="y-axis-right" transform="translate(100%, 0)" />
  </svg>
  
  <style>
    .dual-y-axes {
      font-size: 12px;
      fill: currentColor;
      pointer-events: none;
    }
  
    .y-axis-left text,
    .y-axis-right text {
      fill: currentColor;
    }
  </style>
  