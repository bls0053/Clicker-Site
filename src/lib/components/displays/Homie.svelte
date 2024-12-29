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

<img
    class="sprite m-16"
    src={frames[currentFrameIndex]}
    width="32"
    height="40"
    alt="Animated Sprite"
/>

<style>
    .sprite {
        width: 32px;
        height: 40px;
        /* background-image: url('sprite-sheet.png'); */
        background-position: 0 0;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform: scale(5);
        transform-origin: top left;
    }
</style>