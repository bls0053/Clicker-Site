<script lang="ts">
    import { canShowButton } from "$lib/util/prereq";
    import { buttons_store } from "$lib/stores/buttons";
    import PurchaseButton from "../buttons/PurchaseButton.svelte";
    import { state, unlocked } from "$lib/stores/stores";
    import IncDisplay from "./IncDisplay.svelte";

    import IconRight from '~icons/pixelarticons/arrow-right';
    import IconLeft from '~icons/pixelarticons/arrow-left';

    let coin_thresh = 0;
    let bean_thresh = 0;
    let price_thresh = 0;
    let interval: number | null = null; 
    let speedupTimeout: number | null = null;
    let secondSpeedupTimeout: number | null = null;
    let btn20Cost: number | null = 0;
    let canBuy: boolean = false;

    function incrementBeanThresh() {
        bean_thresh++;
    }

    function decrementBeanThresh() {
        bean_thresh = Math.max(0, bean_thresh - 1);
    }

    function incrementCoinThresh() {
        coin_thresh++;
    }

    function decrementCoinThresh() {
        coin_thresh = Math.max(0, coin_thresh - 1);
    }
 
    function incrementPriceThresh() {
        price_thresh++;
    }

    function decrementPriceThresh() {
        price_thresh = Math.max(0, price_thresh - 1);
    }

    function startRapidChange(callback: () => void) {
        callback();

        interval = setInterval(callback, 200);

        speedupTimeout = setTimeout(() => {
            if (interval) clearInterval(interval);
            interval = setInterval(callback, 50);
        }, 1000);

        secondSpeedupTimeout = setTimeout(() => {
            if (interval) clearInterval(interval);
            interval = setInterval(callback, 1);
        }, 5000);
    }

    function stopRapidChange() {
        if (interval) clearInterval(interval);
        if (speedupTimeout) clearTimeout(speedupTimeout);
        if (secondSpeedupTimeout) clearTimeout(secondSpeedupTimeout);
    }

    setInterval(() => { if (canBuy) { triggerButtonClick("btn20") }}, 100)

    $: {
        if (!btn20Cost) {}
        else if (bean_thresh > $state.beans.amount && 
            coin_thresh <= $state.bencoin.amount && 
            price_thresh >= btn20Cost) {
            canBuy = true;
        }
        else {
            canBuy = false;
        }
    }
    
    function triggerButtonClick(buttonId: string) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.dispatchEvent(new MouseEvent('click'));
        }
    }

    $: {
        const btn20 = $buttons_store.find((button) => button.id === "btn20");
        btn20Cost = btn20?.cost?.bencoin ?? null;
    }
</script>


<style>

    .sprite {
        object-fit: fill;
        width: 100%;
        height: 100%;
        aspect-ratio: 1;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
        pointer-events: none;
    }

    .sprite-2 {
        background-image: url("/Coffee/bean_display2.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        width: 100%;
        height: 100%;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
    }

    :active.arrow-button {
        transform: scaleX(.95) scaleY(.90);
        transform-origin: bottom;
    }

</style>





<div class="flex flex-col p-2 select-none">
    {#if (!$unlocked.auto_bean)}
        <div class="flex flex-row items-center justify-center gap-2 h-[96px] w-[225px]">
        {#each $buttons_store as button}
        {#if button.id === "btn20" && canShowButton(button)}
            <PurchaseButton
                id={button.id}
                label={button.label}
                cost={button.cost}/>
        {/if}
        {/each}
        </div>
    {/if}

    {#if ($unlocked.auto_bean)}

        <div class="flex flex-row items-center justify-center gap-2 h-[32px]">
            <div class="block min-w-[150px] sprite-2">
                <span class=" pixel-font p-2">
                    If Beans &lt
                    <IncDisplay value={bean_thresh}></IncDisplay>
                </span>
            </div>
            <button 
                class="h-full min-w-[32px] arrow-button"
                on:mousedown={() => startRapidChange(decrementBeanThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}>
                <img src="/Coffee/button_left.png" class="sprite" alt="">
            </button>
            <button 
                class="h-full min-w-[32px] arrow-button"
                on:mousedown={() => startRapidChange(incrementBeanThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}>
                <img src="/Coffee/button_right.png" class="sprite" alt="">
            </button>
        </div>

        <div class="flex flex-row justify-center items-center gap-2 h-[32px]">
            <div class="block min-w-[150px] sprite-2">
                <span class=" pixel-font p-2">
                    If Coins &gt
                    <IncDisplay value={coin_thresh}></IncDisplay>
                </span>
            </div>
            
            <button 
                class="h-full min-w-[32px] arrow-button"
                on:mousedown={() => startRapidChange(decrementCoinThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}>
                <img src="/Coffee/button_left.png" class="sprite" alt="">
            </button>
            <button 
                class="h-full min-w-[32px] arrow-button"
                on:mousedown={() => startRapidChange(incrementCoinThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}>
                <img src="/Coffee/button_right.png" class="sprite" alt="">
            </button>
        </div>

        <div class="flex flex-row justify-center items-center gap-2 h-[32px]">
            <div class="block min-w-[150px] sprite-2">
                <span class=" pixel-font p-2 w-full ">
                    If Price &lt
                    <IncDisplay value={price_thresh}></IncDisplay>
                </span>
            </div>
            
            <button 
                class="h-full min-w-[32px] arrow-button"
                on:mousedown={() => startRapidChange(decrementPriceThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}>
                <img src="/Coffee/button_left.png" class="sprite" alt="">
            </button>
            <button 
                class="h-full min-w-[32px] arrow-button"
                on:mousedown={() => startRapidChange(incrementPriceThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}>
                <img src="/Coffee/button_right.png" class="sprite" alt="">
            </button>
        </div>
    {/if}
</div>










        