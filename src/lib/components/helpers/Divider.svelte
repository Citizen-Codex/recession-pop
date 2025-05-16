<script lang="ts">
  export let type = '';
</script>

<div class="w-full overflow-hidden">
  <div class="w-[101%] mx-auto overflow-hidden">
    {#if type === 'normal'}
      <img src="assets/divider.png" alt="divider" class="block w-full" />
    {:else if type === 'trans'}
      <img src="assets/divider_trans.png" alt="divider" class="block w-full" />
    {/if}
  </div>
</div>
