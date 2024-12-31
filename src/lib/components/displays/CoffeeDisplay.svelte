<script lang='ts'>
	import { buttons_store } from "$lib/stores/buttons";
	import Section from "$lib/components/containers/Section.svelte";
	import PurchaseButton from "$lib/components/buttons/PurchaseButton.svelte";
	import WaterDisplay from "$lib/components/displays/WaterDisplay.svelte";
	import GrinderDisplay from "$lib/components/displays/GrinderDisplay.svelte";
	import BeanDisplay from "$lib/components/displays/BeanDisplay.svelte";
	import { canShowButton } from "$lib/util/prereq";
	import { is_brewing } from "$lib/stores/stores";
	import { onDestroy } from "svelte";

    let intervalId: number | null;
    let x_index: number = 0;
    let y_index: number = 0;
    let index_count: number = 1;
    let pos = {
        x: 0,
        y: -40
    }

    $: {
		if ($is_brewing) {

			if (!intervalId) {
				intervalId = setInterval(() => {
					pos.x -= 32;
					if (index_count % 8 === 0) {
						pos.y -= 40;
						pos.x = 0;
					}
					index_count += 1;
				}, 150);
			}
		} 

        else {	
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
                pos.x = 0;
                pos.y = -40;
			}
		}
	}


</script>


<style>

    .sprite {
        width: 32px;
        height: 40px;
        background-image: url('/CoffeePot/CoffeePot.png');
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform-origin: center left;
    }

</style>



    <Section>
        {#each $buttons_store as button}
            {#if button.section == 5 && canShowButton(button)}
                <PurchaseButton 
                id = {button.id}
                label = {button.label}
                cost = {button.cost}
                />
            {/if}
        {/each}
    </Section>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row  h-[340px] items-center justify-between relative">
            <WaterDisplay></WaterDisplay>
            <div class="flex flex-col absolute translate-x-20">
                <div 
                class="sprite " 
                style="transform: scale(5); background-position: {pos.x}px {pos.y}px">
                </div>
            </div>
        </div>
        <BeanDisplay></BeanDisplay>    
    </div>
    
        

    
    
    
    
    
    

