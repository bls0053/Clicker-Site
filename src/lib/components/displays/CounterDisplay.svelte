<script lang="ts">

    export let store: string | number = "hello";
    export let text: string;

</script>

<style>

    .sprite-bg {
        background-image: url("/displays/tab.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        width: 90%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
    }
</style>


<div class="flex flex-row items-center justify-center rounded-md pixel-font w-full h-full z-10 sprite-bg !text-sm 2xl:!text-2xl select-none">
        {text}: {store}
</div>