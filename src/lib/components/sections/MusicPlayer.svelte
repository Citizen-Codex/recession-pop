<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import md from '$lib/utils/md';

  const content = page.data['music'];
  let activeIndex = 0;
  let isLargeScreen = false;
  let embed = [];

  function updateScreenSize() {
    isLargeScreen = window.innerWidth >= 1024;
  }

  onMount(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

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

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      observer.disconnect();
    };
  });

  const urls = [
    "https://open.spotify.com/embed/playlist/0ohVWKOiRdtwWZsOv2Q33X?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/playlist/2rvNsfhCtoxl3YsRUCUxeV?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/playlist/0clzFxq5CtcdoBXSoNTE9P?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/playlist/1hVN4zpLr075BoUOTRCBtB?utm_source=generator&theme=0",
    "https://open.spotify.com/embed/playlist/3cOJ324fwUzSBnNeLlK026?utm_source=generator&theme=0"
  ];

  $: embed = urls.map((url) => {
    const height = isLargeScreen ? 500 : 100;
    return `<iframe style="border-radius:12px; height:${height}px;" src="${url}" width="100%" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  });
</script>

<div class="w-full bg-black">
  <div class="relative flex h-[80lvh] w-[92%] lg:w-[85%] mx-auto overflow-hidden rounded border-2 border-[#B1B0B0] backdrop-blur-md shadow-[0_0_16px_1px_rgba(45,247,10,0.5)] bg-gradient-to-b from-black/60 to-zinc-700/50 my-20">

    <!-- progress bar -->
    <div
      class="absolute top-0 left-0 h-1 bg-white z-30 transition-all duration-300"
      style="width: {((activeIndex + 1) / content.length) * 100}%"
    ></div>

    <!-- internal container -->
    <div class="w-full overflow-y-scroll text-scroll scroll-smooth snap-y snap-proximity no-scrollbar">
      <div class="2xl:mx-20 lg:mx-4 justify-center">
        <div class="flex flex-row w-full items-stretch h-full">

          <!-- left column: text -->
          <div class="w-full lg:w-[55%] justify-center">
            <div class="flex flex-col relative items-center">
              {#each content as entry, i}
                <div
                  class="w-full scroll-section min-h-lvh px-6 lg:px-10 pt-12 snap-start"
                  data-index={i}
                  id={`section-${i}`}
                >
                  <!-- year + arrow icon -->
                  <div class="flex items-center gap-2">
                    <h1 class="font-robo text-white text-7xl mb-4 lg:text-9xl lg:mb-8">
                      {@html md(entry.year)}
                    </h1>
                    <iconify-icon icon="pixel:angle-down" class="lg:hidden text-white text-2xl lg:text-4xl opacity-70 animate-bounce"></iconify-icon>
                  </div>

                  <!-- spotify player (mobile only) -->
                  <div class="w-full lg:hidden flex justify-center flex-col gap-8">
                    <div class="rounded-xl">
                      <div><figure>{@html embed[activeIndex]}</figure></div>
                    </div>
                  </div>

                  <!-- text content -->
                  <p class="body text-white pt-0 lg:max-w-xl">
                    {@html md(entry.content)}
                  </p>
                </div>
              {/each}
             
            </div>
          </div>

          <!-- right: spotify player (desktop only) -->
          <div class="hidden lg:block lg:w-[45%] relative">
            <div class="sticky top-0 flex flex-col justify-center h-[79.5lvh] p-8"> <!-- top-1/2 transform -translate-y-1/2  -->
              <div class="rounded-xl shadow-[0_0_16px_1px_rgba(254,136,249,0.5)] mb-8 mx-4">
                <figure>{@html embed[activeIndex]}</figure>
              </div>
              <div class="flex justify-center">
                <iconify-icon icon="pixel:angle-down" class="text-white text-2xl lg:text-4xl opacity-70 animate-bounce"></iconify-icon>
              </div>
            </div>
          </div>

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
