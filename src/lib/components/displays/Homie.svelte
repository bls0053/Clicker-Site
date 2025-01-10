<script lang="ts">
    let frames = [
        '/Typing/Typing/Typing_0.png',
        '/Typing/Typing/Typing_1.png',
        '/Typing/Typing/Typing_2.png',
        '/Typing/Typing/Typing_3.png',
        
    ];

    let currentFrameIndex = 0;

    let interval: any;
    let animationSpeed: number = 100000;
    export let rate: number;

    import { onMount, onDestroy } from 'svelte';

    $: {
        if (rate === 0) {
            animationSpeed = 100000;
        }
        else if (rate > 0 && rate <= 150) {
            animationSpeed = 200;
        } 
        else {
            animationSpeed = 100;
        }

        if (interval) {
            clearInterval(interval);
        }

        interval = setInterval(() => {
            currentFrameIndex = (currentFrameIndex + 1) % frames.length;
        }, animationSpeed);
    }

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

<style>
    .sprite {
        width: auto;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform: translate(0%, -0%);
        aspect-ratio: 32/48;
        object-fit: contain;
    }
  </style>

<img
    class="sprite h-[50%] sm:h-[100%] pl-8 "
    src={frames[currentFrameIndex]}
    alt="Animated Sprite"
/>

