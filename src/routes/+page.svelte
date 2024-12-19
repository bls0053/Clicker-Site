<script lang="ts">

    import { get, writable } from 'svelte/store';
    import IncrementButton from '$lib/components/buttons/incrementButton.svelte';
    import CounterDisplay from '$lib/components/displays/CounterDisplay.svelte';
    
    import { Timer } from '../lib/util/time';
	import { onMount } from 'svelte';
    import CodeDisplay from '$lib/components/displays/CodeDisplay.svelte';

    import UpgradeContainer from '$lib/components/displays/UpgradeContainer.svelte';

    import { 
        rate_char, 
        rate_b, 
        rate_c 
    } from '../lib/stores/rates';

    import { 
        count_char,
        count_b, 
        count_c, 
        count_time,
        code_full,
        code_index,
        code_line,
        count_lines
    } from '../lib/stores/stores';
	import UpgradeDisplay from '$lib/components/displays/UpgradeDisplay.svelte';
	import UpgradeButton from '$lib/components/buttons/UpgradeButton.svelte';

    let intervalId: NodeJS.Timeout;

    const updateCounters = () => {
        count_char.update((n) => n + get(rate_char));
        // count_b.update((n) => n + get(rate_b));
        // count_c.update((n) => n + get(rate_c));
    };

    Timer.subscribe((time) => {
            updateCounters();
    });

	function formatCount(num: number): number | string {
		return num.toFixed(0)
	}

</script>






<div class="flex-row h-[100vh] w-full flex justify-center items-center bg-black">
    <div class="flex flex-col w-3/4 h-1/2 items-center justify-center p-2 gap-4">

        <div class="outline rounded-md p-4 h-1/2 w-full">
            <CodeDisplay></CodeDisplay>
        </div>

        <div class="flex flex-row h-1/2 w-full ">
            <UpgradeContainer>

                <UpgradeDisplay>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                </UpgradeDisplay>

                <UpgradeDisplay>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                </UpgradeDisplay>

                <UpgradeDisplay>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                    <UpgradeButton></UpgradeButton>
                </UpgradeDisplay>

            </UpgradeContainer>

        </div>
        
        
    </div>
    
</div>






<!-- <div class="h-1/2 ">
            <div class="">const a + b</div>
            <div class="flex flex-row ">
                <button on:click={() => rate_char.update(n => +(n + 0.001).toFixed(3))} class="outline rounded-md p-2 m-2">+.1/s rate_char</button>
                <button on:click={() => rate_char.update(n => +(n - 0.001).toFixed(3))} class="outline rounded-md p-2 m-2">-.1/s rate_char</button>
                <button on:click={() => rate_char.update(n => +(n + 0.01).toFixed(3))} class="outline rounded-md p-2 m-2">+1/s rate_char</button>
                <button on:click={() => rate_char.update(n => +(n - 0.01).toFixed(3))} class="outline rounded-md p-2 m-2">-1/s rate_char</button>
                <button on:click={() => rate_char.update(n => +(n + 0.1).toFixed(3))} class="outline rounded-md p-2 m-2">+10/s rate_char</button>
                <button on:click={() => rate_char.update(n => +(n - 0.1).toFixed(3))} class="outline rounded-md p-2 m-2">-10/s rate_char</button>
            </div>
    
            <div class="flex flex-row">
                <button on:click={() => rate_char.update(n => +(n + 1).toFixed(3))} class="outline rounded-md p-2 m-2">+100/s rate_char</button>
                <button on:click={() => rate_char.update(n => +(n - 1).toFixed(3))} class="outline rounded-md p-2 m-2">-100/s rate_char</button>
                <button on:click={() => rate_char.set(0)} class="outline rounded-md p-2 m-2">clear rate_char</button>
                <button on:click={() => count_char.set(0)} class="outline rounded-md p-2 m-2">clear count_char</button>
                <IncrementButton text="Write some code" store={count_char} />
                <CounterDisplay text="char: " store={$count_char ? formatCount($count_char) : "0"} />
                <CounterDisplay text="lines: " store={$count_lines} />
                <CounterDisplay text="char_rate: " store={$rate_char} />
                <CounterDisplay text="char_rate: " store={$count_time} />
            </div>
    
        </div> -->




            