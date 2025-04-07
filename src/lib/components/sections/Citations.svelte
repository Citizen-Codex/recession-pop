<script>
    import { page } from '$app/state';
    import md from '$lib/utils/md';

    const content = page.data['citations']
</script>

<section class="w-full bg-[#FFC3FC] min-h-screen p-32 flex items-center justify-center">
    <div class="max-w-3xl mx-auto">

        <!-- Credits  -->
        <div class="credits text-black text-[14px]">
            <div class="grid [grid-template-columns:repeat(3,auto)] justify-between">
                {#each content.credits as credit}
                    <div class="flex flex-col">
                        <p class="font-normal leading-tight">{@html md(credit.title)}</p>
                        <p class="font-medium">{@html md(credit.name)}</p>
                    </div>
                {/each}
            </div>
        </div>
        

        <!-- Citations -->
        <div class="bg-white border-3 border-black shadow-[6px_6px_0_#000000] p-12 mt-16">
            <p class="citations uppercase text-4xl mb-8">Citations</p>
            <ol class="list-decimal list-outside space-y-2 font-sans pl-5">
                {#each content.links as link}
                    <li><a href={link} target='_blank' class="underline">{link}</a></li>
                {/each}
            </ol>
        </div>
        


    </div>
</section>

<style>
    .citations {
        font-family: 'Jersey 20', sans-serif;
    }
</style>