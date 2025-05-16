<script lang="ts">
    import { page } from '$app/state';
    import md from '$lib/utils/md';

    const content = page.data['citations']
</script>

<section class="w-full bg-[#FFC3FC] min-h-lvh flex items-center justify-center py-20 md:p-24">
    <div class="max-w-3xl mx-auto px-8 md:px-0">

        <!-- Credits  -->
        <div class="credits text-black text-[14px]">
            <div class="grid [grid-template-columns:repeat(3,auto)] justify-between gap-8 md:gap-0">
                {#each content.credits as credit}
                    <div class="flex flex-col">
                        <p class="font-normal leading-loose">{@html md(credit.title)}</p>
                        <p class="font-medium leading-tight">{@html md(credit.name)}</p>
                    </div>
                {/each}
            </div>
        </div>
        

        <!-- Citations -->
        <div class="bg-white border-3 border-black shadow-[6px_6px_0_#000000] p-8 md:p-12 mt-16 w-full max-w-full">
            <p class="citations uppercase text-4xl mb-8">Sources</p>
            <ol class="list-decimal list-outside space-y-2 font-sans pl-5 text-sm md:text-base">
                {#each content.links as link}
                    <li><a href={link} target='_blank' class="underline break-all [overflow-wrap:anywhere]">{link}</a></li>
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