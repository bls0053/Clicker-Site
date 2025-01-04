<script lang="ts">
    import { 
	    active_tab,
        count_char,
        state,
        actual_char,
		overallRate_s,
		theme,

    } from '$lib/stores/stores';

    import CodeDisplay2 from '$lib/components/displays/CodeDisplay2.svelte';
	import Section from '$lib/components/containers/Section.svelte';
	import CounterDisplay from '$lib/components/displays/CounterDisplay.svelte';
	import PurchaseButton from '$lib/components/buttons/PurchaseButton.svelte';
	import { buttons_store } from '$lib/stores/buttons';
    import type { Button } from '$lib/stores/buttons';
	import IncButton from '$lib/components/buttons/IncButton.svelte';
    import { unlocked } from '$lib/stores/stores';
	import AppBar from '$lib/components/containers/AppBar.svelte';
    
    
    import IconResume from '~icons/pixelarticons/file-alt';
    import IconEmail from '~icons/pixelarticons/mail';
    import IconLinkedin from '~icons/pixelarticons/user';
    import IconGithub from '~icons/pixelarticons/github';
	import MenuButton from '$lib/components/buttons/MenuButton.svelte';
	import Tab from '$lib/components/containers/Tab.svelte';
	import ProjectDisplay from '$lib/components/displays/ProjectDisplay.svelte';
	import Homie from '$lib/components/displays/Homie.svelte';
	import CoinDisplay from '$lib/components/displays/CoinDisplay.svelte';
	import CoffeeDisplay from '$lib/components/displays/CoffeeDisplay.svelte';
    import { canShowButton } from '$lib/util/prereq';
	import Monitor from '$lib/components/style/Monitor.svelte';
	import MonitorLeft from '$lib/components/style/MonitorLeft.svelte';
	import MonitorRight from '$lib/components/style/MonitorRight.svelte';
	import Enter from '$lib/components/buttons/Enter.svelte';
	import { onMount } from 'svelte';
	import NumDisplay from '$lib/components/displays/NumDisplay.svelte';
	import Monitor2 from '$lib/components/displays/Monitor2.svelte';
	import Monitor3 from '$lib/components/displays/Monitor3.svelte';
	import WaterDisplay from '$lib/components/displays/WaterDisplay.svelte';
	import Upgrades from '$lib/components/displays/Upgrades.svelte';

    const pressedKeys = new Set<string>();

    let paused = false;
    let previous_char = 0;
    let current_char = 0;
    let total_char = 0;
    let intervalId: number | undefined;

	function formatCount(num: number): number | string {
		return num.toFixed(0)
	}

    setInterval(() => {
        current_char = $actual_char;
        total_char = (current_char - previous_char);
        previous_char = current_char;
    }, 1000)
    
    $: {
        $state.coffee;
        if ($state.coffee.amount > 0 && intervalId === undefined) {
            intervalId = setInterval(() => {
                if ($state.coffee.amount > 0) {
                    $state.coffee.amount -= 1;
                }
                else {
                    clearInterval(intervalId);
                    intervalId = undefined;
                    console.log(intervalId)
                }
            }, 1000);
        }
    }

    const handleKeyup = (event: KeyboardEvent) => {
        if (event.key !== "Enter") {
            pressedKeys.delete(event.key); 
        }
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
        else {
            if (!paused && !pressedKeys.has(event.key) && event.key !== "Enter") {
                pressedKeys.add(event.key);
                count_char.update((n) => n + 1);
            }
        }
    };

    function handleResize() {
        const div1 = document.getElementById('div1');
        const div2 = document.getElementById('div2');
        if (div1 && div2) {
            div2.style.width = `${div1?.offsetWidth}px`;
        }
    }
        
   

    onMount(() => {
        handleResize();
        handleResize();
    })
    
</script>

<svelte:window 
    on:keydown={handleKeydown} 
    on:keyup={handleKeyup} 
    on:resize={handleResize}    
/>


<style>

    .grid {
        gap: 10px;
    }

</style>

<!-- background: #e0e0e0; -->


<div class="flex flex-col h-[200vh] w-full">
    
    <div class="h-[150px]"></div>



    <div class="grid grid-cols-12 grid-rows-12 h-3/4 w-5/6 mx-auto ">


        <div class="col-span-12 lg:col-span-9 row-span-4 relative bg-slate-0">
            <div style="border-radius: 10%" class="w-full h-full max-h-[90%] bg-cyan-100">
                <div class="flex flex-row w-[90%] ml-auto h-[90%] ">
                    <CodeDisplay2/>
                </div>
            </div>
            
            <Monitor></Monitor>
            
        </div>

        <div class="col-span-5 lg:col-span-2 row-span-1 relative bg-slate-0">
        </div>

        <div class="col-span-5 lg:col-start-3 lg:col-span-2 row-start-6 lg:row-start-5 row-span-1 bg-slate-0">
            <Enter ></Enter>
        </div>

        <div class="col-start-6 lg:col-start-5 col-span-7 lg:col-span-5 row-span-2 bg-slate-0">
            homie
        </div>

        <div class="hidden lg:block col-start-10 col-span-3 row-start-1 row-span-6 bg-slate-0">
            <div class="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden gap-2">
                <Upgrades></Upgrades>
            </div>
        </div>

        <div class="col-start-1 col-span-6 row-start-7 row-span-6 bg-slate-0">
            
        </div>

        <div class="col-start-7 col-span-6 row-start-7 row-span-6 bg-slate-0">
            
        </div>
    </div>

    

    
</div>


