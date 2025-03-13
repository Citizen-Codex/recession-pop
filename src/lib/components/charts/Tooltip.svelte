<script>
    export let x = 0;
    export let y = 0;
    export let visible = false;
    export let content = "";
  </script>
  
  <style>
    .tooltip {
      position: absolute;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 6px 10px;
      font-size: 14px;
      border-radius: 4px;
      pointer-events: none;
      transform: translate(-50%, -100%);
      white-space: nowrap;
      transition: opacity 0.2s ease-in-out;
      z-index: 9999;
    }
  
    .hidden {
      display: none; /* Completely remove from DOM when not visible */
    }
  </style>
  
  {#if visible}
    <div
      class="tooltip"
      style="left: {x}px; top: {y}px;"
    >
      {content}
    </div>
  {/if}
  