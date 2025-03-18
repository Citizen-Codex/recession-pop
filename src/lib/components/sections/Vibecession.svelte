<script>
    import Window from '$lib/components/helpers/Window.svelte';
    import { page } from '$app/state';
    import md from '$lib/utils/md';
  
    const content = page.data['vibe'];
  </script>
  
  <section class="py-24 text-white">

    <Window>
        <div class="mx-36">

            <img src="assets/icons/bulb.svg" 
                alt="bulb icon" 
                class="justify-center mx-auto mb-10"
            />

            <p class="heading text-center">
                {@html md(content.hed)}
            </p>
            <p class="body text-center">
                {@html md(content.dek)}
            </p>
            <p class="body max-w-2xl justify-center mx-auto">
                {@html md(content.content)}
            </p>

        </div>
    </Window>

  </section>
  