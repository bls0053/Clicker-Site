<script lang="ts">
    import { 
        count_char,
        state
    } from '../lib/stores/stores';

    import { Timer_ms } from '../lib/util/time';
    import CodeDisplay from '$lib/components/displays/CodeDisplay.svelte';
	import Section from '$lib/components/containers/Section.svelte';
	import { writable, type Writable } from 'svelte/store';
	import CounterDisplay from '$lib/components/displays/CounterDisplay.svelte';
	import PurchaseButton from '$lib/components/buttons/PurchaseButton.svelte';
	import { buttons_store } from '$lib/stores/buttons';
    import type { Button } from '$lib/stores/buttons';
	import IncrementButton from '$lib/components/buttons/incrementButton.svelte';
	import UpgradeContainer from '$lib/components/containers/UpgradeContainer.svelte';
    import { unlocked } from '../lib/stores/stores';

    
    type State = {
        [key: string]: number;
    };

   

    function canShowButton(button: Button) {
        const { unlockCriteria } = button;
        if ($state["lines"].amount < unlockCriteria.lines ||
            $state["coffee"].amount < unlockCriteria.coffee ||
            $state["bencoin"].amount < unlockCriteria.bencoin) {
            return false; 
        }

        for (const prereq of unlockCriteria.prereqs) {
            const prereqButton = $buttons_store.find((b) => b.id === prereq.id);
            if (prereqButton && prereqButton.amount < prereq.amount) {
                return false;
            }
        }
        return true;
    }

    const update_char = () => {
        count_char.update((n) => n + ($state["lines"].rate * $state["lines"].mult));
    };

    Timer_ms.subscribe((time) => {
            update_char();
    });

	function formatCount(num: number): number | string {
		return num.toFixed(0)
	}

</script>






<div class="flex flex-col bg-black h-full w-full">
    

    <div class="flex flex-col m-auto items-center h-5/6 w-3/4 gap-4 ">
        
        {#if ($unlocked.id1)}
            <div class="flex flex-row h-2/3 w-full gap-4">
                <div class="w-5/6 h-full"><CodeDisplay></CodeDisplay></div>
                <div class="flex flex-col w-1/6 h-full justify-between ">
                    <IncrementButton text="write code" store={count_char} />
                    <CounterDisplay text="char: " store={$count_char ? formatCount($count_char) : "0"} />
                    <CounterDisplay text="lines: " store={$state["lines"].amount} />
                    <CounterDisplay text="coffee: " store={$state["coffee"].amount} />
                    <CounterDisplay text="bencoin: " store={$state["bencoin"].amount} />
                    <CounterDisplay text="char_base /s: " store={($state["lines"].rate*100).toFixed(1)} />
                    <CounterDisplay text="char: x" store={(($state["lines"].mult)).toFixed(1)} />
                    <CounterDisplay text="char /s: " store={(($state["lines"].rate * $state["lines"].mult)*100).toFixed(1)} />
                    <CounterDisplay text="coffee /s: " store={($state["coffee"].rate*100).toFixed(1)} />
                    <CounterDisplay text="bencoin /s: " store={($state["bencoin"].rate*100).toFixed(1)} />
                </div>
                
            </div>
        {/if} 
        <div class="flex flex-row h-1/3 gap-4 w-full">
                    {#if ($unlocked.id2)}
            <Section>
                {#each $buttons_store as button}
                    {#if button.section == 1 && canShowButton(button)}
                    <UpgradeContainer>   
                        {#each Object.keys(button.cost) as key}
                            {#if button.cost[key] !== undefined}
                                <p class="pixel-font">{key}: {button.cost[key]}</p>
                            {/if}
                        {/each}
                        <PurchaseButton 
                        id = {button.id}
                        text = "purchase"
                        label = {button.label}
                        />
                    </UpgradeContainer>
                    {/if}
                {/each}
            </Section>
            {/if}

            {#if ($unlocked.id3)}
            <Section>
                {#each $buttons_store as button}
                    {#if button.section == 2 && canShowButton(button)}
                    <UpgradeContainer>    
                        {#each Object.keys(button.cost) as key}
                            {#if button.cost[key] !== undefined}
                                <p class="pixel-font">{key}: {button.cost[key]}</p>
                            {/if}
                        {/each}
                        <PurchaseButton 
                        id = {button.id}
                        text = "purchase"
                        label = {button.label}
                        />
                    </UpgradeContainer>
                    {/if}
                {/each}
            </Section>
            {/if}
            {#if ($unlocked.menu_bar)}
            <Section>Menu BAr</Section>
            {/if}
            {#if ($unlocked.resume)}
            <Section>resumew</Section>
            {/if}
        </div>
   

        {#if ($unlocked.id4)}
            <div class="">

            </div>
        {/if}        
    
   </div>

</div>





<!-- <IncrementButton text="Code" store = {count_char}></IncrementButton>
            <CounterDisplay text="char/s: " store={($state.char_rate*100).toFixed(1)} />
            <CounterDisplay text="Chars: " store= {$count_char.toFixed(3)}/>
            <CounterDisplay text="Lines: " store= {Math.floor($state.lines)}/> -->

<!-- <UpgradeSection>
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
            </UpgradeSection> -->


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
                
            </div>
    
        </div> -->


            