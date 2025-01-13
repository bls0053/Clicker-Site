
<script lang='ts'>


    import { state, unlocked } from "$lib/stores/stores";
	import { onMount } from "svelte";
    import { skipped } from "$lib/stores/stores";


    function handleClick() {
        $unlocked.project1 = true;
        $unlocked.project2 = true;
        $unlocked.project3 = true;
        $unlocked.project4 = true;

        $unlocked.auto_bean = true;
        // $unlocked.ben_coin = true;
        $unlocked.coffee = true;
        
        // $unlocked.section2 = true;
        // $unlocked.section3 = true;
        // $unlocked.section4 = true;

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
    })


</script>
  
  

<style>




</style>




<div class="flex flex-col h-4/5 w-full justify-center items-center">

    <div class="flex flex-col h-[400px] w-[1000px] mx-auto bg-slate-200">






        <a href="/page1">
            <button class="bg-green-100 p-2">Play</button>
            

            <button on:click={handleClick} class="bg-green-100 p-2">Skip</button>
        </a>







    </div>
</div>
