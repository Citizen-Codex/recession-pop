<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import md from '$lib/utils/md';

  const content = page.data['music'];
  let activeIndex = 0;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeIndex = +entry.target.dataset.index;
          }
        });
      },
      {
        root: document.querySelector('.text-scroll'),
        threshold: 0.5
      }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>


<div class="w-full bg-black">
    <div class="relative flex h-[80vh] w-[85%] mx-auto overflow-hidden rounded border border-[#B1B0B0] backdrop-blur-md shadow-[0_0_16px_1px_rgba(45,247,10,0.5)] bg-gradient-to-b from-black/60 to-zinc-700/50 px-12 my-20">

      <!-- Pagination dots -->
      <div class="absolute top-17 left-8 z-20 flex flex-col gap-3">
        {#each content as _, i}
          <div
            on:click={() => {
              const container = document.querySelector('.text-scroll');
              const section = document.getElementById(`section-${i}`);
              if (container && section) {
                const offset = section.offsetTop - container.offsetTop;
                container.scrollTo({ top: offset, behavior: 'smooth' });
              }
            }}
            class="w-2.5 h-2.5 rounded-full border cursor-pointer transition-all duration-300 transform"
            class:bg-white={activeIndex === i}
            class:scale-[1.75]={activeIndex === i}
            class:border-white={activeIndex !== i}
            class:bg-transparent={activeIndex !== i}
          ></div>
        {/each}
      </div>
      
      <!-- Internal container -->
      <div class="w-full overflow-y-scroll snap-y snap-mandatory text-scroll scroll-smooth no-scrollbar flex flex-row"> <!--  border-orange-300 border-2 -->

        <!-- Text -->
        <div class="w-[55%]">
          <div class="flex flex-col relative max-w-2xl">
            {#each content as entry, i}
              <div
                class="w-full scroll-section flex flex-row items-start gap-16 min-h-screen px-10 pt-12 snap-start"
                data-index={i}
                id={`section-${i}`}
              >
                <div class="flex flex-col">
                  <h1 class="font-robo text-white text-9xl">
                    {@html md(entry.year)}
                  </h1>
                  <p class="body text-white">
                    {@html md(entry.content)}
                  </p>
                </div>
              </div>
            {/each}
            <div class="h-screen"></div>
          </div>
        </div>

        <!-- Spotify player -->
        <div class="sticky top-1/2 -translate-y-1/2 w-[45%] flex items-center justify-center min-h-screen">
          <div class="w-[80%] rounded-xl shadow-[0_0_16px_1px_rgba(254,136,249,0.5)]">
            {@html content[activeIndex]?.embed}
          </div>
        </div>
        

      </div>
  </div>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
