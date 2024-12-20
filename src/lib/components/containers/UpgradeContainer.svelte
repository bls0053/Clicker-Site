<script lang="ts">

    export let title = "";
    export let cost = 0;
    export let currency = "";

</script>




<div class="flex flex-row w-full h-full outline p-2 gap-2">

    <div class="flex flex-col pixel-font justify-center">
        <p>{title}</p>
        <p>Cost: {cost} {currency}</p> 
    </div>
    <slot></slot>
</div>
