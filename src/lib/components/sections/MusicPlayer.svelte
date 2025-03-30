<script>
    import { page } from '$app/state';
    import md from '$lib/utils/md';

    const content = page.data['music'];
</script>


<div class="container">
    {#each content as entry}
    
        <div class="flex flex-row gap-16 items-center justify-center h-full">

            <!-- Left column -->
            <div class="h-screen snap-start flex flex-col justify-center items-left max-w-2xl">

                <h1 class="font-robo text-white text-9xl">
                    {@html md(entry.year)}
                </h1>
                <p class="body text-white">
                    {@html md(entry.content)}
                </p>

            </div>

            <!-- Spotify embed -->
            <div class="w-xl">
                {@html entry.embed}
            </div>

            
        </div>
    {/each}
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
        box-shadow: 0px 0px 16px 1px rgba(45, 247, 10, 0.25);
        border-radius: 4px;
        outline: 1px #B1B0B0 solid;
        outline-offset: -1px;
        backdrop-filter: blur(3.30px);
    }

    /* Hide scrollbar for WebKit based browsers */
    .container::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for other browsers */
    .container {
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */
    }

</style>