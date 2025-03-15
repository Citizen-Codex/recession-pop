<!--
	@component
	Generates a hover tooltip. It creates a slot with an exposed variable via `let:detail` that contains information about the event. Use the slot to populate the body of the tooltip using the exposed variable `detail`.
 -->
 <script>
	/** @type {Object} evt – A svelte event created via [`dispatch`](https://svelte.dev/docs#createEventDispatcher) with event information under `evt.detail.e`. */
  export let evt = {};

	/** @type {Number} [offset=-35] – A y-offset from the hover point, in pixels. */
  export let offset = -35;
</script>

<style>
  .tooltip {
    position: absolute;
    width: 200px;
    border: 1px solid #ccc;
		font-size: 12px;
    background: white;
    transform: translate(-10%, -80%);
    padding: 8px;
    z-index: 15;
    font-family: var(--font-mono);
  }

</style>

{#if evt.detail}
  <div
    class="tooltip"
    style="
      top:{evt.detail.e.layerY + offset}px;
      left:{evt.detail.e.layerX}px;
    "
  >
    <slot detail={evt.detail}></slot>
  </div>
{/if}
