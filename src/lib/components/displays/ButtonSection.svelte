<script lang='ts'>
	import { buttons_store } from "$lib/stores/buttons";
	import { canShowButton } from "$lib/util/prereq";
	import PurchaseButton from "../buttons/PurchaseButton.svelte";


    export let section: number;
    let modalOpen: boolean;

    function handleClick() {
        modalOpen = !modalOpen;
        console.log()
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



<button on:click={handleClick} class="flex w-full h-auto select-none bg-green-200 p-2">
   <img src="/upgrade_header.png" alt="" class="sprite pointer-events-none" draggable="false"/>
</button>

<div 
class="transition-transform duration-100 ease-in-out origin-top {modalOpen ? '' : 'h-0'}"
style="{modalOpen ? '' : 'transform:scale(0)'}">
    {#each $buttons_store as button}
        {#if (button.section === section && canShowButton(button))}
        <PurchaseButton 
        modalOpen={modalOpen}
        id={button.id}
        label={button.label}
        cost={button.cost}/>
        {/if}
    {/each}
</div>


