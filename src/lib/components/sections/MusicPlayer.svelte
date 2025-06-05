<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import md from '$lib/utils/md';

  const content = page.data['music'];
  let activeIndex = 0;
  let isLargeScreen = false;

  function updateScreenSize() {
    isLargeScreen = window.innerWidth >= 1024;
  }

  onMount(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          activeIndex = +visible[0].target.dataset.index;
        }
      },
      {
        threshold: 0.3,
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

<div class="w-full bg-black relative min-h-screen">


  <!-- All content on top -->
  <div class="relative z-10">
    <!-- Sticky top bar with progress -->
    <div class="sticky top-0 z-50 bg-black mx-auto w-[90%] lg:w-[85%] overflow-hidden"
         style="border-bottom: 4px groove #B1B0B0">
      <div class="h-15 relative">
        <div
          class="absolute bottom-0 left-0 h-1 bg-white transition-all duration-300 shadow-[0px_0_16px_1px_rgba(45,247,10,1)]"
          style="width: {((activeIndex + 1) / content.length) * 100}%"
        ></div>
      </div>
    </div>

    <!-- Main scrollable content -->
    <div class="relative flex mx-auto border-x-2 md:border-x-4 border-b-2 md:border-b-0 border-[#B1B0B0] backdrop-blur-md bg-gradient-to-b from-black/60 to-zinc-700/50 w-[90%] lg:w-[85%] z-10">
      <div class="w-full text-scroll scroll-smooth snap-y snap-proximity">
        <div class="2xl:mx-20 lg:mx-4 justify-center">
          <div class="flex flex-row w-full">

            <!-- Left column: text content -->
            <div class="w-full lg:w-[55%]">
              <div class="flex flex-col relative items-center">
                {#each content as entry, i}
                  <div
                    class="w-full scroll-section min-h-[90lvh] px-6 lg:px-10 pt-12 snap-start flex flex-col justify-center items-center"
                    data-index={i}
                    id={`section-${i}`}
                  >
                    <div class="w-full lg:max-w-xl mx-auto text-left">
                      <div class="flex items-center gap-2 mb-4 lg:mb-0">
                        <h1 class="font-robo text-white text-7xl lg:text-9xl">
                          {@html md(entry.year)}
                        </h1>
                        <iconify-icon icon="pixel:angle-down" class="lg:hidden text-white text-2xl lg:text-4xl opacity-70 animate-bounce"></iconify-icon>
                      </div>

                      <!-- Spotify embed for mobile -->
                      <div class="w-full lg:hidden flex justify-center flex-col gap-8 mb-6">
                        <div class="rounded-xl">
                          <figure>{@html embed[i]}</figure>
                        </div>
                      </div>

                      <p class="body text-white">
                        {@html md(entry.content)}
                      </p>
                    </div>
                  </div>

                {/each}
              </div>
            </div>

            <!-- Right column: sticky Spotify embed for desktop -->
            <div class="hidden lg:flex lg:w-[45%] relative">
              <div class="w-full">
                <div class="sticky top-[15%] w-full p-8 my-[15%]">
                  <div class="rounded-xl shadow-[0_0_16px_1px_rgba(254,136,249,0.5)] mb-8 mx-4 transition-all duration-500 ease-in-out">
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

    <!-- Sticky footer bar -->
    <div class="hidden md:flex sticky bottom-0 h-15 bg-black z-50 mx-auto w-[90%] lg:w-[85%]"
        style="border-top: 4px ridge #B1B0B0"></div>
  </div>
</div>
