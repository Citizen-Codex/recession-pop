<script lang="ts">
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data['intro'];

	import AudioPlayer from '$lib/components/helpers/AudioPlayer.svelte';
	import AlbumScrolly from '$lib/components/sections/AlbumScrolly.svelte';
	import Divider from '$lib/components/helpers/Divider.svelte';
</script>

<div class="w-full relative z-10">
	<div class="column">

		<section class="sections">
			<p class="heading">
				{@html md(content.hed)}
			</p>

			<p class="body pb-0">
				Lady Gaga’s new single
				
				<AudioPlayer
					source={'assets/songs/ladygaga_abracadabra.mp3'}
					start={'1:00'}
					stop={'1:32'}
					title={'Abracadabra'}
					color1={'rgba(255, 99, 71, 0.50)'}
					color2={'#FF6347'}
				/> 
				
				has her fans rejoicing the return of <a href="https://www.2470mag.com/old-tesramnet-gaga-is/" class="underline">Old Testament Gaga</a>.

				With its devilish imagery and dancey, chanty electro-house style, her song evokes an era when iconic hits like <AudioPlayer
				source={'assets/songs/ladygaga_justdance.mp3'}
				start={'0:40'}
				stop={'1:05'}
				title={'Just Dance'}
				color1={'rgba(254, 136, 249, 0.50)'}
				color2={'#FE88F9'}
			/>,

			<AudioPlayer
				source={'assets/songs/ladygaga_pokerface.mp3'}
				start={'1:05'}
				stop={'1:20'}
				title={'Poker Face'}
				color1={'rgba(1, 239, 254, 0.35)'}
				color2={'#01EFFE'}
			/>, and

			<AudioPlayer
				source={'assets/songs/ladygaga_badromance.mp3'}
				start={'1:13'}
				stop={'1:45'}
				title={'Bad Romance'}
				color1={'rgba(45, 247, 10, 0.25)'}
				color2={'#2DF70A'}
			/>
			
			shaped the late 2000s and early 2010s and cemented her status as the so-called “Mother Monster.” 
			</p>

			<p class="body mt-[24px] pt-0">She’s not the only one getting people dancing again.</p>
		</section>
	</div>

	<AlbumScrolly />
		
	<div class="column">
		<section class="sections pt-0">
			<p class="body">
				{@html md(content['content-after'])}
			</p>

			<div class="mx-auto flex max-w-80 md:w-96 justify-center">
				<blockquote class="twitter-tweet" data-theme="dark" data-dnt="true" align="center">
					<p lang="ca" dir="ltr">
						actual recession indicator <a href="https://t.co/p3IbuB964D">https://t.co/p3IbuB964D</a>
					</p>
					&mdash; joanie (@laracroftbarbie)<a
						href="https://twitter.com/laracroftbarbie/status/1889453220432589195?ref_src=twsrc%5Etfw"
						>February 11, 2025</a
					>
				</blockquote>
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
		</section>

		<div class="min-h-[25vh]"></div>
		
	</div>
</div>

