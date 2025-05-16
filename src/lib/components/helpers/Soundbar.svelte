<script lang="ts">
    import { onMount } from 'svelte';
  
    const segments = [
      { height: 50, color: '#d73027' }, // always-visible base
      { height: 40, color: '#fc8d59' },
      { height: 60, color: '#fee08b' },
      { height: 70, color: '#d9ef8b' },
      { height: 80, color: '#91cf60' }
    ];
  
    const chartHeight = 300;
  
    function positionSegments(inputSegments) {
      let yOffset = chartHeight;
      return inputSegments.map(segment => {
        yOffset -= segment.height;
        return { ...segment, y: yOffset };
      });
    }
  
    const bars = [
      { id: 1, x: 0, speed: 100 },
      { id: 2, x: 110, speed: 150 },
      { id: 3, x: 220, speed: 80 },
      { id: 4, x: 330, speed: 130 },
      { id: 5, x: 440, speed: 110 }
    ];
  
    let visibleSegments = Array(bars.length).fill().map(() => []);
  
    function animateBar(barIndex, positionedSegments, speed) {
      const base = positionedSegments[0];
      const animating = positionedSegments.slice(1);
  
      async function loop() {
        while (true) {
          // Build up
          for (let i = 0; i < animating.length; i++) {
            visibleSegments[barIndex] = [base, ...animating.slice(0, i + 1)];
            visibleSegments = [...visibleSegments];
            await new Promise(res =>
              setTimeout(res, speed + Math.random() * 30)
            );
          }
          await new Promise(res => setTimeout(res, 200));
          // Collapse
          for (let i = animating.length - 1; i >= 0; i--) {
            visibleSegments[barIndex] = [base, ...animating.slice(0, i)];
            visibleSegments = [...visibleSegments];
            await new Promise(res =>
              setTimeout(res, speed + Math.random() * 30)
            );
          }
          await new Promise(res => setTimeout(res, 200));
        }
      }
  
      loop();
    }
  
    onMount(() => {
      bars.forEach((bar, index) => {
        const segmentsForBar = positionSegments(segments);
        animateBar(index, segmentsForBar, bar.speed);
      });
    });
  </script>
  
  <style>
    rect {
      transform: scaleY(0.8);
      transform-origin: bottom;
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    }
  
    rect.visible {
      transform: scaleY(1);
      opacity: 1;
    }
  </style>
  
  <div class="h-lvh flex items-center justify-center">
    <svg width="600" height={chartHeight} style="border: 1px solid #ccc">
      {#each visibleSegments as barSegments, barIndex}
        {#each barSegments as { height, color, y } (y)}
          <rect
            class="visible"
            x={bars[barIndex].x}
            y={y}
            width="100"
            height={height}
            fill={color}
          />
        {/each}
      {/each}
    </svg>
  </div>
  