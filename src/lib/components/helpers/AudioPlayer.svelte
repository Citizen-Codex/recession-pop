<script>
    import { onMount, onDestroy } from 'svelte';
    let track, controlBtn, container;
    let isPlaying = false;
    export let source = "";
    export let start = ""; // Format e.g. 1:50
    export let stop = "";
    export let title = "";
    export let color1 = "";    // Base background color
    export let color2 = "";    // Duration progress color
  
    // Generate a unique id for this component instance.
    let uid = Math.random().toString(36).substring(2, 15);
  
    function parseTimeString(timeStr) {
      const parts = timeStr.split(':');
      if (parts.length === 2) {
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
      return 0;
    }
    
    onMount(() => {
      const startSeconds = parseTimeString(start);
      const stopSeconds = parseTimeString(stop);
      const segmentDuration = stopSeconds - startSeconds;
    
      track.addEventListener("canplaythrough", () => {
        // Additional setup if needed.
      });
    
      function playPause() {
        if (track.paused) {
          // Dispatch a global event notifying that this player is starting
          window.dispatchEvent(new CustomEvent("audio-player-play", { detail: uid }));
          if (track.currentTime < startSeconds || track.currentTime >= stopSeconds) {
            track.currentTime = startSeconds;
          }
          track.play().then(() => {
            isPlaying = true;
          }).catch(err => console.error("Play error:", err));
        } else {
          track.pause();
          isPlaying = false;
        }
      }
    
      controlBtn.addEventListener("click", playPause);
    
      track.addEventListener("ended", () => {
        isPlaying = false;
        track.currentTime = startSeconds;
      });
    
      track.addEventListener("timeupdate", () => {
        if (track.currentTime >= stopSeconds) {
          track.pause();
          isPlaying = false;
          track.currentTime = startSeconds;
          return;
        }
        const progress = (track.currentTime - startSeconds) / segmentDuration;
        const progressPercent = progress * 100;
        // Update the container's background using the exported colors.
        container.style.background = `linear-gradient(to right, ${color2} ${progressPercent}%, ${color1} ${progressPercent}%)`;
      });
  
      // Listen for the global event; if another player starts, pause this one.
      function handleGlobalPlay(event) {
        if (event.detail !== uid && isPlaying) {
          track.pause();
          isPlaying = false;
        }
      }
      window.addEventListener("audio-player-play", handleGlobalPlay);
      
      // Clean up the event listener on component destruction
      onDestroy(() => {
        window.removeEventListener("audio-player-play", handleGlobalPlay);
      });
    });
  </script>
      
  <audio bind:this={track} src={source}>
    <source src={source} type="audio/mpeg" />
  </audio>
      
  <div id={`player-container-${uid}`} bind:this={container} class="player-container" style="background: {color1};">
    <div class="controls">
      <div
        class="play-pause"
        class:pause={isPlaying}
        class:play={!isPlaying}
        bind:this={controlBtn}
        data-audio={source}>
      </div>
      <p class="title">{title}</p>
    </div>
  </div>
      
  <style>
    .player-container {
        display: inline-flex; 
        vertical-align: middle;
        position: relative;
        max-width: 180px;
        height: 35px;
        overflow: hidden;
        color: black;
        justify-content: center;
        align-items: center;
    }
      
    .controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 8px;
    }
      
    .play-pause {
      cursor: pointer;
      text-indent: -9999px;
      position: relative;
      padding: 12px 8px;
      z-index: 2;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 15px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
      
    .play {
      background-image: url("assets/icons/play.svg");
    }
      
    .pause {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgMjRoLTZ2LTI0aDZ2MjR6bTEwLTI0aC02djI0aDZ2LTI0eiIvPjwvc3ZnPg==) !important;
    }
      
    .title {
      font-family: var(--font-mono);
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 600;
    }
  </style>
  