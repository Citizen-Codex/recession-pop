<script>
  import { page } from '$app/state';
  import md from '$lib/utils/md';
  const content = page.data['music'];
  let selectedIndex = 0;
  

  </script>
  
  <div class="w-full bg-black border-amber-600 border-8 overflow-auto">
    <div class="w-[85%] mx-auto my-20 ">
     
  
      <!-- Main Content Sections -->
      <div class=" border-2 border-[#B1B0B0] backdrop-blur-md shadow-[0_0_16px_1px_rgba(45,247,10,0.5)] bg-gradient-to-b from-black/60 to-zinc-700/50 mb-16 rounded h-[80vh]">
      {#each content as entry, i}
        
          <div class="w-full flex flex-row p-8 relative">
            <!-- Text Content -->
            <div class="w-full md:w-1/2 p-6">
              <h1 class="font-robo text-white text-5xl md:text-7xl lg:text-9xl mb-6">
                {@html md(entry.year)}
              </h1>
              <p class="text-white">
                {@html md(entry.content)}
              </p>
            </div>
            
            <!-- Spotify Embed -->
            <div class="w-full md:w-1/2 flex items-center justify-center p-6">
              <div class="w-full rounded-xl shadow-[0_0_16px_1px_rgba(254,136,249,0.5)]">
                {@html entry.embed}
              </div>
            </div>
          </div>
        
      {/each}
    </div>
    </div>
  </div>
