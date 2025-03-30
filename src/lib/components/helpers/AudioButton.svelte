<script>
	// Initially, audio is off
	// let isAudioOn = false;

	// // Toggle the audio state when clicked
	// function toggleAudio() {
	// 	isAudioOn = !isAudioOn;
	// }
</script>

<!-- Container with provided styling -->
<!-- <div on:click={toggleAudio} class="audio-toggle">
	{#if isAudioOn}
		audio enabled
	{:else}
		enable audio for best experience <img src="assets/icons/audio.svg"/>
	{/if}
</div> -->

<div class="audio-toggle">
	<p>enable audio for best experience</p>
	<img src="assets/icons/audio.svg" alt="audio button"/>
</div>

<style>
	.audio-toggle {
		width: 100%;
		height: 100%;
		padding: 16px;
		background: linear-gradient(180deg, #3A3A3A 0%, #001121 100%);
		border-radius: 4px;
		outline: 1px #2DF70A solid;
		outline-offset: -px;
		justify-content: flex-start;
		align-items: center;
		gap: 10px;
		display: inline-flex;
		transition: transform 0.2s ease;
		text-transform: uppercase;
		font-family: var(--font-mono);
		color: white;
		/* cursor: pointer; */
	}

	.audio-toggle:hover {
		transform: scale(1.025);
	}
</style>
