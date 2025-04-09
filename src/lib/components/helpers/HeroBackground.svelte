<section class="absolute top-0 left-0 h-full w-full overflow-hidden">
    <video autoplay loop muted playsinline preload="auto" class="h-full w-full object-cover">
      <source src="assets/lights_slow.mp4" type="video/mp4">
    </video>
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-75"></div>
  </section>
  
<!-- <div class="h-full w-full absolute top-0 left-0 overflow-hidden">
    <img 
        src="assets/Hero.png" 
        alt="Hero" 
        class="object-cover w-full h-full rotating-image" 
    />
</div> -->

<!-- <body>

    <div class="blobs" role="presentation">
        <div class="blob-rotate">
            <div class="blob-move">
                <div class="blob"></div>
            </div>
        </div>
        <div class="blob-rotate">
            <div class="blob-move">
                <div class="blob"></div>
            </div>
        </div>
        <div class="blob-rotate">
            <div class="blob-move">
                <div class="blob"></div>
            </div>
        </div>
    </div>


</body>

<style>
    
    @layer demo {
        :root {
            --blob-size: 800px;
            --blob-speed: 8s;
            --blob-speed-scale: calc(0.75 * var(--blob-speed));
            --blob-speed-move: calc(1 * var(--blob-speed));
            --blob-speed-rotate: calc(2 * var(--blob-speed));
            --blob-opacity: 1;
            --blob-blur: 50px;
            --blob-color-1: #00CCD9;
            --blob-color-2: #00B2A9;
            --blob-color-3: #0066CC;
        }

        .blobs {
            filter: blur(var(--blob-blur));
            position: absolute;
        }

        .blob {
            width: var(--blob-size);
            height: calc(0.25 * var(--blob-size));
            background-color: var(--blob-color-1);
            border-radius: 100%;
            opacity: var(--blob-opacity);
            mix-blend-mode: multiply;
            animation: blob ease-in-out var(--blob-speed-scale) infinite;
        }

        .blobs > :nth-child(2) .blob {
            background-color: var(--blob-color-2);
            animation-delay: calc(-0.8 * var(--blob-speed-scale));
        }

        .blobs > :nth-child(3) .blob {
            background-color: var(--blob-color-3);
            animation-delay: calc(-0.2 * var(--blob-speed-scale));
        }

        @keyframes blob {
            0%, 100% { transform: scale(0.8, 2); }
            50% { transform: scale(1.4, 0.8); }
        }

        .blob-rotate {
            position: absolute;
            left: 50%;
            top: 50%;
            animation: blob-rotate linear var(--blob-speed-rotate) infinite alternate;
        }

        .blob-rotate:nth-child(2) {
            animation-duration: calc(2 * var(--blob-speed-rotate));
            animation-delay: calc(-1.5 * var(--blob-speed-rotate));
        }

        .blob-rotate:nth-child(3) {
            animation-direction: alternate-reverse;
            animation-duration: calc(0.8 * var(--blob-speed-rotate));
            animation-delay: calc(-1 * var(--blob-speed-rotate));
        }

        @keyframes blob-rotate {
            0% {
                transform: translate3d(-50%, -50%, 0) rotateZ(-28deg);
                transform-origin: 50% 100%;
            }
            100% {
                transform: translate3d(-50%, -50%, 0) rotateZ(28deg);
                transform-origin: 50% 0%;
            }
        }

        .blob-move {
            animation: blob-move ease-in-out var(--blob-speed-move) infinite;
        }

        .blob-move:nth-child(2) {
            animation-delay: calc(-0.8 * var(--blob-speed-move));
        }

        .blob-move:nth-child(3) {
            animation-delay: calc(-0.4 * var(--blob-speed-move));
        }

        @keyframes blob-move {
            0%, 100% { transform: translateX(30%); }
            50% { transform: translateX(-30%); }
        }


        @layer demo.support {
            *, :before, :after {
                box-sizing: border-box;
            }

            body {
                place-content: center;
                min-block-size: 100%;
                background: linear-gradient(to bottom right, #6E30B7, #AC36B9);
                background-size: cover;
                background-position: center;
                overflow: auto;
            }
        }
    }
</style> -->
