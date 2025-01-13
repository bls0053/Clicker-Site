<script lang='ts'>

	import { active_tab } from "$lib/stores/stores";

</script>



<style>
    .code {
        width: 100%;
        height: 100%;
    }
</style>

{#if ($active_tab === "help")}
    <div class="overflow-y-scroll overflow-x-hidden mx-auto flex flex-col rounded-md code pixel-font select-none p-3 bg-green-500">

        <div class="text-3xl">Lines</div>
        <div class="">
            <span style="color: #007acc;">Lines</span> (of code) are the main upgrade currency. 
            You can get <span style="color: #007acc;">Lines</span> by using your computer keyboard and enter key, or by using the 2 buttons below. 
            With some upgrades, <span style="color: #007acc;">Lines</span> can be automatically generated.
        </div><br>

        <div class="text-3xl">BenCoin</div>
        <div class=""><span style="color: #007acc;">BenCoin</span> can be mined at the mining rig to purchase <span style="color: #007acc;">Coffee</span> 
            and cosmetics. It takes 10 <span style="color: #007acc;">Lines</span>/sec to run each miner, so
            make sure you have enough <span style="color: #007acc;">Lines</span> to supply it.
        </div><br>

        <div class="text-3xl">Coffee</div>
        <div class="">When you brew <span style="color: #007acc;">Coffee</span>, it is consumed over time to supply a temporary exponential boost to 
            <span style="color: #007acc;">Line</span> generation. For 1 cup of Coffee, it takes 5 <span style="color: #007acc;">Beans</span>. 
            Both <span style="color: #007acc;">Beans</span> supply and <span style="color: #007acc;">Coffee</span> brewing can be automated. 
            <span style="color: #007acc;">Bean</span> price fluctuates (1-50 <span style="color: #007acc;">BenCoin</span>), so try to buy it when it's cheap.
        </div><br>

    </div>
{/if}