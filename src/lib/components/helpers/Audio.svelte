<script>
    // State to track whether the audio is on or off
    let isAudioOn = true;

    // Toggle the audio state
    function toggleAudio() {
        isAudioOn = !isAudioOn;
    }
</script>

<img 
    src={isAudioOn ? "assets/audio_on.png" : "assets/audio_off.png"} 
    alt={isAudioOn ? "Audio On" : "Audio Off"} 
    on:click={toggleAudio}
    class="audio-icon"
/>

<style>
    .audio-icon {
        width: 120px;
        cursor: pointer;
    }
</style>
