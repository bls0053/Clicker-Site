<script lang='ts'>

    export let link = "";


</script>

<style>

    .image {
        width: 100%;
        height: 100%;
        aspect-ratio: 1;
        object-fit: fill;
        border-radius: 40px;
    }

    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 4;
        object-fit: fill;
    }

</style>



<div style="top:24%" class="flex flex-row justify-between absolute w-5/6 h-[300px] left-1/2 -translate-x-1/2 gap-4 pointer-events-none">
    <div style="aspect-ratio: 1;" class=" relative h-full w-1/2">
        <img class="image absolute" src={link} alt="">
        <img class="sprite z-10 absolute w-full" src="/image_cover.png" alt="">
    </div>
    <div class="w-full select-none pixel-font" draggable="false">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolorem nostrum aut culpa illum doloribus sequi maiores. 
        Nulla earum enim sit aspernatur accusantium! Cum voluptate dolor molestias illum natus? Accusantium.
    </div>

</div>