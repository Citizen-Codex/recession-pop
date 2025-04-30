import { tick } from 'svelte';

export async function animateYear({
  yearIndex,
  allSegments,
  setVisibleByYear,
  shouldStop,
  freezeAfterLoop,
  onForceFreeze = () => false
}) {
  const base = allSegments[0];
  const animating = allSegments.slice(1);

  const normalSpeed = 120 + Math.random() * 60;
  const freezeSpeed = 10;
  let freezeNow = false;

  async function loop() {
    while (!shouldStop()) {
      if (onForceFreeze()) {
        freezeNow = true;
      }

      const currentSpeed = freezeNow ? freezeSpeed : normalSpeed;
      const currentPause = freezeNow ? 80 : 200;

      // Build
      for (let i = 0; i <= animating.length; i++) {
        if (shouldStop()) return;
        if (onForceFreeze()) freezeNow = true;

        setVisibleByYear(yearIndex, {
          base,
          animating: animating.slice(0, i)
        });
        await tick();
        await wait(currentSpeed);
      }

      if (freezeNow || freezeAfterLoop()) {
        setVisibleByYear(yearIndex, { base, animating });
        return;
      }

      await wait(currentPause);

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

  return loop();
}
