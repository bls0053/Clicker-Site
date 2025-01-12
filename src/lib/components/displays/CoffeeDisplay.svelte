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
    let index_count: number = 1;
    let pos = {
        x: 0,
        y: 0
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
				}, 100);
			}
		} 

        else {	
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
                pos.x = 0;
                pos.y = 0;
                index_count = 1;
			}
		}
	}


</script>


<style>

    .sprite {
        width: 32px;
        height: 40px;
        background-image: url('/Coffee/machine.png');
        background-repeat: no-repeat;
        background-size: fill;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        transform-origin: center left;
        transform: scale(5);
    }

</style>



    <div class="flex flex-col-reverse lg:flex-row-reverse h-[400px] lg:h-[360px] items-center relative mt-2 gap-2">

        <WaterDisplay></WaterDisplay>
        <div style="" class="flex flex-col h-full justify-end">
            <div style="top:30%; left: 15%; background-position: {pos.x}px {pos.y}px;" class="sprite absolute"></div>
            <BeanDisplay></BeanDisplay>    
        </div>
    </div>
    


    

    
    
    
    
    
    

 <!-- <div class="flex flex-col absolute translate-x-20">
                <div 
                class="sprite" 
                style="transform: scale(5); background-position: {pos.x}px {pos.y}px;">
                </div>
            </div> -->