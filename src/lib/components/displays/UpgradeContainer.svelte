<script lang="ts">


    export let text: string = "";
    export let size: number = 100;


</script>




<div 

style="width: calc(100% * {size / 100});"
class="flex flex-row justify-between items-center h-full border-4 select-none
 rounded-md text-sm">
    <strong>{text}</strong>
    <slot></slot>

</div>