<script lang='ts'>


    import { active_tab, unlocked } from '$lib/stores/stores';
    import IconLocked from '~icons/pixelarticons/lock';

    export let text = "";
    export let id = "";
    export let isLocked: boolean = false;

    let isActive = false

    function handleClick() {
        if (isLocked) { return }
        active_tab.set(id);
    }

    $: {
        if ($unlocked[id as keyof typeof $unlocked]) {
            isLocked = false;
        }
    }

    $: { 
        if ($active_tab != id) {
            isActive = false;
        }
        else { isActive = true}
    }

</script>

<style>
    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        aspect-ratio: 4;
        object-fit: fit;
    }

    


</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleClick} class="flex flex-row w-1/6 pixel-font items-center rounded-lg cursor-pointer relative select-none justify
    {isActive ? 'transform scale-105' : 'transform scale-95'}">
    <div style="left:75%" class="{isLocked ? '' : 'hidden'} z-10 absolute">
        <IconLocked></IconLocked>
    </div>
    <img src="/displays/tab2.png" alt="" class="sprite pointer-events-none absolute" draggable="false"/>
    <div class="flex z-10 ml-auto w-4/5">{text} </div>
</div>