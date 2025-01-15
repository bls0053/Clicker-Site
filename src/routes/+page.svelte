
<script lang='ts'>


    import { state, unlocked } from "$lib/stores/stores";
	import { onMount } from "svelte";
    import { skipped } from "$lib/stores/stores";
	import { buttons_store, type Button } from "$lib/stores/buttons";


    let coffee: Button | undefined;
    let coin: Button | undefined;
    let project1: Button | undefined; 
    let project2: Button | undefined; 
    let project3: Button | undefined; 
    let project4: Button | undefined; 
    let bean: Button | undefined; 


    $: {
        coffee = $buttons_store.find((button) => button.id === "btn23");
        coin = $buttons_store.find((button) => button.id === "btn22");
        project1 = $buttons_store.find((button) => button.id === "btn8");
        project2 = $buttons_store.find((button) => button.id === "btn9");
        project3 = $buttons_store.find((button) => button.id === "btn10");
        project4 = $buttons_store.find((button) => button.id === "btn11");

    }

    function handleClick() {
            coffee = $buttons_store.find((button) => button.id === "btn23");
            coin = $buttons_store.find((button) => button.id === "btn22");
            project1 = $buttons_store.find((button) => button.id === "btn8");
            project2 = $buttons_store.find((button) => button.id === "btn9");
            project3 = $buttons_store.find((button) => button.id === "btn10");
            project4 = $buttons_store.find((button) => button.id === "btn11");
            bean = $buttons_store.find((button) => button.id === "btn21");

            if (coffee) { coffee.amount = 1; }
            if (coin) { coin.amount = 1; }
            if (coin) { coin.amount = 1; }
            if (project1) { project1.amount = 1; }
            if (project2) { project2.amount = 1; }
            if (project3) { project3.amount = 1; }
            if (project4) { project4.amount = 1; }
            if (bean) { bean.amount = 1; }

            $unlocked.auto_bean = true;
            $unlocked.ben_coin = true;
            $unlocked.coffee = true;

            $unlocked.project1 = true;
            $unlocked.project2 = true;
            $unlocked.project3 = true;
            $unlocked.project4 = true;
            
            $unlocked.section2 = true;
            $unlocked.section3 = true;
            $unlocked.section4 = true;

            $state.lines.amount = 1000000;
            $state.bencoin.amount = 1000000;
    }

       
    onMount(() => {
        unlocked.update((u) => {
        Object.keys(u).forEach((key) => {
            u[key as keyof typeof u] = false;
            });
            return u;
        });

        $unlocked.section1 = true;
        $unlocked.email = true;
        $unlocked.github = true;
        $unlocked.linkedin = true;
        $unlocked.resume = true;

        $state.lines.amount = 0;
        $state.bencoin.amount = 0;
        $state.water.amount = 0;
        $state.lines.rate = 1;

        if (coffee) { coffee.amount = 0; }
        if (coin) { coin.amount = 0; }
        if (project1) { project1.amount = 0; }
        if (project2) { project2.amount = 0; }
        if (project3) { project3.amount = 0; }
        if (project4) { project4.amount = 0; }
    })


</script>
  
  

<style>

    .button-base {
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        object-fit: contain;
        user-select: none;
        aspect-ratio: 2;
    }

    :hover.button-base {
        transform: scale(1.01) ;
    }

    :active.button-base {
        transform: scaleX(.95) scaleY(.90);
        transform-origin: bottom;
    }

    .play {
        background-image: url('/OpenPage/play_button.png');
    }

    .skip {
        background-image: url('/OpenPage/skip_button.png');
    }

    :hover.skip {
        background-image: url('/OpenPage/skip_button_active.png');

    }

    /* :hover.play {
        background-image: url('/OpenPage/play_button_active.png');

    } */

    .bg {
        background-image: url("/displays/open_page.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
        object-fit: contain;
        user-select: none;

    }

</style>




<div class="flex flex-col h-[90%] w-[390px] md:w-[400px] mx-auto justify-center select-none">
    <div style="text-align: justify; text-align-last: justify" class="pixel-font !text-7xl "> Hey, I'm <span style="color: #007acc;">Ben</span>.</div>
    <div class="flex flex-col-reverse items-center w-full gap-8">

        <div class="flex flex-row w-[85%] md:w-3/4 justify-center mx-auto gap-4 pb-12">

            <div class="w-[150px] ">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <a href="/play">
                    <button class="bg-green-00 w-full p-2 play button-base select-none pointer-events-none"></button>
                </a></div>

            <div class="w-[150px] ">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <a href="/play">
                    <button on:click={handleClick} class="bg-green-00 w-full  p-2 skip button-base select-none pointer-events-none"></button>
                </a></div>

        </div>
        
        <div class="h-full w-full pixel-font mt-8 !text-2xl" style="text-align: justify; text-align-last: justify">
            Welcome to my interactive portfolio.<br><br> To begin, press <span style="color: #4b692f;">PLAY</span>. 
            If you'd just like to see my info, feel free to <span style="color: #ac3232;">SKIP</span>.
        </div>
        
        
       
            
    </div>
</div>
