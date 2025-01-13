<script lang="ts">
    import { 
	    active_tab,
        count_char,
        state,
        actual_char,
		overallRate_s,
		theme,
		unlocked,
		proj,

    } from '$lib/stores/stores';

    import CodeDisplay2 from '$lib/components/displays/CodeDisplay2.svelte';
	import CounterDisplay from '$lib/components/displays/CounterDisplay.svelte';

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
	import Monitor from '$lib/components/style/Monitor.svelte';
	import KeyButton from '$lib/components/buttons/KeyButton.svelte';
	import Enter from '$lib/components/buttons/Enter.svelte';
	import { onMount } from 'svelte';
	import Upgrades from '$lib/components/displays/Upgrades.svelte';
	import Help from '$lib/components/displays/Help.svelte';

    const pressedKeys = new Set<string>();

    let paused = false;
    let previous_char = 0;
    let current_char = 0;
    let running_char: number[] = [];
    let total_char = 0;
    let intervalId: number | undefined;
    let sidebar: boolean = false;


	function formatCount(num: number): string {
        if (num < 1000) {
             return num.toFixed(0);
        }
        else if (num < 1000000) { 
            return (num/1000).toFixed(1) + "K"
        }   
        else { return (num/1000000).toFixed(1) + "M"};
	}

    setInterval(() => {
        current_char = $actual_char;
        running_char.push(current_char - previous_char);
        if (running_char.length > 10) {
            running_char.shift();
        }
        total_char = running_char.reduce((a, b) => a + b, 0);
        previous_char = current_char;
    }, 100);
    
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
                }
            }, 1000);
        }
    }

    $: {
        if ($unlocked.project1) { $proj += 1 };
        if ($unlocked.project2) { $proj += 1 };
        if ($unlocked.project3) { $proj += 1 };
        if ($unlocked.project4) { $proj += 1 };
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

    let divHeight = 400;
    let newHeight = 400;

    function handleScroll() { 
        const container = document.querySelector('.scroll-container') as HTMLElement;
        if (!container) {}
        const scrollPosition = window.scrollY;
        newHeight = Math.max(0, divHeight-scrollPosition + 60);
    }
    
    onMount(() => {
        handleResize();
        handleResize();
        handleScroll();
    })
    
</script>

<svelte:window 
    on:keydown={handleKeydown} 
    on:keyup={handleKeyup} 
    on:resize={handleResize}  
    on:scroll={handleScroll} 
/>


<style>

    .grid-gap1 {
        gap: 10px;
    }

    .grid-gap2 {
        gap: 0px;
    }

    .header-img {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        background-repeat: no-repeat;
        object-fit: fill;
    }

    .monitor-bg1 {
        width: 100%;
        height: 100%;
        background-image: url('/Monitor/monitor_bg1.png');
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        object-fit: fill;
    }

    .sprite {
        width: 100%;
        height: 100%;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        object-fit: fit;
    }

</style>

<!-- background: #e0e0e0; -->



<div class="fixed inset-0 flex flex-row top-0 h-[80px] lg:h-[100px] mb-20 w-full z-50">
    <div class="flex flex-row-reverse w-full h-full justify-center lg:justify-normal items-center mr-0 lg:mr-6 pt-1">
        
        <!-- <div class="flex lg:hidden flex-row h-full p-3 lg:p-4 pixel-font z-50">
            <button on:click={() => {sidebar = !sidebar}} class="flex flex-col items-center hover:scale-110 active:scale-80 ">
                <IconMenu font-size=28></IconMenu>
                <p>Unlocks</p>
            </button>
        </div> -->

        {#if $unlocked.resume} 
            <MenuButton link="/Resume.pdf" type="link" text="Resume"><IconResume font-size=28></IconResume></MenuButton>
        {/if}
        {#if $unlocked.linkedin} 
            <MenuButton link="https://www.linkedin.com/in/bensims25/" type="link" text="Linkedin"><IconLinkedin font-size=28></IconLinkedin></MenuButton>
        {/if}
        {#if $unlocked.email} 
            <MenuButton link="" type="email" text="Email"><IconEmail font-size=28></IconEmail></MenuButton>
        {/if}
        {#if $unlocked.github} 
            <MenuButton link="https://github.com/bls0053" type="link" text="Github"><IconGithub font-size=28></IconGithub></MenuButton>
        {/if}
        
    </div>
    
    <img src="/header.png" alt="" class="pointer-events-none header-img absolute z-10" draggable="false"/>

</div>

<div class="fixed inset-full flex lg:hidden flex-row top-[81px] h-2/3 w-[450px] z-50 transition-transform duration-500  {sidebar ? '-translate-x-[450px]' : '-translate-x-[65px]'}">

    <div class="flex lg:hidden flex-col p-1 lg:p-2 pixel-font z-50 w-[70px] relative select-none">
        <button on:click={() => {sidebar = !sidebar}} class="flex flex-col items-center transition-transform w-full duration-500 {sidebar ? '-rotate-[180deg] translate-x-[72px] translate-y-[5px]' : '-translate-x-[10px]'} absolute">
            <img class="sprite pointer-events-none" src="/upgrade_open.png" alt="" />
        </button>
    </div>

    <div class="flex flex-col w-[400px] pt-2 ">
        <div class="h-[80px]"></div>
        <div class="flex flex-col h-full overflow-y-auto">
            <Upgrades></Upgrades>
        </div>
        <img class="sprite absolute top-0 z-10 pointer-events-none" src="/upgrade_border.png" alt="" />
        <img class="sprite absolute top-0 -z-10 pointer-events-none" src="/upgrade_border2.png" alt="" />
    </div>
    
</div>


<div class="h-[100px] lg:h-[150px]"></div>

<div class="flex flex-col w-full h-[100vh] lg:h-[75vh]">
    
    <div class="grid grid-gap1 grid-cols-12 grid-rows-7 lg:grid-rows-6 h-full w-11/12 lg:w-3/4 mx-auto">


        <div class="col-span-12 lg:col-span-9 row-span-4 relative overflow-hidden">
            <div style="border-radius: 10%" class="flex flex-col-reverse w-full h-full max-h-[90%] bg-cyan-100">
                <div id="scroll-container"
                style="height: {newHeight}px;"
                class="block w-[80%] mx-auto mt-auto mb-20">
                    <CodeDisplay2 bind:paused={paused}/>  
                </div>
                <Help></Help>
            </div>
            
            <div style="top:12%" class="flex flex-row justify-between absolute w-5/6 h-[45px] left-1/2 -translate-x-1/2 gap-1">
                <Tab isLocked={false} id="code" text="code"></Tab>
                <Tab isLocked={true} id="project1" text="p1"></Tab>
                <Tab isLocked={true} id="project2" text="p2"></Tab>
                <Tab isLocked={true} id="project3" text="p3"></Tab>
                <Tab isLocked={true} id="project4" text="p4"></Tab>
                <Tab isLocked={false} id="help" text="?"></Tab>
            </div>

            {#if ($active_tab) === "project1"}
                <ProjectDisplay 
                title="AL Schools - Machine Learning Tool" 
                text="This is a machine learning tool to improve Alabama school performance."
                link="/projects/p1/i1.png"
                checkIt="https://ml-school-tool.vercel.app/"
                readMore="https://github.com/bls0053/ml-school-tool"
                ></ProjectDisplay>
                
            {/if}
            {#if ($active_tab) === "project2"}
                <ProjectDisplay 
                title="Web-Synthesizer" 
                text="Simple web-based synthesizer designed to teach basic audio design principles." 
                link="/projects/p3/i2.png"
                checkIt="https://web-vst.vercel.app/"
                readMore="https://github.com/bls0053/web-vst"
                ></ProjectDisplay>
            {/if}
            {#if ($active_tab) === "project3"}
                <ProjectDisplay 
                title="Ludem 56 Entry" 
                text="Group entry for Ludem Dare 56. I made the music." 
                link="/projects/p4/i1.png"
                checkIt="https://seltzerfish.itch.io/after-hours"
                ></ProjectDisplay>
            {/if}
            {#if ($active_tab) === "project4"}
                <ProjectDisplay 
                title="DBSCAN Clustering Tool" 
                text="Density based clustering tool used to group similar data and remove noise." 
                link="/projects/p2/i3.png"
                readMore="https://github.com/bls0053/dbscan"
                ></ProjectDisplay>
            {/if}
            

            <div class="grid grid-gap2 grid-cols-6 grid-rows-2 absolute w-5/6 h-[60px] left-1/2 -translate-x-1/2 gap-1 -translate-y-[75px]">
                <div class="col-start-1 col-span-6 lg:col-span-3 row-start-1 row-span-1 lg:row-span-2 w-full h-full">
                    <div class="flex flex-row w-full h-full ">
                        <CounterDisplay text="C/sec" store={formatCount(total_char)} ></CounterDisplay>
                        <CounterDisplay text="Lines" store={formatCount($state.lines.amount)}></CounterDisplay>
                        <CounterDisplay text="BenCoin" store={formatCount($state.bencoin.amount)}></CounterDisplay>
                    </div>
                </div>
                <div class="col-start-1 lg:col-start-4 col-span-6 lg:col-span-3 row-start-2 lg:row-start-1 row-span-1 lg:row-span-2 w-full h-full">
                    <div class="flex flex-row w-full h-full ">
                        <CounterDisplay text="Coffee" store={formatCount($state.coffee.amount)}></CounterDisplay>
                        <CounterDisplay text="Water" store={formatCount($state.water.amount)}></CounterDisplay>
                        <CounterDisplay text="Beans" store={formatCount($state.beans.amount)}></CounterDisplay>
                    </div>
                </div>
            </div>
            
            <Monitor></Monitor>
            
        </div>

        <div class="col-span-6 lg:col-span-2 col-start-1 lg:col-start-8 row-start-7 lg:row-start-5 row-span-1 relative bg-slate-00">
            <KeyButton store={state} paused={paused} />
        </div>
        
        <div class="col-span-6 lg:col-span-2 col-start-7 lg:col-start-8 row-start-7 lg:row-start-6 row-span-1 bg-slate-00">
            <Enter />
        </div>
        
        <div class="col-start-1 col-span-12 lg:col-span-7 row-start-5 row-span-2 relative bg-slate-00 ">
            <div class="flex flex-col h-full w-full"><Homie rate={total_char} paused={paused}></Homie></div>
            <img class="sprite absolute top-0 transform -z-10 select-none" src="/homie_border.png" alt="" />
        </div>
        
        <div class="hidden lg:block col-start-10 col-span-3 row-start-1 row-span-6 bg-slate-00 relative">
            <div class="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden gap-2">
                <Upgrades></Upgrades>
            </div>
            <img class="sprite absolute top-0 z-10 pointer-events-none select-none" src="/upgrade_border.png" alt="" />
            <img class="sprite absolute top-0 -z-10 pointer-events-none select-none" src="/upgrade_border2.png" alt="" />
        </div>
    </div>
</div>

{#if ($unlocked.ben_coin || $unlocked.coffee)}
    <div class="flex flex-col w-full h-5/6 pt-6">

        <div class="flex flex-row flex-wrap w-11/12 lg:w-3/4 mx-auto gap-6 justify-center">
            {#if ($unlocked.ben_coin)}
                <CoinDisplay></CoinDisplay>
            {/if}
            {#if ($unlocked.coffee)}
                <CoffeeDisplay></CoffeeDisplay>
            {/if}
        </div>
    </div>
{/if}











<!-- 
<div class="flex flex-col w-full h-[190vh] pt-6">

    <div class="grid grid-gap1 grid-cols-12 grid-rows-12 w-11/12 lg:w-5/6 mx-auto">
        <div class="col-start-1 col-span-12 xl:col-span-8 row-start-1 row-span-5 lg:row-span-3 bg-slate-00">
            {#if ($unlocked.section4)}
                <CoinDisplay></CoinDisplay>
            {/if}
        </div>
        <div class="col-start-1 col-span-12 xl:col-span-4 row-start-6 lg:row-start-4 row-span-4 xl:col-start-9 xl:row-start-1 xl:row-span-3 bg-slate-00">
            {#if ($unlocked.section5)}
                <CoffeeDisplay></CoffeeDisplay>
            {/if}
        </div>


    </div>
</div> -->