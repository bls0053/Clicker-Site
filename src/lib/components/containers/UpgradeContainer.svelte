<script lang="ts">

    export let title = "";
    export let currency = "";

</script>




<div class="flex flex-row outline p-2 gap-4">

    <div class="flex flex-col pixel-font">
        <p>Cost: {currency}</p> 
    </div>
    <slot></slot>
</div>
