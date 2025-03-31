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
          root: document.querySelector('.container'),
          threshold: 0.6
        }
      );
  
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach((el) => observer.observe(el));
  
      return () => observer.disconnect();
    });
  </script>
  
  <!-- Scrollable container -->
  <div class="container">
        <div class="scroll-wrapper">
        <!-- Sticky player inside the scrollable area -->
        <div class="player-container">
            {@html content[activeIndex]?.embed}
        </div>
    
        <!-- Scrollable content sections -->
        {#each content as entry, i}
            <div class="scroll-section flex flex-row gap-16 items-center justify-start h-full" data-index={i}>
            <div class="h-screen snap-start flex flex-col justify-center items-left max-w-2xl px-12">
                <h1 class="font-robo text-white text-9xl">
                {@html md(entry.year)}
                </h1>
                <p class="body text-white">
                {@html md(entry.content)}
                </p>
            </div>
            </div>
        {/each}
        </div>
  </div>
  
  <style>
    .container {
      height: 100vh;
      width: 80%;
      margin: auto;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      position: relative;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.62) 0%, rgba(58, 58, 58, 0.51) 100%);
      box-shadow: 0px 0px 16px 1px rgba(45, 247, 10, 0.5);
      border-radius: 4px;
      outline: 1px #B1B0B0 solid;
      outline-offset: -1px;
      backdrop-filter: blur(3.30px);
    }
  
    .container::-webkit-scrollbar {
      display: none;
    }
  
    .container {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  
    .scroll-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
    }
  
    .player-container {
      position: sticky;
      top: 20%;
      right: 10%;
      align-self: flex-end;
      margin-right: 2rem;
      width: 400px;
      max-width: 90vw;
      box-shadow: 0px 0px 16px 1px rgba(254, 136, 249, 0.5);
      border-radius: 12px;
      z-index: 1;
      background: black;
    }
  
    .scroll-section {
      scroll-snap-align: start;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
      height: 100vh;
    }
  </style>
  