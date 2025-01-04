<script lang='ts'>
	import { buttons_store } from "$lib/stores/buttons";
	import { canShowButton } from "$lib/util/prereq";
	import PurchaseButton from "../buttons/PurchaseButton.svelte";

    export let section: number;
    export let image: string;
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
        background-repeat: no-repeat;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        object-fit: contain;
    }

</style>



<button on:click={handleClick} class="flex w-full h-auto select-none p-2">
   <img src="{image}" alt="" class="sprite pointer-events-none" draggable="false"/>
</button>

<div 
class="flex flex-col justify-center items-center transition-transform gap-2 {modalOpen ? 'duration-100' : 'duration-0'} origin-top {modalOpen ? '' : 'h-0'}"
style="{modalOpen ? '' : 'transform:scale(0)'}">
    {#each $buttons_store as button}
        {#if (button.section === section && canShowButton(button))}
        <PurchaseButton 
        id={button.id}
        label={button.label}
        cost={button.cost}/>
        {/if}
    {/each}
</div>


