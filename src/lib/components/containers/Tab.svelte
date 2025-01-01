<script lang='ts'>


    import { active_tab } from '$lib/stores/stores';

    export let text = "";
    export let id = "";

    let isActive = false

    function handleClick() {
        active_tab.set(id);
    }

    $: { 
        if ($active_tab != id) {
            isActive = false;
        }
        else { isActive = true}
    }

</script>





<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleClick} class="flex flex-row h-1/12 w-full z-10 p-1 pl-4 pixel-font absolute
{isActive ? 'neo-active' : 'neo-inactive'}">
    {text} 
</div>