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

<div class="flex flex-col w-full h-full gap-4 p-2">
    <!-- {#each $buttons_store as button}
        {#if button.id === "btn20" && canShowButton(button)}
            <PurchaseButton 
                id={button.id}
                label={button.label}
                cost={button.cost}
            />
        {/if}
        {#if button.id === "btn21" && canShowButton(button) && !$unlocked.auto_bean}
            <PurchaseButton 
                id={button.id}
                label={button.label}
                cost={button.cost}
            />
        {/if}
    {/each} -->
    {#if ($unlocked.auto_bean)}

        <div class="flex flex-row w-full justify-evenly items-center gap-2">
            <div class="neo-inset pixel-font p-2">If Beans</div>
            <div class="">&lt</div>
            <IncDisplay value={bean_thresh}></IncDisplay>
            <button 
                class="h-full neo p-2"
                on:mousedown={() => startRapidChange(decrementBeanThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}
            >
                <IconLeft />
            </button>
            <button 
                class="h-full neo p-2"
                on:mousedown={() => startRapidChange(incrementBeanThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}
            >
                <IconRight />
            </button>
        </div>

        <div class="flex flex-row w-full justify-center items-center gap-2">
            <div class="neo-inset pixel-font p-2">If BenCoin</div>
            <div class="">&gt</div>
            <IncDisplay value={coin_thresh}></IncDisplay>
            <button 
                class="h-full neo p-2"
                on:mousedown={() => startRapidChange(decrementCoinThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}
            >
                <IconLeft />
            </button>
            <button 
                class="h-full neo p-2"
                on:mousedown={() => startRapidChange(incrementCoinThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}
            >
                <IconRight />
            </button>
        </div>

        <div class="flex flex-row w-full justify-center items-center gap-2">
            <div class="neo-inset pixel-font p-2">If Price</div>
            <div class="">&lt</div>
            <IncDisplay value={price_thresh}></IncDisplay>
            <button 
                class="h-full neo p-2"
                on:mousedown={() => startRapidChange(decrementPriceThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}
            >
                <IconLeft />
            </button>
            <button 
                class="h-full neo p-2"
                on:mousedown={() => startRapidChange(incrementPriceThresh)}
                on:mouseup={stopRapidChange}
                on:mouseleave={stopRapidChange}
            >
                <IconRight />
            </button>
        </div>
    {/if}
</div>
