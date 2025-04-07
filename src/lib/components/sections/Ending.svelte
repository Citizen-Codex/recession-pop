<script>
	import Window from '$lib/components/helpers/Window.svelte';
    import Wordmark from '$lib/components/helpers/Wordmark.svelte';
    import AudioPlayer from '$lib/components/helpers/AudioPlayer.svelte';
	import Quote from '$lib/components/helpers/Quote.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['ending'];
</script>

<div class="min-h-screen w-full bg-black">
    <div class="column max-w-7xl">
    <section class="sections text-white max-w-5xl mx-auto">

        <Window>

            <div class="mx-28 text-left relative">

                <img src="assets/icons/pink-triangle.svg"
                alt="pink triangle icon"
                class="absolute top-[300px] left-[-100px]"
                />

                <img src="assets/icons/loud.svg"
                alt="loud icon"
                class="absolute top-0 right-[-110px]"
                />

                <img src="assets/icons/headphone.svg"
                alt="headphone icon"
                class="absolute top-[750px] right-[-140px]"
                />

                <p class="body pb-0">
                    {@html md(content['content-before'])}
                </p>

                <p class="body pt-0 mt-[24px]">
                    2014 was described as “<a href='https://www.usnews.com/news/articles/2014/12/30/2014-the-us-economys-breakout-year' class="underline">The U.S. Economy's Breakout Year</a>,” with bad inflation and high unemployment already in the rearview mirror. Yet 2014 was also when Pitbull and Ne-Yo released 
                    
                    <AudioPlayer
                        source={'assets/songs/pitbull_time.mp3'}
                        start={'00:00'}
                        stop={'00:31'}
                        title={'Time of Our Lives'}
                        color1={'rgba(181, 1, 254, 0.35)'}
                        color2={'#C452FE'}
                    />,
                
                proving that the recession, or at least the fear of being in one, was still in the room with us.
                </p>

                <Quote 
                quote={md(content['quote'])}
                color="#CBFDC2" />

                <p class="body">
                    {@html md(content['content-after'])}
                </p>

            </div>

        </Window>

    </section>
</div>
</div>

