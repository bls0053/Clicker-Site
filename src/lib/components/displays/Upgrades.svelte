<script lang='ts'>
	import ButtonSection from "./ButtonSection.svelte";


    function expandSection() {

    }


</script>


<style>
    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 3;
        object-fit: contain;
    }
</style>


<!-- <img src="/upgrades.png" alt="Enter Button" class="sprite pointer-events-none" draggable="false"/> -->

<div class="flex flex-col gap-2 h-full w-full p-2 bg-red-200">
    <ButtonSection section={1}/>
    <ButtonSection section={2}/>
    <ButtonSection section={3}/>
    <ButtonSection section={4}/>
    <ButtonSection section={5}/>

    <!-- <button class="flex w-full h-full select-none ">
        <img src="/upgrade_header.png" alt="Enter Button" class="sprite  pointer-events-none" draggable="false"/>
    </button> -->

</div>
   