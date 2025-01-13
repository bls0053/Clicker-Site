<script lang="ts">
	import { onMount } from "svelte";


    export let rate: number;
    export let paused: boolean;

    let spriteElement: HTMLDivElement;
    let intervalId: number | null;
    let index_count: number = 1;
    let frameWidth: number = 0;
    let pos = {
        x: 0,
        y: 0
    }

    function updateFrameWidth() {
        if (spriteElement) {
            pos.x = 0;
            frameWidth = spriteElement.getBoundingClientRect().width;
        }
    }

    $: {
        let intervalRate = Math.max(10,(500 / (2 + (.5) * Math.log(1 + rate))))
		if (rate > 0 && !paused) {
            
			if (!intervalId) {
				intervalId = setInterval(() => {
					pos.x -= frameWidth;
					if (index_count % 4 === 0) {
						pos.x = 0;
					}
					index_count += 1;
				}, intervalRate);
			}
		} 

        else {	
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		}
	}

    onMount(() => {
        updateFrameWidth();
        window.addEventListener('resize', updateFrameWidth);
    })

</script>

<style>
    .sprite {
        width: auto;
        height: 100%;
        background-image: url('/typing.png');
        background-repeat: no-repeat;
        background-size: 400%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform-origin: center left;
        aspect-ratio: 32/40;
    }

</style>

<div class="h-5/6 relative">
    <div bind:this={spriteElement} style="top:18%; left: 5%; background-position: {pos.x}px {pos.y}px;" class="sprite absolute h-full w-full"></div>
</div>
