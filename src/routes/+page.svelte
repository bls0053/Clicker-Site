
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

    .play {
        background-image: url('/OpenPage/play_button.png');
    }

    .skip {
        background-image: url('/OpenPage/skip_button.png');
    }



</style>




<div class="flex flex-col h-5/6 w-full justify-center items-center ">
    <div class="h-full"></div>
    <div class="flex flex-row h-auto w-[400px] lg:w-[600px] mx-auto bg-slate-00 gap-4">

        <div class="w-1/2">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="/page1">
                <button class="bg-green-00 w-full p-2 play button-base"></button>
            </a>
        </div>

        <div class="w-1/2">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href="/page1">
                <button on:click={handleClick} class="bg-green-00 w-full  p-2 skip button-base"></button>
            </a>
        </div>

    </div>
</div>
