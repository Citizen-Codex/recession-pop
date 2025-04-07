import { tick } from 'svelte';

export async function animateYear({
  yearIndex,
  allSegments,
  setVisibleByYear,
  shouldStop,
  freezeAfterLoop
}) {
  const base = allSegments[0];
  const animating = allSegments.slice(1);

  const normalSpeed = 120 + Math.random() * 60;
  const freezeSpeed = 30; // speed up when freezing

  let freezeNow = false;

  async function loop() {
    while (!shouldStop()) {
      // Pre-check if we should enter freeze cycle
      if (freezeAfterLoop()) {
        freezeNow = true;
      }

      const currentSpeed = freezeNow ? freezeSpeed : normalSpeed;
      const currentPause = freezeNow ? 80 : 200;

      // Build
      for (let i = 0; i <= animating.length; i++) {
        if (shouldStop()) return;
        setVisibleByYear(yearIndex, {
          base,
          animating: animating.slice(0, i)
        });
        await tick();
        await wait(currentSpeed);
      }

      await wait(currentPause);

      if (freezeNow) {
        // Final state
        setVisibleByYear(yearIndex, { base, animating });
        return;
      }

      // Collapse
      for (let i = animating.length - 1; i >= 0; i--) {
        if (shouldStop()) return;
        setVisibleByYear(yearIndex, {
          base,
          animating: animating.slice(0, i)
        });
        await tick();
        await wait(currentSpeed);
      }

      await wait(currentPause);
    }
  }

  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  loop();
}
