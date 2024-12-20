<script lang="ts">
    import { 
        count_char,
        state
    } from '../lib/stores/stores';
    import { get, writable } from 'svelte/store';
    import IncrementButton from '$lib/components/buttons/incrementButton.svelte';
    import CounterDisplay from '$lib/components/displays/CounterDisplay.svelte';
    import { Timer_ms } from '../lib/util/time';
	import { onMount } from 'svelte';
    import CodeDisplay from '$lib/components/displays/CodeDisplay.svelte';
    import { buttons_store } from '$lib/stores/buttons';
	import PurchaseButton from '$lib/components/buttons/PurchaseButton.svelte';
	import UpgradeContainer from '$lib/components/containers/UpgradeContainer.svelte';
	import UpgradeSection from '$lib/components/containers/UpgradeSection.svelte';

    // import UpgradeContainer from '$lib/components/displays/UpgradeContainer.svelte';
	// import UpgradeDisplay from '$lib/components/displays/UpgradeDisplay.svelte';
	// import PurchaseButton from '$lib/components/buttons/PurchaseButton.svelte';

    const update_char = () => {
        count_char.update((n) => n + $state.char_rate);
    };

    Timer_ms.subscribe((time) => {
            update_char();
    });

	function formatCount(num: number): number | string {
		return num.toFixed(0)
	}

</script>






<div class="flex-row h-[100vh] w-full flex justify-center items-center bg-black">
    <div class="flex flex-col w-3/4 h-1/2 items-center justify-center">

        <div class="outline rounded-md p-4 h-full w-full">
            <CodeDisplay></CodeDisplay>
        </div>
        <div class="flex flex-row">
            <UpgradeSection>
                {#each $buttons_store as button}
                    <UpgradeContainer 
                    title = {button.title}
                    cost = {button.cost}
                    currency = {button.currency}
                    >
                        <PurchaseButton 
                        id = {button.id}
                        text = "purchase"
                        label = {button.label}
                        />
                    </UpgradeContainer>
                {/each}
            </UpgradeSection>
            <IncrementButton text="Code" store = {count_char}></IncrementButton>
            <CounterDisplay text="char/s: " store={($state.char_rate*100).toFixed(1)} />
            <CounterDisplay text="Chars: " store= {$count_char.toFixed(3)}/>
            <CounterDisplay text="Lines: " store= {Math.floor($state.lines)}/>
        
        </div>
        
        
    </div>
</div>









<!-- <div class="h-1/2 ">
            <div class="flex flex-row ">
                <button on:click={() => ($state.char_rate+=.001).toFixed(3)} class="outline rounded-md p-2 m-2">+.1/s rate_char</button>
                <button on:click={() => ($state.char_rate-=.001).toFixed(3)} class="outline rounded-md p-2 m-2">-.1/s rate_char</button>
                <button on:click={() => ($state.char_rate+=.01).toFixed(3)} class="outline rounded-md p-2 m-2">+1/s rate_char</button>
                <button on:click={() => ($state.char_rate-=.01).toFixed(3)} class="outline rounded-md p-2 m-2">-1/s rate_char</button>
                <button on:click={() => ($state.char_rate+=.1).toFixed(3)} class="outline rounded-md p-2 m-2">+10/s rate_char</button>
                <button on:click={() => ($state.char_rate-=.1).toFixed(3)} class="outline rounded-md p-2 m-2">-10/s rate_char</button>
            </div>
    
            <div class="flex flex-row">
                <button on:click={() => ($state.char_rate += 1).toFixed(3)} class="outline rounded-md p-2 m-2">+100/s rate_char</button>
                <button on:click={() => ($state.char_rate -= 1).toFixed(3)} class="outline rounded-md p-2 m-2">-100/s rate_char</button>
                <button on:click={() => $state.char_rate = 0} class="outline rounded-md p-2 m-2">clear rate_char</button>
                <button on:click={() => count_char.set(0)} class="outline rounded-md p-2 m-2">clear count_char</button>
                <IncrementButton text="Write some code" store={count_char} />
                <CounterDisplay text="char: " store={$count_char ? formatCount($count_char) : "0"} />
                <CounterDisplay text="lines: " store={$state.lines_of_code} />
                <CounterDisplay text="char/s: " store={($state.char_rate*100).toFixed(1)} />
            </div>
    
        </div> -->


            