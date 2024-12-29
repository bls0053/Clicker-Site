<script lang="ts">
    import { 
	    active_tab,
        count_char,
        state,
        actual_char,
		overallRate_s,

    } from '$lib/stores/stores';

    import CodeDisplay3 from '$lib/components/displays/CodeDisplay2.svelte';
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
	import CoffeeDisplay from '$lib/components/displays/WaterDisplay.svelte';
	import WaterDisplay from '$lib/components/displays/WaterDisplay.svelte';
	import GrinderDisplay from '$lib/components/displays/GrinderDisplay.svelte';
	import BeanDisplay from '$lib/components/displays/BeanDisplay.svelte';
    import { canShowButton } from '$lib/util/prereq';


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
            console.log("jhskdbf")
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



</script>



<!-- background: #e0e0e0; -->


<div class="flex flex-col h-full w-full bg-[#242424]">
    {#if ($unlocked.menu_bar)}
    <AppBar>
        {#if ($unlocked.resume)}<MenuButton text="Resume" type="link" link="src/public/Resume.pdf"><IconResume class="w-full h-full"/></MenuButton>{/if}
        {#if ($unlocked.email)}<MenuButton text="Email" type="email" link=""><IconEmail class="w-full h-full"/></MenuButton>{/if}
        {#if ($unlocked.linkedin)}<MenuButton text="Linkedin" type="link" link="https://www.linkedin.com/in/bensims25/"><IconLinkedin class="w-full h-full"/></MenuButton>{/if}
        {#if ($unlocked.github)}<MenuButton text="Github" type="link" link="https://github.com/bls0053"><IconGithub class="w-full h-full"/></MenuButton>{/if}
    </AppBar>
    {/if}
    <div class="flex flex-col m-auto items-center h-5/6 w-11/12 gap-4 ">
        
 
        <div class="flex flex-row h-1/2 w-full gap-4">
            <div class="w-5/6 h-full">

                <div class="neo-inset h-full p-4 relative">
                    <div class="flex flex-row gap-2">
                            <Tab text="Code-Boy TM" id="code"></Tab>
                        {#if ($unlocked.project1)}
                            <Tab text="Project1" id="project1"></Tab>
                        {/if}
                        {#if ($unlocked.project2)}
                            <Tab text="Project2" id="project2"></Tab>
                        {/if}
                        {#if ($unlocked.project3)}
                            <Tab text="Project3" id="project3"></Tab>
                        {/if}
                        {#if ($unlocked.project4)}
                            <Tab text="Project4" id="project4"></Tab>
                        {/if}
                        
                    </div>
                    
                    <CodeDisplay3 bind:paused></CodeDisplay3>
                    <div class="absolute bottom-24 right-24"><Homie rate={total_char}></Homie></div>
                
                    {#if ($active_tab == "project1")}
                        <ProjectDisplay link="/projects/p1/i1.png"></ProjectDisplay>
                    {/if}
                    {#if ($active_tab == "project2")}
                        <ProjectDisplay link="/projects/p2/i1.png"></ProjectDisplay>
                    {/if}
                    {#if ($active_tab == "project3")}
                        <ProjectDisplay link="/projects/p3/i2.png"></ProjectDisplay>
                    {/if}
                    {#if ($active_tab == "project4")}
                        <ProjectDisplay link="/projects/p4/i1.png"></ProjectDisplay>
                    {/if}
                    

                </div>
                    
            </div>
            
            <div class="flex flex-col w-1/6 h-full justify-between ">
                <IncButton text="write code" paused={paused} store={count_char} />
                <CounterDisplay text="attempted char: " store={$count_char ? formatCount($count_char) : "0"} />
                <CounterDisplay text="char: " store={$actual_char ? formatCount($actual_char) : "0"} />
                <CounterDisplay text="lines: " store={Math.floor($state.lines.amount)} />
                <CounterDisplay text="coffee: " store={$state.coffee.amount} />
                <CounterDisplay text="bencoin: " store={$state["bencoin"].amount} />
                <CounterDisplay text="char_base /s: " store={($state.lines.rate*100).toFixed(1)} />
                <CounterDisplay text="char: x" store={(($state.lines.mult)).toFixed(1)} />
                <CounterDisplay text="real char /s: " store={total_char} />
                <CounterDisplay text="char /s: " store={$overallRate_s.toFixed(1)} />
                <CounterDisplay text="water: oz " store={Math.floor($state.water.amount/2)} />
                <CounterDisplay text="beans: " store={$state.beans.amount} />
            </div>
            
        </div>

        <div class="flex flex-row h-1/2 gap-4 w-full">
            {#if ($unlocked.section1)}
            <Section>
                {#each $buttons_store as button}
                    {#if button.section == 1 && canShowButton(button)}
                      
                        
                        <PurchaseButton 
                        id = {button.id}
                        label = {button.label}
                        cost = {button.cost}
                        />
                    
                    {/if}
                {/each}
            </Section>
            {/if}

            {#if ($unlocked.section2)}
            <Section>
                {#each $buttons_store as button}
                    {#if button.section == 2 && canShowButton(button)}
                       
                        
                        <PurchaseButton 
                        id = {button.id}
                        label = {button.label}
                        cost = {button.cost}
                        />
                    
                    {/if}
                {/each}
            </Section>
            {/if}

            {#if ($unlocked.section3)}
                <Section>
                    {#each $buttons_store as button}
                        {#if button.section == 3 && canShowButton(button)}
                            
                            <PurchaseButton 
                            id = {button.id}
                            label = {button.label}
                            cost = {button.cost}
                            />
                        
                        {/if}
                    {/each}
                </Section>
            {/if}     
            
            {#if ($unlocked.ben_coin)} 

                <div class="flex flex-row">
                    <Section><CoinDisplay></CoinDisplay></Section>
                    <Section>
                        {#each $buttons_store as button}
                            {#if button.section == 4 && canShowButton(button)}
                                <PurchaseButton 
                                id = {button.id}
                                label = {button.label}
                                cost = {button.cost}
                                />
                            {/if}
                        {/each}
                    </Section>
                </div>

            {/if}


            {#if ($unlocked.coffee)} 
                
                <div class="flex flex-row gap-4">
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

                    <Section>

                        <div class="flex flex-row w-full gap-4">
                            <WaterDisplay/>
                            <div class="flex flex-col w-full justify-between">
                                <GrinderDisplay/>
                                <BeanDisplay/>
                                
                            </div>
                        </div>
                        
                        
                    </Section>
                </div>

            {/if}
            
        </div>
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


            