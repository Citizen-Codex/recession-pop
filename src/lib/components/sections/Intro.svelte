<script>
    import { page } from '$app/state';
    import md from '$lib/utils/md';

    const content = page.data['intro'];

    import AudioPlayer from '$lib/components/helpers/AudioPlayer.svelte';
</script>

<section class="py-24">

    <p class="heading">
        {@html md(content.hed)}
    </p>

       <p class="body pb-0">
        Lady Gaga’s new single “Abracadabra”, a dancey, chanty electrohouse track with devilish imagery, had her fans rejoicing the return of Old Testament Gaga, AKA that era when iconic hits like 
        
        <AudioPlayer 
            source={"assets/songs/ladygaga_justdance.mp3"}
            start={"0:40"}
            stop={"1:05"}
            title={"Just Dance"}
            color1={"rgba(254, 136, 249, 0.50)"}
            color2={"#FE88F9"}
        />, 
        
        <AudioPlayer 
            source={"assets/songs/ladygaga_pokerface.mp3"}
            start={"1:05"}
            stop={"1:20"}
            title={"Poker Face"}
            color1={"rgba(1, 239, 254, 0.35)"}
            color2={"#01EFFE"}
        />, and

        <AudioPlayer 
            source={"assets/songs/ladygaga_badromance.mp3"}
            start={"1:13"}
            stop={"1:45"}
            title={"Bad Romance"}
            color1={"rgba(45, 247, 10, 0.25)"}
            color2={"#2DF70A"}
        />
        
        shaped the late 2000s and early 2010s and cemented her status as the so-called “Mother Monster.”</p>
        
        <p class="body pt-0 mt-[24px]">
            She’s not the only one getting people dancing again.
        </p>

    <p class="body">
        PLACEHOLDER FOR ALBUM COVERS
    </p>

    <p class="body">
        {@html md(content['content-after'])}
    </p>

    <div class="w-96 justify-center flex mx-auto">
        <img src="assets/tweet.png" alt="tweet"/>
    </div>

    <div class="w-96 justify-center flex mx-auto">
        <blockquote class="twitter-tweet" data-theme="dark" data-dnt="true" align="center"><p lang="ca" dir="ltr">actual recession indicator <a href="https://t.co/p3IbuB964D">https://t.co/p3IbuB964D</a></p>&mdash; joanie (@laracroftbarbie) <a href="https://twitter.com/laracroftbarbie/status/1889453220432589195?ref_src=twsrc%5Etfw">February 11, 2025</a></blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>



</section>