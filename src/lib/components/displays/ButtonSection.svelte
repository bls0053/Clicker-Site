<script lang='ts'>
	import { buttons_store } from "$lib/stores/buttons";
	import { unlocked } from "$lib/stores/stores";
	import { canShowButton } from "$lib/util/prereq";
	import PurchaseButton from "../buttons/PurchaseButton.svelte";
    import IconLocked from '~icons/pixelarticons/lock';

    export let section_num: number;
    export let section: string;
    export let image: string;

    let isLocked: boolean = true;
    let modalOpen: boolean;

    function handleClick() {
        console.log(isLocked)
        if (!$unlocked[section as keyof typeof $unlocked]) { return }
        modalOpen = !modalOpen;
        
    }

    $: { 
        if ($unlocked[section as keyof typeof $unlocked]) {
            isLocked = false;
        }
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



<button on:click={handleClick} class="flex w-full h-auto select-none p-2 relative">
   <img src="{image}" alt="" class="sprite pointer-events-none" draggable="false"/>
   <div style=" left: 87%; top:32%" class="{isLocked ? '' : 'hidden'} absolute">
        <IconLocked></IconLocked>
    </div>
</button>

<div 
class="flex flex-col justify-center items-center transition-transform gap-2 {modalOpen ? 'duration-100' : 'duration-0'} origin-top {modalOpen ? 'h-auto' : 'h-0'}"
style="{modalOpen ? '' : 'transform:scale(0)'}">

    
    {#each $buttons_store as button}
        {#if (button.section === section_num && canShowButton(button))}
        <PurchaseButton 
        id={button.id}
        label={button.label}
        cost={button.cost}/>
        {/if}
    {/each}

</div>


