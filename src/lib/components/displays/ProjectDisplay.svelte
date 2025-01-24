<script lang='ts'>

    export let link = "";
    export let text: string = "";
    export let title: string = "";
    export let checkIt: string | null = null;
    export let readMore: string | null = null;


</script>

<style>

    .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        aspect-ratio: 1;
        border-radius: 20%;
    }

    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 1;
        object-fit: contain;
    }

</style>



<div style="top:25%" class="flex flex-row justify-between absolute w-5/6 h-2/5 xl:h-1/2 left-1/2 -translate-x-1/2 gap-4 items-center xl:items-start">
    <div style="aspect-ratio: 1;" class="flex flex-col relative h-full w-[150px] xl:w-auto pointer-events-none select-none">
        <img class="image absolute" src={link} alt="">
        <img class="sprite z-10 absolute" src="/displays/image_cover.png" alt="">
    </div>

    <div class="flex flex-col gap-4 pixel-font w-full">
        <div class="hidden sm:!text-2xl sm:block select-none">
            {title}
        </div>
        
        <div class="w-full select-none pixel-font !text-base xl:!text-xl" draggable="false">
            {text}
            {#if readMore}
                Read more about the project <a href="{readMore}" target="_blank" class="text-blue-500">here</a>.
            {/if}
            {#if checkIt}
                Try it out yourself <a href="{checkIt}" target="_blank" class="text-blue-500">here</a>.
            {/if}
        </div>
    </div>
    
    

</div>