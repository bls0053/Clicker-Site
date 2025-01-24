<!-- <script lang="ts">

</script>

<style>
    .sprite {
        background-image: url('/Homie/item3.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform-origin: center left;
        aspect-ratio: 1/2;
        z-index: -10;
    }

    .sprite.absolute {
        left: 40%;
        bottom: 3%;
    }

    .sprite.size {
        width: auto;
        height: 150%;
    }

    @media (max-width: 768px) {
        .sprite.absolute {
            left: 32%;
            bottom: 3%;
        }
        .sprite.size {
            width: auto;
            height: 140%;
        }
    }

</style>


    <div class="sprite absolute size"></div> -->




<script lang="ts">

    import { onMount } from "svelte";
    
    
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
            frameWidth = (spriteElement.getBoundingClientRect().width);
        }
    }

    

    onMount(() => {
        updateFrameWidth();
        window.addEventListener('resize', updateFrameWidth);
        setInterval(() => {
            pos.x -= frameWidth;
                if (index_count % 12 === 0) {
                    pos.x = 0;
                    index_count = 0;
                }
                index_count += 1;
        },100)
        
    })

</script>

<style>
    .sprite {
        width: auto;
        height: 200%;
        background-image: url('/Homie/item3-sheet.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 1200% 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 64/128;
        z-index: -10;
    }

</style>



<div bind:this={spriteElement} style="left:40%; background-position: {pos.x}px {0}px;" class="sprite absolute h-full w-full"></div>

