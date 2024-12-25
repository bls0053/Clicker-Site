<script lang="ts">
    let frames = [
        '/Typing/Typing/Typing_0.png',
        '/Typing/Typing/Typing_1.png',
        '/Typing/Typing/Typing_2.png',
        '/Typing/Typing/Typing_3.png',
        
    ];

    let currentFrameIndex = 0;

    let interval: any;
    let animationSpeed = 0;
    export let paused: boolean;
    export let rate: number;

    import { onMount, onDestroy } from 'svelte';

    $: {
        if (interval) clearInterval(interval);
        
        if (rate === 0 || paused) {
            animationSpeed = 100000;
        }
        else if (rate > 0 && rate < 300) {
            1000
        }
        else {
            100
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